import { queryOptions, keepPreviousData } from '@tanstack/react-query'
import { nanoid } from 'nanoid'

import apiInstance from 'src/lib/common/ky'
import type { PurchaseFrequency } from 'src/types/data'
import type { PurchaseFrequencyRange } from 'src/store/purchase-frequency/atom'
import { convertPurchaseFrequencyDataToKRW } from 'src/lib/purchase-frequency/chart'
import type { Customer, Purchase, PurchaseWithId } from 'src/types/data'

export const purchaseFrequencyQueryOptions = ({ from, to, isInvalid }: PurchaseFrequencyRange) =>
  queryOptions({
    queryKey: ['purchaseFrequency', from, to],
    queryFn: () => apiInstance.get('purchase-frequency', { searchParams: { from, to } }).json<PurchaseFrequency[]>(),
    select: (data) => convertPurchaseFrequencyDataToKRW(data),
    throwOnError: true,
    enabled: !isInvalid,
  })

export const customersQueryOptions = (searchParams = { sortBy: '', name: '' }) =>
  queryOptions<Customer[], unknown, Customer[]>({
    queryKey: ['customers', searchParams.sortBy, searchParams.name],
    queryFn: () =>
      apiInstance
        .get('customers', {
          searchParams,
        })
        .json<Customer[]>(),
    select: (data) => data,
    placeholderData: keepPreviousData,
  })

export const customerPurchasesQueryOptions = ({ id }: Partial<Pick<Customer, 'id'>>) =>
  queryOptions<Purchase[], unknown, PurchaseWithId[]>({
    queryKey: ['customerPurchases', id],
    queryFn: () => apiInstance.get(`customers/${id}/purchases`).json<Purchase[]>(),
    select: (data) => data.map((purchase) => ({ ...purchase, id: nanoid() })),
    throwOnError: true,
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  })
