<script setup>
const props = defineProps({
  currentPage: Number,
  totalPages: Number
})

const emit = defineEmits(['updatePage'])

const getPagesRange = () => {
  const total = props.totalPages

  const start = Math.max(props.currentPage, 1)
  const end = Math.min(props.currentPage + 2, total - 1)

  const range = Array.from({ length: end - start + 1 }, (_, i) => start + i)

  if (props.currentPage + 2 < total) {
    range.push('...', total)
  }
  return range
}

const goToPage = (page) => {
  if (typeof page === 'number') {
    emit('updatePage', page)
  }
}

const goToFirstPage = () => emit('updatePage', 1)
const goToLastPage = () => emit('updatePage', props.totalPages)
const goToPreviousPage = () => emit('updatePage', props.currentPage - 1)
</script>

<template>
  <div class="pagination">
    <button class="text-black" @click="goToFirstPage" :disabled="currentPage === 1">«</button>
    <button
      class="text-black"
      @click="goToPreviousPage"
      :disabled="currentPage === 1"
      type="button"
    >
      ‹
    </button>
    <button
      v-for="page in getPagesRange()"
      :key="page"
      @click="goToPage(page)"
      :class="{ active: page === currentPage }"
    >
      {{ page }}
    </button>
    <button
      class="text-black"
      type="button"
      @click="goToLastPage"
      :disabled="currentPage === totalPages"
    >
      »
    </button>
  </div>
</template>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 28px;
  padding-bottom: 48px;
}

.pagination button {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid rgb(18, 20, 23, 0.1);
  border-radius: 8px;
  width: 32px;
  height: 32px;
  background-color: #fff;
  font-size: 13px;
  font-weight: 600;
  margin: 0 5px;
  padding: 7px 13px;
  cursor: pointer;
}

.pagination button.active {
  background-color: rgb(133, 170, 159);
  color: white;
  border-color: #85aa9f;
}

.pagination button:disabled {
  background-color: #f0f0f0;
  cursor: not-allowed;
}
</style>
