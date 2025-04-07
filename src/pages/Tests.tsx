import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Clock, Award, Users, Brain, ArrowRight, Trophy, Filter, Lock, 
  AlertCircle, CheckCircle, XCircle, BarChart2, Star, Zap, BookOpen, 
  ChevronDown, ChevronUp, RotateCw, Search
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';

interface TestResult {
  userId: string;
  userName: string;
  score: number;
  completionTime: number;
  date: Date;
}

interface Test {
  id: string;
  title: string;
  description: string;
  duration: number;
  questionsCount: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  participants: number;
  avgScore: number;
  imageUrl: string;
  isPremium?: boolean;
  category: string;
  rating?: number;
  featured?: boolean;
}

const Tests = () => {
  const navigate = useNavigate();
  const { currentUser, userProfile } = useAuth();
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showPremium, setShowPremium] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [userResults, setUserResults] = useState<TestResult[]>([]);
  const [expandedTestId, setExpandedTestId] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'popular' | 'newest' | 'rating'>('popular');

  const categories = [
    'all',
    'Scrum',
    'Kanban',
    'Agile Fundamentals',
    'Project Management',
    'Leadership',
    'DevOps',
    'Scaled Agile',
    'Lean',
    'Extreme Programming',
    'SAFe',
    'Product Ownership'
  ];

  // Sample leaderboard data
  const leaderboardData: TestResult[] = [
    { userId: '1', userName: 'John Smith', score: 98, completionTime: 25, date: new Date('2024-03-10') },
    { userId: '2', userName: 'Emma Wilson', score: 96, completionTime: 28, date: new Date('2024-03-09') },
    { userId: '3', userName: 'Michael Brown', score: 95, completionTime: 30, date: new Date('2024-03-08') },
    { userId: '4', userName: 'Sarah Davis', score: 93, completionTime: 27, date: new Date('2024-03-07') },
    { userId: '5', userName: 'James Johnson', score: 92, completionTime: 32, date: new Date('2024-03-06') },
  ];

  // Free tests data - expanded with more tests
  const freeTests: Test[] = [
    {
      id: '1',
      title: 'Agile Fundamentals Certification',
      description: 'Test your knowledge of basic Agile concepts and principles. Perfect for beginners starting their Agile journey. Covers the Agile Manifesto, values, and principles.',
      duration: 30,
      questionsCount: 25,
      difficulty: 'Easy',
      participants: 1250,
      avgScore: 85,
      category: 'Agile Fundamentals',
      imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      rating: 4.7,
      featured: true
    },
    {
      id: '2',
      title: 'Scrum Framework Mastery',
      description: 'Comprehensive test on Scrum roles, events, and artifacts. Ideal for practicing Scrum Masters and Product Owners. Includes questions on Sprint Planning, Daily Scrum, Sprint Review and Retrospective.',
      duration: 45,
      questionsCount: 35,
      difficulty: 'Medium',
      participants: 980,
      avgScore: 78,
      category: 'Scrum',
      imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      rating: 4.5
    },
    {
      id: '3',
      title: 'Kanban Methodology Essentials',
      description: 'Test your understanding of Kanban principles, practices, and implementation strategies. Covers Kanban boards, WIP limits, flow metrics, and continuous improvement.',
      duration: 35,
      questionsCount: 30,
      difficulty: 'Easy',
      participants: 850,
      avgScore: 82,
      category: 'Kanban',
      imageUrl: 'https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      rating: 4.3
    },
    {
      id: '4',
      title: 'Agile Project Management',
      description: 'Test your knowledge of Agile project management techniques, including estimation, planning, and tracking progress in Agile projects.',
      duration: 40,
      questionsCount: 30,
      difficulty: 'Medium',
      participants: 720,
      avgScore: 75,
      category: 'Project Management',
      imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      rating: 4.2
    },
    {
      id: '5',
      title: 'Agile Leadership Principles',
      description: 'Assess your understanding of Agile leadership, servant leadership, and creating high-performing teams in Agile environments.',
      duration: 30,
      questionsCount: 25,
      difficulty: 'Medium',
      participants: 650,
      avgScore: 80,
      category: 'Leadership',
      imageUrl: 'https://images.unsplash.com/photo-1552581234-26160f608093?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      rating: 4.4
    },
    {
      id: '6',
      title: 'DevOps for Agile Teams',
      description: 'Test your knowledge of DevOps practices and how they integrate with Agile methodologies. Covers CI/CD, automation, and collaboration between teams.',
      duration: 45,
      questionsCount: 35,
      difficulty: 'Medium',
      participants: 580,
      avgScore: 72,
      category: 'DevOps',
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      rating: 4.1
    },
    {
      id: '7',
      title: 'Extreme Programming (XP) Basics',
      description: 'Test your understanding of Extreme Programming practices including pair programming, test-driven development, and continuous integration.',
      duration: 35,
      questionsCount: 30,
      difficulty: 'Medium',
      participants: 420,
      avgScore: 78,
      category: 'Extreme Programming',
      imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      rating: 4.0
    },
    {
      id: '8',
      title: 'Lean Software Development',
      description: 'Assess your knowledge of Lean principles applied to software development, including eliminating waste, amplifying learning, and delivering fast.',
      duration: 30,
      questionsCount: 25,
      difficulty: 'Medium',
      participants: 380,
      avgScore: 81,
      category: 'Lean',
      imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      rating: 4.2
    }
  ];

  // Premium tests data - expanded with more tests
  const premiumTests: Test[] = [
    {
      id: 'p1',
      title: 'Advanced Agile Practices',
      description: 'Deep dive into advanced Agile concepts, scaling frameworks, and enterprise agility. Covers topics like Agile at scale, portfolio management, and Agile contracting.',
      duration: 60,
      questionsCount: 50,
      difficulty: 'Hard',
      participants: 450,
      avgScore: 72,
      category: 'Scaled Agile',
      imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      isPremium: true,
      rating: 4.6
    },
    {
      id: 'p2',
      title: 'SAFe Implementation Expert',
      description: 'Comprehensive test on Scaled Agile Framework (SAFe) implementation and practices. Includes questions on Agile Release Trains, PI Planning, and Lean-Agile leadership.',
      duration: 75,
      questionsCount: 60,
      difficulty: 'Hard',
      participants: 320,
      avgScore: 68,
      category: 'SAFe',
      imageUrl: 'https://images.unsplash.com/photo-1552581234-26160f608093?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      isPremium: true,
      rating: 4.5
    },
    {
      id: 'p3',
      title: 'Professional Scrum Master II',
      description: 'Advanced test for experienced Scrum Masters covering complex Scrum implementations, organizational change, and coaching techniques.',
      duration: 90,
      questionsCount: 70,
      difficulty: 'Hard',
      participants: 280,
      avgScore: 65,
      category: 'Scrum',
      imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      isPremium: true,
      rating: 4.7
    },
    {
      id: 'p4',
      title: 'Agile Product Ownership',
      description: 'Advanced test on Product Ownership including vision creation, backlog management, stakeholder engagement, and value maximization techniques.',
      duration: 60,
      questionsCount: 50,
      difficulty: 'Hard',
      participants: 350,
      avgScore: 70,
      category: 'Product Ownership',
      imageUrl: 'https://images.unsplash.com/photo-1552581234-26160f608093?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      isPremium: true,
      rating: 4.4
    },
    {
      id: 'p5',
      title: 'Enterprise Agile Coaching',
      description: 'Test your knowledge of Agile coaching at enterprise level, including transformation strategies, metrics, and leadership alignment.',
      duration: 75,
      questionsCount: 55,
      difficulty: 'Hard',
      participants: 240,
      avgScore: 67,
      category: 'Leadership',
      imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      isPremium: true,
      rating: 4.3
    }
  ];

  useEffect(() => {
    if (currentUser) {
      // Fetch user's test results
      // This would normally come from your backend
      setUserResults([
        { userId: currentUser.uid, userName: currentUser.email || '', score: 85, completionTime: 28, date: new Date('2024-03-08') },
        { userId: currentUser.uid, userName: currentUser.email || '', score: 92, completionTime: 25, date: new Date('2024-03-05') },
        { userId: currentUser.uid, userName: currentUser.email || '', score: 78, completionTime: 32, date: new Date('2024-03-01') }
      ]);
    }
  }, [currentUser]);

  const allTests = [...(showPremium ? [] : freeTests), ...(showPremium ? premiumTests : [])];
  
  const filteredTests = allTests
    .filter(test => {
      const matchesDifficulty = selectedDifficulty === 'all' || test.difficulty.toLowerCase() === selectedDifficulty.toLowerCase();
      const matchesCategory = selectedCategory === 'all' || test.category === selectedCategory;
      const matchesSearch = test.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          test.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesDifficulty && matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'popular') return b.participants - a.participants;
      if (sortBy === 'newest') return new Date(b.id.includes('p') ? '2024-03-15' : '2024-03-10').getTime() - new Date(a.id.includes('p') ? '2024-03-15' : '2024-03-10').getTime();
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      return 0;
    });

  const startTest = (test: Test) => {
    if (!currentUser) {
      navigate('/auth');
      return;
    }

    if (test.isPremium && userProfile?.role !== 'premium') {
      navigate('/premium');
      return;
    }

    navigate(`/test/${test.id}`);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'hard':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const toggleTestExpand = (testId: string) => {
    setExpandedTestId(expandedTestId === testId ? null : testId);
  };

  const renderStars = (rating: number | undefined) => {
    if (!rating) return null;
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="h-4 w-4 text-yellow-400 fill-yellow-400" />);
    }
    
    if (hasHalfStar) {
      stars.push(<Star key="half" className="h-4 w-4 text-yellow-400 fill-yellow-400/50" />);
    }
    
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="h-4 w-4 text-yellow-400" />);
    }
    
    return (
      <div className="flex items-center">
        {stars}
        <span className="ml-1 text-sm text-gray-500">({rating.toFixed(1)})</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {showPremium ? 'Premium Agile Tests' : 'Free Agile Tests'}
          </h1>
          <p className="text-xl text-gray-600">Test your knowledge and track your progress</p>
        </div>

        {/* User's Progress Section */}
        {currentUser && userResults.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12 bg-white rounded-lg shadow-md p-6"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Progress</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-800 font-semibold">Best Score</p>
                    <p className="text-3xl font-bold text-green-600">
                      {Math.max(...userResults.map(r => r.score))}%
                    </p>
                  </div>
                  <Trophy className="h-8 w-8 text-green-500" />
                </div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-800 font-semibold">Tests Taken</p>
                    <p className="text-3xl font-bold text-blue-600">{userResults.length}</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-blue-500" />
                </div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-800 font-semibold">Average Score</p>
                    <p className="text-3xl font-bold text-purple-600">
                      {Math.round(userResults.reduce((acc, curr) => acc + curr.score, 0) / userResults.length)}%
                    </p>
                  </div>
                  <Brain className="h-8 w-8 text-purple-500" />
                </div>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-800 font-semibold">Last Test</p>
                    <p className="text-lg font-bold text-orange-600">
                      {format(new Date(Math.max(...userResults.map(r => r.date.getTime()))), 'MMM dd, yyyy')}
                    </p>
                  </div>
                  <Clock className="h-8 w-8 text-orange-500" />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Filters Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8 bg-white p-4 rounded-lg shadow-sm"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search tests..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="relative">
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="all">All Difficulties</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="popular">Sort by: Popular</option>
                <option value="newest">Sort by: Newest</option>
                <option value="rating">Sort by: Rating</option>
              </select>
            </div>
            <button
              onClick={() => setShowPremium(!showPremium)}
              className={`px-4 py-2 rounded-md transition-colors flex items-center justify-center ${
                showPremium
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300'
              }`}
            >
              {showPremium ? (
                <>
                  <Lock className="h-5 w-5 mr-2" />
                  Premium Tests
                </>
              ) : (
                <>
                  <BookOpen className="h-5 w-5 mr-2" />
                  Free Tests
                </>
              )}
            </button>
          </div>
        </motion.div>

        {/* Tests Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredTests.map((test) => (
              <motion.div
                key={test.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <div className="relative">
                  <img
                    src={test.imageUrl}
                    alt={test.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(test.difficulty)}`}>
                      {test.difficulty}
                    </span>
                    {test.isPremium && (
                      <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                        <Lock className="h-4 w-4 mr-1" />
                        Premium
                      </span>
                    )}
                    {test.featured && (
                      <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                        <Zap className="h-4 w-4 mr-1" />
                        Featured
                      </span>
                    )}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {test.title}
                  </h3>
                  {test.rating && renderStars(test.rating)}
                  <p className={`text-gray-600 mb-4 ${expandedTestId === test.id ? '' : 'line-clamp-2'}`}>
                    {test.description}
                  </p>
                  <button
                    onClick={() => toggleTestExpand(test.id)}
                    className="text-sm text-indigo-600 hover:text-indigo-800 mb-4 flex items-center"
                  >
                    {expandedTestId === test.id ? (
                      <>
                        Show less <ChevronUp className="ml-1 h-4 w-4" />
                      </>
                    ) : (
                      <>
                        Show more <ChevronDown className="ml-1 h-4 w-4" />
                      </>
                    )}
                  </button>
                  <div className="grid grid-cols-2 gap-4 mb-6 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      {test.duration} mins
                    </div>
                    <div className="flex items-center">
                      <Brain className="h-4 w-4 mr-2" />
                      {test.questionsCount} questions
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      {test.participants.toLocaleString()} taken
                    </div>
                    <div className="flex items-center">
                      <Award className="h-4 w-4 mr-2" />
                      {test.avgScore}% avg
                    </div>
                  </div>
                  <button
                    onClick={() => startTest(test)}
                    className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors flex items-center justify-center"
                  >
                    {test.isPremium && (!currentUser || userProfile?.role !== 'premium') 
                      ? 'Upgrade to Premium' 
                      : 'Start Test'}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredTests.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 bg-white rounded-lg shadow-sm"
          >
            <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No tests found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your filters or search terms
            </p>
            <button
              onClick={() => {
                setSelectedDifficulty('all');
                setSelectedCategory('all');
                setSearchTerm('');
              }}
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center mx-auto"
            >
              <RotateCw className="h-4 w-4 mr-2" />
              Reset Filters
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Tests;