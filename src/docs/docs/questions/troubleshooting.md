---
title: 故障排查
icon: vaadin:tools
order: 1
---

# 故障排查

## CLI 命令不存在

如果运行 `claude`、`codex`、`gemini` 提示命令不存在，先确认 Node.js 和 npm 是否可用：

### Windows

```powershell
node -v
npm -v
```

### macOS

```bash
node -v
npm -v
```

### Linux

```bash
node -v
npm -v
```

然后重新安装对应 CLI：

### Windows

```powershell
npm i -g @anthropic-ai/claude-code@latest
npm i -g @openai/codex@latest
npm i -g @google/gemini-cli@latest
```

### macOS

```bash
npm i -g @anthropic-ai/claude-code@latest
npm i -g @openai/codex@latest
npm i -g @google/gemini-cli@latest
```

### Linux

```bash
npm i -g @anthropic-ai/claude-code@latest
npm i -g @openai/codex@latest
npm i -g @google/gemini-cli@latest
```

安装后请重新打开终端。

## Claude Code 提示缺少 Git

安装 Git 后，重新打开终端并运行：

### Windows

```powershell
git --version
```

### macOS

```bash
git --version
```

### Linux

```bash
git --version
```

能看到版本号后，再重新运行 `claude`。

## Key 错误

常见原因：

- API Key 没有完整复制。
- 配置文件里多了空格、引号或不可见字符。
- 把其他供应商的 Key 填到了 PuLu AI 配置中。
- API Key 被删除、禁用或设置了模型/IP 限制。

建议重新创建一个测试 Key，并先不要开启模型限制或 IP 白名单。

## 模型不存在

如果客户端提示模型不存在：

1. 回到 PuLu AI 控制台确认当前账号可用模型。
2. 检查 API Key 是否限制了模型。
3. 将客户端里的模型名替换为控制台展示的可用模型。

## 修改配置后不生效

大多数 CLI 会在启动时读取配置文件。修改配置后，请完整退出当前进程再重新启动。

### Windows

```powershell
# 退出当前 CLI
Ctrl + C

# 重新进入
codex
```

### macOS

```bash
# 退出当前 CLI
Ctrl + C

# 重新进入
codex
```

### Linux

```bash
# 退出当前 CLI
Ctrl + C

# 重新进入
codex
```

## curl 能通，但客户端不通

如果 curl 示例可以正常返回，但客户端失败，优先检查：

- 客户端接口类型是否选对，例如 Responses、Chat Completions、Anthropic Messages 或 Gemini。
- `base_url` 是否写成 `https://www.puluai.com/v1`。
- 客户端是否额外拼接了路径，导致最终 URL 重复出现 `/v1`。
- 客户端是否支持流式返回。
