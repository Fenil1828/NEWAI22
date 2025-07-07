// src/components/Sidebar.js
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RiSearch2Line, RiMenuFoldLine, RiMenuUnfoldLine } from "react-icons/ri";
import { FaRegEdit, FaTrash, FaClock, FaUserCircle, FaTimes } from "react-icons/fa";
import logo from '../../assets/kw.png';

// Custom scrollbar-hide style (add to your global CSS if needed)
const scrollbarHideStyle = {
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  '&::-webkit-scrollbar': {
    display: 'none',
  }
};

const Sidebar = ({
  isCollapsed,
  onToggle,
  searchHistory = [],
  onSelectChat,
  onDeleteChat,
  activeChat,
  onHoverChange,
  isMobileOpen = false,
  onMobileClose,
}) => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  // Use Redux user directly!
  const { user } = useSelector((state) => state.auth);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close mobile sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobile && isMobileOpen && !event.target.closest('.sidebar-container')) {
        onMobileClose?.();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobile, isMobileOpen, onMobileClose]);

  const formatTime = (timestamp) => {
    const now = new Date();
    const date = new Date(timestamp);
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return date.toLocaleDateString();
  };

  const truncateText = (text, maxLength = 25) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  // Filter history based on search query
  const filteredHistory = searchHistory.filter((chat) =>
    chat.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Determine effective collapsed state
  const effectiveCollapsed = !isMobile && isCollapsed && !isHovered;

  // Update hover state and notify parent
  const handleMouseEnter = () => {
    if (!isMobile) {
      setIsHovered(true);
      onHoverChange?.(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setIsHovered(false);
      onHoverChange?.(false);
    }
  };

  // For fading effect: newest chat is most opaque, older chats fade out
  const getOpacity = (idx, total) => {
    if (total <= 1) return 1;
    const minOpacity = 0.5;
    const maxOpacity = 1.0;
    return maxOpacity - ((maxOpacity - minOpacity) * (idx / (total - 1)));
  };

  const handleChatSelect = (chatId) => {
    onSelectChat(chatId);
    if (isMobile) {
      onMobileClose?.();
    }
  };

  // Mobile overlay backdrop
  const MobileOverlay = () => (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
      onClick={onMobileClose}
    />
  );

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && isMobileOpen && <MobileOverlay />}
      
      <div
        className={`
          sidebar-container
          ${isMobile 
            ? `fixed left-0 top-0 h-full w-[280px] z-50 transform transition-transform duration-300 ease-in-out ${
                isMobileOpen ? 'translate-x-0' : '-translate-x-full'
              }`
            : `${isCollapsed ? 'w-[65px] hover:w-[256px]' : 'w-[256px]'} transition-all duration-300 ease-in-out relative`
          }
          h-screen border-r border-stone-800 bg-neutral-900 overflow-hidden
        `}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className='flex flex-col gap-2 h-full'>
          {/* Header with Logo and Close/Toggle */}
          <div className={`flex items-center ${effectiveCollapsed ? 'justify-center' : 'justify-between'} px-3 mt-5`}>
            <div className="flex items-center gap-2">
              <img
                src={logo}
                alt="K logo"
                height={42}
                width={42}
                className={`${effectiveCollapsed ? '' : 'ml-2'}`}
              />
              {!effectiveCollapsed && (
                <h2 className="text-white text-xl font-bold md:hidden krupixi-title">Krupixi</h2>
              )}
            </div>
            
            {/* Mobile Close Button */}
            {isMobile && (
              <button
                onClick={onMobileClose}
                className="p-2 rounded-lg hover:bg-neutral-700 transition-colors text-white md:hidden"
              >
                <FaTimes size={20} />
              </button>
            )}
          </div>

          {/* Search Bar */}
          <div className={`
            flex gap-3 px-3 py-2 mt-3 bg-gray-900 rounded-4xl
            ${effectiveCollapsed ? 'w-[40px] justify-center' : 'w-[90%] justify-start'}
            items-center ml-3 border border-neutral-600 transition-all duration-300
          `}>
            <RiSearch2Line color='white' size={18} />
            {!effectiveCollapsed && (
              <input
                type="text"
                placeholder="Search chats..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent text-white text-sm placeholder-neutral-400 focus:outline-none w-full"
              />
            )}
          </div>

          {/* New Chat Button */}
          <div className={`
            flex gap-3 text-white px-3 py-1.5 mt-1 bg-neutral-800 rounded-xl
            ${effectiveCollapsed ? 'w-[40px] justify-center' : 'w-[90%] justify-start'}
            items-center ml-3 opacity-60 hover:bg-neutral-600 transition-all duration-300 cursor-pointer
          `}
            onClick={() => handleChatSelect(null)}>
            <FaRegEdit size={18} />
            {!effectiveCollapsed && 'New Chat'}
          </div>

          {/* Recent Chats */}
          {!effectiveCollapsed && filteredHistory.length > 0 && (
            <div
              className="flex flex-col gap-1 mt-4 px-3 flex-1 overflow-y-auto scrollbar-hide"
              style={scrollbarHideStyle}
            >
              <div className="text-neutral-400 text-xs font-medium mb-2 px-2">Recent Chats</div>
              {filteredHistory.map((chat, idx) => (
                <div
                  key={chat.id}
                  className={`
                    group relative flex items-center gap-2 px-2 py-2 rounded-lg cursor-pointer
                    transition-all duration-200 hover:bg-neutral-800
                    ${activeChat === chat.id ? 'bg-neutral-700' : ''}
                  `}
                  onClick={() => handleChatSelect(chat.id)}
                  onMouseEnter={() => setHoveredItem(chat.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  style={{
                    opacity: getOpacity(idx, filteredHistory.length),
                    boxShadow: activeChat === chat.id
                      ? '0 2px 8px 0 rgba(59,130,246,0.08)'
                      : 'none',
                    transition: 'opacity 0.3s, box-shadow 0.3s'
                  }}
                >
                  <FaClock className="text-neutral-500 flex-shrink-0" size={12} />
                  <div className="flex-1 min-w-0">
                    <div className="text-white text-sm truncate">
                      {truncateText(chat.title, isMobile ? 20 : 25)}
                    </div>
                    <div className="text-neutral-400 text-xs">
                      {formatTime(chat.timestamp)}
                    </div>
                  </div>
                  {/* Show delete button always on mobile, on hover on desktop */}
                  {(isMobile || hoveredItem === chat.id) && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteChat(chat.id);
                      }}
                      className="p-1 rounded text-red-400 hover:text-red-300 transition-all duration-200"
                    >
                      <FaTrash size={10} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Collapsed Recent Chats */}
          {effectiveCollapsed && filteredHistory.length > 0 && (
            <div
              className="flex flex-col items-center gap-1 mt-4 px-1 flex-1 overflow-y-auto scrollbar-hide"
              style={scrollbarHideStyle}
            >
              {filteredHistory.slice(0, 8).map((chat, idx) => (
                <button
                  key={chat.id}
                  onClick={() => handleChatSelect(chat.id)}
                  className={`
                    w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200
                    hover:bg-neutral-700
                    ${activeChat === chat.id ? 'bg-neutral-700' : 'bg-neutral-800'}
                  `}
                  title={chat.title}
                  style={{
                    opacity: getOpacity(idx, Math.min(filteredHistory.length, 8)),
                    transition: 'opacity 0.3s'
                  }}
                >
                  <FaClock className="text-neutral-400" size={12} />
                </button>
              ))}
            </div>
          )}

          {/* No Results Message */}
          {!effectiveCollapsed && searchQuery && filteredHistory.length === 0 && (
            <div className="flex flex-col gap-1 mt-4 px-3">
              <div className="text-neutral-400 text-xs font-medium mb-2 px-2">Recent Chats</div>
              <div className="text-neutral-400 text-sm px-2">No chats found.</div>
            </div>
          )}

          {/* Profile Icon + Name + Toggle Button */}
          <div className="flex items-center justify-between px-4 py-3 mt-auto border-t border-neutral-700">
            {/* Profile Icon and Name */}
            <div className="flex items-center gap-2 min-w-0">
              <button
                className="rounded-full hover:bg-neutral-700 transition-colors duration-200 text-white p-1"
                title="Profile"
              >
                {user?.image ? (
                  <img
                    src={user.image}
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover border-2 border-blue-500"
                  />
                ) : (
                  <FaUserCircle size={32} />
                )}
              </button>
              {(user?.firstName || user?.lastName) && (
                <span className="text-white text-base font-medium whitespace-nowrap max-w-[120px] overflow-hidden text-ellipsis">
                  {user?.firstName} {user?.lastName}
                </span>
              )}
            </div>
            
            {/* Toggle Button - Only show on desktop */}
            {!isMobile && (
              <button
                onClick={onToggle}
                className="p-1 rounded hover:bg-neutral-700 transition-colors duration-200 text-white"
                title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
              >
                {isCollapsed ? <RiMenuUnfoldLine size={22} /> : <RiMenuFoldLine size={22} />}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
