import { Button, ButtonProps, Center, Stack, Text } from '@chakra-ui/react'

interface ResetErrorBoundaryProps {
  onClickRetryButton: ButtonProps['onClick']
}

export default function ResetError({ onClickRetryButton }: ResetErrorBoundaryProps) {
  return (
    <Center height={300}>
      <Stack gap={8}>
        <Text fontWeight={600} fontSize="x-large">
          에러가 발생하였습니다.
        </Text>
        <Button onClick={onClickRetryButton}>다시 시도</Button>
      </Stack>
    </Center>
  )
}
