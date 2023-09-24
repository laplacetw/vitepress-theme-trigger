import { reactive } from 'vue'

const blogStore = reactive({
  pageBarIdx: 1,
  currentPage: 1,
  selectedCat: '',
  selectedTag: '',
})

export default blogStore