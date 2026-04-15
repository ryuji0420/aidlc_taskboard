import fc from 'fast-check'
import { describe, expect, it } from 'vitest'
import {
  addCard,
  createDefaultSnapshot,
  deleteCard,
  parse,
  removeColumn,
  renameColumn,
  serialize,
  type BoardSnapshot,
} from './board'

function arbBoardSnapshot(): fc.Arbitrary<BoardSnapshot> {
  return fc.integer({ min: 2, max: 5 }).chain((n) =>
    fc.uniqueArray(fc.uuid(), { minLength: n, maxLength: n }).chain((colIds) => {
      const columns = colIds.map((id, i) => ({
        id,
        title: `C${i}`,
        order: i,
      }))
      return fc.uniqueArray(fc.uuid(), { minLength: 0, maxLength: 12 }).chain((cardIds) =>
        fc
          .array(fc.integer({ min: 0, max: n - 1 }), {
            minLength: cardIds.length,
            maxLength: cardIds.length,
          })
          .map((colIdxs) => {
            const cards = cardIds.map((cardId, j) => ({
              id: cardId,
              columnId: columns[colIdxs[j]].id,
              title: 'T',
              body: null as string | null,
            }))
            const snapshot: BoardSnapshot = { schemaVersion: '1', columns, cards }
            return snapshot
          }),
      )
    }),
  )
}

describe('board domain', () => {
  it('round-trips default snapshot', () => {
    const s = createDefaultSnapshot()
    expect(parse(serialize(s))).toEqual(s)
  })

  it('property: parse(serialize(s)) deep-equals s for valid snapshots', () => {
    fc.assert(
      fc.property(arbBoardSnapshot(), (s) => {
        expect(parse(serialize(s))).toEqual(s)
      }),
      { numRuns: 80 },
    )
  })

  it('cannot remove column when only two exist', () => {
    const s = createDefaultSnapshot()
    const id = s.columns[0].id
    expect(() => removeColumn(s, id)).toThrow()
  })

  it('addCard then deleteCard restores length', () => {
    const s = createDefaultSnapshot()
    const col = s.columns[0].id
    const added = addCard(s, col, 'Hello')
    const last = added.cards[added.cards.length - 1]
    const removed = deleteCard(added, last.id)
    expect(removed.cards.length).toBe(s.cards.length)
  })

  it('renameColumn preserves id and changes title', () => {
    const s = createDefaultSnapshot()
    const id = s.columns[0].id
    const next = renameColumn(s, id, 'Backlog')
    expect(next.columns.find((c) => c.id === id)?.title).toBe('Backlog')
  })
})
