import { createHash } from "node:crypto";
import { existsSync } from "node:fs";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const docsRoot = join(root, "src", "docs");
const cacheRoot = join(root, ".translation-cache");

const locales = [
  { code: "en", name: "English" },
  { code: "fr", name: "French" },
  { code: "ru", name: "Russian" },
  { code: "ja", name: "Japanese" },
  { code: "vi", name: "Vietnamese" },
];

const protectedTerms = [
  "PuLu AI",
  "PULUAI",
  "PuLuAI",
  "puluai",
  "CC-Switch",
  "Codex",
  "Claude Code",
  "Gemini",
  "Hermes",
  "CherryStudio",
  "API Key",
  "base_url",
  "OPENAI_API_KEY",
  "ANTHROPIC_BASE_URL",
  "ANTHROPIC_AUTH_TOKEN",
  "GOOGLE_GEMINI_BASE_URL",
  "GEMINI_API_KEY",
  "GEMINI_MODEL",
  "https://www.puluai.com/v1",
  "https://www.puluai.com",
];

const tencentSecretId = process.env.TENCENTCLOUD_SECRET_ID || "";
const tencentSecretKey = process.env.TENCENTCLOUD_SECRET_KEY || "";
const tencentRegion = process.env.TENCENTCLOUD_REGION || "ap-guangzhou";

const tencentLanguageMap = {
  en: "en",
  fr: "fr",
  ru: "ru",
  ja: "ja",
  vi: "vi",
};

let tencentClient;

const getTencentClient = async () => {
  if (tencentClient) return tencentClient;

  const mod = await import("tencentcloud-sdk-nodejs");
  const tencentcloud = mod.default ?? mod;
  const TmtClient = tencentcloud.tmt.v20180321.Client;

  tencentClient = new TmtClient({
    credential: {
      secretId: tencentSecretId,
      secretKey: tencentSecretKey,
    },
    region: tencentRegion,
    profile: {
      httpProfile: {
        endpoint: "tmt.tencentcloudapi.com",
      },
    },
  });

  return tencentClient;
};

const sourceFiles = [
  "README.md",
  "docs/api/curl.md",
  "docs/apps/cherrystudio.md",
  "docs/apps/hermes.md",
  "docs/questions/security.md",
  "docs/questions/troubleshooting.md",
  "docs/quick-start/account.md",
  "docs/quick-start/intro.md",
  "docs/quick-start/preparation.md",
  "docs/tools/cc-switch.md",
  "docs/tools/claude-code.md",
  "docs/tools/codex.md",
  "docs/tools/gemini.md",
];

const hash = (text) => createHash("sha256").update(text).digest("hex");

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const splitTextForTencent = (text, maxLength = 1800) => {
  if (text.length <= maxLength) return [text];

  const chunks = [];
  let rest = text;

  while (rest.length > maxLength) {
    let cut = rest.lastIndexOf("\n\n", maxLength);
    if (cut < maxLength * 0.45) cut = rest.lastIndexOf("\n", maxLength);
    if (cut < maxLength * 0.45) cut = rest.lastIndexOf("。", maxLength);
    if (cut < maxLength * 0.45) cut = rest.lastIndexOf(".", maxLength);
    if (cut < maxLength * 0.45) cut = maxLength;

    chunks.push(rest.slice(0, cut));
    rest = rest.slice(cut);
  }

  if (rest) chunks.push(rest);
  return chunks;
};

const splitMarkdown = (text) => {
  const parts = [];
  const regex = /(```[\s\S]*?```|~~~[\s\S]*?~~~)/g;
  let lastIndex = 0;
  let match;
  while ((match = regex.exec(text))) {
    if (match.index > lastIndex) parts.push({ type: "text", value: text.slice(lastIndex, match.index) });
    parts.push({ type: "protected", value: match[0] });
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) parts.push({ type: "text", value: text.slice(lastIndex) });
  return parts;
};

const protectInlineMarkdown = (text) => {
  const tokens = [];
  const value = text.replace(/(`[^`]+`|\!\[[^\]]*\]\([^)]+\)|\[[^\]]+\]\([^)]+\)|https?:\/\/[^\s)]+)/g, (match) => {
    const token = `__PULUAI_TOKEN_${tokens.length}__`;
    tokens.push(match);
    return token;
  });

  return { value, tokens };
};

const restoreInlineMarkdown = (text, tokens) =>
  tokens.reduce((result, token, index) => result.replaceAll(`__PULUAI_TOKEN_${index}__`, token), text);

const translateMany = async (items, locale) => {
  const translated = [];
  let batch = [];
  let batchLength = 0;

  const flush = async () => {
    if (!batch.length) return;

    const source = batch.map((item, index) => `<seg id="${index}">${item}</seg>`).join("\n");
    const result = await translateChunk(source, locale);
    const matches = [...result.matchAll(/<seg id="(\d+)">([\s\S]*?)<\/seg>/g)];

    if (matches.length === batch.length) {
      for (const match of matches) translated.push(match[2]);
    } else {
      for (const item of batch) translated.push(await translateChunk(item, locale));
    }

    batch = [];
    batchLength = 0;
  };

  for (const item of items) {
    if (!item.trim()) {
      translated.push(item);
      continue;
    }

    if (batchLength + item.length > 1600) await flush();
    batch.push(item);
    batchLength += item.length;
  }

  await flush();
  return translated;
};

const translateFrontmatter = async (frontmatter, locale) => {
  if (!frontmatter) return frontmatter;

  const lines = frontmatter.split(/(\r?\n)/);
  const titles = [];
  const titleLineIndexes = [];

  for (let i = 0; i < lines.length; i += 1) {
    const match = lines[i].match(/^title:\s*(.+)$/);
    if (!match) continue;
    titleLineIndexes.push(i);
    titles.push(match[1].replace(/^["']|["']$/g, ""));
  }

  if (!titles.length) return frontmatter;

  const translatedTitles = await translateMany(titles, locale);
  titleLineIndexes.forEach((lineIndex, index) => {
    lines[lineIndex] = `title: ${translatedTitles[index]}`;
  });

  return lines.join("");
};

const splitFrontmatter = (markdown) => {
  if (!markdown.startsWith("---\n")) return { frontmatter: "", body: markdown };

  const end = markdown.indexOf("\n---", 4);
  if (end === -1) return { frontmatter: "", body: markdown };

  const closeEnd = markdown.indexOf("\n", end + 4);
  if (closeEnd === -1) return { frontmatter: markdown, body: "" };

  return {
    frontmatter: markdown.slice(0, closeEnd + 1),
    body: markdown.slice(closeEnd + 1),
  };
};

const translateChunk = async (text, locale) => {
  if (!text.trim()) return text;
  const cacheKey = hash(`${locale.code}\ntencent\n${text}`);
  const cacheFile = join(cacheRoot, locale.code, `${cacheKey}.txt`);
  if (existsSync(cacheFile)) return readFile(cacheFile, "utf8");

  if (!tencentSecretId || !tencentSecretKey) return text;

  try {
    const client = await getTencentClient();
    const translatedChunks = [];

    for (const chunk of splitTextForTencent(text)) {
      if (!chunk.trim()) {
        translatedChunks.push(chunk);
        continue;
      }

      const response = await client.TextTranslate({
        SourceText: chunk,
        Source: "zh",
        Target: tencentLanguageMap[locale.code] || locale.code,
        ProjectId: 0,
      });
      translatedChunks.push(response?.TargetText ?? chunk);
      await sleep(250);
    }

    const translated = translatedChunks.join("");
    await mkdir(dirname(cacheFile), { recursive: true });
    await writeFile(cacheFile, translated, "utf8");
    return translated;
  } catch (error) {
    console.warn(`[translate] Tencent translation failed for ${locale.code}. Keeping original Chinese text.`);
    console.warn(`[translate] ${error?.message || error}`);
    return text;
  }
};

const translateMarkdown = async (markdown, locale) => {
  const { frontmatter, body } = splitFrontmatter(markdown);
  const parts = splitMarkdown(body);
  const translatedFrontmatter = await translateFrontmatter(frontmatter, locale);
  const translated = [];

  for (const part of parts) {
    if (part.type === "protected") {
      translated.push(part.value);
      continue;
    }

    const lines = part.value.split(/(\r?\n)/);
    const outputLines = Array(lines.length).fill("");
    const units = [];
    const unitMeta = [];

    for (let index = 0; index < lines.length; index += 1) {
      const line = lines[index];
      if (/^\r?\n$/.test(line) || !line.trim()) {
        outputLines[index] = line;
        continue;
      }

      if (/^\s*(:::|---|\+\+\+)\s*$/.test(line) || /^\s*:::\s*\w+/.test(line)) {
        outputLines[index] = line;
        continue;
      }

      const heading = line.match(/^(\s*#{1,6}\s+)(.+)$/);
      const list = line.match(/^(\s*(?:[-*+]|\d+\.)\s+)(.+)$/);
      const quote = line.match(/^(\s*>\s?)(.+)$/);
      const tableSeparator = line.match(/^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$/);

      if (tableSeparator) {
        outputLines[index] = line;
        continue;
      }

      const prefix = heading?.[1] ?? list?.[1] ?? quote?.[1] ?? "";
      const content = heading?.[2] ?? list?.[2] ?? quote?.[2] ?? line;
      const { value, tokens } = protectInlineMarkdown(content);

      units.push(value);
      unitMeta.push({ index, prefix, tokens });
    }

    const translatedUnits = await translateMany(units, locale);
    unitMeta.forEach((meta, index) => {
      outputLines[meta.index] = `${meta.prefix}${restoreInlineMarkdown(translatedUnits[index], meta.tokens)}`;
    });

    translated.push(outputLines.join(""));
  }

  return `${translatedFrontmatter}${translated.join("")}`;
};

for (const locale of locales) {
  const localeRoot = join(docsRoot, locale.code);
  await rm(localeRoot, { recursive: true, force: true });

  for (const file of sourceFiles) {
    console.log(`[translate] ${locale.code}: ${file}`);
    const sourcePath = join(docsRoot, file);
    const outputPath = join(localeRoot, file);
    const markdown = await readFile(sourcePath, "utf8");
    const output = await translateMarkdown(markdown, locale);

    await mkdir(dirname(outputPath), { recursive: true });
    await writeFile(outputPath, output, "utf8");
  }
}

if (!tencentSecretId || !tencentSecretKey) {
  console.warn("[translate] No Tencent Cloud credentials found. Locale files were copied from Chinese source as placeholders.");
  console.warn("[translate] Set TENCENTCLOUD_SECRET_ID and TENCENTCLOUD_SECRET_KEY in Cloudflare Pages to enable automatic translation.");
}

console.log(`[translate] Generated ${locales.length} locale folders from ${sourceFiles.length} source files.`);
