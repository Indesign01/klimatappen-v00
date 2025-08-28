import { Card } from '../ui/Card'
import { Button } from '../ui/Button'
import Link from 'next/link'

interface GroupCardProps {
  id: string
  name: string
  description: string
  memberCount: number
  location: string
}

export default function GroupCard({ id, name, description, memberCount, location }: GroupCardProps) {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-2 text-gray-900">{name}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
        <span>{memberCount} medlemmar</span>
        <span>{location}</span>
      </div>
      <Link href={`/klimatgrupper/${id}`}>
        <Button variant="primary" size="sm">Gå med i gruppen</Button>
      </Link>
    </Card>
  )
}