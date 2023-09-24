<script setup lang='ts'>
import { useData } from 'vitepress'

const { frontmatter } = useData()
</script>

<template>
  <div class='grid'>
    <span class='mb-2 justify-self-center  font-bold text-xl sm:text-2xl 
      text-cyan-700 dark:text-cyan-100'>
      {{ frontmatter.title }}
    </span>
    <PostInfo class='justify-self-center' :date='frontmatter.date.slice(0, 10)' 
      :category='frontmatter.category' />
  </div>
</template>