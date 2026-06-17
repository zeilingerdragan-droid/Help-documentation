---
title: Hermes Agent
icon: mdi:robot-outline
order: 2
---

# 在 Hermes Agent 中配置使用

这篇教程适合想在自己电脑上直接运行 Hermes 的用户。

::: important Windows 用户
Windows 推荐在 WSL 里运行 Hermes。下面 Windows 命令默认指 Windows + WSL 环境；如果你使用 Hermes 官方 Windows 安装方式，请按官方安装器完成后，再参考同样的配置文件内容。
:::

## 第一步：安装 Hermes

先根据你的系统运行安装命令。

::: code-tabs#hermes-install

@tab Windows + WSL

```bash
curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash
```

@tab macOS

```bash
curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash
```

@tab Linux

```bash
curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash
```

:::

安装完成后，Hermes 的配置通常位于：

```bash
~/.hermes
```

如果安装结束后当前终端里还找不到 `hermes` 命令，请关闭终端后重新打开。

## 第二步：把 Hermes 连到 PuLu AI

先把 Hermes 的配置目录打开。你可以用自己顺手的编辑器修改文件。

::: code-tabs#hermes-config-dir

@tab Windows + WSL

```bash
cd ~/.hermes
explorer.exe .
```

@tab macOS

```bash
cd ~/.hermes
open .
```

@tab Linux

```bash
cd ~/.hermes
xdg-open .
```

:::

![打开 Hermes 配置目录](/assets/image20.png)

然后打开 `config.yaml`，把模型配置改成下面这样：

```yaml
model:
  provider: custom
  default: gpt-5.4-xhigh
  base_url: https://www.puluai.com/v1
  api_mode: chat_completions
```

可以直接这样理解：

- `base_url` 告诉 Hermes 以后往哪条接口地址发请求。
- `default` 是默认先用哪个模型。
- `api_mode` 先照着写即可，不需要先研究它背后的协议细节。

然后打开 `~/.hermes/.env`，填入你自己的密钥：

```env
OPENAI_API_KEY=你的密钥
```

如果这个文件里已经有 `OPENAI_API_KEY`，就把它改成这次要用的 Key。

## 第三步：打上缓存兼容补丁

这一步用于让 Hermes 更适合 PuLu AI 这类接口，提升重复上下文场景下的缓存命中表现。

::: code-tabs#hermes-cache-patch

@tab Windows + WSL

```bash
git clone https://github.com/foryourhealth111-pixel/hermes-codex-proxy-cache-compat.git
cd hermes-codex-proxy-cache-compat
bash scripts/apply_patches.sh ~/.hermes/hermes-agent
bash scripts/install_skill.sh ~/.hermes
```

@tab macOS

```bash
git clone https://github.com/foryourhealth111-pixel/hermes-codex-proxy-cache-compat.git
cd hermes-codex-proxy-cache-compat
bash scripts/apply_patches.sh ~/.hermes/hermes-agent
bash scripts/install_skill.sh ~/.hermes
```

@tab Linux

```bash
git clone https://github.com/foryourhealth111-pixel/hermes-codex-proxy-cache-compat.git
cd hermes-codex-proxy-cache-compat
bash scripts/apply_patches.sh ~/.hermes/hermes-agent
bash scripts/install_skill.sh ~/.hermes
```

:::

::: info
中转地址不只看发送的内容，也会受完整请求结构影响。补丁会补齐这部分结构，让缓存命中更接近原生 Codex 的表现。
:::

## 第四步：启动 Hermes，做一次最小可用确认

::: code-tabs#hermes-run

@tab Windows + WSL

```bash
hermes
```

@tab macOS

```bash
hermes
```

@tab Linux

```bash
hermes
```

:::

进去以后，先问一个简单问题，例如：

![Hermes 运行示例](/assets/image21.png)

```text
请用三句话介绍一下 Hermes 是做什么的。
```

只要它能正常返回内容，这一轮就算已经跑通。

如果这一步报 Key 错误、地址错误，或者模型不存在，回到第二步重新检查即可。

::: tip
如果你后面想额外看缓存有没有动起来，可以在同一个会话里连续问两次前缀差不多的问题，再留意 `cached_tokens` 或 `cache_read_tokens`。
:::
