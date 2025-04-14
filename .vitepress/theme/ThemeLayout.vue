<script setup lang="ts">
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import themeConfig from './config'
import Home from './components/Home.vue'
import PostHeader from './components/PostHeader.vue'
import PostFooter from './components/PostFooter.vue'
import Comments from './components/Comments.vue'
import SummaryAI from './components/SummaryAI.vue'

const { page } = useData()
const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #home-hero-after>
      <Home />
    </template>
    <template #doc-before>
      <PostHeader />
      <SummaryAI v-show='themeConfig.cloudflareApi'/>
    </template>
    <template #doc-after>
      <PostFooter />
      <Comments :key='page.relativePath'/>
    </template>
  </Layout>
</template>