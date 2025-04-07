import React, { useState, useEffect } from 'react';
import { Target, Users, Award, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const team = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
      bio: 'Certified Scrum Trainer with 15+ years of experience in Agile transformations.',
      social: {
        linkedin: '#',
        twitter: '#'
      }
    },
    {
      name: 'Michael Chen',
      role: 'Lead Instructor',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
      bio: 'PSM III certified with extensive experience in enterprise Agile coaching.',
      social: {
        linkedin: '#',
        twitter: '#'
      }
    },
    {
      name: 'Emma Rodriguez',
      role: 'Curriculum Developer',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
      bio: 'Agile expert with a passion for creating engaging learning experiences.',
      social: {
        linkedin: '#',
        twitter: '#'
      }
    }
  ];

  const values = [
    {
      icon: <Target className="h-8 w-8 text-indigo-600" />,
      title: 'Mission',
      description: 'To empower individuals and organizations with Agile knowledge and practices for better project outcomes.'
    },
    {
      icon: <Users className="h-8 w-8 text-indigo-600" />,
      title: 'Community',
      description: 'Building a supportive community of Agile practitioners who learn and grow together.'
    },
    {
      icon: <Award className="h-8 w-8 text-indigo-600" />,
      title: 'Excellence',
      description: 'Committed to delivering high-quality education and maintaining the highest standards.'
    },
    {
      icon: <Zap className="h-8 w-8 text-indigo-600" />,
      title: 'Innovation',
      description: 'Continuously evolving our methods and embracing new technologies in Agile education.'
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const statsSection = document.getElementById('stats-section');
      if (statsSection) {
        const rect = statsSection.getBoundingClientRect();
        setIsVisible(rect.top < window.innerHeight - 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on initial render
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">About Agile Learning Platform</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We are dedicated to making Agile methodology accessible to everyone through comprehensive
            education and practical training.
          </p>
        </motion.div>

        {/* Values Section */}
        <section className="mb-16">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-2xl font-bold text-gray-900 mb-8 text-center"
          >
            Our Values
          </motion.h2>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {values.map((value, index) => (
              <motion.div 
                key={index} 
                variants={itemVariants}
                className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex justify-center mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Team Section */}
        <section className="mb-16">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-2xl font-bold text-gray-900 mb-8 text-center"
          >
            Meet Our Team
          </motion.h2>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {team.map((member, index) => (
              <motion.div 
                key={index} 
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-indigo-600 mb-3">{member.role}</p>
                  <p className="text-gray-600 mb-4">{member.bio}</p>
                  <div className="flex space-x-4">
                    <a href={member.social.linkedin} className="text-indigo-600 hover:text-indigo-800">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a href={member.social.twitter} className="text-indigo-600 hover:text-indigo-800">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Stats Section */}
        <motion.section 
          id="stats-section"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="bg-indigo-600 rounded-lg p-8 text-white mb-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <motion.div
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-4xl font-bold mb-2">
                {isVisible && <CountUp start={0} end={10000} duration={2} separator="," />}+
              </div>
              <div className="text-indigo-200">Students Trained</div>
            </motion.div>
            <motion.div
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="text-4xl font-bold mb-2">
                {isVisible && <CountUp start={0} end={50} duration={2} />}+
              </div>
              <div className="text-indigo-200">Expert Instructors</div>
            </motion.div>
            <motion.div
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="text-4xl font-bold mb-2">
                {isVisible && <CountUp start={0} end={95} duration={2} />}%
              </div>
              <div className="text-indigo-200">Satisfaction Rate</div>
            </motion.div>
          </div>
        </motion.section>

        {/* Testimonials Section */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">What Our Students Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=crop&w=80&q=80" 
                  alt="James Wilson" 
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">James Wilson</h4>
                  <p className="text-indigo-600">Scrum Master at TechCorp</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "The training I received here completely transformed how I approach project management. The instructors are world-class and the curriculum is perfectly structured."
              </p>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=80&q=80" 
                  alt="Lisa Rodriguez" 
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">Lisa Rodriguez</h4>
                  <p className="text-indigo-600">Product Owner at InnovateCo</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "As someone new to Agile, I found the courses incredibly accessible. The community support and practical exercises made all the difference in my learning journey."
              </p>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default About;