---
title: Gemini 配置
icon: vscode-icons:file-type-gemini
order: 4
---

# Gemini 配置教程

::: tip
强烈建议使用 [CC-Switch](./cc-switch.html) 来进行配置，小白友好。
:::

## 找到 Gemini 的配置文件夹

首先打开你的终端程序，根据系统运行下面的命令，打开 Gemini 的配置文件夹。

::: code-tabs#gemini-config-dir

@tab Windows

```powershell
New-Item -ItemType Directory -Force "$env:USERPROFILE\.gemini"
Start-Process "$env:USERPROFILE\.gemini"
```

@tab macOS

```bash
mkdir -p "$HOME/.gemini"
open "$HOME/.gemini"
```

@tab Linux

```bash
mkdir -p "$HOME/.gemini"
xdg-open "$HOME/.gemini"
```

:::

![打开 Gemini 配置文件夹](/assets/image15.webp)

## 创建 .env 文件

手动创建 `.env` 文件，写入如下内容：

```env
GOOGLE_GEMINI_BASE_URL=https://www.puluai.com/v1
GEMINI_API_KEY=填入你的密钥
GEMINI_MODEL=gemini-3-pro-preview
```

在 `GEMINI_API_KEY` 部分填入你在后台生成的 Gemini 渠道 API Key，然后保存。

## 验证是否配置成功

在终端运行：

::: code-tabs#gemini-run

@tab Windows

```powershell
gemini
```

@tab macOS

```bash
gemini
```

@tab Linux

```bash
gemini
```

:::

进入 Gemini CLI 后发送一个简单问题，查看是否能够正常返回。

![Gemini CLI 运行成功示例](/assets/image16.webp)

::: warning
如果仍然提示 Key 错误，请检查 `.env` 文件中是否有多余空格、漏填 Key，或者 Key 是否被模型限制影响。
:::
