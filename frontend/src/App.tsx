import { ChakraProvider, Stack, extendTheme } from '@chakra-ui/react'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import PurchaseFrequencyCard from 'src/ui/purchase-frequency'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})

import { Heading } from '@chakra-ui/react'
import CustomerCard from 'src/ui/customer'

const theme = extendTheme({
  config: { useSystemColorMode: true },
  styles: {
    global: {
      'html, body': {
        width: '100%',
        height: '100%',
        backgroundColor: 'gray.50',
      },
      '#root': {
        width: '100%',
        height: '100%',
        position: 'relative',
      },
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <Stack spacing={4} padding={5} backgroundColor="gray.50">
          <Heading as="h2">데이터라이즈 과제</Heading>
          <PurchaseFrequencyCard />
          <CustomerCard />
        </Stack>
      </ChakraProvider>
    </QueryClientProvider>
  )
}

export default App
