<script setup lang='ts'>
import blogStore from '../store'
import { initTags } from '../utils'
import { data as posts } from '../posts.data'

const tags = initTags(posts)

function tagSwitcher(tag: string) {
  blogStore.selectedTag = tag
}
</script>

<template>
  <div class='theme-container'>
    <Title text='Tags'/>
    <div class='flex flex-wrap'>
      <a v-for='(_, tag) in tags' class='px-2 my-1' href='#tagName' @click='tagSwitcher(`${tag}`)'>
        <span class='theme-badge'>{{ tag }}</span> 
      </a>
    </div>
    <hr class="h-px my-4 bg-gray-200 border-0 dark:bg-gray-500">
    <h3 id='tagName' class='pb-2' v-show='blogStore.selectedTag'>🔖 {{ blogStore.selectedTag }}</h3>
    <dl class='' v-show='blogStore.selectedTag'>
      <a v-for='post in tags[blogStore.selectedTag]' target='_blank' 
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