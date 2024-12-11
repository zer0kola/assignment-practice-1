import type { PurchaseWithId } from 'src/types/data'
import { Flex, Highlight, Image, Skeleton, Stack, Text } from '@chakra-ui/react'

export default function PurchaseItem({ product, price, imgSrc, date, quantity }: PurchaseWithId) {
  const totalPrice = price * quantity

  return (
    <Flex gap={4}>
      <Image
        src={imgSrc}
        fallback={<Skeleton width={150} height={150} borderRadius={8} />}
        width={150}
        height={150}
        borderRadius={8}
      />
      <Stack padding={2}>
        <Text fontSize="small">상품명: {product}</Text>
        <Text fontSize="small">가격: {price.toLocaleString()}원</Text>
        <Text fontSize="small">구매일: {date}</Text>
        <Text fontSize="small">구매 수량: {quantity.toLocaleString()}개</Text>
        <Text fontSize="small">
          총 가격:{` `}
          <Highlight styles={{ fontSize: 'small', fontWeight: 500 }} query={totalPrice.toLocaleString()}>
            {totalPrice.toLocaleString()}
          </Highlight>
          원
        </Text>
      </Stack>
    </Flex>
  )
}
