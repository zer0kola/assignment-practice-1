import { PurchaseWithId } from 'src/types/data'
import { Highlight, Stack, Text } from '@chakra-ui/react'
import { ModalFooter } from '@chakra-ui/react'
// @ts-expect-error testing-library에서 React 타입을 요구
import React from 'react'

export default function PurchaseModalFooter({ purchases }: { purchases: PurchaseWithId[] }) {
  if (purchases.length === 0) {
    return null
  }

  const totalQuantity = purchases.reduce((acc, cur) => acc + cur.quantity, 0)
  const totalPrice = purchases.reduce((acc, cur) => acc + cur.price * cur.quantity, 0)

  return (
    <ModalFooter>
      <Stack>
        <Text>
          총 구매 수량:{' '}
          <Highlight query={totalQuantity.toLocaleString()} styles={{ fontWeight: 600 }}>
            {totalQuantity.toLocaleString()}
          </Highlight>
          개
        </Text>
        <Text>
          총 구매 금액:{' '}
          <Highlight query={totalPrice.toLocaleString()} styles={{ fontWeight: 600 }}>
            {totalPrice.toLocaleString()}
          </Highlight>
          원
        </Text>
      </Stack>
    </ModalFooter>
  )
}
