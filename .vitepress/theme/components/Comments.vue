<script setup lang='ts'>
import { onMounted, ref, watch } from 'vue'
import { useData } from 'vitepress'
import themeConfig from '../config'

const { isDark } = useData()
const comments = ref()
const { appearance } = themeConfig
const { repo, issueTerm, light, dark } = themeConfig.utterances

function themeSwitcher() {
  const iframe:HTMLIFrameElement = document.querySelector('.utterances-frame')!
  const theme = isDark.value ? dark : light
  const message = {
    type: 'set-theme',
    theme: theme
  }
  iframe?.contentWindow?.postMessage(message, 'https://utteranc.es')
}

onMounted(() => {
  if (repo) {
    const utterances = document.createElement('script')
    utterances.async = true
    utterances.setAttribute('src', 'https://utteranc.es/client.js')
    utterances.setAttribute('repo', repo)
    utterances.setAttribute('issue-term', issueTerm)
    utterances.setAttribute('theme', appearance ? dark : light)
    utterances.setAttribute('crossorigin', 'anonymous')
    comments.value.appendChild(utterances)
  }
  
  watch(isDark, (newVal, oldVal) => {
    if (newVal !== oldVal) themeSwitcher()
  })
})
</script>

<template>
  <div ref="comments"></div>
</template>