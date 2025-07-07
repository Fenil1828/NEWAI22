// export default UserHome;
import React, { useState, useRef, useEffect } from 'react';
import { FaArrowUp, FaRobot, FaUser, FaBars } from 'react-icons/fa';
import Sidebar from '../component/common/Sidebar';
import logo from '../assets/kw.png';
import { useSelector } from 'react-redux';

const SIDEBAR_WIDTH = 256;
const SIDEBAR_COLLAPSED = 65;

const UserHome = () => {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey] = useState(import.meta.env.VITE_GROQ_API_KEY || '');
  const [isTyping, setIsTyping] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [searchHistory, setSearchHistory] = useState(() => {
    const savedHistory = localStorage.getItem('chatHistory');
    return savedHistory ? JSON.parse(savedHistory) : [];
  });
  const [activeChat, setActiveChat] = useState(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const [typingMessageId, setTypingMessageId] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const { user } = useSelector((state) => state.auth);

  const chatContainerRef = useRef(null);
  const inputRef = useRef(null);

  // Responsive sidebar logic
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    localStorage.setItem('chatHistory', JSON.stringify(searchHistory));
  }, [searchHistory]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleInputChange = (e) => setInputValue(e.target.value);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Generate chat title from user input
  const generateChatTitle = (message) => {
    // Take first 30 characters and add ellipsis if longer
    const title = message.length > 30 ? message.substring(0, 30) + '...' : message;
    return title;
  };

  // AI API
  const callGroq = async (message) => {
    if (!apiKey) throw new Error('Groq API key required');
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

  // Typing animation component
  const TypingText = ({ text, onComplete, messageId }) => {
    const [displayText, setDisplayText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
      if (currentIndex < text.length) {
        const timer = setTimeout(() => {
          setDisplayText((prev) => prev + text[currentIndex]);
          setCurrentIndex((prev) => prev + 1);
        }, 20);
        return () => clearTimeout(timer);
      } else if (onComplete && currentIndex === text.length) {
        const completeTimer = setTimeout(() => {
          onComplete();
        }, 500);
        return () => clearTimeout(completeTimer);
      }
    }, [currentIndex, text, onComplete]);

    return (
      <span>
        {displayText}
        {currentIndex < text.length && <span className="animate-pulse">|</span>}
      </span>
    );
  };

  // Enhanced chat creation - creates a new chat for every user input
  const createNewChat = (userMessage, userInput) => {
    const chatId = Date.now() + Math.random(); // Ensure unique ID
    const newChat = {
      id: chatId,
      title: generateChatTitle(userInput),
      timestamp: Date.now(),
      messages: [userMessage],
      lastActivity: Date.now(),
      preview: userInput // Store original input for preview
    };
    
    // Add to beginning of search history (most recent first)
    setSearchHistory(prev => [newChat, ...prev]);
    setActiveChat(chatId);
    setMessages([userMessage]);
    
    return chatId;
  };

  const updateExistingChat = (chatId, newMessage) => {
    setSearchHistory(prev =>
      prev.map(chat =>
        chat.id === chatId
          ? { 
              ...chat, 
              messages: [...chat.messages, newMessage],
              lastActivity: Date.now()
            }
          : chat
      )
    );
    setMessages(prev => [...prev, newMessage]);
  };

  // Main message handling logic - Creates new chat for EVERY user input
  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    setShowChat(true);
    const currentMessage = inputValue.trim();
    
    const userMessage = {
      id: Date.now(),
      text: currentMessage,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString(),
    };

    // ALWAYS create a new chat for each user input
    const chatId = createNewChat(userMessage, currentMessage);

    setInputValue('');
    setIsLoading(true);
    setIsTyping(true);

    try {
      const aiResponse = await callGroq(currentMessage);

      const aiMessageId = Date.now() + 1;
      const aiMessage = {
        id: aiMessageId,
        text: aiResponse,
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString(),
        isTyping: true,
      };

      setMessages(prev => [...prev, aiMessage]);
      setTypingMessageId(aiMessageId);
      setIsTyping(false);

      // Update the newly created chat with AI response
      setSearchHistory(prev =>
        prev.map(chat =>
          chat.id === chatId
            ? { 
                ...chat, 
                messages: [...chat.messages, { ...aiMessage, isTyping: false }],
                lastActivity: Date.now()
              }
            : chat
        )
      );
    } catch (error) {
      const errorMessage = {
        id: Date.now() + 1,
        text: `Error: ${error.message}. Please try again.`,
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString(),
        isError: true,
      };

      setMessages(prev => [...prev, errorMessage]);
      setIsTyping(false);

      setSearchHistory(prev =>
        prev.map(chat =>
          chat.id === chatId
            ? { 
                ...chat, 
                messages: [...chat.messages, errorMessage],
                lastActivity: Date.now()
              }
            : chat
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectChat = (chatId) => {
    if (chatId === null) {
      // Start new conversation - clear everything
      setActiveChat(null);
      setMessages([]);
      setShowChat(false);
      setTypingMessageId(null);
    } else {
      // Load existing chat
      const chat = searchHistory.find((c) => c.id === chatId);
      if (chat) {
        setActiveChat(chatId);
        setMessages(chat.messages);
        setShowChat(true);
        setTypingMessageId(null);
      }
    }
  };

  const handleDeleteChat = (chatId) => {
    setSearchHistory((prev) => prev.filter((chat) => chat.id !== chatId));
    if (activeChat === chatId) {
      setActiveChat(null);
      setMessages([]);
      setShowChat(false);
    }
  };

  const handleTypingComplete = (messageId) => {
    setTypingMessageId(null);
    setMessages((prev) =>
      prev.map((msg) => (msg.id === messageId ? { ...msg, isTyping: false } : msg))
    );
  };

  // Start new conversation function
  const startNewConversation = () => {
    setActiveChat(null);
    setMessages([]);
    setShowChat(false);
    setTypingMessageId(null);
    setInputValue('');
    // Focus on input after a short delay to ensure DOM is ready
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 100);
  };

  const LoadingDots = () => (
    <div className="flex space-x-1">
      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
    </div>
  );

  const TypingIndicator = () => (
    <div className="flex items-center space-x-3 p-3 sm:p-4 bg-neutral-700 rounded-lg mb-4 border border-neutral-600">
      <FaRobot className="text-blue-400 flex-shrink-0" />
      <div className="flex items-center space-x-2">
        <span className="text-white text-sm sm:text-base">AI is typing</span>
        <LoadingDots />
      </div>
    </div>
  );

  // Mobile Header Component
  const MobileHeader = () => (
    <div className="md:hidden bg-neutral-900 border-b border-neutral-700 px-4 py-3 flex items-center justify-between">
      <button
        onClick={() => setIsMobileSidebarOpen(true)}
        className="p-2 text-white hover:bg-neutral-700 rounded-lg transition-colors"
      >
        <FaBars size={20} />
      </button>
      <div className="flex items-center gap-2">
        <img src={logo} alt="Logo" width={32} height={32} />
        <h1 className="text-white text-lg font-bold krupixi-title">Krupixi</h1>
      </div>
      <button
        onClick={startNewConversation}
        className="p-2 text-white hover:bg-neutral-700 rounded-lg transition-colors text-sm"
      >
        New
      </button>
    </div>
  );

  // --- CHAT UI ---
  if (showChat) {
    return (
      <div className="flex h-screen bg-neutral-900 overflow-hidden">
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          searchHistory={searchHistory}
          onSelectChat={handleSelectChat}
          onDeleteChat={handleDeleteChat}
          activeChat={activeChat}
          isMobileOpen={isMobileSidebarOpen}
          onMobileClose={() => setIsMobileSidebarOpen(false)}
          onNewChat={startNewConversation}
        />

        {/* DYNAMIC MAIN CONTENT WRAPPER */}
        <div
          className={`
            flex-1 flex flex-col min-h-screen transition-all duration-300
            ${!isMobile ? (isSidebarCollapsed ? 'ml-[65px]' : 'ml-[256px]') : ''}
          `}
        >
          <MobileHeader />

          <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto px-2 sm:px-4 py-4 sm:py-6 pb-20 sm:pb-28 scrollbar-hide"
          >
            <main className="max-w-4xl mx-auto space-y-4 sm:space-y-6 scrollbar-hide">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-end gap-2 sm:gap-3 max-w-[85%] sm:max-w-2xl ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                    {/* USER/AI AVATAR */}
                    <div
                      className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0
                        ${message.sender === 'user' ? 'bg-blue-600' : 'bg-neutral-700'}`}
                    >
                      {message.sender === 'user' ? (
                        user?.image ? (
                          <img
                            src={user.image}
                            alt="User"
                            className="w-full h-full object-cover rounded-full border-2 border-blue-400"
                          />
                        ) : (
                          <FaUser size={isMobile ? 16 : 24} className="text-white" />
                        )
                      ) : (
                        <FaRobot size={isMobile ? 16 : 20} className="text-blue-400" />
                      )}
                    </div>
                    {/* MESSAGE BUBBLE */}
                    <div className="min-w-0 flex-1">
                      <div
                        className={`
                          px-3 sm:px-5 py-2 sm:py-3 rounded-2xl shadow
                          ${message.sender === 'user'
                            ? 'bg-blue-600 text-white rounded-br-none'
                            : message.isError
                            ? 'bg-red-900 text-red-100 border border-red-700'
                            : 'bg-neutral-800 text-white rounded-bl-none'}
                        `}
                      >
                        <p className="whitespace-pre-wrap text-sm sm:text-base break-words">
                          {message.sender === 'ai' && message.isTyping && typingMessageId === message.id ? (
                            <TypingText
                              text={message.text}
                              onComplete={() => handleTypingComplete(message.id)}
                              messageId={message.id}
                            />
                          ) : (
                            message.text
                          )}
                        </p>
                      </div>
                      <span
                        className={`
                          text-xs mt-1 block px-2
                          ${message.sender === 'user' ? 'text-blue-200 text-right' : 'text-neutral-400'}
                        `}
                      >
                        {message.sender === 'user' ? 'You' : 'Krupixi AI'} · {message.timestamp}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && <TypingIndicator />}
            </main>
          </div>

          {/* Input Section */}
          <div className="w-full px-2 sm:px-4 py-3 sm:py-4 bg-neutral-900 border-t border-neutral-700">
            <div className="relative w-full max-w-4xl mx-auto">
              <input
                ref={inputRef}
                type="text"
                name="input"
                placeholder="What do you want to know?"
                className="
                  px-3 sm:px-4 pr-12 sm:pr-16 py-3 sm:py-4 w-full border bg-neutral-600 text-white opacity-90
                  rounded-2xl sm:rounded-3xl placeholder:text-white text-sm sm:text-base
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                "
                value={inputValue}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
              />
              <button
                type="button"
                onClick={handleSendMessage}
                disabled={isLoading}
                className={`
                  absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 
                  py-2 px-2 sm:py-2 sm:px-2 rounded-full
                  text-white opacity-80 hover:opacity-100
                  focus:outline-none transition-all duration-200
                  ${inputValue ? 'bg-white text-black' : 'bg-neutral-600'}
                  ${isLoading ? 'cursor-not-allowed' : 'cursor-pointer'}
                `}
              >
                {isLoading ? (
                  <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                ) : (
                  <FaArrowUp
                    size={isMobile ? 18 : 22}
                    className={inputValue ? 'filter grayscale brightness-0' : ''}
                  />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- LANDING PAGE ---
  return (
    <div className="flex h-screen bg-neutral-900 overflow-hidden">
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        searchHistory={searchHistory}
        onSelectChat={handleSelectChat}
        onDeleteChat={handleDeleteChat}
        activeChat={activeChat}
        isMobileOpen={isMobileSidebarOpen}
        onMobileClose={() => setIsMobileSidebarOpen(false)}
        onNewChat={startNewConversation}
      />
      {/* DYNAMIC MAIN CONTENT WRAPPER */}
      <div
        className={`
          flex-1 flex flex-col transition-all duration-300
          ${!isMobile ? (isSidebarCollapsed ? 'ml-[65px]' : 'ml-[256px]') : ''}
        `}
      >
        <MobileHeader />

        <div className="flex-1 flex justify-center items-center px-4 sm:px-6 py-6">
          <div className="flex flex-col justify-center w-full max-w-2xl items-center">
            <div className="flex justify-center items-center gap-3 sm:gap-4 mb-8 sm:mb-12">
              <img src={logo} alt="Logo" className="w-16 h-16 sm:w-20 sm:h-20" />
              <h2 className="text-3xl sm:text-4xl lg:text-5xl text-white krupixi-title font-bold">Krupixi</h2>
            </div>

            <div className="relative w-full max-w-3xl">
              <input
                ref={inputRef}
                type="text"
                name="input"
                placeholder="What do you want to know?"
                className="
                  px-4 sm:px-6 pr-12 sm:pr-16 py-4 sm:py-6 w-full border bg-neutral-600 text-white opacity-60
                  rounded-2xl sm:rounded-3xl placeholder:text-white text-sm sm:text-base
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                  focus:opacity-90 transition-all duration-200
                "
                value={inputValue}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
              />
              <button
                type="button"
                onClick={handleSendMessage}
                disabled={isLoading}
                className={`
                  absolute right-3 sm:right-6 top-1/2 transform -translate-y-1/2 
                  py-2 sm:py-3 px-2 sm:px-3 rounded-full
                  text-white opacity-80 hover:opacity-100
                  focus:outline-none transition-all duration-200
                  ${inputValue ? 'bg-white text-black' : 'bg-neutral-600'}
                  ${isLoading ? 'cursor-not-allowed' : 'cursor-pointer'}
                `}
              >
                {isLoading ? (
                  <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                ) : (
                  <FaArrowUp
                    size={isMobile ? 18 : 22}
                    className={inputValue ? 'filter grayscale brightness-0' : ''}
                  />
                )}
              </button>
            </div>

            <div className="mt-4 sm:mt-6 text-center">
              <p className="text-neutral-400 text-sm sm:text-base krupixi-title">
                Ready to chat with Krupixi AI
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHome;