import React, { useState, useRef, useEffect } from 'react';
import logo from '../assets/kw.png';
import '../App.css';
import { FaArrowUp, FaRobot, FaUser, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { LuNewspaper, LuUser } from 'react-icons/lu';
import { LuImages } from "react-icons/lu";
import { RiImageEditLine } from 'react-icons/ri';
import { SiGooglelens } from 'react-icons/si';
import { FiUser } from 'react-icons/fi';


const Home = () => {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey] = useState(import.meta.env.VITE_GROQ_API_KEY || '');
  const [isTyping, setIsTyping] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [selectedAPI] = useState('groq');
  const messagesEndRef = useRef(null);



  const navigate = useNavigate();

  // NEW STATE FOR AUTHENTICATION AND POP-UP
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSignupPopup, setShowSignupPopup] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Free AI API functions (no changes needed here)
  const callGroq = async (message) => {
    if (!apiKey) {
      throw new Error('Groq API key required');
    }

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama3-8b-8192',
        messages: [{ role: 'user', content: message }],
        max_tokens: 1000,
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      return data.choices[0].message.content;
    } else {
      throw new Error(data.error?.message || 'Failed to get response');
    }
  };

  // Mock AI for completely free option (no API key needed)
  const callMockAI = async (message) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const responses = [
      `That's an interesting question about "${message}". Let me think about that...`,
      `I understand you're asking about "${message}". Here's what I think:`,
      `Great question! Regarding "${message}", I'd say:`,
      `Thanks for asking about "${message}". My response is:`,
      `I see you're interested in "${message}". Here's my take:`,
    ];
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    return randomResponse + " This is a demo response since you're using the free mock AI. To get real AI responses, please set up one of the free API keys mentioned in the API settings.";
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    // NEW: Check if the user is logged in
    if (!isLoggedIn) {
      setShowSignupPopup(true);
      return;
    }

    setShowChat(true);

    const userMessage = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentMessage = inputValue;
    setInputValue('');
    setIsLoading(true);
    setIsTyping(true);

    try {
      const aiResponse = await callGroq(currentMessage);

      const aiMessage = {
        id: Date.now() + 1,
        text: aiResponse,
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString()
      };

      setTimeout(() => {
        setMessages(prev => [...prev, aiMessage]);
        setIsTyping(false);
      }, 1000);

    } catch (error) {
      const errorMessage = {
        id: Date.now() + 1,
        text: `Error: ${error.message}. Please try again.`,
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString(),
        isError: true
      };

      setTimeout(() => {
        setMessages(prev => [...prev, errorMessage]);
        setIsTyping(false);
      }, 1000);
    } finally {
      setIsLoading(false);
    }
  };

  const LoadingDots = () => (
    <div className="flex space-x-1">
      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
    </div>
  );

  const TypingIndicator = () => (
    <div className="flex items-center space-x-3 p-4 bg-neutral-700 rounded-lg mb-4 border border-neutral-600">
      <FaRobot className="text-blue-400" />
      <div className="flex items-center space-x-2">
        <span className="text-white">AI is typing</span>
        <LoadingDots />
      </div>
    </div>
  );

  const resetChat = () => {
    setShowChat(false);
    setMessages([]);
    setInputValue('');
    setIsTyping(false);
  };

  // --- MODERN SIGNUP POPUP (INSTANT USE, GLASS EFFECT) ---
  // Place this anywhere in your JSX; it will show when showSignupPopup is true
  // No need for a separate component!
  const signupPopupJSX = showSignupPopup && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadein">
      <div className="relative bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-8 w-full max-w-sm mx-4
        animate-scalein
        backdrop-blur-md
        flex flex-col items-center
      ">
        <button
          onClick={() => setShowSignupPopup(false)}
          className="absolute top-4 right-4 text-neutral-300 hover:text-white transition-colors"
          aria-label="Close signup popup"
        >
          <FaTimes size={22} />
        </button>
        <div className="flex flex-col items-center gap-2">
          <img
            src={logo}
            alt="Krupixi Logo"
            className="w-14 h-14 rounded-full shadow-lg mb-2 bg-white/40"
          />
          <h3 className="text-2xl font-bold text-white mb-1 tracking-tight">Welcome to Krupixi AI</h3>
          <p className="text-neutral-200 text-center mb-6 text-base">
            Please <span className="font-semibold text-blue-400">sign up or log in</span> to chat with our AI and unlock its full potential.
          </p>
        </div>
      
                  <div className="text-white gap-4 flex justify-between mr-4">

      
      
                      <button onClick={() => navigate("/signup")}>
                          <div className="flex justify-between items-center gap-3 px-3 py-1 bg-amber-50 text-black rounded-4xl cursor-pointer hover:bg-white ">
                              <LuUser />
                              Sign up
                          </div>
                      </button>
      
                      <button onClick={() => navigate("/login")} >
      
                          <div className="border border-gray-700 px-3 py-1 rounded-4xl cursor-pointer hover:bg-stone-600">
                              Sign in
                          </div>
                          
                      </button>
                  </div>
      </div>
      {/* Animations */}
      <style>
        {`
          .animate-fadein {
            animation: fadeInBg 0.4s cubic-bezier(0.4,0,0.2,1);
          }
          .animate-scalein {
            animation: scaleInCard 0.35s cubic-bezier(0.4,0,0.2,1);
          }
          @keyframes fadeInBg {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes scaleInCard {
            from { opacity: 0; transform: scale(0.92);}
            to { opacity: 1; transform: scale(1);}
          }
        `}
      </style>
    </div>
  );

  // --- CHAT UI ---
  if (showChat) {
    return (
      <div className="h-[100%] w-[60%] overflow-hidden bg-neutral-900 flex flex-col mx-auto relative">
        {/* Chat Messages */}
        <div className="max-h-[529px] w-[85%] overflow-y-auto hide-scrollbar flex justify-center items-center ml-25">
          <main className="flex-1 px-4 py-6 space-y-6 hide-scrollbar">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-end gap-3 max-w-2xl ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className="flex-shrink-0">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center
                        ${message.sender === 'user' ? 'bg-blue-600' : 'bg-neutral-700'}`}
                    >
                      {message.sender === 'user' ? (
                        <FaUser size={20} className="text-white" />
                      ) : (
                        <FaRobot size={20} className="text-blue-400" />
                      )}
                    </div>
                  </div>
                  <div>
                    <div
                      className={`
                        px-5 py-3 rounded-2xl shadow
                        ${message.sender === 'user'
                          ? 'bg-blue-600 text-white rounded-br-none'
                          : message.isError
                          ? 'bg-red-900 text-red-100 border border-red-700'
                          : 'bg-neutral-800 text-white rounded-bl-none'}
                      `}
                    >
                      <p className="whitespace-pre-wrap">{message.text}</p>
                    </div>
                    <span
                      className={`
                        text-xs mt-1 block pl-2
                        ${message.sender === 'user' ? 'text-blue-200 text-right' : 'text-neutral-400'}
                      `}
                    >
                      {message.sender === 'user' ? 'You' : 'Krupixi AI'} · {message.timestamp}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex items-end gap-3 max-w-2xl">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-neutral-700">
                  <FaRobot size={20} className="text-blue-400" />
                </div>
                <div>
                  <div className="px-5 py-3 rounded-2xl bg-neutral-800 text-white rounded-bl-none shadow">
                    <div className="flex items-center gap-2">
                      <span>Krupixi AI is typing</span>
                      <span className="flex space-x-1">
                        <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></span>
                        <span
                          className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                          style={{ animationDelay: '0.1s' }}
                        ></span>
                        <span
                          className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                          style={{ animationDelay: '0.2s' }}
                        ></span>
                      </span>
                    </div>
                  </div>
                  <span className="text-xs mt-1 block pl-2 text-neutral-400">Krupixi AI</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </main>
        </div>

        {/* Input Area */}
        <div className="absolute bottom-0 w-[800px] mt-15 ml-22 mb-5 mx-auto">
          <input
            type="text"
            name="input"
            placeholder="What do you want to know?"
            className="
              px-4 pr-12 py-20 pt-4 w-full border bg-neutral-600 text-white opacity-60
              rounded-3xl placeholder:text-white
              focus:outline-none
            "
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
          <button
            type="button"
            onClick={handleSendMessage}
            className={`
              absolute right-6 top-[70%] py-3 px-3 rounded-full transform -translate-y-1/2
              text-white opacity-80 hover:opacity-100
              focus:outline-none
              ${inputValue ? 'bg-white text-black' : 'bg-neutral-600'}
            `}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : (
              <FaArrowUp size={22}
                className={inputValue ? 'filter grayscale brightness-0' : ''}
              />
            )}
          </button>
        </div>
        {signupPopupJSX}
      </div>
    );
  }

  return (
    <div className="h-[100%] sm:w-[100%] w-screen overflow-hidden flex justify-center mx-auto items-center relative">
      <div className="mt-30 flex flex-col justify-center w-[500px] items-center">
        <div className="reflexive flex justify-center items-center gap-4 ">
          <img
            src={logo}
            alt=""
            height={75}
            width={75}
            className='flex items-center justify-center mt-25 sm:mt-0'
          />
          <h2 className="text-4xl mt-25 sm:mt-0 text-white krupixi-title">Krupixi</h2>
        </div>

        <div className='reflexive sm:hidden  w-[300px] flex-col justify-center'>

          {/* div-1 */}
          <div className='absolute top-80 ml-6 gap-2 text-white flex justify-center text-[15px] items-center px-3 py-2 border rounded-full border-neutral-600 hover:bg-neutral-700  cursor-pointer'>
            <LuImages color='white' />

            <span>Create Images</span>
          </div>

          {/* div-2 */}
          <div className='absolute top-80 ml-45 gap-2 text-white flex justify-center text-[15px] items-center px-3 py-2 border rounded-full border-neutral-600  hover:bg-neutral-700  cursor-pointer'>
            <SiGooglelens color='white' />

            <span>Research</span>
          </div>

          {/* div-3 */}
          <div className='absolute top-94 ml-8 gap-2 text-white flex justify-center text-[15px] items-center px-3 py-2 border rounded-full border-neutral-600  hover:bg-neutral-700  cursor-pointer'>

            <RiImageEditLine color='white' />

            <span>Edit Images</span>
          </div>

          {/* div-4 */}
          <div  className=' absolute top-94 ml-42 gap-2 text-white flex justify-center text-[15px] items-center px-3 py-2 border rounded-full border-neutral-600  hover:bg-neutral-700  cursor-pointer'>
            <LuNewspaper color='white' />

            <span>Latest News</span>

          </div>

          {/* div-5 */}
          <div className='absolute  bottom-88 ml-27 gap-2 text-white flex justify-center text-[15px] items-center px-3 py-2 border rounded-full border-neutral-600  hover:bg-neutral-700  cursor-pointer'>

            <FiUser color='white' />

            <span>Personas</span>

          </div>

        </div>
      

        <div className="relative sm:w-[800px] w-[400px] mt-90 sm:mt-15">
          <input
            type="text"
            name="input"
            placeholder="What do you want to know?"
            className="
              px-4 pr-12 py-20 pt-4 w-full border bg-neutral-600 text-white opacity-60
              rounded-3xl placeholder:text-white
              focus:outline-none
            "
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
          <button
            type="button"
            onClick={handleSendMessage}
            className={`
              absolute right-6 top-[70%] py-3 px-3 rounded-full transform -translate-y-1/2
              text-white opacity-80 hover:opacity-100
              focus:outline-none
              ${inputValue ? 'bg-white text-black' : 'bg-neutral-600'}
            `}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : (
              <FaArrowUp size={22}
                className={inputValue ? 'filter grayscale brightness-0' : ''}
              />
            )}
          </button>
        </div>

        <div className='hidden sm:block sm:flex sm:gap-5 sm:w-[700px]    mt-5 sm:items-center justify-center '>

          {/* div-1 */}
          <div className='gap-2 text-white flex justify-center text-[13px] items-center px-3 py-2 border rounded-full border-neutral-600 hover:bg-neutral-700  cursor-pointer'>
            <LuImages color='white' />

            <span>Create Images</span>
          </div>

          {/* div-2 */}
          <div className='gap-2 text-white flex justify-center text-[13px] items-center px-3 py-2 border rounded-full border-neutral-600  hover:bg-neutral-700  cursor-pointer'>
            <SiGooglelens color='white' />

            <span>Research</span>
          </div>

          {/* div-3 */}
          <div className='gap-2 text-white flex justify-center text-[13px] items-center px-3 py-2 border rounded-full border-neutral-600  hover:bg-neutral-700  cursor-pointer'>

            <RiImageEditLine color='white' />

            <span>Edit Images</span>
          </div>

          {/* div-4 */}
          <div  className='gap-2 text-white flex justify-center text-[13px] items-center px-3 py-2 border rounded-full border-neutral-600  hover:bg-neutral-700  cursor-pointer'>
            <LuNewspaper color='white' />

            <span>Latest News</span>

          </div>

          {/* div-5 */}
          <div className='gap-2 text-white flex justify-center text-[13px] items-center px-3 py-2 border rounded-full border-neutral-600  hover:bg-neutral-700  cursor-pointer'>

            <FiUser color='white' />

            <span>Personas</span>

          </div>

        </div>

        {/* Start Chat Button */}
        <div className="mt-6 text-center">
          <p className="text-neutral-400 text-sm krupixi-title">Ready to chat with Krupixi AI</p>
        </div>
      </div>
      {signupPopupJSX}
    </div>
  );
};

export default Home;
