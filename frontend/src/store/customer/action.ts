import { atom } from 'jotai'
import { searchNameAtom } from 'src/store/customer/atom'
import { sortingStatesAtom } from 'src/store/customer/atom'

export const setSearchNameAtom = atom<null, string[], void>(null, (_, set, value) => {
  set(searchNameAtom, value)
  set(sortingStatesAtom, [])
})
