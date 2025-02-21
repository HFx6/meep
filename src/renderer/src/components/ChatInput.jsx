import React from "react";
import { Paperclip, Zap, Send } from "lucide-react";


export function ChatInput({
  inputValue,
  setInputValue,
  handleSendMessage,
  handleKeyPress,
  isLoading,
  currentConversation,
}) {
  return (
    <div className="mt-auto border-t border-[#232323] p-4">
      <div className="flex items-center space-x-4">
        <div className="flex-1 flex flex-col bg-[#1d1d1d] rounded-xl p-3 space-y-2">
          {/* Top row: Input and attachment */}
          <div className="flex items-center space-x-3">
            <input
              type="text"
              placeholder={
                currentConversation
                  ? "Type your message..."
                  : "Start a new chat to begin"
              }
              className="flex-1 bg-transparent outline-none text-gray-300 placeholder-gray-600"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading || !currentConversation}
            />
            <button className="text-gray-500 hover:text-gray-400">
              <Paperclip className="w-5 h-5" />
            </button>
          </div>

          {/* Bottom row: Mode selector and send button */}
          <div className="flex items-center justify-between">
            <button className="flex items-center space-x-2 bg-[#2b2147] text-[#b8a6ff] px-3 py-1.5 rounded-lg text-sm">
              <Zap className="w-4 h-4" />
              <span>Llama-3.2-1B-Instruct</span>
              <span className="text-gray-500 text-xs">
                context/tool calling
              </span>
            </button>
            <button
              className={`${
                isLoading || !currentConversation
                  ? "bg-[#4a3aa1]"
                  : "bg-[#6246ea]"
              } p-2 rounded-lg text-white transition-colors`}
              onClick={handleSendMessage}
              disabled={isLoading || !currentConversation}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
