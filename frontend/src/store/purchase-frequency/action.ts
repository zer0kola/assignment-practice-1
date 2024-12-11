import { atom } from 'jotai'

import { purchaseFrequencyRangeAtom } from 'src/store/purchase-frequency/atom'

export const setFromAtom = atom<null, string[], void>(null, (get, set, value) => {
  const currentRange = get(purchaseFrequencyRangeAtom)

  set(purchaseFrequencyRangeAtom, (range) => ({
    ...range,
    from: value,
    isInvalid: new Date(value) > new Date(currentRange.to),
  }))
})

export const setToAtom = atom<null, string[], void>(null, (get, set, value) => {
  const currentRange = get(purchaseFrequencyRangeAtom)

  set(purchaseFrequencyRangeAtom, (range) => ({
    ...range,
    to: value,
    isInvalid: new Date(value) < new Date(currentRange.from),
  }))
})
