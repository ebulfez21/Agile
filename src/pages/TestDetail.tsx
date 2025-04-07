import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, AlertCircle, ChevronLeft, ChevronRight, HelpCircle, Flag, CheckCircle, XCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const TestDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes in seconds
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<number>>(new Set());
  const [isTestComplete, setIsTestComplete] = useState(false);
  const [testResults, setTestResults] = useState<{
    score: number;
    correctAnswers: number;
    totalQuestions: number;
    timeTaken: number;
  } | null>(null);

  // Sample questions data
  const questions: Question[] = [
    {
      id: '1',
      text: 'What is the primary focus of Agile methodology?',
      options: [
        'Delivering working software frequently',
        'Creating comprehensive documentation',
        'Following a strict plan',
        'Avoiding changes to requirements'
      ],
      correctAnswer: 0,
      explanation: 'Agile methodology primarily focuses on delivering working software frequently to provide value to customers early and often. This allows for quick feedback and adaptation to changing requirements.'
    },
    {
      id: '2',
      text: 'Which of the following is NOT one of the four values in the Agile Manifesto?',
      options: [
        'Individuals and interactions over processes and tools',
        'Working software over comprehensive documentation',
        'Following a plan over responding to change',
        'Customer collaboration over contract negotiation'
      ],
      correctAnswer: 2,
      explanation: 'The Agile Manifesto values "Responding to change over following a plan." The option "Following a plan over responding to change" contradicts this value.'
    },
    {
      id: '3',
      text: 'What is the recommended size for a Scrum team?',
      options: [
        '3-9 people',
        '10-15 people',
        '15-20 people',
        '20-25 people'
      ],
      correctAnswer: 0,
      explanation: 'A Scrum team typically consists of 3-9 people. This size allows for effective communication and collaboration while maintaining agility.'
    }
  ];

  useEffect(() => {
    if (!currentUser) {
      navigate('/auth');
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentUser, navigate]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (isTestComplete) return;
    
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const toggleFlagQuestion = () => {
    const newFlagged = new Set(flaggedQuestions);
    if (newFlagged.has(currentQuestion)) {
      newFlagged.delete(currentQuestion);
    } else {
      newFlagged.add(currentQuestion);
    }
    setFlaggedQuestions(newFlagged);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowExplanation(false);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setShowExplanation(false);
    }
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      // Calculate score
      const correctAnswers = selectedAnswers.reduce((acc, answer, index) => {
        return acc + (answer === questions[index].correctAnswer ? 1 : 0);
      }, 0);
      
      const score = Math.round((correctAnswers / questions.length) * 100);
      const timeTaken = 1800 - timeLeft;

      setTestResults({
        score,
        correctAnswers,
        totalQuestions: questions.length,
        timeTaken
      });
      
      setIsTestComplete(true);
      
      // Save test result to database
      // This would normally be an API call
      console.log('Test completed:', {
        userId: currentUser.uid,
        testId: id,
        score,
        timeTaken,
        answers: selectedAnswers
      });
    } catch (error) {
      console.error('Error submitting test:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (isTestComplete && testResults) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-indigo-600 text-white p-6">
              <h1 className="text-2xl font-bold">Test Results</h1>
            </div>
            <div className="p-6">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-indigo-100 mb-4">
                  {testResults.score >= 70 ? (
                    <CheckCircle className="h-12 w-12 text-green-500" />
                  ) : (
                    <XCircle className="h-12 w-12 text-red-500" />
                  )}
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {testResults.score}%
                </h2>
                <p className="text-gray-600">
                  {testResults.score >= 70 ? 'Congratulations! You passed!' : 'Keep practicing! You can do better!'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <p className="text-sm text-gray-600">Correct Answers</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {testResults.correctAnswers}/{testResults.totalQuestions}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <p className="text-sm text-gray-600">Time Taken</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatTime(testResults.timeTaken)}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <p className="text-sm text-gray-600">Questions Answered</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {selectedAnswers.filter(a => a !== undefined).length}/{questions.length}
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                {questions.map((question, index) => (
                  <div
                    key={question.id}
                    className={`p-4 rounded-lg ${
                      selectedAnswers[index] === question.correctAnswer
                        ? 'bg-green-50 border border-green-200'
                        : 'bg-red-50 border border-red-200'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <h3 className="text-lg font-medium text-gray-900">
                        Question {index + 1}
                      </h3>
                      {selectedAnswers[index] === question.correctAnswer ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500" />
                      )}
                    </div>
                    <p className="mt-2 text-gray-700">{question.text}</p>
                    <div className="mt-4 space-y-2">
                      {question.options.map((option, optionIndex) => (
                        <div
                          key={optionIndex}
                          className={`p-2 rounded ${
                            optionIndex === question.correctAnswer
                              ? 'bg-green-100 text-green-800'
                              : optionIndex === selectedAnswers[index]
                              ? 'bg-red-100 text-red-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {option}
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 text-sm text-gray-600">
                      <strong>Explanation:</strong> {question.explanation}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex justify-between">
                <button
                  onClick={() => navigate('/tests')}
                  className="text-indigo-600 hover:text-indigo-800"
                >
                  Back to Tests
                </button>
                <button
                  onClick={() => window.location.reload()}
                  className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700"
                >
                  Retake Test
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Header */}
          <div className="bg-indigo-600 text-white p-6">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">Agile Test</h1>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  <span className="font-mono">{formatTime(timeLeft)}</span>
                </div>
                <button
                  onClick={toggleFlagQuestion}
                  className={`p-2 rounded-full transition-colors ${
                    flaggedQuestions.has(currentQuestion)
                      ? 'bg-red-500 hover:bg-red-600'
                      : 'bg-indigo-500 hover:bg-indigo-600'
                  }`}
                  title={flaggedQuestions.has(currentQuestion) ? 'Unflag question' : 'Flag question for review'}
                >
                  <Flag className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="mt-4 bg-indigo-500 rounded-full h-2">
              <div
                className="bg-white rounded-full h-2 transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question */}
          <div className="p-6">
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm text-gray-500">
                  Question {currentQuestion + 1} of {questions.length}
                </p>
                {flaggedQuestions.has(currentQuestion) && (
                  <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                    Flagged for review
                  </span>
                )}
              </div>
              <h2 className="text-xl font-semibold text-gray-900">
                {questions[currentQuestion].text}
              </h2>
            </div>

            {/* Options */}
            <div className="space-y-4">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full text-left p-4 rounded-lg border transition-colors ${
                    selectedAnswers[currentQuestion] === index
                      ? 'border-indigo-600 bg-indigo-50'
                      : 'border-gray-200 hover:border-indigo-600 hover:bg-indigo-50'
                  }`}
                >
                  <span className="font-medium">
                    {String.fromCharCode(65 + index)}.
                  </span>{' '}
                  {option}
                </button>
              ))}
            </div>

            {/* Navigation */}
            <div className="mt-8 flex justify-between items-center">
              <button
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className="flex items-center text-indigo-600 hover:text-indigo-800 disabled:text-gray-400"
              >
                <ChevronLeft className="h-5 w-5 mr-1" />
                Previous
              </button>

              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowExplanation(!showExplanation)}
                  className="flex items-center text-gray-600 hover:text-indigo-600"
                >
                  <HelpCircle className="h-5 w-5 mr-1" />
                  Hint
                </button>

                {currentQuestion === questions.length - 1 ? (
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors disabled:bg-gray-400"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Test'}
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    className="flex items-center text-indigo-600 hover:text-indigo-800"
                  >
                    Next
                    <ChevronRight className="h-5 w-5 ml-1" />
                  </button>
                )}
              </div>
            </div>

            {/* Explanation */}
            {showExplanation && (
              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-start">
                  <HelpCircle className="h-5 w-5 text-yellow-400 mr-2 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-yellow-800">Hint</h4>
                    <p className="mt-1 text-sm text-yellow-700">
                      Think about the core principles of Agile methodology and how they relate to this question.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Warning */}
        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-yellow-400 mr-2" />
            <p className="text-sm text-yellow-700">
              Do not refresh or leave this page. Your progress will be lost.
            </p>
          </div>
        </div>

        {/* Question Navigation */}
        <div className="mt-6 bg-white rounded-lg shadow-md p-4">
          <h3 className="text-sm font-medium text-gray-700 mb-4">Question Navigation</h3>
          <div className="grid grid-cols-5 gap-2">
            {questions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestion(index)}
                className={`p-2 text-center rounded ${
                  currentQuestion === index
                    ? 'bg-indigo-600 text-white'
                    : selectedAnswers[index] !== undefined
                    ? 'bg-green-100 text-green-800'
                    : flaggedQuestions.has(index)
                    ? 'bg-red-100 text-red-800'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestDetail;