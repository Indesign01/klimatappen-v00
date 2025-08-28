import { Card } from '../ui/Card'

interface StatsCardProps {
  title: string
  value: string | number
  change: string
  changeType: 'positive' | 'negative' | 'neutral'
}

function StatsCard({ title, value, change, changeType }: StatsCardProps) {
  const changeColor = {
    positive: 'text-green-600',
    negative: 'text-red-600',
    neutral: 'text-gray-600'
  }[changeType]

  return (
    <Card className="p-6">
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <div className="mt-2 flex items-baseline">
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
        <p className={`ml-2 text-sm ${changeColor}`}>{change}</p>
      </div>
    </Card>
  )
}

export default function DashboardStats() {
  const stats = [
    { title: 'Genomförda lektioner', value: 12, change: '+3 denna vecka', changeType: 'positive' as const },
    { title: 'Aktiva diskussioner', value: 8, change: '+2 nya', changeType: 'positive' as const },
    { title: 'Klimatgrupper', value: 3, change: 'Oförändrat', changeType: 'neutral' as const },
    { title: 'Poäng', value: 245, change: '+15 denna vecka', changeType: 'positive' as const }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatsCard key={index} {...stat} />
      ))}
    </div>
  )
}