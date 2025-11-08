import React, { useContext } from 'react';
import { ChatbotContext } from '../context/ChatbotContext';

const FloatingChatbot = () => {
  const { toggleChat, isChatOpen } = useContext(ChatbotContext);

  return (
    <div className="fixed bottom-5 right-5">
      <button
        className="bg-fuchsia-600 text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center text-3xl"
        onClick={toggleChat}
      >
        {isChatOpen ? 'X' : '💬'}
      </button>
    </div>
  );
};

export default FloatingChatbot;