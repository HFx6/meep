import React from 'react';
import { X, Trash2 } from 'lucide-react';



export function ConversationsList({ 
  conversations, 
  onSelectConversation, 
  onDeleteConversation,
  onClose 
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-300">Recent Conversations</h2>
        <button 
          onClick={onClose}
          className="text-gray-500 hover:text-gray-300"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      {conversations.map((conv) => (
        <div 
          key={conv.id}
          onClick={() => onSelectConversation(conv.id)}
          className="bg-[#1d1d1d] rounded-lg p-4 hover:bg-[#232323] transition-colors cursor-pointer group"
        >
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-gray-300 font-medium">{conv.title}</h3>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-500">{new Date(conv.updated_at).toLocaleString()}</span>
              <button
                onClick={(e) => onDeleteConversation(conv.id, e)}
                className="text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
          <p className="text-sm text-gray-400 line-clamp-2">{conv.preview}</p>
        </div>
      ))}
    </div>
  );
}