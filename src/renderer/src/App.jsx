import React, { useState, useRef, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { ChatInput } from './components/ChatInput';
import { ChatView } from './components/ChatView';
import { ConversationsList } from './components/ConversationsList';
import { Suggestions } from './components/Suggestions';
import { Calendar } from './components/Calendar';
import { sendMessage, getConversations, getConversation, createConversation, deleteConversation } from './api';


function App() {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarExpanded, setSidebarExpanded] = useState(true);
  const [showConversations, setShowConversations] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [currentConversation, setCurrentConversation] = useState(null);
  const messagesEndRef = useRef(null);

  const calendar = {
    month: "February",
    year: 2025,
    days: Array.from({ length: 28 }, (_, i) => i + 1),
    currentDay: 9
  };

  useEffect(() => {
    loadConversations();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  async function loadConversations() {
    try {
      const data = await getConversations();
      setConversations(data);
    } catch (error) {
      console.error('Error loading conversations:', error);
    }
  }

  async function handleNewChat() {
    try {
      const newConversation = await createConversation('New Chat');
      setCurrentConversation(newConversation);
      setMessages([]);
      setShowConversations(false);
    } catch (error) {
      console.error('Error creating new chat:', error);
    }
  }

  async function handleSelectConversation(id) {
    try {
      const conversation = await getConversation(id);
      setCurrentConversation(conversation);
      setMessages(conversation.messages);
      setShowConversations(false);
    } catch (error) {
      console.error('Error loading conversation:', error);
    }
  }

  async function handleDeleteConversation(id, e) {
    e.stopPropagation();
    try {
      await deleteConversation(id);
      setConversations(conversations.filter(conv => conv.id !== id));
      if (currentConversation?.id === id) {
        setCurrentConversation(null);
        setMessages([]);
      }
    } catch (error) {
      console.error('Error deleting conversation:', error);
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading || !currentConversation) return;

    const userMessage = inputValue.trim();
    setInputValue('');
    setIsLoading(true);

    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);

    try {
      const response = await sendMessage(currentConversation.id, userMessage);
      
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: response.response,
        context: response.context,
        toolCalls: response.tool_calls
      }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I encountered an error processing your request.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestionClick = async (text) => {
    if (!currentConversation) {
      await handleNewChat();
    }
    setInputValue(text);
    setTimeout(() => handleSendMessage(), 100);
  };

  return (
    <div className="min-h-screen bg-[#141414] text-gray-400 flex">
      <Sidebar 
        isSidebarExpanded={isSidebarExpanded}
        setSidebarExpanded={setSidebarExpanded}
        onNewChat={handleNewChat}
        onShowConversations={() => setShowConversations(true)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative">
        <div className="p-12">
          <Header title={currentConversation ? currentConversation.title : "Good morning Hayden"} />
          
          {/* Main Content Area */}
          {showConversations ? (
            <ConversationsList 
              conversations={conversations}
              onSelectConversation={handleSelectConversation}
              onDeleteConversation={handleDeleteConversation}
              onClose={() => setShowConversations(false)}
            />
          ) : messages.length > 0 ? (
            <ChatView messages={messages} messagesEndRef={messagesEndRef} />
          ) : (
            <Suggestions onSuggestionClick={handleSuggestionClick} />
          )}
        </div>

        {/* <Calendar {...calendar} /> */}

        <ChatInput 
          inputValue={inputValue}
          setInputValue={setInputValue}
          handleSendMessage={handleSendMessage}
          handleKeyPress={handleKeyPress}
          isLoading={isLoading}
          currentConversation={currentConversation}
        />
      </div>
    </div>
  );
}

export default App;