import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import * as FirebaseService from '../services/firebase';
import type { Course, Test, UserProfile, TestResult } from '../types';

export const useCourses = (isPremium = false) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await FirebaseService.getCourses(isPremium);
        setCourses(data);
      } catch (err) {
        setError('Failed to fetch courses');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [isPremium]);

  return { courses, loading, error };
};

export const useTests = (type: 'free' | 'premium') => {
  const [tests, setTests] = useState<Test[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const data = await FirebaseService.getTests(type);
        setTests(data);
      } catch (err) {
        setError('Failed to fetch tests');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTests();
  }, [type]);

  return { tests, loading, error };
};

export const useUserProfile = () => {
  const { currentUser } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!currentUser?.uid) {
        setProfile(null);
        setLoading(false);
        return;
      }

      try {
        const data = await FirebaseService.getUserProfile(currentUser.uid);
        setProfile(data);
      } catch (err) {
        setError('Failed to fetch user profile');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [currentUser]);

  const updateProfile = async (data: Partial<UserProfile>) => {
    if (!currentUser?.uid) return;

    try {
      await FirebaseService.updateUserProfile(currentUser.uid, data);
      setProfile(prev => prev ? { ...prev, ...data } : null);
    } catch (err) {
      setError('Failed to update profile');
      console.error(err);
    }
  };

  return { profile, loading, error, updateProfile };
};

export const useTestResults = () => {
  const { currentUser } = useAuth();
  const [results, setResults] = useState<TestResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      if (!currentUser?.uid) {
        setResults([]);
        setLoading(false);
        return;
      }

      try {
        const data = await FirebaseService.getTestResults(currentUser.uid);
        setResults(data);
      } catch (err) {
        setError('Failed to fetch test results');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [currentUser]);

  return { results, loading, error };
};