<script setup lang='ts'>
import blogStore from '../store'
import themeConfig from '../config'

const root = themeConfig.base ? themeConfig.base.slice(0, -1) : '';
const props = defineProps<{
  date: string,
  category: string,
}>();

function selectCat() {
  blogStore.selectedCat = props.category;
}
</script>

<template>
  <dl class='pb-2'>
    <dt class='text-base leading-6 font-medium text-gray-500 dark:text-gray-300'>
        <span class='theme-date'>📆{{ date }}</span>
        | 📂<a class='hover:underline' :href="`${root}/category#catName`"
          @click='selectCat'>{{ category }}</a>
    </dt>
  </dl>
</template>