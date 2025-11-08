import React, { createContext, useState } from 'react';

export const ChatbotContext = createContext();

export const ChatbotContextProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const addMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <ChatbotContext.Provider value={{ messages, addMessage, isChatOpen, toggleChat }}>
      {children}
    </ChatbotContext.Provider>
  );
};