import { useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import type { RemovableRef } from '@vueuse/core'

interface UIStore {
  inputAmount: string
  buyInput: string
  sellInput: string
  stakeInput: string
  stakeTime: {
    months: number
    days: number
  }
  stakeData: number
  stateBet: RemovableRef<{
    ticker: string
    name: string
    pair: string
    deposit: string
    pricePrediction: string
    activeTags: string[]
  }>
  stakeLoading: boolean
  mmLoading: boolean
  nftBuyLoading: boolean
  tokenBuyLoading: boolean
  buySellToggle: boolean
  buySellMyOrders: boolean
  startTime: string
  isConnector: boolean
  buyRequests: number
}

export const defaultBet = {
  ticker: '',
  name: '',
  pair: '',
  deposit: '',
  pricePrediction: '',
  activeTags: []
}

export const useUI = defineStore<'ui', UIStore>('ui', {
  state: () => {
    return {
      inputAmount: '',
      buyInput: '0.000000',
      sellInput: '0.000000',
      stakeInput: '',
      stakeTime: {
        months: 3,
        days: 0
      },
      stakeData: 0,
      stateBet: useStorage('state-bet', defaultBet),
      stakeLoading: false,
      mmLoading: false,
      nftBuyLoading: false,
      tokenBuyLoading: false,
      buySellToggle: true,
      buySellMyOrders: true,
      startTime: '2024-01-15T00:00:00Z',
      isConnector: true,
      buyRequests: 0
    }
  },
  actions: {}
})
