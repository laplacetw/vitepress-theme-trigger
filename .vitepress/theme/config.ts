// vitepress/types/default-theme.d.ts
type Appearance = boolean | 'dark' | undefined
type SocialLinkIcon =
  | 'discord'
  | 'facebook'
  | 'github'
  | 'instagram'
  | 'linkedin'
  | 'mastodon'
  | 'slack'
  | 'twitter'
  | 'youtube'
  | { svg: string }

interface SocialLink {
  icon: SocialLinkIcon
  link: string
  ariaLabel?: string
}

const themeConfig = {
  // https://vitepress.dev/reference/site-config
  lang: 'zh-TW',
  logo: '/avatar.png',
  favicon: '/favicon.png',
  title: 'Trigger !',
  description: 'A blog powered by VitePress',
  hostname: 'https://example.com',
  lastUpdated: true,
  cacheDir: './node_modules/vitepress_cache',
  appearance: <Appearance>'dark',
  cleanUrls: true,
  mdMath: true,
  mdLineNums: true,
  // https://vitepress.dev/reference/default-theme-config
  nav: [
    { text: '🏠 Home', link: '/' },
    { text: '📚 Archives', link: '/archives' },
    { text: '📁 Category', link: '/category' },
    { text: `🔖 Tags`, link: '/tags' },
    { text: '🙆 About', link: '/about' }
  ],
  aside: false,
  socialLinks: <SocialLink[]>[
    { icon: 'github', link: 'https://github.com/laplacetw' },
  ],
  footer: {
    message: `Powered by <a target='_blank' href='https://vitepress.dev'>VitePress</a> 
      Theme by <a target='_blank' href='https://github.com/laplacetw/vitepress-theme-trigger'>Trigger</a>`,
    copyright: `<a target='_blank' href='https://creativecommons.org/licenses/by/4.0/'>
      CC BY 4.0</a> | © Trigger ${new Date().getFullYear()}`
  },
  // custom theme config
  postsPerPage: 5,
  utterances: {
    repo: '',
    issueTerm: 'title',
    light: 'github-light',
    dark: 'gruvbox-dark'
  }
}

export default themeConfig