![](https://img.shields.io/github/license/laplacetw/vitepress-theme-trigger)
# vitepress-theme-trigger
Blog theme for [VitePress](https://vitepress.dev) with [Tailwind CSS](https://tailwindcss.com).

![](/public/preview.png)
## Introduction
"Trigger" is a simple VitePress theme, named after my favorite Anime "[World Trigger](https://en.wikipedia.org/wiki/World_Trigger)". It's suitable for anyone looking to create a personal blog using VitePress. You can use it directly or customize it to better suit your needs. Anyway, I hope "Trigger" can trigger you to start your own blog.

More info about customization :
- [VitePress Doc - Using Vue in Markdown](https://vitepress.dev/guide/using-vue)
- [VitePress Doc - Extending the Default Theme](https://vitepress.dev/guide/extending-default-theme)
- [VitePress Doc - Build-Time Data Loading](https://vitepress.dev/guide/data-loading)

If there has any problem please feel free to create issue.

## Features
- style with Tailwind CSS (RWD)
- style for light / dark mode
- pagination with History API
- common use config integration
- [utterances](https://utteranc.es) for blog comments
- sync light / dark mode for utterances
- MathJax style optimization for mobile
- prev / next links without fontmatter setting

## Prerequisite
- [Node.js](https://nodejs.org) version 18 or higher.

## Usage
- Clone the project.
- Edit [theme config](/.vitepress/theme/config.ts) and [public files](/public/) for personal use.
  - [VitePress Doc - Site Config](https://vitepress.dev/reference/site-config#site-config)
- Start terminal and execute commands as follows :
```shell
# install devDependencies
(p)npm install

# start local dev server
(p)npm run dev

# build for production
(p)npm run build

# Locally preview the production build
(p)npm run preview
```

## Deploy
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