<script setup lang="ts">
import { onMounted } from 'vue'
import { useBoardStore } from './stores/board'
import BoardView from './components/BoardView.vue'

const store = useBoardStore()
onMounted(() => {
  store.loadFromStorage()
})
</script>

<template>
  <BoardView />
</template>
