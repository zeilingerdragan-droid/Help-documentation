import { viteBundler } from "@vuepress/bundler-vite";
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";
import { fileURLToPath } from "node:url";

const resolve = (path) => fileURLToPath(new URL(path, import.meta.url));

const localeMeta = {
  "/": {
    lang: "zh-CN",
    title: "PuLu AI 文档",
    description: "PuLu AI API 接入与客户端配置帮助文档",
    selectLanguageName: "简体中文",
    nav: ["快速开始", "配置教程", "API 示例", "应用接入", "进入主站"],
    groups: ["快速开始", "配置教程", "API 示例", "应用接入", "常见问题"],
    pages: {
      intro: "PuLu AI 简介",
      account: "充值与 API Key",
      preparation: "通用配置步骤",
      ccSwitch: "使用 CC-Switch 配置",
      codex: "Codex 安装与配置",
      claude: "Claude Code 配置",
      gemini: "Gemini 配置",
      curl: "curl 调用示例",
      cherry: "CherryStudio",
      hermes: "Hermes Agent",
      troubleshooting: "故障排查",
      security: "安全与使用建议",
    },
  },
  "/en/": {
    lang: "en-US",
    title: "PuLu AI Docs",
    description: "PuLu AI API integration and client setup documentation",
    selectLanguageName: "English",
    nav: ["Quick Start", "Setup Guides", "API Examples", "App Integrations", "Main Site"],
    groups: ["Quick Start", "Setup Guides", "API Examples", "App Integrations", "FAQ"],
    pages: {
      intro: "PuLu AI Overview",
      account: "Billing and API Keys",
      preparation: "General Setup",
      ccSwitch: "Configure with CC-Switch",
      codex: "Codex Setup",
      claude: "Claude Code Setup",
      gemini: "Gemini Setup",
      curl: "curl Examples",
      cherry: "CherryStudio",
      hermes: "Hermes Agent",
      troubleshooting: "Troubleshooting",
      security: "Security Tips",
    },
  },
  "/fr/": {
    lang: "fr-FR",
    title: "Documentation PuLu AI",
    description: "Documentation d'integration API et de configuration client PuLu AI",
    selectLanguageName: "Français",
    nav: ["Demarrage", "Configuration", "Exemples API", "Applications", "Site principal"],
    groups: ["Demarrage", "Configuration", "Exemples API", "Applications", "FAQ"],
    pages: {
      intro: "Presentation de PuLu AI",
      account: "Recharge et API Key",
      preparation: "Configuration generale",
      ccSwitch: "Configurer avec CC-Switch",
      codex: "Configuration de Codex",
      claude: "Configuration de Claude Code",
      gemini: "Configuration de Gemini",
      curl: "Exemples curl",
      cherry: "CherryStudio",
      hermes: "Hermes Agent",
      troubleshooting: "Depannage",
      security: "Conseils de securite",
    },
  },
  "/ru/": {
    lang: "ru-RU",
    title: "Документация PuLu AI",
    description: "Документация по подключению API и настройке клиентов PuLu AI",
    selectLanguageName: "Русский",
    nav: ["Быстрый старт", "Настройка", "API примеры", "Приложения", "Главный сайт"],
    groups: ["Быстрый старт", "Настройка", "API примеры", "Приложения", "FAQ"],
    pages: {
      intro: "Обзор PuLu AI",
      account: "Баланс и API Key",
      preparation: "Общая настройка",
      ccSwitch: "Настройка через CC-Switch",
      codex: "Настройка Codex",
      claude: "Настройка Claude Code",
      gemini: "Настройка Gemini",
      curl: "Примеры curl",
      cherry: "CherryStudio",
      hermes: "Hermes Agent",
      troubleshooting: "Диагностика",
      security: "Безопасность",
    },
  },
  "/ja/": {
    lang: "ja-JP",
    title: "PuLu AI ドキュメント",
    description: "PuLu AI API 連携とクライアント設定ドキュメント",
    selectLanguageName: "日本語",
    nav: ["クイック開始", "設定ガイド", "API 例", "アプリ連携", "メインサイト"],
    groups: ["クイック開始", "設定ガイド", "API 例", "アプリ連携", "FAQ"],
    pages: {
      intro: "PuLu AI 概要",
      account: "チャージと API Key",
      preparation: "共通設定",
      ccSwitch: "CC-Switch 設定",
      codex: "Codex 設定",
      claude: "Claude Code 設定",
      gemini: "Gemini 設定",
      curl: "curl 例",
      cherry: "CherryStudio",
      hermes: "Hermes Agent",
      troubleshooting: "トラブルシューティング",
      security: "セキュリティ",
    },
  },
  "/vi/": {
    lang: "vi-VN",
    title: "Tài liệu PuLu AI",
    description: "Tài liệu tích hợp API và cấu hình client PuLu AI",
    selectLanguageName: "Tiếng Việt",
    nav: ["Bắt đầu", "Cấu hình", "Ví dụ API", "Ứng dụng", "Trang chính"],
    groups: ["Bắt đầu", "Cấu hình", "Ví dụ API", "Ứng dụng", "FAQ"],
    pages: {
      intro: "Tổng quan PuLu AI",
      account: "Nạp tiền và API Key",
      preparation: "Cấu hình chung",
      ccSwitch: "Cấu hình bằng CC-Switch",
      codex: "Cấu hình Codex",
      claude: "Cấu hình Claude Code",
      gemini: "Cấu hình Gemini",
      curl: "Ví dụ curl",
      cherry: "CherryStudio",
      hermes: "Hermes Agent",
      troubleshooting: "Khắc phục sự cố",
      security: "Bảo mật",
    },
  },
};

const withLocale = (localePath, path) => `${localePath === "/" ? "" : localePath.slice(0, -1)}${path}`;

const createNavbar = (localePath, meta) => [
  {
    text: meta.nav[0],
    icon: "fa6-solid:rocket",
    link: withLocale(localePath, "/docs/quick-start/intro.html"),
  },
  {
    text: meta.nav[1],
    icon: "mdi:tools",
    link: withLocale(localePath, "/docs/tools/cc-switch.html"),
  },
  {
    text: meta.nav[2],
    icon: "carbon:api",
    link: withLocale(localePath, "/docs/api/curl.html"),
  },
  {
    text: meta.nav[3],
    icon: "mdi:application-cog",
    link: withLocale(localePath, "/docs/apps/cherrystudio.html"),
  },
  {
    text: meta.nav[4],
    icon: "mdi:arrow-top-right-bold-box",
    link: "https://www.puluai.com",
  },
];

const createSidebar = (localePath, meta) => ({
  [withLocale(localePath, "/docs/")]: [
    {
      text: meta.groups[0],
      icon: "streamline-sharp:startup-solid",
      prefix: withLocale(localePath, "/docs/quick-start/"),
      children: [
        { text: meta.pages.intro, icon: "fluent-mdl2:web-environment", link: "intro.html" },
        { text: meta.pages.account, icon: "mdi:key-chain", link: "account.html" },
        { text: meta.pages.preparation, icon: "mdi:clipboard-check", link: "preparation.html" },
      ],
    },
    {
      text: meta.groups[1],
      icon: "mdi:tools",
      prefix: withLocale(localePath, "/docs/tools/"),
      children: [
        { text: meta.pages.ccSwitch, icon: "mdi:swap-horizontal", link: "cc-switch.html" },
        { text: meta.pages.codex, icon: "hugeicons:chat-gpt", link: "codex.html" },
        { text: meta.pages.claude, icon: "material-icon-theme:claude", link: "claude-code.html" },
        { text: meta.pages.gemini, icon: "vscode-icons:file-type-gemini", link: "gemini.html" },
      ],
    },
    {
      text: meta.groups[2],
      icon: "carbon:api",
      prefix: withLocale(localePath, "/docs/api/"),
      children: [{ text: meta.pages.curl, icon: "mdi:console", link: "curl.html" }],
    },
    {
      text: meta.groups[3],
      icon: "mdi:application-cog",
      prefix: withLocale(localePath, "/docs/apps/"),
      children: [
        { text: meta.pages.cherry, icon: "mdi:cherry", link: "cherrystudio.html" },
        { text: meta.pages.hermes, icon: "mdi:robot-outline", link: "hermes.html" },
      ],
    },
    {
      text: meta.groups[4],
      icon: "streamline-freehand-color:plugin-jigsaw-puzzle",
      prefix: withLocale(localePath, "/docs/questions/"),
      children: [
        { text: meta.pages.troubleshooting, icon: "vaadin:tools", link: "troubleshooting.html" },
        { text: meta.pages.security, icon: "mdi:shield-key", link: "security.html" },
      ],
    },
  ],
});

const siteLocales = Object.fromEntries(
  Object.entries(localeMeta).map(([path, meta]) => [
    path,
    {
      lang: meta.lang,
      title: meta.title,
      description: meta.description,
    },
  ]),
);

const themeLocales = Object.fromEntries(
  Object.entries(localeMeta).map(([path, meta]) => [
    path,
    {
      selectLanguageName: meta.selectLanguageName,
      navbar: createNavbar(path, meta),
      sidebar: createSidebar(path, meta),
    },
  ]),
);

export default defineUserConfig({
  lang: "zh-CN",
  title: "PuLu AI 文档",
  description: "PuLu AI API 接入与客户端配置帮助文档",
  locales: siteLocales,
  bundler: viteBundler(),
  public: resolve("./public"),
  head: [
    ["meta", { name: "theme", content: "VuePress Theme Hope" }],
    ["link", { rel: "icon", href: "/logo.svg", type: "image/svg+xml" }],
    ["link", { rel: "stylesheet", href: "/styles/index.css" }],
  ],
  theme: hopeTheme({
    hostname: "https://support.pulai.com",
    author: false,
    logo: "/logo.svg",
    repo: "",
    docsDir: "src/docs",
    colorMode: "auto",
    fullscreen: false,
    locales: themeLocales,
    pageInfo: false,
    contributors: false,
    editLink: false,
    lastUpdated: false,
    footer: "Copyright © 2026-present PuLu AI",
    displayFooter: true,
    markdown: {
      codeTabs: true,
      tabs: true,
      highlighter: {
        type: "shiki",
      },
    },
    plugins: {
      slimsearch: {
        indexContent: true,
      },
      copyCode: true,
      icon: {
        assets: "iconify",
      },
    },
  }),
});
