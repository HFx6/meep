import React from 'react';
import { MessageSquare, Search } from 'lucide-react';



export function Header({ title }) {
  return (
    <>
      <h1 className="text-4xl font-bold text-white mb-8">{title}</h1>
      
      {/* Search and Chat buttons */}
      <div className="flex space-x-3 mb-10">
        <button className="flex items-center space-x-2 bg-[#2b2147] text-[#b8a6ff] px-4 py-2 rounded-lg">
          <MessageSquare className="w-5 h-5" />
          <span>Chat</span>
        </button>
        <button className="flex items-center space-x-2 bg-[#1d1d1d] px-4 py-2 rounded-lg text-gray-400">
          <Search className="w-5 h-5" />
          <span>Search</span>
        </button>
      </div>
    </>
  );
}