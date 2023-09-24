<script setup lang='ts'>
const props = defineProps<{
  text: string
}>()
</script>

<template>
  <div class='pb-6 text-4xl font-extrabold'>
    <span class='theme-title'>
      {{ props.text }}
    </span>
  </div>
</template>