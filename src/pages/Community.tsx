import React, { useState } from 'react';
import { Users, Calendar, MapPin, ArrowRight, Search, Filter } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Community = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');

  const eventTypes = ['all', 'Webinar', 'Workshop', 'Conference', 'Meetup'];
  const locations = ['all', 'Virtual Event', 'London, UK', 'New York, USA', 'Tokyo, Japan'];

  const upcomingEvents = [
    {
      id: 1,
      title: 'Agile Meetup 2024',
      date: 'March 15, 2024',
      location: 'Virtual Event',
      attendees: 150,
      type: 'Webinar',
      description: 'Join us for an interactive session on Agile best practices.'
    },
    {
      id: 2,
      title: 'Scrum Master Workshop',
      date: 'March 20, 2024',
      location: 'London, UK',
      attendees: 50,
      type: 'Workshop',
      description: 'Hands-on workshop for aspiring Scrum Masters.'
    },
    {
      id: 3,
      title: 'Agile Conference 2024',
      date: 'April 5, 2024',
      location: 'New York, USA',
      attendees: 300,
      type: 'Conference',
      description: 'Annual conference featuring industry leaders.'
    },
    {
      id: 4,
      title: 'Kanban Implementation',
      date: 'April 15, 2024',
      location: 'Tokyo, Japan',
      attendees: 80,
      type: 'Workshop',
      description: 'Learn how to implement Kanban in your organization.'
    }
  ];

  const communityGroups = [
    {
      id: 1,
      name: 'Agile Practitioners',
      members: 1200,
      description: 'A group for experienced Agile practitioners to share knowledge and best practices.',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      id: 2,
      name: 'Scrum Masters Network',
      members: 850,
      description: 'Connect with fellow Scrum Masters and share experiences.',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
  ];

  const handleRegister = (eventId: number) => {
    if (!currentUser) {
      navigate('/auth');
      return;
    }
    // Add your event registration logic here
    console.log('Registering for event:', eventId);
  };

  const handleJoinGroup = (groupId: number) => {
    if (!currentUser) {
      navigate('/auth');
      return;
    }
    // Add your group joining logic here
    console.log('Joining group:', groupId);
  };

  const filteredEvents = upcomingEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || event.type === selectedType;
    const matchesLocation = selectedLocation === 'all' || event.location === selectedLocation;
    return matchesSearch && matchesType && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Agile Community</h1>
          <p className="text-xl text-gray-600">Connect, learn, and grow with fellow Agile practitioners</p>
        </div>

        {/* Filters Section */}
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                {eventTypes.map(type => (
                  <option key={type} value={type}>
                    {type === 'all' ? 'All Types' : type}
                  </option>
                ))}
              </select>
            </div>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                {locations.map(location => (
                  <option key={location} value={location}>
                    {location === 'all' ? 'All Locations' : location}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Upcoming Events Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <div key={event.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-indigo-100 text-indigo-800 text-sm px-3 py-1 rounded-full">
                    {event.type}
                  </span>
                  <span className="text-gray-500 text-sm">{event.attendees} attendees</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{event.title}</h3>
                <p className="text-gray-600 mb-4">{event.description}</p>
                <div className="flex items-center text-gray-600 mb-2">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>{event.location}</span>
                </div>
                <button
                  onClick={() => handleRegister(event.id)}
                  className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
                >
                  Register Now
                </button>
              </div>
            ))}
          </div>
          {filteredEvents.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-600">No events found matching your criteria.</p>
            </div>
          )}
        </section>

        {/* Community Groups Section */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Community Groups</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {communityGroups.map((group) => (
              <div key={group.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="flex flex-col md:flex-row">
                  <div className="w-full md:w-1/3">
                    <img
                      src={group.image}
                      alt={group.name}
                      className="w-full h-48 md:h-full object-cover"
                    />
                  </div>
                  <div className="w-full md:w-2/3 p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{group.name}</h3>
                    <div className="flex items-center text-gray-600 mb-3">
                      <Users className="h-4 w-4 mr-2" />
                      <span>{group.members} members</span>
                    </div>
                    <p className="text-gray-600 mb-4 line-clamp-2">{group.description}</p>
                    <button
                      onClick={() => handleJoinGroup(group.id)}
                      className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
                    >
                      Join Group
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Community;