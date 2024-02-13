import { defineStore } from 'pinia'
import type { Data } from '@/types'

interface addRow {
  addRow: () => void
  deleteRow: (i: number) => void
}

export const useData = defineStore<'data', Data, {}, addRow>('data', {
  state: () => ({
    titlesTableVeiw: [
      { name: 'Общее', value: 'common' },
      { name: 'Товары', value: 'gds' },
      { name: 'Доп. расходы', value: 'exps' }
    ],
    rows: [
      {
        ind: 0,
        name: 'Щебень 1',
        price: '100',
        quantity: '10',
        sum: '1000'
      },
      {
        ind: 1,
        name: 'Щебень 2',
        price: '200',
        quantity: '20',
        sum: '4000'
      },
      {
        ind: 2,
        name: 'Щебень 3',
        price: '300',
        quantity: '30',
        sum: '9000'
      }
    ],
    columns: [
      { name: 'delete', label: 'Удалить', width: 50 },
      { name: 'dropdown', label: 'Drop', width: 50 },
      { name: 'name', label: 'Наименование еденицы', width: 50 },
      { name: 'price', label: 'Цена', width: 50 },
      { name: 'quantity', label: 'Кол-во', width: 50 },
      { name: 'sum', label: 'Итого', width: 50 },
      { name: 'action', label: 'Действие', width: 50 },
      { name: 'status', label: 'Статус', width: 50 },
      { name: 'dateOfCreation', label: 'Дата создания', width: 50 },
      { name: 'dateOfChanged', label: 'Дата изменения', width: 50 },
      { name: 'compound', label: 'Состав', width: 50 },
      { name: 'adress', label: 'Адресс', width: 50 },
      { name: 'type', label: 'Тип', width: 50 },
      { name: 'volume', label: 'Объем', width: 50 }
    ]
  }),
  actions: {
    addRow() {
      this.rows.push({
        price: '0',
        quantity: '0',
        sum: '0'
      })
    },
    deleteRow(i: number) {
      this.rows.splice(i, 1)
    }
  }
})
