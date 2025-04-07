import React, { useState } from 'react';
import { FileText, Clock, User, Tag } from 'lucide-react';

const Articles = () => {
  const [articles, setArticles] = useState([
    {
      id: 1,
      title: 'Understanding Agile Methodology',
      description: 'A comprehensive guide to understanding the core principles of Agile methodology and its implementation in modern software development.',
      author: 'John Doe',
      date: '2024-02-20',
      readTime: '8 min',
      tags: ['Agile', 'Methodology', 'Software Development'],
      image: 'https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      id: 2,
      title: 'Scrum vs Kanban: Which One Should You Choose?',
      description: 'A detailed comparison between Scrum and Kanban methodologies, helping you make the right choice for your team.',
      author: 'Jane Smith',
      date: '2024-02-18',
      readTime: '10 min',
      tags: ['Scrum', 'Kanban', 'Project Management'],
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
  ]);

  const [page, setPage] = useState(1);
  const articlesPerPage = 6;

  const loadMoreArticles = () => {
    // Simulating loading more articles
    const newArticles = [
      // Add more articles here
      {
        id: articles.length + 1,
        title: 'Advanced Scrum Techniques',
        description: 'Discover advanced techniques and strategies to improve your Scrum implementation.',
        author: 'Mike Johnson',
        date: '2024-02-15',
        readTime: '12 min',
        tags: ['Scrum', 'Advanced', 'Best Practices'],
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
      },
      // Add more articles as needed
    ];

    setArticles([...articles, ...newArticles]);
    setPage(page + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Latest Articles</h1>
          <p className="text-xl text-gray-600">Stay updated with the latest trends and insights in Agile methodology</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <div key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {article.title}
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {article.description}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    <span>{article.author}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{article.readTime}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={loadMoreArticles}
            className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Load More Articles
          </button>
        </div>
      </div>
    </div>
  );
};

export default Articles;