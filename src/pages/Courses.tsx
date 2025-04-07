import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Clock,
  Tag,
  ChevronRight,
  Search,
  Filter,
  Star,
  Users,
  Lock,
  X,
} from 'lucide-react';
import { useCourses } from '../hooks/useFirebase';
import { useAuth } from '../contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

interface Course {
  id: string;
  title: string;
  description: string;
  level: string;
  duration: number;
  imageUrl: string;
  isPremium: boolean;
  rating: number;
  students: number;
  topics: string[];
}

const Courses = () => {
  const [showPremium, setShowPremium] = useState<boolean | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const { courses = [], loading, error } = useCourses();
  const { userProfile } = useAuth();

  const levels = ['all', 'beginner', 'intermediate', 'advanced'];
  const allTopics = [
    'scrum',
    'kanban',
    'xp',
    'lean',
    'agile-coaching',
    'product-ownership',
    'sprint-planning',
    'retrospectives'
  ];

  // Always ensure courses is treated as an array
  const safeCourses = Array.isArray(courses) ? courses : [];

  // Extract unique topics from courses
  const availableTopics = Array.from(
    new Set(
      safeCourses.flatMap(course => 
        course.topics ? course.topics : []
      )
    )
  ).filter(topic => allTopics.includes(topic));

  const filteredCourses = safeCourses.filter((course: Course) => {
    // Search filter
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Level filter
    const matchesLevel =
      selectedLevel === 'all' || course.level === selectedLevel;
    
    // Premium filter
    const matchesPremium = 
      showPremium === null || 
      (showPremium ? course.isPremium : !course.isPremium);
    
    // Topic filter
    const matchesTopics = 
      selectedTopics.length === 0 || 
      (course.topics && selectedTopics.some(topic => course.topics.includes(topic)));
    
    return matchesSearch && matchesLevel && matchesPremium && matchesTopics;
  });

  const toggleTopic = (topic: string) => {
    setSelectedTopics(prev => 
      prev.includes(topic) 
        ? prev.filter(t => t !== topic) 
        : [...prev, topic]
    );
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedLevel('all');
    setSelectedTopics([]);
    setShowPremium(null);
  };

  const hasFilters = 
    searchTerm || 
    selectedLevel !== 'all' || 
    selectedTopics.length > 0 || 
    showPremium !== null;

  // Animation variants
  const courseVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col space-y-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Agile Courses</h1>
              <p className="mt-2 text-gray-600">
                Master Agile methodologies with our comprehensive courses
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowPremium(null)}
                className={`px-4 py-2 rounded-md transition-colors ${
                  showPremium === null
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                All Courses
              </button>
              <button
                onClick={() => setShowPremium(false)}
                className={`px-4 py-2 rounded-md transition-colors ${
                  showPremium === false
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                Free Courses
              </button>
              <button
                onClick={() => setShowPremium(true)}
                className={`px-4 py-2 rounded-md transition-colors ${
                  showPremium === true
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                Premium Courses
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-md appearance-none bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                {levels.map(level => (
                  <option key={level} value={level}>
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50 flex items-center"
            >
              <Filter className="h-5 w-5 mr-2" />
              More Filters
            </button>
            {hasFilters && (
              <button
                onClick={clearFilters}
                className="px-4 py-2 text-indigo-600 hover:text-indigo-800 flex items-center"
              >
                <X className="h-5 w-5 mr-1" />
                Clear Filters
              </button>
            )}
          </div>

          {/* Advanced Filters */}
          {isFilterOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
            >
              <h3 className="font-medium text-gray-900 mb-3">Topics</h3>
              <div className="flex flex-wrap gap-2">
                {availableTopics.map(topic => (
                  <button
                    key={topic}
                    onClick={() => toggleTopic(topic)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      selectedTopics.includes(topic)
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    {topic.split('-').map(word => 
                      word.charAt(0).toUpperCase() + word.slice(1)
                    ).join(' ')}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Filter Summary */}
          {hasFilters && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-wrap gap-2 items-center text-sm"
            >
              <span className="text-gray-500">Filters:</span>
              {searchTerm && (
                <span className="bg-gray-100 px-3 py-1 rounded-full flex items-center">
                  Search: "{searchTerm}"
                  <button 
                    onClick={() => setSearchTerm('')}
                    className="ml-1 text-gray-500 hover:text-gray-700"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </span>
              )}
              {selectedLevel !== 'all' && (
                <span className="bg-gray-100 px-3 py-1 rounded-full flex items-center">
                  Level: {selectedLevel.charAt(0).toUpperCase() + selectedLevel.slice(1)}
                  <button 
                    onClick={() => setSelectedLevel('all')}
                    className="ml-1 text-gray-500 hover:text-gray-700"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </span>
              )}
              {selectedTopics.map(topic => (
                <span key={topic} className="bg-gray-100 px-3 py-1 rounded-full flex items-center">
                  {topic.split('-').map(word => 
                    word.charAt(0).toUpperCase() + word.slice(1)
                  ).join(' ')}
                  <button 
                    onClick={() => toggleTopic(topic)}
                    className="ml-1 text-gray-500 hover:text-gray-700"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </span>
              ))}
              {showPremium !== null && (
                <span className="bg-gray-100 px-3 py-1 rounded-full flex items-center">
                  {showPremium ? 'Premium Only' : 'Free Only'}
                  <button 
                    onClick={() => setShowPremium(null)}
                    className="ml-1 text-gray-500 hover:text-gray-700"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </span>
              )}
            </motion.div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="min-h-[300px] bg-gray-50 flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="min-h-[300px] bg-gray-50 flex items-center justify-center">
              <div className="text-center">
                <div className="text-red-600 text-xl mb-4">{error}</div>
                <button
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}

          {/* Courses List */}
          {!loading && !error && (
            <>
              {filteredCourses.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                  <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No courses found</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {hasFilters 
                      ? 'No courses match your current filters'
                      : 'No courses available at the moment. Please check back later.'}
                  </p>
                  {hasFilters && (
                    <button
                      onClick={clearFilters}
                      className="mt-4 px-4 py-2 text-indigo-600 hover:text-indigo-800"
                    >
                      Clear all filters
                    </button>
                  )}
                </div>
              ) : (
                <motion.div 
                  className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    visible: {
                      transition: {
                        staggerChildren: 0.1
                      }
                    }
                  }}
                >
                  <AnimatePresence>
                    {filteredCourses.map((course: Course) => (
                      <motion.div
                        key={course.id}
                        variants={courseVariants}
                        transition={{ duration: 0.3 }}
                        layout
                      >
                        <Link
                          to={`/courses/${course.id}`}
                          className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 h-full"
                        >
                          <div className="relative">
                            <img
                              src={course.imageUrl}
                              alt={course.title}
                              className="w-full h-48 object-cover"
                            />
                            {course.isPremium && (
                              <div className="absolute top-4 right-4 bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                                <Lock className="h-4 w-4 mr-1" />
                                Premium
                              </div>
                            )}
                          </div>
                          <div className="p-6">
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                              {course.title}
                            </h3>
                            <p className="text-gray-600 mb-4 line-clamp-2">
                              {course.description}
                            </p>
                            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-1" />
                                <span>{course.duration} mins</span>
                              </div>
                              <div className="flex items-center">
                                <Star className="h-4 w-4 text-yellow-400 mr-1" />
                                <span>{course.rating}</span>
                              </div>
                              <div className="flex items-center">
                                <Users className="h-4 w-4 mr-1" />
                                <span>{course.students}</span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="bg-indigo-100 text-indigo-800 text-sm px-3 py-1 rounded-full capitalize">
                                {course.level}
                              </span>
                              <ChevronRight className="h-5 w-5 text-indigo-600" />
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Courses;