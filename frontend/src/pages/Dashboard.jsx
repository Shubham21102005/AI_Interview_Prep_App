import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../App';
import SessionCard from '../components/SessionCard';
import { Plus, LogOut, User } from 'lucide-react';
import axios from 'axios';

const Dashboard = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/session/sessions');
      setSessions(response.data);
    } catch (error) {
      setError('Failed to load sessions');
      console.error('Error fetching sessions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSession = async (sessionId) => {
    if (!window.confirm('Are you sure you want to delete this session?')) {
      return;
    }

    try {
      await axios.delete(`/session/${sessionId}`);
      setSessions(sessions.filter((session) => session._id !== sessionId));
    } catch (error) {
      setError('Failed to delete session');
      console.error('Error deleting session:', error);
    }
  };

  const handleViewSession = (sessionId) => {
    navigate(`/session/${sessionId}`);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-500 mb-4"></div>
          <p className="text-slate-400 font-light">Loading your sessions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-slate-100">
      {/* Header */}
      <header className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700/30">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/dashboard" className="flex items-center">
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-300 tracking-tight">
              Hirely
            </span>
          </Link>

          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2 text-slate-300 bg-slate-800/50 px-3 py-1.5 rounded-full">
              <div className="bg-gradient-to-br from-indigo-500 to-cyan-400 p-1 rounded-full">
                <User size={16} className="text-slate-100" />
              </div>
              <span className="text-sm font-light">{user?.email}</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 border border-rose-500/30 rounded-xl transition-all duration-300"
            >
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Top section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-6">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-100 mb-2">
              Your Interview <span className="text-cyan-400">Sessions</span>
            </h1>
            <p className="text-slate-400/90 font-light">
              All your mock interviews in one place. Prepare, practice, and perfect your skills.
            </p>
          </div>
          <Link
            to="/create-session"
            className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white rounded-xl transition-all duration-300 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 group"
          >
            <Plus size={20} className="transition-transform group-hover:rotate-90" />
            <span className="font-medium text-sm">Create Session</span>
          </Link>
        </div>

        {/* Error display */}
        {error && (
          <div className="mb-8 bg-rose-900/40 border border-rose-800/50 text-rose-100 px-4 py-3 rounded-lg text-sm flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {/* Empty state */}
        {sessions.length === 0 ? (
          <div className="text-center py-16 border-2 border-dashed border-slate-700/50 rounded-2xl bg-slate-800/20 backdrop-blur-sm">
            <div className="w-24 h-24 bg-gradient-to-br from-indigo-600/20 to-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-cyan-400">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-100 mb-2">No sessions yet</h3>
            <p className="text-slate-400 mb-6 max-w-md mx-auto">
              Start your interview preparation journey by creating your first session
            </p>
            <Link
              to="/create-session"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white rounded-xl transition-all duration-300 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 group"
            >
              <Plus size={20} className="transition-transform group-hover:rotate-90" />
              <span>Create Your First Session</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sessions.map((session) => (
              <SessionCard
                key={session._id}
                session={session}
                onDelete={handleDeleteSession}
                onView={handleViewSession}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;