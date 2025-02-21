import React from 'react';



export function ChatView({ messages, messagesEndRef }) {
  return (
    <div className="space-y-6 mb-8 overflow-y-auto max-h-[calc(100vh-400px)]">
      {messages.map((message, index) => (
        <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
          <div className={`max-w-[80%] rounded-lg p-4 ${
            message.role === 'user' ? 'bg-[#2b2147] text-[#b8a6ff]' : 'bg-[#1d1d1d] text-gray-300'
          }`}>
            <p className="whitespace-pre-wrap">{message.content}</p>
            {message.context && (
              <div className="mt-2 text-xs text-gray-500">
                <p>Context: {message.context}</p>
              </div>
            )}
            {message.toolCalls && message.toolCalls.length > 0 && (
              <div className="mt-2 text-xs text-gray-500">
                <p>Tool Calls:</p>
                {message.toolCalls.map((tool, idx) => (
                  <p key={idx}>
                    {tool.function}({JSON.stringify(tool.arguments)}) = {tool.output}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}