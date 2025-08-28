export interface Lesson {
    id: string;
    title: string;
    description: string;
    category: LessonCategory;
    difficulty: 'Nybörjare' | 'Medel' | 'Avancerad';
    duration: number;
    completed: boolean;
  }

  export type LessonCategory =
    | 'Intro till klimat'
    | 'Växthuseffekten'
    | 'Hållbar energi'
    | 'Klimatförändring';

  export interface LessonProgress {
    userId: string;
    lessonId: string;
    completed: boolean;
    completedAt?: Date;
    progress: number;
  }