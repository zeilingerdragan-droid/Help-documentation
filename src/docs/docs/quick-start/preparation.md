---
title: 通用配置步骤
icon: mdi:clipboard-check
order: 3
---

# 通用配置步骤

无论你使用 Codex、Claude Code 还是 Gemini CLI，都建议先完成下面的通用环境检查。

## 检查 Node.js

在终端中运行下面命令，检查 Node.js 是否已经安装。

::: code-tabs#node-check

@tab Windows

```bash
node -v
```

@tab macOS

```bash
node -v
```

@tab Linux

```bash
node -v
```

:::

如果能看到版本号，说明 Node.js 已安装。如果没有输出或提示命令不存在，请先安装 Node.js LTS 版本。

## 安装常用 CLI

打开终端，按需安装下面的 CLI 工具。三个平台的 npm 安装命令一致。

::: code-tabs#cli-install

@tab Windows

```bash
npm i -g @anthropic-ai/claude-code@latest
npm i -g @openai/codex@latest
npm i -g @google/gemini-cli@latest
```

@tab macOS

```bash
npm i -g @anthropic-ai/claude-code@latest
npm i -g @openai/codex@latest
npm i -g @google/gemini-cli@latest
```

@tab Linux

```bash
npm i -g @anthropic-ai/claude-code@latest
npm i -g @openai/codex@latest
npm i -g @google/gemini-cli@latest
```

:::

安装完成后，分别运行下面的命令进行检查：

::: code-tabs#cli-run-check

@tab Windows

```bash
claude
codex
gemini
```

@tab macOS

```bash
claude
codex
gemini
```

@tab Linux

```bash
claude
codex
gemini
```

:::

只要能进入对应的交互界面，基础安装通常就已经完成。

::: info
部分 CLI 第一次启动时会检查本机环境，可能出现与登录、Git、默认 Shell 有关的提示。先处理明确的缺失项，再继续配置 API 地址和密钥。
:::

## Windows 用户建议安装 Git

如果 Claude Code 提示缺少 Git 环境，请先确认 Git 是否可用。

::: code-tabs#git-check

@tab Windows

```bash
git --version
```

@tab macOS

```bash
git --version
```

@tab Linux

```bash
git --version
```

:::

如果命令能输出版本号，说明 Git 已经在当前终端可用。
