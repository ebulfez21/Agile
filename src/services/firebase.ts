import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  addDoc,
  updateDoc,
  deleteDoc,
  Timestamp,
  orderBy,
  limit,
  startAfter,
  increment,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';
import { db, storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import type {
  Course,
  Test,
  Question,
  UserProgress,
  TestResult,
  UserProfile,
  Discussion,
  Article,
  Notification,
  Certificate
} from '../types';

// Courses
export const getCourses = async (isPremium = false, lastDoc?: any, pageSize = 12) => {
  let q = query(
    collection(db, 'courses'),
    where('isPremium', '==', isPremium),
    orderBy('createdAt', 'desc'),
    limit(pageSize)
  );

  if (lastDoc) {
    q = query(q, startAfter(lastDoc));
  }

  const snapshot = await getDocs(q);
  return {
    courses: snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Course)),
    lastDoc: snapshot.docs[snapshot.docs.length - 1]
  };
};

export const getCourse = async (id: string) => {
  const docRef = doc(db, 'courses', id);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as Course : null;
};

export const updateCourseProgress = async (userId: string, courseId: string, lessonId: string) => {
  const progressRef = doc(db, 'userProgress', `${userId}_${courseId}`);
  await updateDoc(progressRef, {
    completedLessons: arrayUnion(lessonId),
    lastAccessed: Timestamp.now()
  });
};

// User Progress
export const getUserProgress = async (userId: string, courseId: string) => {
  const docRef = doc(db, 'userProgress', `${userId}_${courseId}`);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as UserProgress : null;
};

export const updateUserProgress = async (userId: string, courseId: string, data: Partial<UserProgress>) => {
  const docRef = doc(db, 'userProgress', `${userId}_${courseId}`);
  const docSnap = await getDoc(docRef);
  
  if (!docSnap.exists()) {
    await addDoc(collection(db, 'userProgress'), {
      userId,
      courseId,
      completedLessons: [],
      lastAccessed: Timestamp.now(),
      progress: 0,
      notes: [],
      bookmarks: [],
      certificates: [],
      ...data
    });
  } else {
    await updateDoc(docRef, {
      ...data,
      lastAccessed: Timestamp.now()
    });
  }
};

// Tests
export const getTests = async (type: 'free' | 'premium', category?: string, difficulty?: string, lastDoc?: any, pageSize = 12) => {
  let q = query(
    collection(db, 'tests'),
    where('type', '==', type),
    orderBy('createdAt', 'desc')
  );

  if (category && category !== 'all') {
    q = query(q, where('category', '==', category));
  }

  if (difficulty && difficulty !== 'all') {
    q = query(q, where('difficulty', '==', difficulty));
  }

  if (lastDoc) {
    q = query(q, startAfter(lastDoc), limit(pageSize));
  } else {
    q = query(q, limit(pageSize));
  }

  const snapshot = await getDocs(q);
  return {
    tests: snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Test)),
    lastDoc: snapshot.docs[snapshot.docs.length - 1]
  };
};

export const getTest = async (id: string) => {
  const docRef = doc(db, 'tests', id);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as Test : null;
};

export const getTestQuestions = async (testId: string) => {
  const q = query(
    collection(db, 'questions'),
    where('testId', '==', testId),
    orderBy('createdAt')
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Question));
};

// Test Results
export const saveTestResult = async (result: Omit<TestResult, 'id'>) => {
  const docRef = await addDoc(collection(db, 'testResults'), {
    ...result,
    completedAt: Timestamp.now()
  });

  // Update user stats
  const userRef = doc(db, 'users', result.userId);
  await updateDoc(userRef, {
    'stats.totalTests': increment(1),
    'stats.averageScore': increment(result.score)
  });

  return docRef;
};

export const getTestResults = async (userId: string, lastDoc?: any, pageSize = 10) => {
  let q = query(
    collection(db, 'testResults'),
    where('userId', '==', userId),
    orderBy('completedAt', 'desc')
  );

  if (lastDoc) {
    q = query(q, startAfter(lastDoc), limit(pageSize));
  } else {
    q = query(q, limit(pageSize));
  }

  const snapshot = await getDocs(q);
  return {
    results: snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as TestResult)),
    lastDoc: snapshot.docs[snapshot.docs.length - 1]
  };
};

// User Profile
export const getUserProfile = async (uid: string) => {
  const docRef = doc(db, 'users', uid);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? { uid: docSnap.id, ...docSnap.data() } as UserProfile : null;
};

export const updateUserProfile = async (uid: string, data: Partial<UserProfile>) => {
  const docRef = doc(db, 'users', uid);
  await updateDoc(docRef, {
    ...data,
    updatedAt: Timestamp.now()
  });
};

// Discussions
export const getDiscussions = async (category?: string, lastDoc?: any, pageSize = 20) => {
  let q = query(
    collection(db, 'discussions'),
    orderBy('createdAt', 'desc')
  );

  if (category && category !== 'all') {
    q = query(q, where('category', '==', category));
  }

  if (lastDoc) {
    q = query(q, startAfter(lastDoc), limit(pageSize));
  } else {
    q = query(q, limit(pageSize));
  }

  const snapshot = await getDocs(q);
  return {
    discussions: snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Discussion)),
    lastDoc: snapshot.docs[snapshot.docs.length - 1]
  };
};

export const createDiscussion = async (discussion: Omit<Discussion, 'id' | 'createdAt' | 'updatedAt'>) => {
  return await addDoc(collection(db, 'discussions'), {
    ...discussion,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
    likes: 0,
    views: 0,
    replies: [],
    isResolved: false,
    isPinned: false
  });
};

// Articles
export const getArticles = async (category?: string, isPremium = false, lastDoc?: any, pageSize = 12) => {
  let q = query(
    collection(db, 'articles'),
    where('isPremium', '==', isPremium),
    orderBy('createdAt', 'desc')
  );

  if (category && category !== 'all') {
    q = query(q, where('category', '==', category));
  }

  if (lastDoc) {
    q = query(q, startAfter(lastDoc), limit(pageSize));
  } else {
    q = query(q, limit(pageSize));
  }

  const snapshot = await getDocs(q);
  return {
    articles: snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Article)),
    lastDoc: snapshot.docs[snapshot.docs.length - 1]
  };
};

// Notifications
export const getNotifications = async (userId: string, lastDoc?: any, pageSize = 20) => {
  let q = query(
    collection(db, 'notifications'),
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  );

  if (lastDoc) {
    q = query(q, startAfter(lastDoc), limit(pageSize));
  } else {
    q = query(q, limit(pageSize));
  }

  const snapshot = await getDocs(q);
  return {
    notifications: snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Notification)),
    lastDoc: snapshot.docs[snapshot.docs.length - 1]
  };
};

// Certificates
export const getCertificates = async (userId: string) => {
  const q = query(
    collection(db, 'certificates'),
    where('userId', '==', userId),
    orderBy('earnedAt', 'desc')
  );
  
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Certificate));
};

export const generateCertificate = async (userId: string, courseId: string, testId: string, score: number) => {
  const certificate: Omit<Certificate, 'id'> = {
    userId,
    courseId,
    testId,
    earnedAt: Timestamp.now(),
    title: 'Course Completion Certificate',
    description: 'Successfully completed the course and passed the certification exam',
    imageUrl: '', // Will be generated
    verificationUrl: '', // Will be generated
    metadata: {
      score,
      completionDate: Timestamp.now(),
      skills: ['Agile', 'Scrum', 'Project Management']
    }
  };

  const docRef = await addDoc(collection(db, 'certificates'), certificate);
  return docRef.id;
};

// File Upload
export const uploadFile = async (file: File, path: string): Promise<string> => {
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
};