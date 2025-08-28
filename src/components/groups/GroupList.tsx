'use client'
import { useState, useEffect } from 'react'
import GroupCard from './GroupCard'

interface Group {
  id: string
  name: string
  description: string
  memberCount: number
  location: string
}

export default function GroupList() {
  const [groups, setGroups] = useState<Group[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock data - replace with API call, See API under app
    const mockGroups = [
      {
        id: '1',
        name: 'Stockholms Klimatgrupp',
        description: 'Lokal grupp för klimatengagemang i Stockholm',
        memberCount: 45,
        location: 'Stockholm'
      },
      {
        id: '2',
        name: 'Göteborgs Miljöinitiativ',
        description: 'Tillsammans för en hållbar framtid',
        memberCount: 32,
        location: 'Göteborg'
      }
    ]

    setTimeout(() => {
      setGroups(mockGroups)
      setLoading(false)
    }, 1000)
  }, [])

  if (loading) return <div>Laddar grupper...</div>

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {groups.map((group) => (
        <GroupCard key={group.id} {...group} />
      ))}
    </div>
  )
}