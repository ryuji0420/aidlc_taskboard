import { defineStore } from 'pinia'
import { ref } from 'vue'
import * as Board from '../domain/board'
import type { BoardSnapshot, CardId, ColumnId } from '../domain/board'
import { LocalStorageBoardRepository } from '../services/repository'

function debounce(fn: () => void, ms: number): () => void {
  let t: ReturnType<typeof setTimeout> | null = null
  return () => {
    if (t) clearTimeout(t)
    t = setTimeout(() => {
      fn()
      t = null
    }, ms)
  }
}

export const useBoardStore = defineStore('board', () => {
  const snapshot = ref<BoardSnapshot>(Board.createDefaultSnapshot())
  const repo = new LocalStorageBoardRepository()
  const saveDebounced = debounce(() => repo.save(snapshot.value), 300)

  function touch() {
    saveDebounced()
  }

  function loadFromStorage() {
    const s = repo.load()
    snapshot.value = s ?? Board.createDefaultSnapshot()
  }

  function addColumn(title?: string) {
    snapshot.value = Board.addColumn(snapshot.value, title)
    touch()
  }

  function renameColumn(columnId: ColumnId, title: string) {
    snapshot.value = Board.renameColumn(snapshot.value, columnId, title)
    touch()
  }

  function removeColumn(columnId: ColumnId) {
    snapshot.value = Board.removeColumn(snapshot.value, columnId)
    touch()
  }

  function addCard(columnId: ColumnId, title: string, body: string | null = null) {
    snapshot.value = Board.addCard(snapshot.value, columnId, title, body)
    touch()
  }

  function updateCard(cardId: CardId, patch: { title?: string; body?: string | null }) {
    snapshot.value = Board.updateCard(snapshot.value, cardId, patch)
    touch()
  }

  function deleteCard(cardId: CardId) {
    snapshot.value = Board.deleteCard(snapshot.value, cardId)
    touch()
  }

  return {
    snapshot,
    loadFromStorage,
    addColumn,
    renameColumn,
    removeColumn,
    addCard,
    updateCard,
    deleteCard,
  }
})
