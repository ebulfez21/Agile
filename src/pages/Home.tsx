import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, Award, FileText, ArrowRight, Star, Clock, Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';

const Home = () => {
  const { currentUser } = useAuth();
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1 });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (inView && !hasAnimated) {
      controls.start("visible");
      setHasAnimated(true);
    }
  }, [inView, controls, hasAnimated]);

  const features = [
    {
      icon: <BookOpen className="h-12 w-12 text-indigo-600 mb-4" />,
      title: 'Free Courses',
      description: 'Access comprehensive learning materials and practice tests'
    },
    {
      icon: <Award className="h-12 w-12 text-indigo-600 mb-4" />,
      title: 'Certification',
      description: 'Prepare for professional certifications with premium content'
    },
    {
      icon: <Users className="h-12 w-12 text-indigo-600 mb-4" />,
      title: 'Community',
      description: 'Join a thriving community of Agile practitioners'
    },
    {
      icon: <FileText className="h-12 w-12 text-indigo-600 mb-4" />,
      title: 'Resources',
      description: 'Access articles, case studies, and best practices'
    }
  ];

  const stats = [
    { number: 10000, label: 'Active Students', suffix: '+' },
    { number: 95, label: 'Success Rate', suffix: '%' },
    { number: 50, label: 'Expert Instructors', suffix: '+' },
    { number: 200, label: 'Course Materials', suffix: '+' }
  ];

  const popularCourses = [
    {
      title: 'Scrum Master Fundamentals',
      level: 'Beginner',
      duration: '6 hours',
      rating: 4.8,
      students: 1234,
      image: 'https://images.unsplash.com/photo-1553028826-f4804a6dba3b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Advanced Agile Project Management',
      level: 'Advanced',
      duration: '8 hours',
      rating: 4.9,
      students: 856,
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Kanban Methodology',
      level: 'Intermediate',
      duration: '5 hours',
      rating: 4.7,
      students: 978,
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  };

  const statItemVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="py-20 md:py-28"
          >
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Master Agile Methodology
              </h1>
              <p className="text-xl mb-8 text-indigo-100">
                Join thousands of successful professionals who have transformed their careers through our comprehensive Agile training platform
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/courses"
                  className="bg-white text-indigo-600 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors hover:scale-105 transform"
                >
                  Start Learning
                </Link>
                {!currentUser && (
                  <Link
                    to="/auth"
                    className="bg-indigo-500 text-white px-8 py-3 rounded-md font-semibold hover:bg-indigo-400 transition-colors hover:scale-105 transform"
                  >
                    Sign Up Free
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <div 
        ref={ref}
        className="bg-white border-b"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div 
            initial="hidden"
            animate={controls}
            variants={containerVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          >
            {stats.map((stat, index) => (
              <motion.div 
                key={index} 
                variants={statItemVariants}
                className="p-4"
              >
                <div className="text-3xl md:text-4xl font-bold text-indigo-600 mb-2">
                  {inView && (
                    <CountUp
                      end={stat.number}
                      duration={2.5}
                      suffix={stat.suffix}
                    />
                  )}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Everything You Need to Master Agile
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive learning resources for both beginners and professionals
            </p>
          </motion.div>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div 
                key={index} 
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all"
              >
                <div className="flex justify-center">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-center">{feature.title}</h3>
                <p className="text-gray-600 text-center">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Popular Courses Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-between items-center mb-12"
          >
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Popular Courses
              </h2>
              <p className="text-xl text-gray-600">
                Start your journey with our most popular courses
              </p>
            </div>
            <Link
              to="/courses"
              className="hidden md:flex items-center text-indigo-600 hover:text-indigo-800 group"
            >
              View All Courses
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {popularCourses.map((course, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.03 }}
              >
                <Link
                  to="/courses"
                  className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all"
                >
                  <div className="relative">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full text-sm font-medium text-gray-600 shadow-sm">
                      {course.level}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {course.title}
                    </h3>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 mr-1" />
                        <span>{course.rating}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        <span>{course.students.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
          <div className="mt-8 text-center md:hidden">
            <Link
              to="/courses"
              className="inline-flex items-center text-indigo-600 hover:text-indigo-800 group"
            >
              View All Courses
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold mb-4">
              Ready to Start Your Agile Journey?
            </h2>
            <p className="text-xl text-indigo-100 mb-8">
              Join thousands of successful professionals who have transformed their careers
            </p>
            <Link
              to={currentUser ? "/courses" : "/auth"}
              className="bg-white text-indigo-600 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 inline-block hover:scale-105 transform transition-transform"
            >
              {currentUser ? "Browse Courses" : "Get Started Free"}
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Trust Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Trusted by Industry Leaders
            </h2>
            <p className="text-xl text-gray-600">
              Our platform is recognized for its quality and effectiveness
            </p>
          </motion.div>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <motion.div 
              variants={itemVariants}
              className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow"
            >
              <Shield className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Industry Standard</h3>
              <p className="text-gray-600">
                Aligned with latest Agile practices and methodologies
              </p>
            </motion.div>
            <motion.div 
              variants={itemVariants}
              className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow"
            >
              <Award className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Certified Content</h3>
              <p className="text-gray-600">
                Created by certified Agile experts and practitioners
              </p>
            </motion.div>
            <motion.div 
              variants={itemVariants}
              className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow"
            >
              <Users className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Active Community</h3>
              <p className="text-gray-600">
                Learn and grow with fellow Agile enthusiasts
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Home;