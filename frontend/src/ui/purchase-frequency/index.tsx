import { Card, CardBody, Stack, Heading } from '@chakra-ui/react'
import PurchaseFrequencyChart from 'src/ui/purchase-frequency/chart'
import PurchaseFrequencyRangeInput from 'src/ui/purchase-frequency/range-input'
import ResetError from 'src/ui/common/reset-error'
import { QueryErrorResetBoundary } from '@tanstack/react-query'
import { ErrorBoundary } from 'react-error-boundary'

export default function PurchaseFrequencyCard() {
  return (
    <Card>
      <CardBody>
        <Stack spacing={4}>
          <Heading as="h3" size="md">
            가격대별 구매 빈도
          </Heading>
          <PurchaseFrequencyRangeInput />
          <QueryErrorResetBoundary>
            {({ reset }) => (
              <ErrorBoundary
                onReset={reset}
                fallbackRender={({ resetErrorBoundary }) => (
                  <ResetError
                    onClickRetryButton={() => {
                      resetErrorBoundary()
                    }}
                  />
                )}
              >
                <PurchaseFrequencyChart />
              </ErrorBoundary>
            )}
          </QueryErrorResetBoundary>
        </Stack>
      </CardBody>
    </Card>
  )
}
