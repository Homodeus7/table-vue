export interface Data {
  titlesTableVeiw: { name: string; value: string }[]
  rows: {
    name: string
    price: string
    quantity: string
    sum: string
  }[]
  columns: { name: string; label: string; width: number }[]
}
