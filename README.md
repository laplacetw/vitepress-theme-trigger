![](https://img.shields.io/github/license/laplacetw/vitepress-theme-trigger)
![Node.js >= 18.0.0](https://img.shields.io/badge/Node.js-%3E%3D18.0.0-green)
![VitePress 1.6.3](https://img.shields.io/badge/VitePress-1.6.3-green)

# vitepress-theme-trigger
Blog theme for [VitePress](https://vitepress.dev) with [Tailwind CSS](https://tailwindcss.com).
- [中文 README](./README_CH.md)

![](/public/preview.png)
## Introduction
"Trigger" is a out-of-the-box VitePress theme, named after my favorite Anime "[World Trigger](https://en.wikipedia.org/wiki/World_Trigger)". You can use it directly or customize it to better suit your needs.

More info about customization :
- [VitePress Doc - Using Vue in Markdown](https://vitepress.dev/guide/using-vue)
- [VitePress Doc - Extending the Default Theme](https://vitepress.dev/guide/extending-default-theme)
- [VitePress Doc - Build-Time Data Loading](https://vitepress.dev/guide/data-loading)

If there has any problem please feel free to create issue.

## Changelog
Detailed changes are documented in the [CHANGELOG](./CHANGELOG.md).

## Features
- 🖋️ **Generate new posts via CLI** – Scaffold articles instantly with a single command
- 🤖 **AI-powered summary** – Real-time article overview powered by AI
- 📈 **SEO-ready with JSON-LD** – Auto-injected schema data on every post page
- 🎨 **Style with Tailwind CSS** – Responsive design that looks great in both light/dark mode
- 📚 **Pagination powered by History API** – Smooth navigation between post lists
- 🗺️ [**Automatic sitemap generation**](https://vitepress.dev/guide/sitemap-generation#sitemap-generation) – Boost your site's visibility in search engines
- 🧩 **Modular config integration** – Centralized control for site and theme settings
- 💬 [**Utterances for comments**](https://utteranc.es) – GitHub-powered commenting system
- 🔄 **Theme-aware Utterances** – Auto-sync comment box with light/dark mode
- 📐 [**Optimized MathJax rendering**](https://github.com/vuejs/vitepress/issues/3914#issuecomment-2138527325) – Clean, responsive math formulas on mobile
- ⏭️ **Prev/Next post links** – Auto-generated without extra frontmatter
- 🦶 **Footnote support** – Powered by [markdown-it-footnote](https://github.com/markdown-it/markdown-it-footnote) for scholarly notes

## Prerequisite
- [Node.js](https://nodejs.org) version 18 or higher.

## Usage
- Clone the project.
- Edit [theme config](/.vitepress/theme/config.ts) and [public files](/public/) for custom.
- To enable the AI-powered realtime summary, you need to sign up for [Cloudflare](https://www.cloudflare.com), create your own AI Worker (free) and AI Gateway (traffic control), and configure the Worker API in the theme config.
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
      const prompt = `You are a professional summarization assistant. Based on the content I provide, generate a summary no longer than 60 characters, and return only the summary—no additional text: ${message}`;
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
- Launch terminal and execute commands as follows :
```shell
# install devDependencies
(p)npm install

# create new post under /posts
(p)npm run new {new-post-filename}

# start local dev server
(p)npm run dev

# build for production
(p)npm run build

# Locally preview the production build
(p)npm run preview
```

## Deploy
Our project includes the GitHub workflow. You just need to ensure that the [themeConfig.base](https://github.com/laplacetw/vitepress-theme-trigger/blob/main/.vitepress/theme/config.ts) is properly configured and GitHub pages auto-deployment will be triggered after push to GitHub.

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

## Reference
- [vuejs/blog](https://github.com/vuejs/blog)
- [airene/vitepress-blog-pure](https://github.com/airene/vitepress-blog-pure)
- [clark-cui/vitepress-blog-zaun](https://github.com/clark-cui/vitepress-blog-zaun)
