import type { PurchaseWithId } from 'src/types/data'
import PurchaseItem from 'src/ui/customer/purchase-item'
import { Center, Stack, Text } from '@chakra-ui/react'

export default function PurchaseItemList({ purchases }: { purchases: PurchaseWithId[] }) {
  if (purchases.length === 0) {
    return (
      <Center height={300}>
        <Text fontSize="large" fontWeight={600}>
          구매 내역이 없습니다.
        </Text>
      </Center>
    )
  }

  return (
    <Stack spacing={4}>
      {purchases.map((purchase) => (
        <PurchaseItem key={purchase.id} {...purchase} />
      ))}
    </Stack>
  )
}
