---
title: Codex 安装与配置
icon: hugeicons:chat-gpt
order: 2
---

# Codex 安装与配置

::: tip
强烈建议使用 [CC-Switch](./cc-switch.html) 来进行配置，小白友好。
:::

## Codex 安装

Codex 可以使用 CLI、VS Code 插件或 Codex App。

如果你还没安装 Codex App，可以从这里下载：

[Codex Quickstart](https://developers.openai.com/codex/quickstart?setup=app)

以下是手动配置教程。

## 找到 Codex 的配置文件夹

首先打开你的终端程序，根据系统运行下面的命令，打开 Codex 的配置文件夹。Codex 的用户级配置目录是 `~/.codex`；在 Windows 中 `~` 对应当前用户目录。

::: code-tabs#codex-config-dir

@tab Windows

```powershell
New-Item -ItemType Directory -Force "$env:USERPROFILE\.codex"
Start-Process "$env:USERPROFILE\.codex"
```

@tab macOS

```bash
mkdir -p "$HOME/.codex"
open "$HOME/.codex"
```

@tab Linux

```bash
mkdir -p "$HOME/.codex"
xdg-open "$HOME/.codex"
```

:::

![打开 Codex 配置文件夹](/assets/image12.webp)

## 创建配置文件

手动创建 `config.toml` 与 `auth.json` 文件，并写入下面内容。

### config.toml 内容

```toml
model_provider = "puluai"
model = "gpt-5.5"
model_reasoning_effort = "xhigh"
network_access = "enabled"
disable_response_storage = true
windows_wsl_setup_acknowledged = true
model_verbosity = "high"

[model_providers.puluai]
name = "puluai"
base_url = "https://www.puluai.com/v1"
wire_api = "responses"
requires_openai_auth = true
```

### auth.json 内容

在 `auth.json` 配置文件中的 `OPENAI_API_KEY` 部分填入你在后台生成的 API Key，然后保存。

```json
{
  "OPENAI_API_KEY": "填入你的密钥"
}
```

## 验证是否配置成功

在终端运行：

::: code-tabs#codex-run

@tab Windows

```powershell
codex
```

@tab macOS

```bash
codex
```

@tab Linux

```bash
codex
```

:::

进入对话后发送一个简单问题，查看是否能够正常返回。

![Codex 运行成功示例](/assets/image13.webp)

::: warning 配置生效提醒
每次修改 `config.toml` 或 `auth.json` 后，都需要重启 Codex 才会生效。先按 `Ctrl + C` 退出当前 Codex，再重新运行 `codex`。
:::

VS Code 插件版 Codex 和 Codex App 同样适用这套配置。
