import { atom } from 'jotai'
import { SortingState } from '@tanstack/react-table'
import { Customer } from 'src/types/data'

export const searchNameAtom = atom('')
export const sortingStatesAtom = atom<SortingState>([])
export const selectedCustomerAtom = atom<Customer | null>(null)
