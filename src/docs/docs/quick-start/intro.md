---
title: PuLu AI 简介
icon: fluent-mdl2:web-environment
order: 1
---

# PuLu AI 简介

PuLu AI 是面向开发者、个人和团队的大模型 API 分发平台，提供稳定、易用、具备性价比的 AI Agent 接入方案。你可以通过统一的 API 地址和 API Key 接入 Codex、Claude Code、Gemini CLI 等常用工具，也可以在 CherryStudio、Hermes Agent 等客户端中配置使用。

## 适合谁使用

- 希望用一个账号管理多种 AI Agent 或模型能力的开发者。
- 需要在本地 CLI、IDE 插件或第三方客户端中接入模型的用户。
- 希望按量付费，并能清楚查看 token、扣费和请求记录的团队。

## 平台优势

- **稳定网关**：通过 PuLu AI 网关转发请求，降低接入复杂度。
- **透明计费**：每次请求均可追踪 token、扣费和调用记录。
- **缓存优化**：对适合缓存的请求进行优化，帮助降低重复上下文的使用成本。
- **高速直连**：通过优质网络链路提升访问体验。
- **统一配置**：多数工具只需要配置 `base_url` 和对应 API Key 即可开始使用。

::: tip 接入思路
建议先完成充值和 API Key 创建，再用 CC-Switch 进行图形化配置。需要手动配置时，再查看 Codex、Claude Code、Gemini 的单独教程。
:::

## 推荐阅读顺序

1. 阅读 [充值与 API Key](./account.html)，完成账号准备。
2. 阅读 [通用配置步骤](./preparation.html)，检查 Node.js、CLI、Git 等环境。
3. 优先使用 [CC-Switch](../tools/cc-switch.html) 快速配置本地工具。
4. 如需手动接入，再查看对应工具教程或 [curl 调用示例](../api/curl.html)。

