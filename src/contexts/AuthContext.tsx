import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile as updateFirebaseProfile,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { auth } from '../firebase';
import { getUserProfile, updateUserProfile } from '../services/firebase';
import type { UserProfile } from '../types';

interface AuthContextType {
  currentUser: User | null;
  userProfile: UserProfile | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, displayName: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        const profile = await getUserProfile(user.uid);
        setUserProfile(profile);
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signup = async (email: string, password: string, displayName: string) => {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    await updateFirebaseProfile(user, { displayName });
    
    const userProfile: UserProfile = {
      uid: user.uid,
      email: user.email!,
      displayName,
      photoURL: user.photoURL || '',
      role: 'user',
      createdAt: new Date(),
      lastLogin: new Date(),
      preferences: {
        language: 'en',
        notifications: true,
        theme: 'light'
      }
    };
    
    await updateUserProfile(user.uid, userProfile);
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const { user } = await signInWithPopup(auth, provider);
    
    const existingProfile = await getUserProfile(user.uid);
    if (!existingProfile) {
      const userProfile: UserProfile = {
        uid: user.uid,
        email: user.email!,
        displayName: user.displayName || '',
        photoURL: user.photoURL || '',
        role: 'user',
        createdAt: new Date(),
        lastLogin: new Date(),
        preferences: {
          language: 'en',
          notifications: true,
          theme: 'light'
        }
      };
      await updateUserProfile(user.uid, userProfile);
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  const updateProfile = async (data: Partial<UserProfile>) => {
    if (!currentUser) return;
    await updateUserProfile(currentUser.uid, data);
    setUserProfile(prev => prev ? { ...prev, ...data } : null);
  };

  const value = {
    currentUser,
    userProfile,
    login,
    signup,
    logout,
    loading,
    updateProfile,
    signInWithGoogle
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};