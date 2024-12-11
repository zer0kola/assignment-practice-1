import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, beforeEach } from 'vitest'
import PurchaseFrequencyRangeInput from 'src/ui/purchase-frequency/range-input'
// @ts-expect-error testing-library에서 React 타입을 요구
import React from 'react'

describe('PurchaseFrequencyRangeInput 컴포넌트', () => {
  beforeEach(() => {
    render(<PurchaseFrequencyRangeInput />)
  })

  it('기본값이 올바르게 표시되어야 한다', () => {
    const fromInput = screen.getByLabelText('시작')
    const toInput = screen.getByLabelText('종료')

    expect(fromInput).toHaveValue('2024-07-01')
    expect(toInput).toHaveValue('2024-07-31')
  })

  it('시작 날짜가 변경되었을 때 올바르게 반영되어야 한다', async () => {
    const fromInput = screen.getByLabelText('시작')
    const toInput = screen.getByLabelText('종료')

    await userEvent.clear(fromInput)
    await userEvent.type(fromInput, '2024-07-10')

    expect(fromInput).toHaveValue('2024-07-10')
    expect(toInput).toHaveAttribute('min', '2024-07-10')
  })

  it('종료 날짜가 변경되었을 때 올바르게 반영되어야 한다', async () => {
    const fromInput = screen.getByLabelText('시작')
    const toInput = screen.getByLabelText('종료')

    await userEvent.clear(toInput)
    await userEvent.type(toInput, '2024-07-20')

    expect(toInput).toHaveValue('2024-07-20')
    expect(fromInput).toHaveAttribute('max', '2024-07-20')
  })

  it('잘못된 날짜 범위가 설정되면 오류 메시지가 표시되어야 한다', async () => {
    const fromInput = screen.getByLabelText('시작')
    const toInput = screen.getByLabelText('종료')

    await userEvent.clear(fromInput)
    await userEvent.type(fromInput, '2024-08-01')

    const errorMessage = screen.getByText('검색 시작일은 종료일보다 이전이어야 합니다.')

    expect(errorMessage).toBeInTheDocument()
    expect(fromInput).toHaveAttribute('aria-invalid', 'true')
    expect(toInput).toHaveAttribute('aria-invalid', 'true')
  })
})
