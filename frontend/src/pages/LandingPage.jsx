import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation */}
      <nav className="px-6 py-4 backdrop-blur-sm bg-slate-900/50 border-b border-slate-700/30">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-300">
            InterviewPrep
          </div>
          <div className="flex space-x-3">
            <Link 
              to="/login" 
              className="px-4 py-2 text-slate-300 hover:text-cyan-300 font-medium transition-colors"
            >
              Login
            </Link>
            <Link 
              to="/register" 
              className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white rounded-xl transition-all duration-300 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center">
          <div className="mx-auto max-w-2xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-100 mb-6 leading-tight">
              Master Your
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-indigo-400 mt-2">
                Interview Skills
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-3xl mx-auto leading-relaxed">
              Create personalized interview sessions with AI-generated questions tailored to your role and experience level. 
              Practice, prepare, and ace your next interview.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/register" 
                className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white rounded-xl text-lg font-semibold transition-all duration-300 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30"
              >
                Start Preparing Now
              </Link>
              <Link 
                to="/login" 
                className="px-8 py-4 border-2 border-cyan-500 text-cyan-400 rounded-xl text-lg font-semibold hover:bg-slate-800/50 transition-colors"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/30 rounded-2xl p-8 hover:border-cyan-500/30 transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-600/20 to-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-slate-100 mb-3">AI-Powered Questions</h3>
            <p className="text-slate-400 leading-relaxed">
              Get intelligent, role-specific questions generated just for you. Our AI analyzes job descriptions to create relevant interview scenarios.
            </p>
          </div>
          
          {/* Feature 2 */}
          <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/30 rounded-2xl p-8 hover:border-cyan-500/30 transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-600/20 to-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-slate-100 mb-3">Personalized Sessions</h3>
            <p className="text-slate-400 leading-relaxed">
              Create custom interview sessions based on your experience level and target positions. Tailor practice to your specific career goals.
            </p>
          </div>
          
          {/* Feature 3 */}
          <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/30 rounded-2xl p-8 hover:border-cyan-500/30 transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-600/20 to-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-slate-100 mb-3">Track Progress</h3>
            <p className="text-slate-400 leading-relaxed">
              Save and review your interview sessions to track your improvement over time. Identify strengths and areas for development.
            </p>
          </div>
        </div>
      </div>

      {/* Testimonial Section */}
      <div className="max-w-4xl mx-auto px-6 py-16 text-center">
        <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/30 rounded-2xl p-10">
          <div className="text-cyan-400 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
            </svg>
          </div>
          <blockquote className="text-xl italic text-slate-300 max-w-2xl mx-auto mb-6">
            "InterviewPrep transformed my job search. The personalized questions helped me land my dream role at a FAANG company with a 40% salary increase."
          </blockquote>
          <div className="text-slate-400 font-medium">
            — Sarah Johnson, Senior Software Engineer
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl font-bold text-slate-100 mb-6">Ready to Ace Your Next Interview?</h2>
        <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto">
          Join thousands of professionals who have transformed their interview skills with our platform.
        </p>
        <Link 
          to="/register" 
          className="inline-block px-8 py-4 bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white rounded-xl text-lg font-semibold transition-all duration-300 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30"
        >
          Start Your Free Trial
        </Link>
        <p className="text-slate-500 mt-4 text-sm">No credit card required · Cancel anytime</p>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900/50 backdrop-blur-sm border-t border-slate-700/30 py-10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-slate-500">&copy; 2024 InterviewPrep. All rights reserved.</p>
          <div className="mt-4 flex justify-center space-x-6">
            <a href="#" className="text-slate-500 hover:text-cyan-400 transition-colors">Privacy</a>
            <a href="#" className="text-slate-500 hover:text-cyan-400 transition-colors">Terms</a>
            <a href="#" className="text-slate-500 hover:text-cyan-400 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;