---
title: 使用 CC-Switch 配置
icon: mdi:swap-horizontal
order: 1
---

# 使用 CC-Switch 配置

CC-Switch 适合用来统一管理 Claude Code、Codex、Gemini 等 CLI 的供应商配置。相比手动改配置文件，它更适合第一次接入 PuLu AI 的用户。

## 什么是 CC-Switch？

使用 CC-Switch，你可以：

- 一键切换 API 配置，在多个 API 提供商之间快速切换。
- 通过图形界面管理所有配置。
- 管理 MCP 服务器。
- 通过系统托盘快速切换。
- 使用本地代理，支持热切换 CC、Codex、Gemini 的供应商。
- 使用故障转移能力，在渠道异常时自动切换。

![CC-Switch 供应商列表](/assets/image8.webp)

## 软件下载

访问 CC-Switch 下载页面，下载最新版本并在本地安装：

[CC-Switch Releases](https://github.com/farion1231/cc-switch/releases/tag/)

![CC-Switch 下载页面](/assets/image9.webp)

## 配置渠道商

下面以 Claude 的配置为例，Codex 与 Gemini 的配置方式同理。

### 步骤一：选择要配置的 CLI

打开 CC-Switch，选择要配置的 CLI。选择好 CLI 后，点击添加供应商进行配置。

![选择 CLI 并添加供应商](/assets/image10.webp)

### 步骤二：添加自定义供应商

在供应商配置中选择自定义供应商，并在 API Key 部分填写你在 PuLu AI 后台生成的密钥。

![添加自定义供应商并填写 API Key](/assets/image11.png)

建议填写：

```text
供应商名称：PULUAI
API 地址：https://www.puluai.com/v1
API Key：填入你的密钥
```

::: tip
如果你同时使用 Claude Code、Codex、Gemini，可以先配置一个 CLI 并测试成功，再按同样方式配置其他 CLI。
:::
