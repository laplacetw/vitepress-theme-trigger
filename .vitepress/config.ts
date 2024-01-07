import { defineConfig } from 'vitepress'
import themeConfig from './theme/config'
import mdFootnote from 'markdown-it-footnote'

const root = themeConfig.base ? themeConfig.base.slice(0, -1) : ''

// https://vitepress.dev/reference/site-config
export default defineConfig({
  head: [
    ['link', { rel: 'icon', href: root + themeConfig.favicon }],
  ],
  base: themeConfig.base,
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
    search: {
      provider: 'local',
      options: {
        detailedView: true,
        _render: (src, env, md) => {
          const html = md.render(src, env)
          if (env.frontmatter?.search === false) return ''
          return env.frontmatter?.title ? md.render('# ' + env.frontmatter?.title) + html : html
        },
      },
    },
    footer: themeConfig.footer
  },
  srcExclude: ['README.md', 'README_CH.md', 'CHANGELOG.md'],
  //https://vitepress.dev/guide/markdown#advanced-configuration
  markdown: {
    math: themeConfig.mdMath,
    lineNumbers: themeConfig.mdLineNums,
    config: (md) => {
      md.use(mdFootnote)
    },
  },
  sitemap: {
    hostname: themeConfig.hostname
  }
})
