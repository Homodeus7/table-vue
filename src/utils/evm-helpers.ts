import type { ChainId } from '@/main'
import type { Hash } from '@wagmi/core'
import { useChainId, useNetwork, useSwitchNetwork, useWaitForTransaction } from 'use-wagmi'
import { formatUnits, parseUnits } from 'viem'
import { unref, type MaybeRef } from 'vue'

export const CONTRACT_EXECUTION_ERROR = 'ContractFunctionExecutionError'

export const CONNECTOR_ERROR = 'ConnectorNotFoundError'

export const CONTRACT_BUY_ERROR =
  'The contract function "buy" reverted with the following reason:\nArithmic operation resulted in underflow or overflow.'

export const formatBI = (bi: bigint, units: number = 18) => {
  const formattedBI = formatUnits(bi, units)

  return {
    ui: formattedBI,
    num: Number(formattedBI)
  }
}

export const parseBI = (value: string | number, units: number = 18) => {
  return parseUnits(value.toString(), units)
}

export function getQueryParams<N, M, T extends MaybeRef>(keys: readonly [N, M, T]) {
  return unref(keys[2])
}

export const useTxWait = (
  chainId: MaybeRefChainId,
  hash: MaybeRef<Hash | undefined>,
  onSuccess?: () => void,
  onError?: () => void
) =>
  useWaitForTransaction({
    chainId,
    hash,
    onSuccess,
    onError
  })

export const useSwitchChain = () => {
  const { chain } = useNetwork()
  const { switchNetworkAsync } = useSwitchNetwork()

  const switchChain = async (chainId: ChainId) => {
    if (chainId !== chain?.value?.id) return switchNetworkAsync(chainId)
  }

  return { switchChain }
}
