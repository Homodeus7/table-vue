import { defineStore } from 'pinia'

interface UIStore {
  inputAmount: string
  buyInput: string
  sellInput: string
  gameInput: string
  loadingGame: boolean
  inputLinkPromocode: string
  inputLinkX: string
  inputLinkInstagram: string
  inputLinkYoutube: string
  inputLinkSocial: string
  inputPresale: string
  inputReferral: string
  withoutReferralCheck: boolean
  selectFilterCoinChart: number
  selectFilterHeroChart: number
  orderId: number
  queueId: number
  rangeSellValue: number
  rangeBuyValue: number
  queueIdCancel: number
  endTime: boolean
}

export const useUIInputs = defineStore<'ui-inputs', UIStore>('ui-inputs', {
  state: () => {
    return {
      inputAmount: '',
      buyInput: '',
      sellInput: '',
      gameInput: '',
      loadingGame: false,
      inputLinkPromocode: '',
      inputLinkX: '',
      inputLinkInstagram: '',
      inputLinkYoutube: '',
      inputLinkSocial: '',
      inputPresale: '',
      inputReferral: '',
      withoutReferralCheck: false,
      selectFilterCoinChart: 0,
      selectFilterHeroChart: 1,
      orderId: 0,
      queueId: 0,
      queueIdCancel: 0,
      rangeSellValue: 0,
      rangeBuyValue: 0,
      endTime: false
    }
  },
  actions: {}
})
