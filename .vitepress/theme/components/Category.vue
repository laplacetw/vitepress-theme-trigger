<script setup lang='ts'>
import blogStore from '../store'
import { initCategory } from '../utils'
import { data as posts } from '../posts.data'

const category = initCategory(posts)

function catSwitcher(cat: string) {  // 🐈🕹️
  blogStore.selectedCat = cat
}
</script>

<template>
  <div class='theme-container'>
    <Title text='Category'/>
    <div class='flex flex-wrap'>
      <a v-for='(posts, cat) in category' class='px-2' href='#catName' @click='catSwitcher(`${cat}`)'>
        <span class='font-medium underline decoration-2 decoration-sky-500 cursor-pointer'>{{ cat }}</span> 
        <sup class='p-0.5'>{{ posts.length }}</sup>
      </a>
    </div>
    <hr class='h-px my-4 bg-gray-200 border-0 dark:bg-gray-500'>
    <h3 id='catName' class='pb-2' v-show='blogStore.selectedCat'>📁 {{ blogStore.selectedCat }}</h3>
    <dl v-show='blogStore.selectedCat'>
      <a v-for='post in category[blogStore.selectedCat]' target="_blank" 
        class='decoration-2 hover:underline' :href='post.url'>
        <dd class='flex justify-between my-3 text-base leading-6 font-medium 
          text-gray-500 dark:text-gray-300'>
          <div class='truncate w-64 sm:w-fit'>{{ post.title }}</div>
          <div>{{ post.date.string.slice(0, 7) }}</div>
        </dd>
      </a>
    </dl>
  </div>
</template>