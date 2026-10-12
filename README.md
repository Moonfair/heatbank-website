# HeatBank 产品主页

[访问主页](https://heatbank.moonfair.cn/) · [GitHub Pages](https://moonfair.github.io/heatbank-website/)

面向 iPhone 用户的中文产品介绍页。宣传图与界面截图来自 HeatBank 实际渲染，图中的记录均为示例数据。

## 本地预览

```sh
python3 -m http.server 8792 --directory site
```

打开 `http://localhost:8792`。页面使用原生 HTML、CSS 与 JavaScript，无需安装前端依赖。

## 更新内容

- `site/index.html`：产品文案、六张宣传图和常见问题。
- `site/styles.css`：响应式排版、配色与减少动态效果设置。
- `site/site-config.js`：TestFlight 申请入口及其说明。
- `site/assets/`：实际截图、宣传图及网页压缩版本。

申请地址必须是实际可用的 HTTPS 链接或已指定收件人的 `mailto:` 地址。地址尚未确定时，`applicationStatus: 'pending'` 会隐藏申请按钮并显示入口尚未开放，避免提供无效提交链接。填写实际地址后将状态改为 `open`。网页不直接收集或存储申请信息。

## 发布

```sh
node scripts/check-site.cjs
git push origin main
```

GitHub Actions 校验资源与申请链接后，将 `site/` 发布到 GitHub Pages。仅这个目录会进入网站部署产物。

`heatbank.moonfair.cn` 同时承载 HeatBank App API。域名保留现有解析，由入口服务器把主页及静态资源转发到 GitHub Pages；现有 API 路由保持原样。不要直接将该域名的 CNAME 改到 GitHub Pages，否则已安装 App 的 API 请求会中断。

## 内容边界

仅介绍已在应用中实现的记录、日历、体重趋势、热量统计、计划和身体档案。不同 TestFlight 构建可能存在版本差异，网页已注明。截图、图标和品牌资产归 HeatBank 所有。
