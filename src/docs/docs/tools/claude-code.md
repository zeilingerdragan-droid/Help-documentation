---
title: Claude Code 配置
icon: material-icon-theme:claude
order: 3
---

# Claude Code 配置教程

::: tip
强烈建议使用 [CC-Switch](./cc-switch.html) 来进行配置，小白友好。
:::

## 找到 Claude Code 的配置文件夹

首先打开你的终端程序，根据系统运行下面的命令，打开 Claude Code 的配置文件夹。Claude Code 的用户设置目录是 `~/.claude`；在 Windows 中 `~` 对应当前用户目录。

::: code-tabs#claude-config-dir

@tab Windows

```powershell
New-Item -ItemType Directory -Force "$env:USERPROFILE\.claude"
Start-Process "$env:USERPROFILE\.claude"
```

@tab macOS

```bash
mkdir -p "$HOME/.claude"
open "$HOME/.claude"
```

@tab Linux

```bash
mkdir -p "$HOME/.claude"
xdg-open "$HOME/.claude"
```

:::

![打开 Claude Code 配置文件夹](/assets/image14.webp)

## 创建 settings.json

手动创建 `settings.json` 文件，写入如下内容：

```json
{
  "env": {
    "ANTHROPIC_AUTH_TOKEN": "填入你的密钥",
    "ANTHROPIC_BASE_URL": "https://www.puluai.com/v1",
    "CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC": "1"
  }
}
```

保存后重新打开终端。

## 验证是否配置成功

在终端运行：

::: code-tabs#claude-run

@tab Windows

```powershell
claude
```

@tab macOS

```bash
claude
```

@tab Linux

```bash
claude
```

:::

进入 Claude Code 后发送一个简单问题，查看是否能够正常返回。

::: warning
如果 Claude Code 提示缺少 Git 环境，请先安装 Git，再重新运行 `claude` 进行测试。
:::
