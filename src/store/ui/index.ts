import { defineStore } from 'pinia'

interface UIStore {
  tableView: string
}

export const useUI = defineStore<'ui', UIStore>('ui', {
  state: () => {
    return {
      tableView: 'gds'
    }
  },
  actions: {}
})
