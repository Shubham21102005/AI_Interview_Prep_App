import { Trash2, Eye } from 'lucide-react';

const SessionCard = ({ session, onDelete, onView }) => {
  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(session._id);
  };

  const handleView = (e) => {
    e.stopPropagation();
    onView(session._id);
  };

  return (
    <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/30 rounded-2xl p-6 shadow-lg shadow-slate-900/20 hover:shadow-slate-800/30 transition-all duration-300 hover:border-slate-600/50 group">
      {/* Header */}
      <div className="flex justify-between itsems-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-slate-100 mb-1 line-clamp-2 group-hover:text-cyan-300 transition-colors">
            {session.position}
          </h3>
          <div className="inline-flex items-center bg-slate-700/40 px-2.5 py-1 rounded-full">
            <span className="text-xs font-medium text-slate-300">
              {session.yoe} {session.yoe === 1 ? 'year' : 'years'} of experience
            </span>
          </div>
        </div>
        <button
          onClick={handleDelete}
          className="p-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-full transition-all duration-300"
          title="Delete session"
        >
          <Trash2 size={18} />
        </button>
      </div>

      {/* Description */}
      {session.description && (
        <p className="text-slate-400 text-sm mb-5 line-clamp-2">
          {session.description}
        </p>
      )}

      {/* Stats */}
      <div className="flex items-center justify-between mb-5">
        <div className="bg-gradient-to-br from-indigo-600/30 to-cyan-500/20 border border-slate-700/50 rounded-xl p-3 w-full max-w-[120px]">
          <div className="text-xl font-bold text-cyan-400 text-center">
            {session.questions?.length || 0}
          </div>
          <div className="text-xs text-slate-400 text-center">Questions</div>
        </div>
        
        <div className="text-right">
          <div className="text-sm font-medium text-slate-300">
            {new Date(session.createdAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })}
          </div>
          <div className="text-xs text-slate-500">Created</div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end">
        <button
          onClick={handleView}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white rounded-xl transition-all duration-300 text-sm font-medium group-hover:shadow-lg group-hover:shadow-cyan-500/20"
        >
          <Eye size={16} className="text-cyan-100" />
          <span>View Session</span>
        </button>
      </div>
    </div>
  );
};

export default SessionCard;
