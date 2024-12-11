import { Stack, Input, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useSetAtom } from 'jotai'
import { setSearchNameAtom } from 'src/store/customer/action'

const DEBOUNCE_TIME = 500

export default function SearchInput() {
  const setSearchName = useSetAtom(setSearchNameAtom)
  const [enteredValue, setEnteredValue] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchName(enteredValue)
    }, DEBOUNCE_TIME)

    return () => {
      clearTimeout(timer)
    }
  }, [enteredValue, setSearchName])

  return (
    <Stack width="fit-content">
      <Text fontSize="small" fontWeight="regular" whiteSpace="nowrap">
        이름 검색
      </Text>
      <Input value={enteredValue} onChange={(e) => setEnteredValue(e.target.value)} />
    </Stack>
  )
}
