![](https://img.shields.io/github/license/laplacetw/vitepress-theme-trigger)
![Node.js >= 18.0.0](https://img.shields.io/badge/Node.js-%3E%3D18.0.0-green)
![VitePress 1.0.0.rc40](https://img.shields.io/badge/VitePress-1.0.0_rc.40-green)

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
- create new post with CLI
- style with Tailwind CSS (RWD)
- style for light / dark mode
- pagination with History API
- [built-in sitemap generation](https://vitepress.dev/guide/sitemap-generation#sitemap-generation)
- common use config integration
- [utterances](https://utteranc.es) for blog comments
- sync light / dark mode for utterances
- MathJax style optimization for mobile
- prev / next links without fontmatter setting
- support footnote by [markdown-it-footnote](https://github.com/markdown-it/markdown-it-footnote)

## Prerequisite
- [Node.js](https://nodejs.org) version 18 or higher.

## Usage
- Clone the project.
- Edit [theme config](/.vitepress/theme/config.ts) and [public files](/public/) for custom.
  - [VitePress Doc - Site Config](https://vitepress.dev/reference/site-config#site-config)
- Start terminal and execute commands as follows :
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
