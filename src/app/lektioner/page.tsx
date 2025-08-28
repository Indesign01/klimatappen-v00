'use client';
import { useState } from 'react';
import { Card, Button } from '@/components/ui';
import { LessonCard } from '@/components/lessons/LessonCard';
import { Lesson, LessonCategory } from '@/types/lessons';

const mockLessons: Lesson[] = [
  {
    id: '1',
    title: 'Vad är klimatförändringar?',
    description: 'En grundläggande introduktion till klimatförändringar och dess orsaker.',
    category: 'Intro till klimat',
    difficulty: 'Nybörjare',
    duration: 15,
    completed: true
  },
  {
    id: '2',
    title: 'Växthuseffekten förklarad',
    description: 'Lär dig hur växthuseffekten fungerar och varför den är viktig.',
    category: 'Växthuseffekten',
    difficulty: 'Nybörjare',
    duration: 20,
    completed: true
  },
  {
    id: '3',
    title: 'Förnybar energi - Sol och vind',
    description: 'Utforska olika former av förnybar energi och deras potential.',
    category: 'Hållbar energi',
    difficulty: 'Medel',
    duration: 25,
    completed: false
  },
  {
    id: '4',
    title: 'Klimatdatan visar vägen',
    description: 'Hur man läser och tolkar klimatdata från olika källor.',
    category: 'Klimatförändring',
    difficulty: 'Avancerad',
    duration: 30,
    completed: false
  }
];

const categories: LessonCategory[] = [
  'Intro till klimat',
  'Växthuseffekten',
  'Hållbar energi',
  'Klimatförändring'
];

export default function LessonsPage() {
  const [selectedCategory, setSelectedCategory] = useState<LessonCategory | 'Alla'>('Alla');

  const filteredLessons = selectedCategory === 'Alla'
    ? mockLessons
    : mockLessons.filter(lesson => lesson.category === selectedCategory);

  const completedCount = mockLessons.filter(l => l.completed).length;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Lektioner</h1>
          <p className="text-gray-600 mt-2">
            {completedCount} av {mockLessons.length} lektioner avklarade
          </p>
        </div>

        {/* Progress */}
        <Card padding="sm" className="text-center">
          <div className="text-2xl font-bold text-blue-600">
            {Math.round((completedCount / mockLessons.length) * 100)}%
          </div>
          <div className="text-sm text-gray-600">Genomfört</div>
        </Card>
      </div>

      {/* Category Filter */}
      <Card>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedCategory === 'Alla' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setSelectedCategory('Alla')}
          >
            Alla ({mockLessons.length})
          </Button>
          {categories.map(category => {
            const count = mockLessons.filter(l => l.category === category).length;
            return (
              <Button
                key={category}
                variant={selectedCategory === category ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category} ({count})
              </Button>
            );
          })}
        </div>
      </Card>

      {/* Lessons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLessons.map(lesson => (
          <LessonCard key={lesson.id} lesson={lesson} />
        ))}
      </div>

      {filteredLessons.length === 0 && (
        <Card className="text-center py-12">
          <div className="text-6xl mb-4">📚</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Inga lektioner hittades
          </h2>
          <p className="text-gray-600">
            Prova att ändra din filterkategori
          </p>
        </Card>
      )}
    </div>
  );
}