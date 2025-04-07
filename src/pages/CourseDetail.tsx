import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, Tag, BookOpen, Lock, CheckCircle, Play, Download, Share2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const CourseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentUser, userProfile } = useAuth();
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);

  // Sample course data (replace with actual data from your database)
  const course = {
    id: id,
    title: 'Advanced Agile Project Management',
    description: 'Master advanced Agile project management techniques and methodologies. Learn how to effectively lead Agile teams and deliver successful projects.',
    level: 'Advanced',
    duration: 180,
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    isPremium: true,
    topics: [
      'Introduction to Advanced Agile Concepts',
      'Scaling Agile in Organizations',
      'Advanced Sprint Planning Techniques',
      'Risk Management in Agile Projects',
      'Agile Leadership and Team Dynamics',
      'Metrics and KPIs for Agile Projects',
      'Advanced Retrospective Techniques',
      'Continuous Improvement Strategies'
    ],
    instructor: {
      name: 'Dr. Sarah Johnson',
      title: 'Agile Coach & Consultant',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80'
    }
  };

  const canAccess = !course?.isPremium || userProfile?.role === 'premium' || userProfile?.role === 'admin';

  const handleTopicClick = async (index: number) => {
    if (!canAccess || !currentUser) {
      if (!currentUser) {
        navigate('/auth');
        return;
      }
      navigate('/premium');
      return;
    }
    setSelectedTopic(index);
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: course.title,
        text: course.description,
        url: window.location.href
      });
    } catch (err) {
      console.error('Failed to share:', err);
    }
  };

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Course Not Found</h2>
          <p className="text-gray-600 mb-4">The course you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => navigate('/courses')}
            className="text-indigo-600 hover:text-indigo-800 font-medium"
          >
            Browse All Courses
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="relative">
            <img
              src={course.imageUrl}
              alt={course.title}
              className="w-full h-64 object-cover"
            />
            {course.isPremium && (
              <div className="absolute top-4 right-4 bg-indigo-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                Premium Course
              </div>
            )}
          </div>

          <div className="p-8">
            <div className="flex justify-between items-start mb-6">
              <h1 className="text-3xl font-bold text-gray-900">{course.title}</h1>
              <button
                onClick={handleShare}
                className="p-2 text-gray-500 hover:text-indigo-600 transition-colors"
                title="Share course"
              >
                <Share2 className="h-5 w-5" />
              </button>
            </div>
            
            <div className="flex items-center space-x-6 mb-6 text-gray-500">
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                <span>{course.duration} minutes</span>
              </div>
              <div className="flex items-center">
                <Tag className="h-5 w-5 mr-2" />
                <span className="capitalize">{course.level}</span>
              </div>
              <div className="flex items-center">
                <BookOpen className="h-5 w-5 mr-2" />
                <span>{course.topics.length} topics</span>
              </div>
            </div>

            <div className="flex items-center mb-8">
              <img
                src={course.instructor.image}
                alt={course.instructor.name}
                className="h-12 w-12 rounded-full object-cover mr-4"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{course.instructor.name}</h3>
                <p className="text-gray-600">{course.instructor.title}</p>
              </div>
            </div>

            <p className="text-gray-600 mb-8">{course.description}</p>

            <div className="border-t border-gray-200 pt-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Course Topics</h2>
              <div className="space-y-4">
                {course.topics.map((topic, index) => (
                  <div
                    key={index}
                    onClick={() => handleTopicClick(index)}
                    className={`flex items-center justify-between p-4 rounded-lg transition-colors cursor-pointer ${
                      canAccess 
                        ? 'bg-gray-50 hover:bg-gray-100'
                        : 'bg-gray-50 cursor-not-allowed'
                    } ${selectedTopic === index ? 'ring-2 ring-indigo-500' : ''}`}
                  >
                    <div className="flex items-center flex-1">
                      {canAccess ? (
                        <CheckCircle className={`h-5 w-5 mr-3 ${
                          selectedTopic === index ? 'text-indigo-500' : 'text-green-500'
                        }`} />
                      ) : (
                        <Lock className="h-5 w-5 text-gray-400 mr-3" />
                      )}
                      <span className="text-gray-700">{topic}</span>
                    </div>
                    {canAccess && (
                      <div className="flex items-center space-x-2">
                        <button
                          className="p-2 text-gray-500 hover:text-indigo-600 transition-colors"
                          title="Play topic"
                        >
                          <Play className="h-4 w-4" />
                        </button>
                        <button
                          className="p-2 text-gray-500 hover:text-indigo-600 transition-colors"
                          title="Download materials"
                        >
                          <Download className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {!canAccess && (
              <div className="mt-8 bg-indigo-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-indigo-900 mb-2">
                  Upgrade to Premium
                </h3>
                <p className="text-indigo-700 mb-4">
                  Get access to this course and all other premium content by upgrading your account.
                </p>
                <button
                  onClick={() => navigate('/premium')}
                  className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors"
                >
                  Upgrade Now
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;