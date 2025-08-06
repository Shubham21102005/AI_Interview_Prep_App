import { X, Copy, Check } from 'lucide-react';
import { useState } from 'react';

const AnswerSideWindow = ({ isOpen, onClose, question, answer, questionNumber }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(answer);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        onClick={onClose}
      />
      
      {/* Side Window */}
      <div className={`fixed right-0 top-0 h-full w-full sm:w-96 bg-slate-800/95 backdrop-blur-md border-l border-slate-700/50 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700/50">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-600/30 to-indigo-500/20 rounded-full flex items-center justify-center">
              <span className="text-sm font-semibold text-cyan-400">{questionNumber}</span>
            </div>
            <h3 className="text-lg font-semibold text-slate-100">Detailed Answer</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-700/50 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 h-full overflow-y-auto">
          {/* Question */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-slate-400 mb-2">Question</h4>
            <div className="bg-slate-700/30 border border-slate-600/50 rounded-xl p-4">
              <p className="text-slate-200 leading-relaxed">{question}</p>
            </div>
          </div>

          {/* Answer */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-slate-400">Answer</h4>
              <button
                onClick={copyToClipboard}
                className="flex items-center space-x-1 px-3 py-1 text-xs bg-slate-700/50 hover:bg-slate-700 border border-slate-600/50 text-slate-300 rounded-lg transition-colors"
              >
                {copied ? (
                  <>
                    <Check size={14} className="text-green-400" />
                    <span className="text-green-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <div className="bg-gradient-to-br from-indigo-600/10 to-cyan-500/10 border border-slate-600/50 rounded-xl p-5">
              <p className="text-slate-200 leading-relaxed whitespace-pre-wrap">{answer}</p>
            </div>
          </div>

          {/* Tips Section */}
          <div className="bg-slate-700/20 border border-slate-600/30 rounded-xl p-4">
            <h4 className="text-sm font-medium text-cyan-400 mb-3 flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Interview Tips
            </h4>
            <ul className="text-sm text-slate-300 space-y-2">
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                <span>Use specific examples from your experience</span>
              </li>
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                <span>Quantify your achievements when possible</span>
              </li>
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                <span>Keep your answers concise but comprehensive</span>
              </li>
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                <span>Practice your responses beforehand</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default AnswerSideWindow; 