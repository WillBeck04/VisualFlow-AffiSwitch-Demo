"use client"
import React, { useState, useEffect } from 'react';
import { FaRobot } from 'react-icons/fa'; // For AI assistant icon

interface IMessage {
    author: string;
    content: string;
  }

const VisualFlowAI = () => {
    const [input, setInput] = useState('');
    
    const [messages, setMessages] = useState<IMessage[]>([]);
  
    useEffect(() => {
      const greeting = "Hello, how can I assist you?";
      let i = 0;
      const typingEffect = setInterval(() => {
        if (i <= greeting.length) {
          setMessages([{ author: 'VisualFlowAI', content: greeting.substring(0, i) }]);
          i++;
        } else {
          clearInterval(typingEffect);
        }
      }, 50); // Adjust speed as needed
  
      return () => clearInterval(typingEffect);
    }, []);
  

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // Logic to handle input submission
  };

  return (
    <div className="flex flex-col h-screen bg-gray-800 text-white">
      <header className="flex justify-between items-center p-4 border-b border-gray-600">
        <h1 className="text-xl font-bold flex items-center">
          <FaRobot className="text-2xl mr-2" />
          VisualFlowAI
        </h1>
      </header>

      <div className="chat-area flex-grow my-4 p-4 overflow-y-auto bg-gray-700 rounded-lg mx-4">
        {messages.map((message, index) => (
          <div key={index} className="message mb-4 flex items-center">
            <FaRobot className="text-lg mr-2" />
            <div className={`bg-blue-900 p-3 rounded-lg max-w-xl break-words ${message ? 'typing-effect' : ''}`}>
              {message.content}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="input-area flex p-4 border-t border-gray-600">
        <input 
          type="text" 
          className="flex-grow p-2 border-2 border-gray-600 rounded-full mr-2 focus:outline-none"
          value={input} 
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <input type="file" className="mr-2"/>
        <button 
          type="submit" 
          className="py-2 px-4 bg-green-500 rounded-full shadow-md hover:bg-green-700 focus:outline-none"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default VisualFlowAI;






