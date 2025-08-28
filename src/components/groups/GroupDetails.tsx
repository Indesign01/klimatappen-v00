'use client'
import { useState, useEffect } from 'react'
import { Card } from '../ui/Card'
import { Button } from '../ui/Button'

interface GroupDetailsProps {
  groupId: string
}

export default function GroupDetails({ groupId }: GroupDetailsProps) {
  const [group, setGroup] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock data - replace with API call
    const mockGroup = {
      id: groupId,
      name: 'Stockholms Klimatgrupp',
      description: 'En aktiv grupp som arbetar för klimatförändring i Stockholm',
      memberCount: 45,
      location: 'Stockholm',
      discussions: [
        { id: 1, title: 'Nästa möte - Solenergi', author: 'Maria P.', replies: 3 },
        { id: 2, title: 'Klimatmärkning av mat', author: 'Yoyo K.', replies: 7 }
      ]
    }

    setTimeout(() => {
      setGroup(mockGroup)
      setLoading(false)
    }, 1000)
  }, [groupId])

  if (loading) return <div>Laddar gruppinformation...</div>
  if (!group) return <div>Grupp kunde inte hittas</div>

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-4 text-gray-900">{group.name}</h1>
        <p className="text-gray-600 mb-4">{group.description}</p>
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-500">{group.memberCount} medlemmar</span>
          <span className="text-gray-500">{group.location}</span>
        </div>
        <Button variant="primary">Gå med i gruppen</Button>
      </Card>

      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-900">Diskussioner</h2>
        <div className="space-y-3">
          {group.discussions.map((discussion: any) => (
            <div key={discussion.id} className="border-b pb-3">
              <h3 className="font-medium text-gray-900">{discussion.title}</h3>
              <p className="text-sm text-gray-500">av {discussion.author} • {discussion.replies} svar</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}