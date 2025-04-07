import { Timestamp } from 'firebase/firestore';

export interface Course {
  id: string;
  title: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  price: number;
  isPremium: boolean;
  imageUrl: string;
  topics: string[];
  duration: number; // in minutes
  createdAt: Timestamp;
  updatedAt: Timestamp;
  instructor: {
    id: string;
    name: string;
    photoURL: string;
    bio: string;
  };
  requirements: string[];
  objectives: string[];
  rating: number;
  reviews: number;
  students: number;
  syllabus: {
    title: string;
    duration: number;
    topics: string[];
  }[];
}

export interface Test {
  id: string;
  title: string;
  description: string;
  type: 'free' | 'premium';
  duration: number; // in minutes
  totalQuestions: number;
  passingScore: number;
  price: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tags: string[];
  averageScore: number;
  totalAttempts: number;
  certificationAvailable: boolean;
}

export interface Question {
  id: string;
  testId: string;
  text: string;
  options: string[];
  correctOption: number;
  explanation: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tags: string[];
  imageUrl?: string;
  codeSnippet?: {
    code: string;
    language: string;
  };
}

export interface UserProgress {
  userId: string;
  courseId: string;
  completedLessons: string[];
  lastAccessed: Timestamp;
  progress: number; // percentage
  notes: {
    lessonId: string;
    content: string;
    createdAt: Timestamp;
  }[];
  bookmarks: string[]; // lesson IDs
  certificates: {
    courseId: string;
    earnedAt: Timestamp;
    certificateUrl: string;
  }[];
}

export interface TestResult {
  userId: string;
  testId: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  duration: number; // time taken in seconds
  completedAt: Timestamp;
  answers: {
    questionId: string;
    selectedOption: number;
    isCorrect: boolean;
    timeSpent: number; // seconds spent on this question
  }[];
  certificateId?: string;
  reviewNotes?: string;
  strengthAreas: string[];
  improvementAreas: string[];
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  role: 'user' | 'premium' | 'admin' | 'instructor';
  createdAt: Timestamp;
  lastLogin: Timestamp;
  preferences: {
    language: string;
    notifications: boolean;
    theme: 'light' | 'dark';
    emailPreferences: {
      courseUpdates: boolean;
      newCourses: boolean;
      promotions: boolean;
      newsletter: boolean;
    };
  };
  social: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
  professional: {
    title?: string;
    company?: string;
    experience?: number;
    skills?: string[];
    certifications?: {
      name: string;
      issuer: string;
      earnedAt: Timestamp;
      expiresAt?: Timestamp;
      credentialUrl?: string;
    }[];
  };
  stats: {
    totalCourses: number;
    completedCourses: number;
    totalTests: number;
    averageScore: number;
    studyTime: number; // total minutes
    streak: number; // consecutive days of activity
  };
  achievements: {
    id: string;
    name: string;
    description: string;
    earnedAt: Timestamp;
    icon: string;
  }[];
}

export interface Discussion {
  id: string;
  title: string;
  content: string;
  authorId: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  category: string;
  tags: string[];
  likes: number;
  views: number;
  replies: {
    id: string;
    content: string;
    authorId: string;
    createdAt: Timestamp;
    updatedAt: Timestamp;
    likes: number;
    isAccepted: boolean;
  }[];
  isResolved: boolean;
  isPinned: boolean;
}

export interface Article {
  id: string;
  title: string;
  content: string;
  authorId: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  category: string;
  tags: string[];
  imageUrl: string;
  readTime: number; // minutes
  likes: number;
  views: number;
  comments: {
    id: string;
    content: string;
    authorId: string;
    createdAt: Timestamp;
    updatedAt: Timestamp;
    likes: number;
  }[];
  isPremium: boolean;
  relatedArticles: string[]; // article IDs
}

export interface Notification {
  id: string;
  userId: string;
  type: 'course' | 'test' | 'discussion' | 'achievement' | 'system';
  title: string;
  message: string;
  createdAt: Timestamp;
  read: boolean;
  actionUrl?: string;
  metadata?: Record<string, any>;
}

export interface Certificate {
  id: string;
  userId: string;
  courseId?: string;
  testId?: string;
  earnedAt: Timestamp;
  title: string;
  description: string;
  imageUrl: string;
  verificationUrl: string;
  metadata: {
    score?: number;
    completionDate: Timestamp;
    validUntil?: Timestamp;
    skills: string[];
  };
}