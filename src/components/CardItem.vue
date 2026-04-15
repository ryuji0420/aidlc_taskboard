<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useBoardStore } from '../stores/board'
import type { CardId } from '../domain/board'

const props = defineProps<{ cardId: CardId }>()

const store = useBoardStore()
const { snapshot } = storeToRefs(store)

const card = computed(() => snapshot.value.cards.find((c) => c.id === props.cardId))
const titleEdit = ref('')
watch(
  () => card.value?.title,
  (t) => {
    if (t !== undefined) titleEdit.value = t
  },
  { immediate: true },
)

function commitTitle() {
  if (!card.value) return
  try {
    store.updateCard(props.cardId, { title: titleEdit.value })
  } catch {
    titleEdit.value = card.value.title
  }
}

function onDelete() {
  if (!window.confirm('このカードを削除しますか？')) return
  store.deleteCard(props.cardId)
}
</script>

<template>
  <article v-if="card" class="card">
    <input
      v-model="titleEdit"
      class="card__title"
      :data-testid="'card-title-input-' + cardId"
      @change="commitTitle"
    />
    <button
      type="button"
      class="card__delete"
      :data-testid="'card-delete-button-' + cardId"
      @click="onDelete"
    >
      削除
    </button>
  </article>
</template>

<style scoped>
.card {
  display: flex;
  gap: 0.35rem;
  align-items: center;
  background: #fff;
  border-radius: 6px;
  padding: 0.35rem 0.5rem;
  border: 1px solid #d4d4d8;
}
.card__title {
  flex: 1;
  min-width: 0;
  border: none;
  font: inherit;
}
.card__delete {
  font-size: 0.7rem;
  border: none;
  background: transparent;
  color: #a1a1aa;
}
</style>
