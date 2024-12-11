import { useQuery } from '@tanstack/react-query'
import { purchaseFrequencyQueryOptions } from 'src/queries/option'
import { Bar, BarChart, CartesianGrid, Legend, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { useAtomValue } from 'jotai'
import { purchaseFrequencyRangeAtom } from 'src/store/purchase-frequency/atom'
import LoadingSpinner from 'src/ui/common/loading-spinner'

export default function PurchaseFrequencyChart() {
  const { from, to, isInvalid } = useAtomValue(purchaseFrequencyRangeAtom)

  const { data: purchaseFrequency } = useQuery(purchaseFrequencyQueryOptions({ from, to, isInvalid }))

  if (!purchaseFrequency) {
    return <LoadingSpinner />
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={purchaseFrequency} barSize={40}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="range" tickMargin={10} />
        <YAxis />
        <Tooltip />
        <Legend verticalAlign="top" height={36} />
        <Bar dataKey="count" fill="#8884d8" shape={<Rectangle radius={[2, 2, 0, 0]} />} name="구매 수" />
      </BarChart>
    </ResponsiveContainer>
  )
}
