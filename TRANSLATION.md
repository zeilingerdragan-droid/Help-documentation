# 多语言自动翻译说明

本项目以中文文档作为唯一源内容。构建时会运行：

```bash
npm run translate
```

脚本会从 `src/docs` 下的中文 Markdown 自动生成：

- `src/docs/en`
- `src/docs/fr`
- `src/docs/ru`
- `src/docs/ja`
- `src/docs/vi`

然后 VuePress 构建多语言页面，并在导航栏提供语言切换。

## Cloudflare Pages 配置

构建命令：

```text
npm run build
```

构建输出目录：

```text
dist
```

Node 版本环境变量：

```text
NODE_VERSION=22
```

## 腾讯云机器翻译配置

本项目推荐使用腾讯云机器翻译 TMT。

在 Cloudflare Pages 的环境变量中添加：

```text
PULUAI_TRANSLATE_PROVIDER=tencent
TENCENTCLOUD_SECRET_ID=你的 SecretId
TENCENTCLOUD_SECRET_KEY=你的 SecretKey
TENCENTCLOUD_REGION=ap-guangzhou
```

`TENCENTCLOUD_REGION` 可以按你的腾讯云资源区域填写，常用值为 `ap-guangzhou`。

## 没有密钥时

如果没有配置腾讯云密钥，脚本会把中文文档复制到各语言目录作为占位内容，保证本地构建不会失败。

配置密钥后，Cloudflare 下次构建会自动生成真实翻译。

## 更新文档

以后只需要编辑中文源文档：

```text
src/docs/README.md
src/docs/docs/**/*.md
```

不要手动修改 `src/docs/en`、`src/docs/fr`、`src/docs/ru`、`src/docs/ja`、`src/docs/vi`，这些目录会在每次构建时自动重新生成。

## 翻译保护

脚本会尽量保护：

- 代码块
- HTML 标签
- 图片引用
- URL
- 文件路径
- 环境变量名
- API 参数
- PuLu AI / PULUAI 等品牌词

首次上线多语言后，建议人工抽查关键教程页，尤其是 API、CLI 和排障内容。
