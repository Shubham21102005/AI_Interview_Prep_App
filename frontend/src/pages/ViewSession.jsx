import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ChevronDown, ChevronRight } from 'lucide-react';
import axios from 'axios';

const ViewSession = () => {
  const { id } = useParams();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedQuestions, setExpandedQuestions] = useState(new Set());

  useEffect(() => {
    fetchSession();
  }, [id]);

  const fetchSession = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/session/${id}`);
      setSession(response.data);
    } catch (error) {
      setError('Failed to load session');
      console.error('Error fetching session:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleQuestion = (index) => {
    const newExpanded = new Set(expandedQuestions);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedQuestions(newExpanded);
  };

  const expandAll = () => {
    const allIndices = new Set(session.questions.map((_, index) => index));
    setExpandedQuestions(allIndices);
  };

  const collapseAll = () => {
    setExpandedQuestions(new Set());
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-500 mb-4"></div>
          <p className="text-slate-400 font-light">Loading session details...</p>
        </div>
      </div>
    );
  }

  if (error || !session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center px-4">
        <div className="text-center max-w-md bg-slate-800/50 backdrop-blur-sm border border-slate-700/30 rounded-2xl shadow-lg p-8">
          <div className="w-20 h-20 bg-gradient-to-br from-rose-600/20 to-rose-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-rose-400">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-100 mb-4">Session Not Found</h2>
          <p className="text-slate-400/90 mb-6">
            {error || 'The session you are looking for does not exist.'}
          </p>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white rounded-xl transition-all duration-300 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to Dashboard</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-slate-100">
      {/* Header */}
      <header className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Link
              to="/dashboard"
              className="flex items-center space-x-2 text-slate-400 hover:text-slate-200 transition-colors group"
            >
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              <span>Back to Dashboard</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Session Header */}
        <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/30 rounded-2xl shadow-2xl shadow-slate-900/50 p-8 mb-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-slate-100 mb-3">
              {session.position}
              <span className="ml-2 text-cyan-400 font-light">
                · {session.yoe} {session.yoe === 1 ? 'year' : 'years'} of experience
              </span>
            </h1>

            <div className="flex items-center space-x-4 text-slate-400 mb-4">
              <span className="flex items-center space-x-1 text-sm">
                <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                <span>Created {new Date(session.createdAt).toLocaleDateString('en-US', { 
                  month: 'short', day: 'numeric', year: 'numeric' 
                })}</span>
              </span>
            </div>
          </div>

          {session.description && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-slate-300 mb-3">Job Description</h3>
              <p className="text-slate-400 leading-relaxed">{session.description}</p>
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600/30 to-cyan-500/20 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <span className="text-lg font-semibold text-cyan-400">
                {session.questions?.length || 0} Questions Generated
              </span>
            </div>
          </div>
        </div>

        {/* Questions Section */}
        <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/30 rounded-2xl shadow-2xl shadow-slate-900/50 p-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h2 className="text-2xl font-bold text-slate-100">Interview Questions</h2>
            <div className="flex space-x-3">
              <button
                onClick={expandAll}
                className="px-4 py-2 text-sm bg-slate-700/50 hover:bg-slate-700 border border-slate-600/50 text-slate-300 rounded-xl transition-all duration-300"
              >
                Expand All
              </button>
              <button
                onClick={collapseAll}
                className="px-4 py-2 text-sm bg-slate-700/50 hover:bg-slate-700 border border-slate-600/50 text-slate-300 rounded-xl transition-all duration-300"
              >
                Collapse All
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {session.questions?.map((question, index) => (
              <div
                key={index}
                className="border border-slate-700/50 rounded-xl overflow-hidden transition-all duration-300 hover:border-slate-600/50"
              >
                <button
                  onClick={() => toggleQuestion(index)}
                  className="w-full px-6 py-4 text-left bg-slate-800/20 hover:bg-slate-800/40 transition-colors flex justify-between items-center"
                >
                  <div className="flex flex-col text-left">
                    <span className="font-medium text-slate-200 mb-1">Question {index + 1}</span>
                    <p className="text-slate-300 text-sm">{question.q}</p>
                  </div>
                  {expandedQuestions.has(index) ? (
                    <ChevronDown size={20} className="text-cyan-400" />
                  ) : (
                    <ChevronRight size={20} className="text-cyan-400" />
                  )}
                </button>

                {expandedQuestions.has(index) && (
                  <div className="px-6 py-4 bg-slate-800/20 border-t border-slate-700/50">
                    <h4 className="font-semibold text-cyan-400 mb-3">Sample Answer:</h4>
                    <div className="bg-gradient-to-br from-indigo-600/10 to-cyan-500/10 border border-slate-700/50 rounded-xl p-5">
                      <p className="text-slate-300 leading-relaxed">{question.a}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {(!session.questions || session.questions.length === 0) && (
            <div className="text-center py-12 border-2 border-dashed border-slate-700/50 rounded-2xl">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-600/20 to-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-cyan-400">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-slate-100 mb-2">No questions available</h3>
              <p className="text-slate-400">This session doesn't have any questions yet.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ViewSession;
