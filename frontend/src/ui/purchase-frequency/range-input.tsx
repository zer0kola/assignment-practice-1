import { Flex, FormLabel, Input, FormControl, FormHelperText, FormErrorMessage } from '@chakra-ui/react'
import { useAtomValue, useSetAtom } from 'jotai'
import React from 'react'

import { purchaseFrequencyRangeAtom } from 'src/store/purchase-frequency/atom'
import { setFromAtom, setToAtom } from 'src/store/purchase-frequency/action'

export default function PurchaseFrequencyRangeInput() {
  const { from, to, isInvalid } = useAtomValue(purchaseFrequencyRangeAtom)

  const setFrom = useSetAtom(setFromAtom)

  const setTo = useSetAtom(setToAtom)

  const handleFromChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFrom(event.target.value)
  }

  const handleToChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTo(event.target.value)
  }

  return (
    <Flex gap={16}>
      <FormControl isInvalid={isInvalid}>
        <FormLabel height="fit-content" htmlFor="from">
          시작
        </FormLabel>
        <Input type="date" id="from" value={from} onChange={handleFromChange} max={to} />
        {isInvalid ? (
          <FormErrorMessage>검색 시작일은 종료일보다 이전이어야 합니다.</FormErrorMessage>
        ) : (
          <FormHelperText>검색 시작일을 입력하세요</FormHelperText>
        )}
      </FormControl>
      <FormControl isInvalid={isInvalid}>
        <FormLabel height="fit-content" htmlFor="to">
          종료
        </FormLabel>
        <Input type="date" id="to" value={to} onChange={handleToChange} min={from} />
        {isInvalid ? (
          <FormErrorMessage>검색 종료일은 시작일보다 이후여야 합니다.</FormErrorMessage>
        ) : (
          <FormHelperText>검색 종료일을 입력하세요</FormHelperText>
        )}
      </FormControl>
    </Flex>
  )
}
