<script setup lang='ts'>
import { ref } from 'vue'
import themeConfig from '../config'

const summary = ref('')
const loading = ref(false)

async function summarizer(input: object) {
  const response = await fetch(
    themeConfig.cloudflareApi,
    {
      headers: {'Content-Type':'application/json'},
      method: 'POST',
      body: JSON.stringify(input)
    }
  );
  const result = await response.json()
  return result
}

function htmlFilter(html: HTMLElement) {
  // clone for editing
  const tempElement = html.cloneNode(true) as HTMLElement;
  // remove class language-* elements
  const langElements = tempElement.querySelectorAll("[class^='language-']")
  langElements.forEach(el => el.parentNode?.removeChild(el))
  
  // remove class footnotes elements
  const footnotes = tempElement.querySelectorAll('.footnotes')
  footnotes.forEach(el => el.parentNode?.removeChild(el))

  // remove class footnote elements
  const footnote = tempElement.querySelectorAll('.footnote')
  footnote.forEach(el => el.parentNode?.removeChild(el))
  
  return tempElement.innerText
}

function run(){
  const articleElement = document.querySelector('.vp-doc') as HTMLElement;
  if (!articleElement) return
  
  loading.value = true
  const articleText = htmlFilter(articleElement)
  summarizer({message: articleText}).then((res) => {
    summary.value = '🤖 AI Summary : ' + res['response']['result']['response']
    loading.value = false
  })
}
</script>

<template>
  <div class='theme-summary'>
    <button v-if='!summary' @click='run' class='theme-summary-button' :disabled='loading'>
      <template v-if='loading'>
        <span class='inline-flex space-x-2 ml-1 h-4 items-end'>
          <span class='theme-summary-dot animate-bounce [animation-delay:-0.3s]'></span>
          <span class='theme-summary-dot animate-bounce [animation-delay:-0.15s]'></span>
          <span class='theme-summary-dot animate-bounce'></span>
        </span>
      </template>
      <template v-else>
        🤖 AI Summary
      </template>
    </button>
    <p v-else>{{ summary }}</p>
  </div>
</template>