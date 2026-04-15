<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useBoardStore } from '../stores/board'
import ColumnView from './ColumnView.vue'

const store = useBoardStore()
const { snapshot } = storeToRefs(store)
const columnsSorted = computed(() => [...snapshot.value.columns].sort((a, b) => a.order - b.order))
</script>

<template>
  <div class="board">
    <header class="board__header">
      <h1 class="board__title">TaskBoard Mini</h1>
      <button
        type="button"
        class="board__add-col"
        data-testid="board-add-column-button"
        @click="store.addColumn()"
      >
        列を追加
      </button>
    </header>
    <div class="board__columns">
      <ColumnView v-for="col in columnsSorted" :key="col.id" :column-id="col.id" />
    </div>
  </div>
</template>

<style scoped>
.board {
  min-height: 100vh;
  padding: 1rem 1.5rem 2rem;
}
.board__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
}
.board__title {
  margin: 0;
  font-size: 1.25rem;
}
.board__add-col {
  padding: 0.35rem 0.75rem;
  border: 1px solid #d4d4d8;
  border-radius: 6px;
  background: #fff;
}
.board__columns {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: flex-start;
}
</style>
