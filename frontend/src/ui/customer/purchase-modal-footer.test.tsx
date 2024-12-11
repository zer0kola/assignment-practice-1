// @ts-expect-error testing-library에서 React 타입을 요구
import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import PurchaseModalFooter from 'src/ui/customer/purchase-modal-footer'
import { PurchaseWithId } from 'src/types/data'
import { Modal } from '@chakra-ui/react'

describe('PurchaseModalFooter 컴포넌트', () => {
  it('purchases 배열이 비어있을 때 컴포넌트가 렌더링되지 않아야 한다', () => {
    render(
      <Modal isOpen onClose={() => {}}>
        <PurchaseModalFooter purchases={[]} />
      </Modal>,
    )
    expect(screen.queryByText(/총 구매 수량:/)).toBeNull()
    expect(screen.queryByText(/총 구매 금액:/)).toBeNull()
  })

  it('purchases 배열이 있을 때 총 구매 수량과 금액이 올바르게 표시되어야 한다', () => {
    const mockPurchases: PurchaseWithId[] = [
      { id: '1', date: '2024-08-01', quantity: 2, product: 'Product A', price: 5000, imgSrc: 'img-a.jpg' },
      { id: '2', date: '2024-08-02', quantity: 1, product: 'Product B', price: 10000, imgSrc: 'img-b.jpg' },
    ]

    render(
      <Modal isOpen onClose={() => {}}>
        <PurchaseModalFooter purchases={mockPurchases} />
      </Modal>,
    )

    const totalQuantity = 3 // 2 + 1
    const totalPrice = 20000 // (2 * 5000) + (1 * 10000)

    expect(screen.getByText(/총 구매 수량:/)).toHaveTextContent(`총 구매 수량: ${totalQuantity.toLocaleString()}개`)
    expect(screen.getByText(/총 구매 금액:/)).toHaveTextContent(`총 구매 금액: ${totalPrice.toLocaleString()}원`)
  })
})
