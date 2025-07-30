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
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-100">
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
              {session.position}
            </h3>
            <p className="text-sm text-gray-500">
              {session.yoe} {session.yoe === 1 ? 'year' : 'years'} of experience
            </p>
          </div>
          <button
            onClick={handleDelete}
            className="ml-2 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
            title="Delete session"
          >
            <Trash2 size={18} />
          </button>
        </div>

        {/* Description */}
        {session.description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {session.description}
          </p>
        )}

        {/* Stats */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className="text-lg font-semibold text-blue-600">
                {session.questions?.length || 0}
              </div>
              <div className="text-xs text-gray-500">Questions</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-600">
                {new Date(session.createdAt).toLocaleDateString()}
              </div>
              <div className="text-xs text-gray-500">Created</div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end">
          <button
            onClick={handleView}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            <Eye size={16} />
            <span>View Session</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SessionCard; 