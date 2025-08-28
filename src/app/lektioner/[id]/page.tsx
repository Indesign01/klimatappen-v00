'use client';
import { useParams } from 'next/navigation';
import { Card, Button } from '@/components/ui';
import { PageLayout } from '@/components/layout/PageLayout';
import { ROUTES } from '@/lib/constants';

// Mock lesson content
const getLessonContent = (id: string) => {
  const lessons: Record<string, any> = {
    '1': {
      title: 'Vad är klimatförändringar?',
      content: [
        {
          type: 'text',
          content: 'Klimatförändringar refererar till långsiktiga förändringar i temperatur och vädermönster på jorden.'
        },
        {
          type: 'text',
          content: 'Sedan 1800-talet har mänskliga aktiviteter varit den huvudsakliga drivkraften bakom klimatförändringar.'
        },
        {
          type: 'quiz',
          question: 'Vad är den huvudsakliga orsaken till moderna klimatförändringar?',
          options: ['Naturliga cykler', 'Mänskliga aktiviteter', 'Solens aktivitet'],
          correct: 1
        }
      ]
    }
  };

  return lessons[id] || null;
};

export default function LessonDetailPage() {
  const params = useParams();
  const lessonId = params.id as string;
  const lesson = getLessonContent(lessonId);

  if (!lesson) {
    return (
      <PageLayout
        title="Lektion hittades inte"
        showBackButton
        customBackRoute={ROUTES.LESSONS}
        breadcrumbs={[
          { label: 'Lektioner', href: ROUTES.LESSONS },
          { label: 'Lektion hittades inte' }
        ]}
        className="flex items-center justify-center px-4 py-12"
      >
        <Card className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Lektion hittades inte
          </h1>
          <Button onClick={() => window.location.href = ROUTES.LESSONS}>
            Tillbaka till lektioner
          </Button>
        </Card>
      </PageLayout>
    );
  }

  return (
    <PageLayout
      title={lesson.title}
      showBackButton
      customBackRoute={ROUTES.LESSONS}
      breadcrumbs={[
        { label: 'Lektioner', href: ROUTES.LESSONS },
        { label: lesson.title }
      ]}
      className="max-w-4xl mx-auto px-4 py-8"
    >
      <div className="space-y-6">
        {lesson.content.map((section: any, index: number) => (
          <Card key={index}>
            {section.type === 'text' && (
              <p className="text-gray-800 leading-relaxed">{section.content}</p>
            )}

            {section.type === 'quiz' && (
              <div>
                <h3 className="text-lg font-semibold mb-4">{section.question}</h3>
                <div className="space-y-2">
                  {section.options.map((option: string, optIndex: number) => (
                    <button
                      key={optIndex}
                      className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </Card>
        ))}

        <Card className="text-center">
          <Button variant="success" size="lg">
            Markera som slutförd
          </Button>
        </Card>
      </div>
    </PageLayout>
  );
}