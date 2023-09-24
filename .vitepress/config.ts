import { defineConfig } from 'vitepress'
import themeConfig from './theme/config'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  head: [
    ['link', { rel: 'icon', href: themeConfig.favicon }],
  ],
  lang: themeConfig.lang,
  title: themeConfig.title,
  description: themeConfig.description,
  lastUpdated: themeConfig.lastUpdated,
  cacheDir: themeConfig.cacheDir,
  appearance: themeConfig.appearance,
  cleanUrls: themeConfig.cleanUrls,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: themeConfig.nav,
    logo: themeConfig.logo,
    socialLinks: themeConfig.socialLinks,
    search: { provider: 'local' },
    footer: themeConfig.footer
  },
  srcExclude: ['README.md'],
  //https://vitepress.dev/guide/markdown#advanced-configuration
  markdown: {
    math: themeConfig.mdMath,
    lineNumbers: themeConfig.mdLineNums,
  },
  sitemap: {
    hostname: themeConfig.hostname
  }
})
