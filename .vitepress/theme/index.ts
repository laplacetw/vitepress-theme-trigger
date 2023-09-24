// https://vitepress.dev/guide/custom-theme
import Theme from 'vitepress/theme'
import ThemeLayout from './ThemeLayout.vue'
import PostInfo from './components/PostInfo.vue'
import Title from './components/Title.vue'
import Archives from './components/Archives.vue'
import Category from './components/Category.vue'
import Tags from './components/Tags.vue'
import About from './components/About.vue'
import './style.css'

export default {
  extends: Theme,
  Layout: ThemeLayout,
  enhanceApp({ app, router, siteData }) {
    // registering global components
    app.component('PostInfo', PostInfo)
    app.component('Title', Title)
    app.component('Archives', Archives)
    app.component('Category', Category)
    app.component('Tags', Tags)
    app.component('About', About)
  }
}
