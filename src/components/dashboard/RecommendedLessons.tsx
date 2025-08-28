import { Card } from '../ui/Card'
import { Button } from '../ui/Button'
import Link from 'next/link'

interface Lesson {
  id: string
  title: string
  description: string
  duration: string
  difficulty: 'Nybörjare' | 'Medel' | 'Avancerad'
  category: string
}

export default function RecommendedLessons() {
  const lessons: Lesson[] = [
    {
      id: '1',
      title: 'Introduktion till klimatförändring',
      description: 'Grundläggande koncept om klimatförändring och dess orsaker',
      duration: '25 min',
      difficulty: 'Nybörjare',
      category: 'Grundläggande'
    },
    {
      id: '2',
      title: 'Hållbar energi',
      description: 'Förnybar energi och dess roll i klimatomställningen',
      duration: '30 min',
      difficulty: 'Medel',
      category: 'Energi'
    },
    {
      id: '3',
      title: 'Klimatpolitik och åtgärder',
      description: 'Politiska verktyg för att bekämpa klimatförändring',
      duration: '35 min',
      difficulty: 'Avancerad',
      category: 'Politik'
    }
  ]

  const getDifficultyColor = (difficulty: Lesson['difficulty']) => {
    const colors = {
      'Nybörjare': 'bg-green-100 text-green-800',
      'Medel': 'bg-yellow-100 text-yellow-800',
      'Avancerad': 'bg-red-100 text-red-800'
    }
    return colors[difficulty]
  }

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Rekommenderade lektioner</h2>
        <Link href="/lektioner">
          <Button variant="outline" size="sm">Se alla</Button>
        </Link>
      </div>
      <div className="space-y-4">
        {lessons.map((lesson) => (
          <div key={lesson.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium text-gray-900">{lesson.title}</h3>
              <span className={`px-2 py-1 text-xs rounded-full ${getDifficultyColor(lesson.difficulty)}`}>
                {lesson.difficulty}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-3">{lesson.description}</p>
            <div className="flex justify-between items-center">
              <div className="text-xs text-gray-500">
                <span>{lesson.category} • {lesson.duration}</span>
              </div>
              <Link href={`/lektioner/${lesson.id}`}>
                <Button size="sm">Starta lektion</Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}