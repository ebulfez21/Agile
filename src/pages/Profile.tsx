import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  User,
  Mail,
  Briefcase,
  MapPin,
  Phone,
  Globe,
  Github,
  Linkedin,
  Twitter,
  Award,
  Settings,
  Bell,
  Moon,
  Sun,
} from 'lucide-react';

const Profile = () => {
  const { currentUser, userProfile, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    displayName: userProfile?.displayName || '',
    title: userProfile?.professional?.title || '',
    company: userProfile?.professional?.company || '',
    location: '',
    phone: '',
    website: userProfile?.social?.website || '',
    github: userProfile?.social?.github || '',
    linkedin: userProfile?.social?.linkedin || '',
    twitter: userProfile?.social?.twitter || '',
    bio: '',
  });

  const [preferences, setPreferences] = useState({
    theme: userProfile?.preferences?.theme || 'light',
    notifications: userProfile?.preferences?.notifications || true,
    emailPreferences: userProfile?.preferences?.emailPreferences || {
      courseUpdates: true,
      newCourses: true,
      promotions: false,
      newsletter: true,
    },
  });

  React.useEffect(() => {
    if (!currentUser) {
      navigate('/auth');
    }
  }, [currentUser, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePreferenceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setPreferences(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: checked
        }
      }));
    } else {
      setPreferences(prev => ({
        ...prev,
        [name]: checked
      }));
    }
  };

  const handleThemeChange = (theme: 'light' | 'dark') => {
    setPreferences(prev => ({
      ...prev,
      theme
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateProfile({
        displayName: formData.displayName,
        professional: {
          title: formData.title,
          company: formData.company,
        },
        social: {
          website: formData.website,
          github: formData.github,
          linkedin: formData.linkedin,
          twitter: formData.twitter,
        },
        preferences,
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const certifications = [
    {
      name: 'Certified Scrum Master',
      issuer: 'Scrum Alliance',
      date: '2024-01',
      expires: '2026-01',
    },
    {
      name: 'Advanced Agile Practitioner',
      issuer: 'Agile Learning Platform',
      date: '2023-12',
      expires: '2025-12',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Profile Header */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <img
                  src={currentUser?.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(userProfile?.displayName || currentUser?.email || '')}`}
                  alt="Profile"
                  className="h-24 w-24 rounded-full object-cover"
                />
                <button className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700">
                  <Settings className="h-4 w-4" />
                </button>
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900">
                  {userProfile?.displayName || currentUser?.email}
                </h1>
                <p className="text-gray-600">{userProfile?.professional?.title}</p>
                <p className="text-gray-500">{userProfile?.professional?.company}</p>
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
              >
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Main Profile Content */}
            <div className="md:col-span-2 space-y-8">
              {/* Profile Form */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Profile Information</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="displayName"
                        value={formData.displayName}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Professional Title</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Briefcase className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Company</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Briefcase className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Website</label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Globe className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="url"
                          name="website"
                          value={formData.website}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">GitHub</label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Github className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          name="github"
                          value={formData.github}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">LinkedIn</label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Linkedin className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          name="linkedin"
                          value={formData.linkedin}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Twitter</label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Twitter className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          name="twitter"
                          value={formData.twitter}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                    </div>
                  </div>

                  {isEditing && (
                    <div className="flex justify-end space-x-4">
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={loading}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-indigo-400"
                      >
                        {loading ? 'Saving...' : 'Save Changes'}
                      </button>
                    </div>
                  )}
                </form>
              </div>

              {/* Certifications */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Certifications</h2>
                <div className="space-y-4">
                  {certifications.map((cert, index) => (
                    <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                      <Award className="h-6 w-6 text-indigo-600 mt-1" />
                      <div>
                        <h3 className="font-medium text-gray-900">{cert.name}</h3>
                        <p className="text-sm text-gray-500">{cert.issuer}</p>
                        <p className="text-sm text-gray-500">
                          Issued: {cert.date} • Expires: {cert.expires}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Preferences */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Preferences</h2>
                
                {/* Theme Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => handleThemeChange('light')}
                      className={`flex items-center px-3 py-2 rounded-md ${
                        preferences.theme === 'light'
                          ? 'bg-indigo-100 text-indigo-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      <Sun className="h-4 w-4 mr-2" />
                      Light
                    </button>
                    <button
                      onClick={() => handleThemeChange('dark')}
                      className={`flex items-center px-3 py-2 rounded-md ${
                        preferences.theme === 'dark'
                          ? 'bg-indigo-100 text-indigo-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      <Moon className="h-4 w-4 mr-2" />
                      Dark
                    </button>
                  </div>
                </div>

                {/* Notification Preferences */}
                <div className="space-y-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="notifications"
                      checked={preferences.notifications}
                      onChange={handlePreferenceChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">Enable notifications</span>
                  </label>

                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700">Email Preferences</p>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="emailPreferences.courseUpdates"
                        checked={preferences.emailPreferences.courseUpdates}
                        onChange={handlePreferenceChange}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">Course updates</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="emailPreferences.newCourses"
                        checked={preferences.emailPreferences.newCourses}
                        onChange={handlePreferenceChange}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">New courses</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="emailPreferences.promotions"
                        checked={preferences.emailPreferences.promotions}
                        onChange={handlePreferenceChange}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">Promotions</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="emailPreferences.newsletter"
                        checked={preferences.emailPreferences.newsletter}
                        onChange={handlePreferenceChange}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">Newsletter</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;