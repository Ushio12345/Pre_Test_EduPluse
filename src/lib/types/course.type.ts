export type LessonType = "video" | "quiz" | "flashcard";

export type CourseLevel = "beginner" | "intermediate" | "advanced";

export type CourseStatus = "draft" | "published" | "archived";

export interface BaseLesson {
  lessonId: string;
  order: number;
  title: string;
  type: LessonType;
  duration?: number;
}

export interface VideoLesson extends BaseLesson {
  type: "video";
  content: string;
  videoURL: string;
  duration?: number;
}

export interface QuizLesson extends BaseLesson {
  type: "quiz";
  quizId: string;
  duration?: number;
}

export interface FlashcardLesson extends BaseLesson {
  type: "flashcard";
  deckId: string;
  duration?: number;
}

export type Lesson = VideoLesson | QuizLesson | FlashcardLesson;

export interface Chapter {
  chapterId: string;
  order: number;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  thumbnailURL: string;
  instructorName: string;
  level: CourseLevel;
  status: CourseStatus;
  chapters: Chapter[];
}

export type CourseList = Course[];
