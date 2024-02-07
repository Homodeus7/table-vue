import { defineStore } from 'pinia'
import type { Data } from '@/types'

interface addRow {
  addRow: () => void
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
        name: 'Щебень 1',
        price: '100',
        quantity: '10',
        sum: '1000'
      },
      {
        name: 'Щебень 2',
        price: '200',
        quantity: '20',
        sum: '4000'
      },
      {
        name: 'Щебень 3',
        price: '300',
        quantity: '30',
        sum: '9000'
      }
    ],
    columns: [
      { name: 'name', label: 'Наименование еденицы', width: 0 },
      { name: 'price', label: 'Цена', width: 0 },
      { name: 'quantity', label: 'Кол-во', width: 0 },
      { name: 'sum', label: 'Итого', width: 0 },
      { name: 'action', label: 'Действие', width: 0 },
      { name: 'status', label: 'Статус', width: 0 },
      { name: 'dateOfCreation', label: 'Дата создания', width: 0 },
      { name: 'dateOfChanged', label: 'Дата изменения', width: 0 },
      { name: 'compound', label: 'Состав', width: 0 },
      { name: 'adress', label: 'Адресс', width: 0 },
      { name: 'type', label: 'Тип', width: 0 },
      { name: 'volume', label: 'Объем', width: 0 }
    ]
  }),
  actions: {
    addRow() {
      this.rows.push({})
    }
  }
})
