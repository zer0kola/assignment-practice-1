import { Center, Text } from '@chakra-ui/react'

export default function NoData() {
  return (
    <Center height={300}>
      <Text fontWeight={600} fontSize="x-large">
        검색 결과가 없습니다.
      </Text>
    </Center>
  )
}
