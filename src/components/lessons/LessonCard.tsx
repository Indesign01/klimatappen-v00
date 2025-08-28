'use client';
import { useRouter } from 'next/navigation';
import { Card, Button } from '@/components/ui';
import { Lesson } from '@/types/lessons';

interface LessonCardProps {
  lesson: Lesson;
}

const difficultyColors = {
  'Nybörjare': 'bg-green-100 text-green-800',
  'Medel': 'bg-yellow-100 text-yellow-800',
  'Avancerad': 'bg-red-100 text-red-800'
};

const categoryEmojis = {
  'Intro till klimat': '🌍',
  'Växthuseffekten': '🏭',
  'Hållbar energi': '⚡',
  'Klimatförändring': '📊'
};

export function LessonCard({ lesson }: LessonCardProps) {
  const router = useRouter();

  const handleStartLesson = () => {
    router.push(`/lektioner/${lesson.id}`);
  };

  return (
    <Card className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="text-3xl">
          {categoryEmojis[lesson.category]}
        </div>
        <div className="flex items-center space-x-2">
          {lesson.completed && (
            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm">✓</span>
            </div>
          )}
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${difficultyColors[lesson.difficulty]}`}>
            {lesson.difficulty}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {lesson.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4">
          {lesson.description}
        </p>

        <div className="flex items-center text-sm text-gray-500 space-x-4">
          <span>⏱️ {lesson.duration} min</span>
          <span>📂 {lesson.category}</span>
        </div>
      </div>

      {/* Action */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <Button
          variant={lesson.completed ? 'secondary' : 'primary'}
          size="sm"
          fullWidth
          onClick={handleStartLesson}
        >
          {lesson.completed ? 'Repetera' : 'Starta lektion'}
        </Button>
      </div>
    </Card>
  );
}