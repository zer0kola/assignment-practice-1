import { Card, CardBody, Stack, Heading } from '@chakra-ui/react'
import CustomersTable from 'src/ui/customer/table'
import SearchInput from 'src/ui/customer/search-input'

export default function CustomerCard() {
  return (
    <Card>
      <CardBody>
        <Stack spacing={4}>
          <Heading as="h3" size="md">
            가장 많이 구매한 고객
          </Heading>
          <SearchInput />
          <CustomersTable />
        </Stack>
      </CardBody>
    </Card>
  )
}
