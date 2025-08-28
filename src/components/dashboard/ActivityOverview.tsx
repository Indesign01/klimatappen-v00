import { Card } from '../ui/Card'

interface Activity {
  id: string
  type: 'lesson' | 'discussion' | 'group'
  title: string
  time: string
  description: string
}

export default function ActivityOverview() {
  const activities: Activity[] = [
    {
      id: '1',
      type: 'lesson',
      title: 'Växthusgaser - Grundkurs',
      time: '2 timmar sedan',
      description: 'Genomförde lektion om växthusgaser'
    },
    {
      id: '2',
      type: 'discussion',
      title: 'Diskussion: Förnybar energi',
      time: '4 timmar sedan',
      description: 'Deltog i diskussion om solenergi'
    },
    {
      id: '3',
      type: 'group',
      title: 'Stockholms Klimatgrupp',
      time: '1 dag sedan',
      description: 'Gick med i ny klimatgrupp'
    }
  ]

  const getActivityIcon = (type: Activity['type']) => {
    const icons = {
      lesson: '📚',
      discussion: '💬',
      group: '👥'
    }
    return icons[type]
  }

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4 text-gray-900">Senaste aktivitet</h2>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3">
            <div className="text-2xl">{getActivityIcon(activity.type)}</div>
            <div className="flex-1">
              <h3 className="font-medium text-gray-900">{activity.title}</h3>
              <p className="text-sm text-gray-600">{activity.description}</p>
              <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}