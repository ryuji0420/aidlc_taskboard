import { parse, serialize, type BoardSnapshot } from '../domain/board'

export const STORAGE_KEY = 'taskboard:v1'

export class LocalStorageBoardRepository {
  load(): BoardSnapshot | null {
    if (typeof localStorage === 'undefined') {
      return null
    }
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return null
    }
    try {
      return parse(raw)
    } catch {
      return null
    }
  }

  save(snapshot: BoardSnapshot): void {
    if (typeof localStorage === 'undefined') {
      return
    }
    localStorage.setItem(STORAGE_KEY, serialize(snapshot))
  }
}
