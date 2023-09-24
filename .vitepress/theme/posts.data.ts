import { createContentLoader } from 'vitepress'

interface Post {
  title: string
  url: string
  date: {
    time: number
    string: string
  }
  category: string
  tags: string[]
  excerpt: string | undefined
}

declare const data: Post[]
export { Post, data }

export default createContentLoader('posts/*.md', {
  excerpt: true,
  transform(raw): Post[] {
    return raw
      .map(({ url, frontmatter, excerpt }) => ({
        title: frontmatter.title,
        url,
        excerpt,
        category: frontmatter.category,
        tags: frontmatter.tags,
        date: formatDate(frontmatter.date)
      }))
      .sort((a, b) => b.date.time - a.date.time)
  }
})

function formatDate(raw: string): Post['date'] {
  const date = new Date(raw)
  return {
    time: +date,
    string: date.toISOString().slice(0, 10)
  }
}
