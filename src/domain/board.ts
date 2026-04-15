export type ColumnId = string
export type CardId = string

export interface Column {
  id: ColumnId
  title: string
  order: number
}

export interface Card {
  id: CardId
  columnId: ColumnId
  title: string
  body: string | null
}

export interface BoardSnapshot {
  schemaVersion: string
  columns: Column[]
  cards: Card[]
}

export function newId(): string {
  return crypto.randomUUID()
}

export function createDefaultSnapshot(): BoardSnapshot {
  const c1: Column = { id: newId(), title: 'To Do', order: 0 }
  const c2: Column = { id: newId(), title: 'Doing', order: 1 }
  return { schemaVersion: '1', columns: normalizeColumnOrders([c1, c2]), cards: [] }
}

function sortColumns(cols: Column[]): Column[] {
  return [...cols].sort((a, b) => a.order - b.order)
}

export function normalizeColumnOrders(columns: Column[]): Column[] {
  const sorted = sortColumns(columns)
  return sorted.map((c, i) => ({ ...c, order: i }))
}

function columnIds(snapshot: BoardSnapshot): Set<string> {
  return new Set(snapshot.columns.map((c) => c.id))
}

export function validateSnapshot(s: BoardSnapshot): void {
  if (s.schemaVersion !== '1') {
    throw new Error(`Unsupported schemaVersion: ${s.schemaVersion}`)
  }
  if (s.columns.length < 2) {
    throw new Error('Board must have at least 2 columns')
  }
  const sorted = sortColumns(s.columns)
  for (let i = 0; i < sorted.length; i++) {
    if (sorted[i].order !== i) {
      throw new Error('Column orders must be a 0..n-1 permutation')
    }
  }
  const ids = new Set<string>()
  for (const c of s.columns) {
    if (ids.has(c.id)) throw new Error('Duplicate column id')
    ids.add(c.id)
    const t = c.title.trim()
    if (t.length < 1 || t.length > 120) {
      throw new Error('Invalid column title length')
    }
  }
  const cardIds = new Set<string>()
  for (const card of s.cards) {
    if (cardIds.has(card.id)) throw new Error('Duplicate card id')
    cardIds.add(card.id)
    if (!ids.has(card.columnId)) throw new Error('Card references unknown column')
    const t = card.title.trim()
    if (t.length < 1 || t.length > 500) {
      throw new Error('Invalid card title length')
    }
  }
}

export function serialize(snapshot: BoardSnapshot): string {
  validateSnapshot(snapshot)
  return JSON.stringify(snapshot)
}

export function parse(raw: string): BoardSnapshot {
  let data: unknown
  try {
    data = JSON.parse(raw)
  } catch {
    throw new Error('Invalid JSON')
  }
  if (typeof data !== 'object' || data === null) {
    throw new Error('Invalid snapshot shape')
  }
  const o = data as Record<string, unknown>
  if (o.schemaVersion !== '1') {
    throw new Error('Unsupported or missing schemaVersion')
  }
  const columns = o.columns as Column[]
  const cards = o.cards as Card[]
  const snapshot: BoardSnapshot = {
    schemaVersion: '1',
    columns: normalizeColumnOrders(columns),
    cards: [...cards],
  }
  validateSnapshot(snapshot)
  return snapshot
}

export function addColumn(snapshot: BoardSnapshot, title = 'New column'): BoardSnapshot {
  validateSnapshot(snapshot)
  const sorted = sortColumns(snapshot.columns)
  const nextOrder = sorted.length === 0 ? 0 : sorted[sorted.length - 1].order + 1
  const col: Column = { id: newId(), title: title.trim() || 'New column', order: nextOrder }
  const columns = normalizeColumnOrders([...snapshot.columns, col])
  return { ...snapshot, columns }
}

export function renameColumn(snapshot: BoardSnapshot, columnId: ColumnId, title: string): BoardSnapshot {
  validateSnapshot(snapshot)
  const t = title.trim()
  if (t.length < 1) {
    throw new Error('Column title cannot be empty')
  }
  const columns = snapshot.columns.map((c) => (c.id === columnId ? { ...c, title: t } : c))
  const next: BoardSnapshot = { ...snapshot, columns }
  validateSnapshot(next)
  return next
}

export function removeColumn(snapshot: BoardSnapshot, columnId: ColumnId): BoardSnapshot {
  validateSnapshot(snapshot)
  if (snapshot.columns.length <= 2) {
    throw new Error('Cannot delete column: at least 2 columns required')
  }
  const sorted = sortColumns(snapshot.columns)
  const idx = sorted.findIndex((c) => c.id === columnId)
  if (idx === -1) {
    throw new Error('Column not found')
  }
  const targetIdx = idx > 0 ? idx - 1 : idx + 1
  const targetColumnId = sorted[targetIdx].id
  const cards = snapshot.cards.map((card) =>
    card.columnId === columnId ? { ...card, columnId: targetColumnId } : card,
  )
  const columns = normalizeColumnOrders(snapshot.columns.filter((c) => c.id !== columnId))
  const next: BoardSnapshot = { ...snapshot, columns, cards }
  validateSnapshot(next)
  return next
}

export function addCard(
  snapshot: BoardSnapshot,
  columnId: ColumnId,
  title: string,
  body: string | null = null,
): BoardSnapshot {
  validateSnapshot(snapshot)
  if (!columnIds(snapshot).has(columnId)) {
    throw new Error('Unknown column')
  }
  const t = title.trim()
  if (t.length < 1) {
    throw new Error('Card title cannot be empty')
  }
  const card: Card = { id: newId(), columnId, title: t, body }
  return { ...snapshot, cards: [...snapshot.cards, card] }
}

export function updateCard(
  snapshot: BoardSnapshot,
  cardId: CardId,
  patch: { title?: string; body?: string | null },
): BoardSnapshot {
  validateSnapshot(snapshot)
  const ix = snapshot.cards.findIndex((c) => c.id === cardId)
  if (ix === -1) {
    throw new Error('Card not found')
  }
  const c = snapshot.cards[ix]
  const title = patch.title !== undefined ? patch.title.trim() : c.title
  if (title.length < 1) {
    throw new Error('Card title cannot be empty')
  }
  const body = patch.body !== undefined ? patch.body : c.body
  const cards = snapshot.cards.map((x) => (x.id === cardId ? { ...x, title, body } : x))
  const next: BoardSnapshot = { ...snapshot, cards }
  validateSnapshot(next)
  return next
}

export function deleteCard(snapshot: BoardSnapshot, cardId: CardId): BoardSnapshot {
  validateSnapshot(snapshot)
  const cards = snapshot.cards.filter((c) => c.id !== cardId)
  if (cards.length === snapshot.cards.length) {
    throw new Error('Card not found')
  }
  return { ...snapshot, cards }
}
