<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useBoardStore } from '../stores/board'
import type { ColumnId } from '../domain/board'
import CardItem from './CardItem.vue'
import CardCreateForm from './CardCreateForm.vue'

const props = defineProps<{ columnId: ColumnId }>()

const store = useBoardStore()
const { snapshot } = storeToRefs(store)

const column = computed(() => snapshot.value.columns.find((c) => c.id === props.columnId))
const cards = computed(() => snapshot.value.cards.filter((c) => c.columnId === props.columnId))

const titleEdit = ref('')
watch(
  () => column.value?.title,
  (t) => {
    if (t !== undefined) titleEdit.value = t
  },
  { immediate: true },
)

function commitTitle() {
  if (!column.value) return
  try {
    store.renameColumn(props.columnId, titleEdit.value)
  } catch {
    titleEdit.value = column.value.title
  }
}

function onRemoveColumn() {
  if (!window.confirm('この列を削除しますか？（カードは隣の列へ移動します）')) return
  try {
    store.removeColumn(props.columnId)
  } catch (e) {
    window.alert(e instanceof Error ? e.message : '削除できません')
  }
}
</script>

<template>
  <section v-if="column" class="column">
    <header class="column__head">
      <input
        v-model="titleEdit"
        class="column__title"
        :data-testid="'column-title-input-' + columnId"
        @change="commitTitle"
      />
      <button
        type="button"
        class="column__remove"
        :data-testid="'column-remove-button-' + columnId"
        @click="onRemoveColumn"
      >
        削除
      </button>
    </header>
    <ul class="column__cards">
      <li v-for="card in cards" :key="card.id">
        <CardItem :card-id="card.id" />
      </li>
    </ul>
    <CardCreateForm :column-id="columnId" />
  </section>
</template>

<style scoped>
.column {
  width: 280px;
  background: #e4e4e7;
  border-radius: 8px;
  padding: 0.5rem 0.75rem 0.75rem;
}
.column__head {
  display: flex;
  gap: 0.35rem;
  align-items: center;
  margin-bottom: 0.5rem;
}
.column__title {
  flex: 1;
  min-width: 0;
  padding: 0.25rem 0.35rem;
  border: 1px solid #d4d4d8;
  border-radius: 4px;
}
.column__remove {
  font-size: 0.75rem;
  padding: 0.2rem 0.4rem;
  border: none;
  background: transparent;
  color: #71717a;
}
.column__cards {
  list-style: none;
  margin: 0 0 0.5rem;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}
</style>
