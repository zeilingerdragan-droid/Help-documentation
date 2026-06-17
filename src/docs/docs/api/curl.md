---
title: curl 调用示例
icon: mdi:console
order: 1
---

# curl 调用示例

下面示例用于快速确认 PuLu AI API 能否正常响应。请将 `{此处填写ApiKey}` 替换为你在控制台创建的 API Key。

::: tip
Windows PowerShell 使用反引号换行，macOS 和 Linux 使用反斜杠换行。三种写法作用完全一致。
:::

## OpenAI Responses 接口

### Windows PowerShell

```powershell
curl.exe https://www.puluai.com/v1/responses `
  -H "Content-Type: application/json" `
  -H "Authorization: Bearer {此处填写ApiKey}" `
  -d '{
    "model": "gpt-5.2",
    "input": [
      {
        "type": "message",
        "role": "user",
        "content": [
          {
            "type": "input_text",
            "text": "你好"
          }
        ]
      }
    ],
    "stream": true
  }'
```

### macOS

```bash
curl https://www.puluai.com/v1/responses \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer {此处填写ApiKey}' \
  -d '{
    "model": "gpt-5.2",
    "input": [
      {
        "type": "message",
        "role": "user",
        "content": [
          {
            "type": "input_text",
            "text": "你好"
          }
        ]
      }
    ],
    "stream": true
  }'
```

### Linux

```bash
curl https://www.puluai.com/v1/responses \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer {此处填写ApiKey}' \
  -d '{
    "model": "gpt-5.2",
    "input": [
      {
        "type": "message",
        "role": "user",
        "content": [
          {
            "type": "input_text",
            "text": "你好"
          }
        ]
      }
    ],
    "stream": true
  }'
```

## Chat Completions 接口

### Windows PowerShell

```powershell
curl.exe https://www.puluai.com/v1/chat/completions `
  -H "Content-Type: application/json" `
  -H "Authorization: Bearer {此处填写ApiKey}" `
  -d '{
    "model": "gpt-5.2",
    "messages": [
      {
        "role": "user",
        "content": "你好"
      }
    ],
    "stream": true
  }'
```

### macOS

```bash
curl https://www.puluai.com/v1/chat/completions \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer {此处填写ApiKey}' \
  -d '{
    "model": "gpt-5.2",
    "messages": [
      {
        "role": "user",
        "content": "你好"
      }
    ],
    "stream": true
  }'
```

### Linux

```bash
curl https://www.puluai.com/v1/chat/completions \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer {此处填写ApiKey}' \
  -d '{
    "model": "gpt-5.2",
    "messages": [
      {
        "role": "user",
        "content": "你好"
      }
    ],
    "stream": true
  }'
```

::: info
`/v1/chat/completions` 的响应由 `/v1/responses` 转换而来，部分软件或插件可能存在兼容差异。需要最佳兼容和缓存能力时，优先使用工具对应的推荐配置。
:::

## Claude Messages 接口

### Windows PowerShell

```powershell
curl.exe https://www.puluai.com/v1/messages `
  -H "Content-Type: application/json" `
  -H "x-api-key: {此处填写ApiKey}" `
  -d '{
    "model": "claude-sonnet-4-5-20250929",
    "messages": [
      {
        "role": "user",
        "content": [
          {
            "type": "text",
            "text": "你好",
            "cache_control": { "type": "ephemeral" }
          }
        ]
      }
    ],
    "max_tokens": 32000,
    "stream": true
  }'
```

### macOS

```bash
curl https://www.puluai.com/v1/messages \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {此处填写ApiKey}' \
  -d '{
    "model": "claude-sonnet-4-5-20250929",
    "messages": [
      {
        "role": "user",
        "content": [
          {
            "type": "text",
            "text": "你好",
            "cache_control": { "type": "ephemeral" }
          }
        ]
      }
    ],
    "max_tokens": 32000,
    "stream": true
  }'
```

### Linux

```bash
curl https://www.puluai.com/v1/messages \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {此处填写ApiKey}' \
  -d '{
    "model": "claude-sonnet-4-5-20250929",
    "messages": [
      {
        "role": "user",
        "content": [
          {
            "type": "text",
            "text": "你好",
            "cache_control": { "type": "ephemeral" }
          }
        ]
      }
    ],
    "max_tokens": 32000,
    "stream": true
  }'
```

鉴权请求头兼容 `Authorization` 和 `x-api-key`，可根据客户端要求选择。

## Gemini 接口

### Windows PowerShell

```powershell
curl.exe --location "https://www.puluai.com/v1beta/models/gemini-3-pro-preview:streamGenerateContent?alt=sse" `
  --header "connection: keep-alive" `
  --header "x-goog-api-key: {此处填写ApiKey}" `
  --header "content-type: application/json" `
  --data '{
    "generationConfig": {
      "temperature": 1
    },
    "contents": [
      {
        "role": "user",
        "parts": [
          {
            "text": "你好"
          }
        ]
      }
    ]
  }'
```

### macOS

```bash
curl --location 'https://www.puluai.com/v1beta/models/gemini-3-pro-preview:streamGenerateContent?alt=sse' \
  --header 'connection: keep-alive' \
  --header 'x-goog-api-key: {此处填写ApiKey}' \
  --header 'content-type: application/json' \
  --data '{
    "generationConfig": {
      "temperature": 1
    },
    "contents": [
      {
        "role": "user",
        "parts": [
          {
            "text": "你好"
          }
        ]
      }
    ]
  }'
```

### Linux

```bash
curl --location 'https://www.puluai.com/v1beta/models/gemini-3-pro-preview:streamGenerateContent?alt=sse' \
  --header 'connection: keep-alive' \
  --header 'x-goog-api-key: {此处填写ApiKey}' \
  --header 'content-type: application/json' \
  --data '{
    "generationConfig": {
      "temperature": 1
    },
    "contents": [
      {
        "role": "user",
        "parts": [
          {
            "text": "你好"
          }
        ]
      }
    ]
  }'
```

