<script setup lang="ts">
import { ref } from 'vue'
import { useBoardStore } from '../stores/board'
import type { ColumnId } from '../domain/board'

defineProps<{ columnId: ColumnId }>()

const store = useBoardStore()
const title = ref('')

function submit(columnId: ColumnId) {
  const t = title.value.trim()
  if (!t) return
  try {
    store.addCard(columnId, t, null)
    title.value = ''
  } catch {
    /* noop */
  }
}
</script>

<template>
  <form class="create" @submit.prevent="submit(columnId)">
    <input
      v-model="title"
      class="create__input"
      type="text"
      placeholder="カードのタイトル"
      aria-label="新しいカードのタイトル"
      :data-testid="'card-create-title-input-' + columnId"
    />
    <button type="submit" class="create__btn" :data-testid="'card-create-submit-button-' + columnId">
      追加
    </button>
  </form>
</template>

<style scoped>
.create {
  display: flex;
  gap: 0.35rem;
}
.create__input {
  flex: 1;
  min-width: 0;
  padding: 0.35rem 0.5rem;
  border: 1px solid #d4d4d8;
  border-radius: 4px;
}
.create__btn {
  padding: 0.35rem 0.5rem;
  border-radius: 4px;
  border: 1px solid #d4d4d8;
  background: #fff;
}
</style>
