<template>
  <div class="relative flex flex-col gap-1">
    <label
      v-if="label"
      :for="label"
      :class="{
        'label-thin': labelThin,
        'label-normal': !labelThin
      }"
    >
      {{ label }}
    </label>
    <input
      v-if="inputMax"
      v-model="valueCash"
      :id="label"
      type="text"
      class="w-full bg-[#10131B] border border-[#FFFFFF]/[10%] rounded-[10px] px-[18px] py-[10px]"
      :class="{
        'w-full bg-[#10131b] border-[1px] border-[#FFF]/[10%] rounded-xl hover:border-[#87898d] active:border-[#87898d] focus:border-[#87898d] duration-200 truncate pr-12':
          background,
        'border-pomegranate border': !isValid,
        'text-padding': textPadding,
        'text-right font-durk-text text-2xl': walletCard
      }"
      :placeholder="placeholder"
      :disabled="disabled"
    />
    <input
      v-else-if="cash"
      v-model="valueInputCash"
      :id="label"
      type="text"
      class="w-full bg-[#10131B] border border-[#FFFFFF]/[10%] rounded-[10px] px-[18px] py-[10px] text-right font-durk-text text-2xl"
      :class="{
        'border-pomegranate border': !isValid
      }"
      :placeholder="placeholder"
      :disabled="disabled"
    />
    <input
      v-else-if="sellCash"
      v-model="valueSellStarInput"
      :id="label"
      type="text"
      class="w-full bg-[#10131B] border border-[#FFFFFF]/[10%] rounded-[10px] px-[18px] py-[10px] text-right font-durk-text text-2xl"
      :class="{
        'border-pomegranate border': !isValid
      }"
      :placeholder="placeholder"
      :disabled="disabled"
    />
    <input
      v-else
      :id="label"
      :type="password ? 'password' : 'text'"
      v-model="value"
      class="pl-[18px] pr-[32px] py-[10px] overflow-hidden text-ellipsis"
      :class="{
        'border border-pomegranate': !isValid,
        'w-full bg-[#10131b] border border-[#FFF]/[10%] rounded-xl hover:border-[#87898d] active:border-[#87898d] focus:border-[#87898d] duration-200':
          background,
        'text-padding': textPadding
      }"
      :placeholder="placeholder"
      :disabled="disabled"
    />
    <div class="absolute bottom-[0.5rem] left-[0.8rem] flex items-center">
      <slot name="prefix-icon"></slot>
    </div>

    <div
      class="absolute bottom-[8px] right-[18px] flex items-center text-cornflower-blue text-base cursor-pointer"
      :class="{ hidden: disabled }"
    >
      <slot name="suffix-icon"></slot>
    </div>

    <div
      class="absolute bottom-[16px] right-[18px] flex items-center"
      :class="{ hidden: disabled }"
    >
      <slot name="delete-icon"></slot>
    </div>

    <BaseButton
      v-if="maxValue"
      class="absolute right-[1rem] bottom-[0.8rem]"
      :class="{ hidden: disabled }"
      @click="valueCash = maxValue"
    >
      <span class="text-cornflower-blue cursor-pointer">Max</span>
    </BaseButton>
    <slot></slot>
    <span
      v-if="errorMessage"
      class="z-10 absolute -bottom-[1.2rem] left-2 text-sm font-medium text-pomegranate duration-150"
      :class="{
        'max-w-[180px] -bottom-[2.5rem]': errorL,
        'max-w-[240px] -bottom-[2.5rem]  backdrop-blur-md': errorM
      }"
    >
      {{ errorMessage }}
    </span>
  </div>
</template>

<script setup lang="ts">
import BaseButton from '@/components/base/BaseButton.vue'
import { computed, onMounted, ref, watch, unref } from 'vue'
import { digitsReplace } from '@/utils'
import { useAccount, useBalance } from 'use-wagmi'
import { formatObjectCoin, formatObjectUSD } from '@/utils'
import { useReadStardexCoinBalanceAvailableBI } from '@/queries/STARDEXCoin/queries'
import { zeroAddress } from 'viem'
import { formatBI } from '@/utils/evm-helpers'
import { useUIInputs } from '@/store/ui/inputs'
import { useReadPrices } from '@/queries/coinPrices/queries'
import { useAuth } from '@/store/api/auth'
import { useDebounceFn } from '@vueuse/core'

export interface InputProps {
  modelValue?: string | unknown
  placeholder?: string
  isValid?: boolean
  errorMessage?: string
  errorL?: boolean
  errorM?: boolean
  disabled?: boolean
  maxValue?: string
  width?: string
  label?: string
  background?: boolean
  labelThin?: boolean
  password?: boolean
  textPadding?: boolean
  inputMax?: boolean
  cash?: boolean
  sellCash?: boolean
  walletCard?: boolean
  maxValueCash?: string
}
const props = defineProps<InputProps>()
const emit = defineEmits(['update:modelValue'])

const value = computed({
  get: () => props.modelValue,
  set: (text) => emit('update:modelValue', text)
})

const uiInputs = useUIInputs()
const valueCash = ref('')
const valueInputCash = ref('0.000000')
const valueSellStarInput = ref('0.000000')
const { address } = useAccount()
const { data: balanceNative } = useBalance({ address })

watch(
  () => props.modelValue,
  (text) => {
    if (text === '') {
      valueCash.value = ''
      return
    }
  }
)

watch(
  () => valueCash.value,
  (newValue) => {
    const replaceVal = digitsReplace(newValue)
    emit('update:modelValue', replaceVal)
    valueCash.value = replaceVal
    const max = String(props.maxValueCash ?? 0)
    const balance = formatObjectCoin(Number(balanceNative.value?.formatted))
    if (newValue >= balance && balance <= max) valueCash.value = balance
    else if (newValue >= max) valueCash.value = max
  }
)

watch(
  () => valueInputCash.value,
  (newValue) => {
    const replaceVal = digitsReplace(newValue)
    emit('update:modelValue', replaceVal)
    valueInputCash.value = replaceVal
    const balance = Number(formatObjectCoin(Number(balanceNative.value?.formatted)))
    if (Number(newValue) > balance) valueInputCash.value = formatObjectCoin(balance)
  }
)

watch(
  () => uiInputs.rangeBuyValue,
  (value) => {
    valueInputCash.value = formatObjectCoin((Number(balanceNative.value?.formatted) / 100) * value)
  }
)

const currentAddress = computed(() => (address.value ? address.value : zeroAddress))
const { data: uiAvailableBalance } = useReadStardexCoinBalanceAvailableBI(currentAddress)
const availableBalance = computed(() =>
  uiAvailableBalance.value ? formatBI(unref(uiAvailableBalance)).ui : '0'
)
const auth = useAuth()
const token = computed(() => auth.token)
const { data: pricesData } = useReadPrices(token)
const starPrice = computed(() => (pricesData.value ? pricesData.value.data.star.price : 0))
const sellInputStar = computed(() => Number(props.maxValueCash) / starPrice.value)

watch(
  () => valueSellStarInput.value,
  (newValue) => {
    const replaceVal = digitsReplace(newValue)
    emit('update:modelValue', replaceVal)
    valueSellStarInput.value = replaceVal
    const max = props.maxValueCash
    if (Number(newValue) >= Number(availableBalance.value))
      valueSellStarInput.value = formatObjectCoin(Number(availableBalance.value))
    else if (Number(newValue) * starPrice.value >= Number(max) && Number(max) > 0)
      valueSellStarInput.value = String(sellInputStar.value)
  }
)
watch(
  () => uiInputs.rangeSellValue,
  (value) => {
    valueSellStarInput.value = formatObjectCoin((Number(availableBalance.value) / 100) * value)
  }
)

// watch(
//   () => valueSellStarInput.value,
//   (value) => {
//     uiInputs.rangeSellValue = Number(value) / (Number(availableBalance.value) / 100)
//   }
// )

const input = ref<HTMLElement | null>(null)

onMounted(() => {
  try {
    const tag = input.value as any

    if (props.width) {
      tag.style.width = props.width
    }
  } catch (e) {
    console.error(e)
  }
})
</script>

<style lang="scss" scoped>
.label-thin {
  font-size: 14px;
  color: #635b5b;
}
.label-normal {
  font-size: 1rem;
  color: #e1e4f0;
  font-weight: 500;
  @media (min-width: 768px) {
    font-size: 1rem;
  }
}
input[type='text'],
input[type='number'] {
  height: 42px;
  font-size: 16px;
  color: #e1e4f0;
  outline: none;
  &::placeholder {
    font-size: 14px;
    color: #635b5b;
  }
  &:disabled {
    pointer-events: none;
    cursor: default;
    color: #635b5b;
    border: 1px solid #635b5b;
    background: rgb(255, 255, 255, 4%);
  }
  &.text-padding {
    padding-left: 3.2rem;
  }
}
</style>
