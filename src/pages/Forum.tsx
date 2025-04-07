import React, { useState, useEffect } from 'react';
import { MessageSquare, ThumbsUp, Eye, Clock, Plus, Send, Edit, Trash } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface Discussion {
  id: number;
  title: string;
  author: string;
  authorId: string;
  category: string;
  content: string;
  replies: Reply[];
  views: number;
  likes: number;
  lastActivity: string;
  tags: string[];
  createdAt: string;
}

interface Reply {
  id: number;
  author: string;
  authorId: string;
  content: string;
  createdAt: string;
}

const Forum = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [newDiscussion, setNewDiscussion] = useState({
    title: '',
    content: '',
    category: 'general',
    tags: [] as string[],
  });
  const [newTag, setNewTag] = useState('');
  const [showDiscussionForm, setShowDiscussionForm] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const categories = [
    { id: 'all', name: 'All Topics' },
    { id: 'scrum', name: 'Scrum' },
    { id: 'kanban', name: 'Kanban' },
    { id: 'xp', name: 'Extreme Programming' },
    { id: 'general', name: 'General Discussion' },
  ];

  // Load sample data (replace with API calls in a real app)
  useEffect(() => {
    const sampleDiscussions: Discussion[] = [
      {
        id: 1,
        title: 'Best practices for remote Scrum ceremonies',
        author: 'Sarah Johnson',
        authorId: 'user1',
        category: 'scrum',
        content: 'What are some effective ways to conduct Scrum ceremonies with a fully remote team? Looking for tools and techniques that have worked well for others.',
        replies: [
          {
            id: 1,
            author: 'Mike Chen',
            authorId: 'user2',
            content: 'We use Miro for virtual whiteboarding and Zoom for video calls. The key is to keep everyone engaged with frequent check-ins.',
            createdAt: '2023-05-15T10:30:00Z'
          }
        ],
        views: 1250,
        likes: 45,
        lastActivity: '2 hours ago',
        tags: ['remote-work', 'ceremonies', 'best-practices'],
        createdAt: '2023-05-14T09:15:00Z'
      },
      {
        id: 2,
        title: 'Implementing Kanban in a traditional environment',
        author: 'Mike Chen',
        authorId: 'user2',
        category: 'kanban',
        content: 'Our organization is transitioning from waterfall to Kanban. Any advice on overcoming resistance to change?',
        replies: [
          {
            id: 2,
            author: 'Alex Wong',
            authorId: 'user3',
            content: 'Start with a pilot team that is open to change. Show measurable improvements to convince others.',
            createdAt: '2023-05-16T14:45:00Z'
          }
        ],
        views: 890,
        likes: 32,
        lastActivity: '5 hours ago',
        tags: ['transition', 'traditional', 'implementation'],
        createdAt: '2023-05-15T11:20:00Z'
      },
    ];
    setDiscussions(sampleDiscussions);
  }, []);

  const handleStartDiscussion = () => {
    if (!currentUser) {
      navigate('/auth');
      return;
    }
    setShowDiscussionForm(true);
  };

  const handleSubmitDiscussion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    
    const newDiscussionObj: Discussion = {
      id: discussions.length + 1,
      title: newDiscussion.title,
      author: currentUser.displayName || 'Anonymous',
      authorId: currentUser.uid,
      category: newDiscussion.category,
      content: newDiscussion.content,
      replies: [],
      views: 0,
      likes: 0,
      lastActivity: 'Just now',
      tags: newDiscussion.tags,
      createdAt: new Date().toISOString()
    };
    
    setDiscussions([newDiscussionObj, ...discussions]);
    setNewDiscussion({ title: '', content: '', category: 'general', tags: [] });
    setShowDiscussionForm(false);
  };

  const handleAddTag = () => {
    if (newTag.trim() && !newDiscussion.tags.includes(newTag.trim())) {
      setNewDiscussion({
        ...newDiscussion,
        tags: [...newDiscussion.tags, newTag.trim()]
      });
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setNewDiscussion({
      ...newDiscussion,
      tags: newDiscussion.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const handleSubmitReply = (discussionId: number) => {
    if (!currentUser || !replyContent.trim()) return;
    
    const updatedDiscussions = discussions.map(discussion => {
      if (discussion.id === discussionId) {
        const newReply: Reply = {
          id: discussion.replies.length + 1,
          author: currentUser.displayName || 'Anonymous',
          authorId: currentUser.uid,
          content: replyContent,
          createdAt: new Date().toISOString()
        };
        
        return {
          ...discussion,
          replies: [...discussion.replies, newReply],
          lastActivity: 'Just now'
        };
      }
      return discussion;
    });
    
    setDiscussions(updatedDiscussions);
    setReplyContent('');
    setReplyingTo(null);
  };

  const filteredDiscussions = selectedCategory === 'all'
    ? discussions
    : discussions.filter(d => d.category === selectedCategory);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Community Forum</h1>
          <button 
            onClick={handleStartDiscussion}
            className="flex items-center bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors"
          >
            <Plus className="h-5 w-5 mr-2" />
            Start New Discussion
          </button>
        </div>

        {/* Categories */}
        <div className="flex overflow-x-auto space-x-4 mb-8 pb-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                selectedCategory === category.id
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* New Discussion Form */}
        <AnimatePresence>
          {showDiscussionForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white rounded-lg shadow-md p-6 mb-8"
            >
              <h2 className="text-xl font-semibold mb-4">New Discussion</h2>
              <form onSubmit={handleSubmitDiscussion}>
                <div className="mb-4">
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={newDiscussion.title}
                    onChange={(e) => setNewDiscussion({...newDiscussion, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    id="category"
                    value={newDiscussion.category}
                    onChange={(e) => setNewDiscussion({...newDiscussion, category: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    {categories.filter(c => c.id !== 'all').map(category => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                  </select>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                    Content
                  </label>
                  <textarea
                    id="content"
                    rows={4}
                    value={newDiscussion.content}
                    onChange={(e) => setNewDiscussion({...newDiscussion, content: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
                    Tags
                  </label>
                  <div className="flex mb-2">
                    <input
                      type="text"
                      id="tags"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Add a tag"
                    />
                    
                    <button
                      type="button"
                      onClick={handleAddTag}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-r-md hover:bg-indigo-700"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {newDiscussion.tags.map(tag => (
                      <span
                        key={tag}
                        className="inline-flex items-center bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="ml-2 text-gray-500 hover:text-gray-700"
                        >
                          &times;
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowDiscussionForm(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                  >
                    Post Discussion
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Discussions */}
        <div className="space-y-6">
          {filteredDiscussions.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No discussions found</h3>
              <p className="text-gray-500 mb-4">
                {selectedCategory === 'all' 
                  ? 'Be the first to start a discussion!'
                  : `No discussions in ${categories.find(c => c.id === selectedCategory)?.name} category`}
              </p>
              <button
                onClick={handleStartDiscussion}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Start a Discussion
              </button>
            </div>
          ) : (
            filteredDiscussions.map((discussion) => (
              <div
                key={discussion.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="inline-block bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full mb-2 capitalize">
                        {discussion.category}
                      </span>
                      <h2 className="text-xl font-semibold text-gray-900 hover:text-indigo-600 cursor-pointer">
                        {discussion.title}
                      </h2>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        <span>{discussion.replies.length}</span>
                      </div>
                      <div className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        <span>{discussion.views}</span>
                      </div>
                      <div className="flex items-center">
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        <span>{discussion.likes}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4 text-gray-700 whitespace-pre-line">
                    {discussion.content}
                  </div>

                  <div className="flex items-center justify-between text-sm mb-6">
                    <div className="flex items-center space-x-4">
                      <span className="text-gray-600">Posted by {discussion.author}</span>
                      <div className="flex items-center text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{formatDate(discussion.createdAt)}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      {discussion.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Replies */}
                  {discussion.replies.length > 0 && (
                    <div className="border-t pt-4 mt-4">
                      <h3 className="text-sm font-medium text-gray-900 mb-3">Replies ({discussion.replies.length})</h3>
                      <div className="space-y-4">
                        {discussion.replies.map(reply => (
                          <div key={reply.id} className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex justify-between items-start mb-2">
                              <span className="text-sm font-medium text-gray-900">{reply.author}</span>
                              <span className="text-xs text-gray-500">{formatDate(reply.createdAt)}</span>
                            </div>
                            <p className="text-gray-700 text-sm whitespace-pre-line">{reply.content}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Reply Form */}
                  {replyingTo === discussion.id ? (
                    <div className="mt-6">
                      <textarea
                        rows={3}
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Write your reply..."
                      />
                      <div className="flex justify-end space-x-3 mt-2">
                        <button
                          type="button"
                          onClick={() => setReplyingTo(null)}
                          className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={() => handleSubmitReply(discussion.id)}
                          className="px-3 py-1 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700 flex items-center"
                        >
                          <Send className="h-4 w-4 mr-1" />
                          Post Reply
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        if (!currentUser) {
                          navigate('/auth');
                          return;
                        }
                        setReplyingTo(discussion.id);
                      }}
                      className="mt-4 text-sm text-indigo-600 hover:text-indigo-800 flex items-center"
                    >
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Reply to this discussion
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Forum;