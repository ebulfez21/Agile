import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  BookOpen, 
  Award, 
  Clock, 
  TrendingUp, 
  Calendar,
  CheckCircle,
  Star,
  BarChart2
} from 'lucide-react';

const Dashboard = () => {
  const { currentUser, userProfile } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!currentUser) {
      navigate('/auth');
    }
  }, [currentUser, navigate]);

  const stats = [
    {
      icon: <BookOpen className="h-6 w-6 text-indigo-600" />,
      label: 'Courses in Progress',
      value: '4',
    },
    {
      icon: <Award className="h-6 w-6 text-green-600" />,
      label: 'Completed Courses',
      value: '6',
    },
    {
      icon: <Clock className="h-6 w-6 text-blue-600" />,
      label: 'Study Hours',
      value: '45',
    },
    {
      icon: <Star className="h-6 w-6 text-yellow-600" />,
      label: 'Average Score',
      value: '92%',
    },
  ];

  const recentActivities = [
    {
      type: 'course',
      title: 'Advanced Scrum Master',
      date: '2024-03-15',
      progress: 75,
    },
    {
      type: 'test',
      title: 'Agile Fundamentals Quiz',
      date: '2024-03-14',
      score: 90,
    },
    {
      type: 'certificate',
      title: 'Scrum Master Certification',
      date: '2024-03-10',
    },
  ];

  const upcomingEvents = [
    {
      title: 'Agile Workshop',
      date: '2024-03-20',
      time: '14:00',
      type: 'workshop',
    },
    {
      title: 'Sprint Planning Session',
      date: '2024-03-22',
      time: '10:00',
      type: 'meeting',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {userProfile?.displayName || currentUser?.email}
          </h1>
          <p className="mt-2 text-gray-600">
            Track your progress and manage your learning journey
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className="mt-2 text-3xl font-semibold text-gray-900">{stat.value}</p>
                </div>
                {stat.icon}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      {activity.type === 'course' ? (
                        <BookOpen className="h-5 w-5 text-indigo-600 mr-3" />
                      ) : activity.type === 'test' ? (
                        <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                      ) : (
                        <Award className="h-5 w-5 text-yellow-600 mr-3" />
                      )}
                      <div>
                        <p className="font-medium text-gray-900">{activity.title}</p>
                        <p className="text-sm text-gray-500">{activity.date}</p>
                      </div>
                    </div>
                    {activity.progress && (
                      <div className="w-24">
                        <div className="bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-indigo-600 rounded-full h-2"
                            style={{ width: `${activity.progress}%` }}
                          />
                        </div>
                      </div>
                    )}
                    {activity.score && (
                      <span className="text-green-600 font-semibold">{activity.score}%</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Learning Progress */}
            <div className="mt-8 bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Learning Progress</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Agile Fundamentals</span>
                  <span className="text-indigo-600 font-medium">75%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-indigo-600 rounded-full h-2" style={{ width: '75%' }} />
                </div>

                <div className="flex items-center justify-between mt-4">
                  <span className="text-gray-600">Scrum Master Course</span>
                  <span className="text-indigo-600 font-medium">60%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-indigo-600 rounded-full h-2" style={{ width: '60%' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Upcoming Events */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Events</h2>
              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="flex items-start">
                    <Calendar className="h-5 w-5 text-indigo-600 mt-1 mr-3" />
                    <div>
                      <p className="font-medium text-gray-900">{event.title}</p>
                      <p className="text-sm text-gray-500">
                        {event.date} at {event.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button
                  onClick={() => navigate('/courses')}
                  className="w-full flex items-center justify-between px-4 py-2 bg-gray-50 rounded-lg hover:bg-gray-100"
                >
                  <span className="text-gray-700">Browse Courses</span>
                  <BookOpen className="h-5 w-5 text-gray-500" />
                </button>
                <button
                  onClick={() => navigate('/tests')}
                  className="w-full flex items-center justify-between px-4 py-2 bg-gray-50 rounded-lg hover:bg-gray-100"
                >
                  <span className="text-gray-700">Take a Test</span>
                  <CheckCircle className="h-5 w-5 text-gray-500" />
                </button>
                <button
                  onClick={() => navigate('/profile')}
                  className="w-full flex items-center justify-between px-4 py-2 bg-gray-50 rounded-lg hover:bg-gray-100"
                >
                  <span className="text-gray-700">Update Profile</span>
                  <TrendingUp className="h-5 w-5 text-gray-500" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;