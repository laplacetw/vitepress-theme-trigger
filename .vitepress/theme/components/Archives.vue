<script setup lang='ts'>
import { initArchives } from '../utils'
import { data as posts } from '../posts.data'

const archives = initArchives(posts)
const years = Object.keys(archives).sort().reverse()
</script>

<template>
  <div class='theme-container'>
    <Title text='Archives'/>
    <h3 class='pb-2 text-xl font-extrabold'>Total : {{ posts.length }} posts</h3>
    <hr class="h-px my-4 bg-gray-200 border-0 dark:bg-gray-500">
    <dl v-for='year in years'>
      <h3 class='pb-2 text-xl font-extrabold'>{{ year }}</h3>
      <a v-for='post in archives[year]' target="_blank" 
        class='decoration-2 hover:underline' :href='post.url'>
        <dd class='flex justify-between my-3 text-base leading-6 font-medium 
          text-gray-500 dark:text-gray-300'>
          <div class='truncate w-64 sm:w-fit'>{{ post.title }}</div>
          <div>{{ post.date.string.slice(5, 10) }}</div>
        </dd>
      </a>
      <hr v-show='year !== years[years.length - 1]' 
        class="h-px my-4 bg-gray-200 border-0 dark:bg-gray-500">
    </dl>
  </div>
</template>