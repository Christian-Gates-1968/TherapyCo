import React, { useContext } from 'react';
import { ChatbotContext } from '../context/ChatbotContext';
import { assets } from "../assets/assets_frontend/assets";


const ChatbotSection = () => {
  const { toggleChat } = useContext(ChatbotContext);

  return (
    <div 
      className="relative my-10 p-8 rounded-2xl text-center shadow-xl bg-gradient-to-br from-fuchsia-600 via-purple-800 to-pink-500 overflow-hidden"
      style={{
        border: '2px solid #ff00ff',
        boxShadow: '0 0 40px 10px #FF00FF55',
      }}
    >
      {/* Animated Nebula/Star Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: 'radial-gradient(ellipse at 60% 20%, #ffffff44 0%, transparent 60%), radial-gradient(ellipse at 30% 90%, #ff69b455 0%, transparent 60%), radial-gradient(ellipse at 80% 75%, #00ffff22 0%, transparent 70%)',
          zIndex: 0,
        }}
      />
      <h2 className="relative z-10 text-4xl font-extrabold text-fuchsia-100 mb-3 drop-shadow-lg tracking-wide" style={{ letterSpacing: "0.03em" }}>
        Need some help?
      </h2>
      <div className="relative z-10">
        <p className="text-xl md:text-2xl bg-gradient-to-r from-fuchsia-300 via-fuchsia-200 to-fuchsia-300 bg-clip-text text-transparent font-medium mb-6 drop-shadow">
          Our AI assistant is here to help <span className="animate-pulse">✨</span><br/>
          Find the therapist that's just right for you.
        </p>
        <button
          className="z-100 bg-gradient-to-br from-fuchsia-500 via-pink-400 to-purple-600 text-white px-10 py-5 rounded-full font-bold text-2xl shadow-fuchsia-700 hover:shadow-pink-400 focus:shadow-purple-700 transform hover:scale-[1.06] transition duration-400 ease-in-out border-2 border-fuchsia-200 animate-pulse relative"
          onClick={toggleChat}
          style={{
            boxShadow: '0 0 30px 8px #FF00FF99, 0 0 80px 2px #7F00FF66 inset'
          }}
        >
          <span className="drop-shadow-md">Chat Now</span>
          {/* Soft "orbit" ring effect around the button */}
          <span className="absolute left-1/2 top-1/2 w-48 h-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-fuchsia-500 via-fuchsia-400 to-transparent opacity-40 blur-2xl pointer-events-none " />
        </button>
      </div>
      {/* Nebula bottom glow */}
      <div className="absolute left-0 right-0 bottom-0 h-16 bg-gradient-to-t from-fuchsia-700 via-transparent to-transparent blur-2xl pointer-events-none" aria-hidden="true" />
    </div>
  );
};

export default ChatbotSection;
