import { describe, it, expect } from 'vitest'
import { convertPurchaseFrequencyDataToKRW } from 'src/lib/purchase-frequency/chart' // 실제 모듈 경로로 변경하세요.
import type { PurchaseFrequency } from 'src/types/data'

describe('convertPurchaseFrequencyDataToKRW 함수 테스트', () => {
  it('데이터가 지정된 범위 내에서 올바르게 변환되어야 한다', () => {
    const data: PurchaseFrequency[] = [
      { range: '20000 - 30000', count: 10 },
      { range: '30000 - 40000', count: 20 },
      { range: '40000 - 50000', count: 30 },
      { range: '60000 - 70000', count: 40 },
      { range: '100000 - 110000', count: 50 },
    ]

    const expected = [
      { range: '2만원 이하', count: 0 },
      { range: '2만원대', count: 10 },
      { range: '3만원대', count: 20 },
      { range: '4만원대', count: 30 },
      { range: '5만원대', count: 0 },
      { range: '6만원대', count: 40 },
      { range: '7만원대', count: 0 },
      { range: '8만원대', count: 0 },
      { range: '9만원대', count: 0 },
      { range: '10만원 이상', count: 50 },
    ]

    expect(convertPurchaseFrequencyDataToKRW(data)).toEqual(expected)
  })

  it('min 값이 0보다 작으면 에러가 발생해야 한다', () => {
    const data: PurchaseFrequency[] = [{ range: '20000 - 30000', count: 10 }]

    expect(() => convertPurchaseFrequencyDataToKRW(data, -1)).toThrow('min 값은 0보다 커야 합니다.')
  })

  it('min 값이 max 값보다 크거나 같으면 에러가 발생해야 한다', () => {
    const data: PurchaseFrequency[] = [{ range: '20000 - 30000', count: 10 }]

    expect(() => convertPurchaseFrequencyDataToKRW(data, 50000, 40000)).toThrow('min 값은 max 값보다 작아야 합니다.')
  })

  it('min 또는 max 값이 DIVISOR로 나누어 떨어지지 않으면 에러가 발생해야 한다', () => {
    const data: PurchaseFrequency[] = [{ range: '20000 - 30000', count: 10 }]

    expect(() => convertPurchaseFrequencyDataToKRW(data, 25000, 100000)).toThrow(
      `min과 max 값은 ${10000}으로 나누어 떨어져야 합니다.`,
    )
    expect(() => convertPurchaseFrequencyDataToKRW(data, 20000, 95000)).toThrow(
      `min과 max 값은 ${10000}으로 나누어 떨어져야 합니다.`,
    )
  })

  it('빈 데이터가 올바르게 처리되어야 한다', () => {
    const data: PurchaseFrequency[] = []

    const expected = [
      { range: '2만원 이하', count: 0 },
      { range: '2만원대', count: 0 },
      { range: '3만원대', count: 0 },
      { range: '4만원대', count: 0 },
      { range: '5만원대', count: 0 },
      { range: '6만원대', count: 0 },
      { range: '7만원대', count: 0 },
      { range: '8만원대', count: 0 },
      { range: '9만원대', count: 0 },
      { range: '10만원 이상', count: 0 },
    ]

    expect(convertPurchaseFrequencyDataToKRW(data)).toEqual(expected)
  })

  it('범위의 경계에 있는 데이터가 올바르게 처리되어야 한다', () => {
    const data: PurchaseFrequency[] = [
      { range: '20000 - 30000', count: 10 },
      { range: '100000 - 110000', count: 20 },
    ]

    const expected = [
      { range: '2만원 이하', count: 0 },
      { range: '2만원대', count: 10 },
      { range: '3만원대', count: 0 },
      { range: '4만원대', count: 0 },
      { range: '5만원대', count: 0 },
      { range: '6만원대', count: 0 },
      { range: '7만원대', count: 0 },
      { range: '8만원대', count: 0 },
      { range: '9만원대', count: 0 },
      { range: '10만원 이상', count: 20 },
    ]

    expect(convertPurchaseFrequencyDataToKRW(data)).toEqual(expected)
  })
})
