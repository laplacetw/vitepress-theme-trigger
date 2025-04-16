![](https://img.shields.io/github/license/laplacetw/vitepress-theme-trigger)
![Node.js >= 18.0.0](https://img.shields.io/badge/Node.js-%3E%3D18.0.0-green)
![VitePress 1.6.3](https://img.shields.io/badge/VitePress-1.6.3-green)

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
- 🖋️ 使用 CLI 快速建立新文章 – 一行指令即可生成文章模板  
- 🤖 AI 即時摘要 – 即時生成文章重點摘要，讓讀者快速掌握內容
- 📈 SEO 強化（支援 JSON-LD）– 自動在每篇文章注入結構化資料  
- 🎨 採用 Tailwind CSS 設計 – 響應式頁面，支援明暗主題切換 
- 📚 分頁功能（使用 History API）– 流暢切換文章列表，無需重新載入  
- 🗺️ [自動生成 Sitemap](https://vitepress.dev/guide/sitemap-generation#sitemap-generation) – 提升部落格在搜尋引擎中的能見度
- 🧩 模組化設定整合 – 將框架與主題設定集中管理，易於維護與擴充
- 💬 [Utterances 留言系統](https://utteranc.es) – 基於 GitHub Issues 的輕量化留言功能
- 🔄 留言區主題同步 – Utterances 會自動配合網站明暗模式切換
- 📐 [針對行動裝置瀏覽改善 MathJax 樣式]((https://github.com/vuejs/vitepress/issues/3914#issuecomment-2138527325)) – 易讀的數學公式呈現
- ⏭️ 上/下一篇自動連結 – 無需額外設定 frontmatter
- 🦶 支援腳註 – 使用 [markdown-it-footnote](https://github.com/markdown-it/markdown-it-footnote) 呈現專業註解說明  

## 先決條件
- [Node.js](https://nodejs.org) 版本最低需求為 18.0.0

## 如何使用
- 複製或下載本主題
- 根據個人需求編輯 [theme config](/.vitepress/theme/config.ts) 和 [public 資料夾](/public/)中的檔案
- 若要啟用AI即時摘要，必須註冊[Cloudflare](https://www.cloudflare.com)並建立你的AI Worker (提供免費額度)和AI Gateway (流量管理)，再將Worker API填入主題設定
```
# worker.js
const corsHeaders = {
  'Access-Control-Allow-Origin': 'YOUR_HOST',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json'
};

const sendErrorResponse = (message, status = 500) => {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: corsHeaders
  });
};

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    if (request.method !== 'POST') {
      return sendErrorResponse('Only POST requests are allowed', 405);
    }

    try {
      const { message } = await request.json();
      if (!message) {
        return sendErrorResponse('Missing message in request body', 400);
      }
      const model = '@cf/meta/llama-3.1-8b-instruct';
      const userID = 'YOUR_USER_ID';
      const gatewayID = 'YOUR_AI_GATEWAY_NAME'
      const gateway = `https://gateway.ai.cloudflare.com/v1/${userID}/{gatewayID}/workers-ai/${model}`;
      const prompt = `你是一個專業的摘要助手，請根據我提供的內容，生成不超過60字的繁體中文摘要，並且只回傳摘要，不得包含其他內容: ${message}`;
      const apiResponse = await fetch(
        gateway,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${env.key}`
          },
          body: JSON.stringify({'prompt': prompt})
        }
      );

      if (!apiResponse.ok) {
        throw new Error(`Cloudflare Workers AI error: ${apiResponse.statusText}`);
      }

      const response = await apiResponse.json();
      return new Response(JSON.stringify({ response }), { headers: corsHeaders });
    } catch (error) {
      return sendErrorResponse(error.message);
    }
  }
};
```
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
