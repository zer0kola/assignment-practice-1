import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, useDisclosure } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { customersQueryOptions } from 'src/queries/option'
import type { Customer } from 'src/types/data'
import { Fragment, useMemo } from 'react'
import LoadingSpinner from 'src/ui/common/loading-spinner'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { searchNameAtom, selectedCustomerAtom, sortingStatesAtom } from 'src/store/customer/atom'
import { HTTPError } from 'ky'
import NoData from 'src/ui/customer/no-data'
import ResetError from 'src/ui/common/reset-error'
import PurchasesModal from 'src/ui/customer/purchases-modal'

export default function CustomersTable() {
  const [sortingStates, setSortingStates] = useAtom(sortingStatesAtom)

  const searchName = useAtomValue(searchNameAtom)

  const setSelectedCustomer = useSetAtom(selectedCustomerAtom)

  const { isOpen, onOpen, onClose } = useDisclosure()

  const columns = useMemo<ColumnDef<Customer>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        cell: ({ row }) => <Td>{row.getValue('id')}</Td>,
        enableSorting: false,
      },
      {
        accessorKey: 'name',
        header: '이름',
        cell: ({ row }) => <Td>{row.getValue('name')}</Td>,
        enableSorting: false,
      },
      {
        accessorKey: 'count',
        header: '총 구매 횟수',
        cell: ({ row }) => <Td>{row.getValue('count')}회</Td>,
        enableSorting: false,
      },
      {
        accessorKey: 'totalAmount',
        header: '총 구매 금액',
        cell: ({ row }) => <Td>{row.getValue<number>('totalAmount').toLocaleString()}원</Td>,
        enableSorting: true,
      },
    ],
    [],
  )

  const {
    data: customers,
    error,
    refetch,
  } = useQuery(
    customersQueryOptions({
      sortBy: sortingStates.length > 0 ? (sortingStates[0].desc ? 'desc' : 'asc') : '',
      name: searchName,
    }),
  )

  const table = useReactTable<Customer>({
    columns,
    data: customers ?? [],
    getCoreRowModel: getCoreRowModel<Customer>(),
    state: {
      sorting: sortingStates,
    },
    manualSorting: true,
    onSortingChange: setSortingStates,
    enableMultiSort: false,
  })

  if (error instanceof HTTPError && error.response.status === 404) {
    return <NoData />
  }

  if (error) {
    return (
      <ResetError
        onClickRetryButton={() => {
          refetch()
        }}
      />
    )
  }

  if (!customers) {
    return <LoadingSpinner />
  }

  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            {table.getHeaderGroups().map((headerGroup) => (
              <Fragment key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    style={{ cursor: header.column.getCanSort() ? 'pointer' : 'default' }}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}{' '}
                    {{
                      asc: ' 🔼',
                      desc: ' 🔽',
                    }[header.column.getIsSorted() as string] ?? null}
                  </Th>
                ))}
              </Fragment>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {table.getRowModel().rows.map((row) => (
            <Tr
              key={row.id}
              onClick={() => {
                setSelectedCustomer(row.original)
                onOpen()
              }}
              cursor="pointer"
              _hover={{ backgroundColor: 'gray.200' }}
            >
              {row.getVisibleCells().map((cell) => (
                <Fragment key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</Fragment>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
      <PurchasesModal isOpen={isOpen} onClose={onClose} />
    </TableContainer>
  )
}
