---
title: CherryStudio
icon: mdi:cherry
order: 1
---

# 在 CherryStudio 中配置使用

CherryStudio 支持 OpenAI 兼容接口，可以直接接入 PuLu AI 的 API 地址使用。

::: important
开始前请先准备好 PuLu AI API Key。如果还没有 Key，请先参考 [充值与 API Key](../quick-start/account.html)。
:::

## 添加模型服务

1. 打开 CherryStudio。
2. 点击右上角设置按钮。
3. 进入 **模型服务** 页面。
4. 在模型服务列表底部点击 **添加**。
5. 新增一个提供商。

![CherryStudio 模型服务](/assets/image17.png)

## 填写提供商信息

弹窗中按下面填写：

| 配置项 | 填写内容 |
| --- | --- |
| 提供商名称 | PULUAI |
| 提供商类型 | OpenAI 兼容接口 |
| API 地址 | `https://www.puluai.com/v1` |
| API Key | 你的 PuLu AI API Key |

填写完成后，点击获取模型，选择想使用的模型。你可以先选择一个文本模型做最小测试，再按需添加图片或其他模型。

![CherryStudio 添加提供商](/assets/image18.png)

## 验证

保存后新建一个会话，发送：

```text
你好，请用一句话说明当前模型已经连接成功。
```

如果可以正常返回内容，说明 CherryStudio 已成功接入 PuLu AI。
