import { atom } from 'jotai'

export type PurchaseFrequencyRange = {
  from: string
  to: string
  isInvalid: boolean
}

export const purchaseFrequencyRangeAtom = atom<PurchaseFrequencyRange>({
  from: '2024-07-01',
  to: '2024-07-31',
  isInvalid: false,
})
