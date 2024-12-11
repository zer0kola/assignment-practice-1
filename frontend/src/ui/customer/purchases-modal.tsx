import { useQuery } from '@tanstack/react-query'
import { customerPurchasesQueryOptions } from 'src/queries/option'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalProps,
} from '@chakra-ui/react'
import { QueryErrorResetBoundary } from '@tanstack/react-query'
import { ErrorBoundary } from 'react-error-boundary'
import ResetError from 'src/ui/common/reset-error'
import LoadingSpinner from 'src/ui/common/loading-spinner'
import { useAtom } from 'jotai'
import { selectedCustomerAtom } from 'src/store/customer/atom'
import PurchaseModalFooter from 'src/ui/customer/purchase-modal-footer'
import PurchaseItemList from 'src/ui/customer/purchase-item-list'

interface PurchasesModalProps extends Pick<ModalProps, 'onClose' | 'isOpen'> {}

export default function PurchasesModal({ onClose, isOpen }: PurchasesModalProps) {
  const [selectedCustomer, setSelectedCustomerId] = useAtom(selectedCustomerAtom)

  const { data: purchases } = useQuery(customerPurchasesQueryOptions({ id: selectedCustomer?.id }))

  const handleModalClose = () => {
    setSelectedCustomerId(null)
    onClose()
  }

  return (
    <Modal isOpen={selectedCustomer !== null && isOpen} onClose={handleModalClose} scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{selectedCustomer?.name}님의 구매 내역</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
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
                {purchases === undefined ? (
                  <LoadingSpinner />
                ) : (
                  <>
                    <PurchaseItemList purchases={purchases} />
                    <PurchaseModalFooter purchases={purchases} />
                  </>
                )}
              </ErrorBoundary>
            )}
          </QueryErrorResetBoundary>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
