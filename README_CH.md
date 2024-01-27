![](https://img.shields.io/github/license/laplacetw/vitepress-theme-trigger)
![Node.js >= 18.0.0](https://img.shields.io/badge/Node.js-%3E%3D18.0.0-green)
![VitePress 1.0.0.rc40](https://img.shields.io/badge/VitePress-1.0.0_rc.40-green)

# vitepress-theme-trigger
為建立部落格而生的 [VitePress](https://vitepress.dev) + [Tailwind CSS](https://tailwindcss.com) 主題

![](/public/preview.png)
## 簡介
「Trigger」是一個開箱即用的 VitePress 主題，以我很喜歡的漫畫作品 [World Trigger](https://en.wikipedia.org/wiki/World_Trigger) 命名。你可以直接使用它，或者根據需求或喜好進一步修改。

有關自定義主題的資訊 :
- [VitePress Doc - Using Vue in Markdown](https://vitepress.dev/guide/using-vue)
- [VitePress Doc - Extending the Default Theme](https://vitepress.dev/guide/extending-default-theme)
- [VitePress Doc - Build-Time Data Loading](https://vitepress.dev/guide/data-loading)

如果有任何問題，歡迎直接提issue。

## 更新日誌
有關更新的細節都紀錄在 [CHANGELOG](./CHANGELOG.md)。

## 主題特色
- 透過終端機指令建立新文章
- Tailwind CSS (響應式)
- 淺色 / 深色主題切換
- 文章列表分頁使用 History API
- [內建網站地圖(sitemap)生成](https://vitepress.dev/guide/sitemap-generation#sitemap-generation)
- 整合常用網站 / 主題設定
- 使用 [utterances](https://utteranc.es) 留言系統
- utterances 同步切換淺色 / 深色主題
- 針對行動裝置瀏覽改善 MathJax 樣式
- 自動產生上一篇 / 下一篇連結(無需手動設定)
- 整合 [markdown-it-footnote](https://github.com/markdown-it/markdown-it-footnote) 腳註支援

## 先決條件
- [Node.js](https://nodejs.org) 版本最低需求為 18.0.0

## 如何使用
- 複製或下載本主題
- 根據個人需求編輯 [theme config](/.vitepress/theme/config.ts) 和 [public 資料夾](/public/)中的檔案
  - [VitePress Doc - Site Config](https://vitepress.dev/reference/site-config#site-config)
- 啟動終端機執行以下指令 :
```shell
# 安裝依賴套件
(p)npm install

# 在/posts目錄下建立新文章
(p)npm run new {new-post-filename}

# 啟動本機伺服器
(p)npm run dev

# 打包APP
(p)npm run build

# 預覽APP
(p)npm run preview
```

## 部署
我們的專案包含了GitHub workflow，你只需要確認[themeConfig.base](https://github.com/laplacetw/vitepress-theme-trigger/blob/main/.vitepress/theme/config.ts)設定正確，在推送到GitHub之後將會觸發GitHub pages的自動部署流程。

- [Deploy Your VitePress Site](https://vitepress.dev/guide/deploy)
- AWS Amplify
```yml
# amplify.yml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - nvm use 18
        - npm install -g pnpm
        - pnpm install --no-frozen-lockfile
    build:
      commands:
        - pnpm run build
  artifacts:
    baseDirectory: ./.vitepress/dist
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

## 參考
- [vuejs/blog](https://github.com/vuejs/blog)
- [airene/vitepress-blog-pure](https://github.com/airene/vitepress-blog-pure)
- [clark-cui/vitepress-blog-zaun](https://github.com/clark-cui/vitepress-blog-zaun)
