'use client';

import type React from 'react';

import { useState, useEffect, useRef } from 'react';
import { FaComments, FaTimes } from 'react-icons/fa';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

const ChatIcon = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<
    { type: 'user' | 'ai'; message: string }[]
  >([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isLoading) return;

    const userMessage = message;
    setMessage('');
    setChatHistory((prev) => [...prev, { type: 'user', message: userMessage }]);
    setIsLoading(true);

    try {
      const result = await model.generateContent(userMessage);
      const response = await result.response;
      const text = response.text();

      setChatHistory((prev) => [...prev, { type: 'ai', message: text }]);
    } catch (error) {
      console.error('Error generating response:', error);
      setChatHistory((prev) => [
        ...prev,
        {
          type: 'ai',
          message: 'Sorry, I encountered an error. Please try again.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isModalOpen]);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="relative">
        <button
          onClick={() => setIsModalOpen(!isModalOpen)}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          className="bg-gray-800 bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-4 shadow-lg backdrop-blur-sm transition-all duration-300 ease-in-out"
        >
          {isModalOpen ? <FaTimes size={24} /> : <FaComments size={24} />}
        </button>
        <div
          className={`absolute bottom-full mb-2 right-0 bg-gray-900 bg-opacity-90 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap backdrop-blur-sm transition-all duration-300 ease-in-out ${
            isHovering && !isModalOpen
              ? 'opacity-100 transform translate-y-0'
              : 'opacity-0 transform translate-y-2 pointer-events-none'
          }`}
        >
          Chat with Personal AI
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-end p-4">
          <div
            ref={modalRef}
            className={`bg-gray-900 bg-opacity-40 backdrop-blur-xl rounded-lg w-[400px] h-[600px] text-white shadow-2xl border border-gray-700 border-opacity-50 flex flex-col transition-all duration-300 ease-in-out ${
              isAnimating ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
            }`}
          >
            <div
              className={`bg-gray-900 bg-opacity-40 backdrop-blur-xl rounded-lg w-[400px] h-[600px] text-white shadow-2xl border border-gray-700 border-opacity-50 flex flex-col transition-all duration-300 ease-in-out ${
                isAnimating ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
              }`}
            >
              {/* Header */}
              <div className="flex justify-between items-center p-4 border-b border-gray-700 border-opacity-50">
                <h3 className="text-lg font-semibold text-white">
                  Chat with Personal AI
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-200 text-xl transition-colors duration-200"
                >
                  <FaTimes />
                </button>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto px-4 py-2 space-y-4">
                {chatHistory.map((chat, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg ${
                      chat.type === 'user'
                        ? 'bg-blue-600 bg-opacity-70 ml-auto mr-2 max-w-[80%]'
                        : 'bg-gray-700 bg-opacity-70 mr-auto ml-2 max-w-[80%]'
                    }`}
                  >
                    {chat.message}
                  </div>
                ))}
              </div>

              {/* Input Form */}
              <form
                onSubmit={handleSubmit}
                className="p-4 border-t border-gray-700 border-opacity-50"
              >
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    disabled={isLoading}
                    className="flex-1 bg-gray-800 bg-opacity-50 text-white border border-gray-700 border-opacity-50 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 transition-all duration-200 disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-blue-600 bg-opacity-70 hover:bg-opacity-100 text-white rounded-lg px-4 py-2 whitespace-nowrap transition-colors duration-200 disabled:opacity-50"
                  >
                    {'Send'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatIcon;
