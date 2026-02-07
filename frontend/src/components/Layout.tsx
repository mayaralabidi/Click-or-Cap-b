import React, { useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, Search, Heart, MessageCircle, Image, PlayCircle, Menu, ChevronLeft, ChevronRight, Bell, User, FileSearch } from 'lucide-react';
import { motion } from 'framer-motion';

import { GameProvider, useGame } from '../context/GameContext';

// Helper component to display score in Navbar to avoid hook errors outside Provider
const ScoreDisplay = () => {
  const { score } = useGame();
  return (
      <div className="w-auto px-4 h-10 bg-black text-white flex items-center justify-center font-bold border-[2px] border-black shadow-[3px_3px_0px_0px_#e12320] rounded-xl font-mono">
          SCORE: {score}
      </div>
  );
};

const LayoutContent = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    { to: "/dashboard", end: true, icon: LayoutDashboard, label: "Dashboard" },
    { to: "/dashboard/play", icon: PlayCircle, label: "Click or Cap" },
    { to: "/dashboard/analyze", label: "Analyze Text", icon: FileSearch },
    { to: "/dashboard/empathy", icon: Heart, label: "Empathy Mirror" },
    { to: "/dashboard/de-escalate", icon: MessageCircle, label: "De-Escalator" },
    { to: "/dashboard/image-analysis", icon: Image, label: "Image Analysis" },
  ];

  return (
    <div className="flex min-h-screen bg-white text-black font-sans selection:bg-[#e12320] selection:text-white overflow-hidden">
      {/* Sidebar */}
      <motion.aside 
        animate={{ width: isCollapsed ? 110 : 288 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="bg-white border-r-[3px] border-black flex flex-col p-6 fixed h-full z-20"
      >
        {/* Header / Logo */}
        <div className="flex items-center gap-3 mb-10 overflow-hidden">
             <div className="min-w-[40px] w-10 h-10 flex items-center justify-center border-[3px] border-black bg-white shadow-[3px_3px_0px_0px_#e12320] rounded-xl overflow-hidden">
                 <img src="/logo.png" alt="Logo" className="w-full h-full object-cover" />
             </div>
             {!isCollapsed && (
                 <motion.span 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    className="text-xl font-black uppercase tracking-tighter whitespace-nowrap"
                 >
                    Click or <span className="text-[#e12320]">Cap</span>
                 </motion.span>
             )}
        </div>

        {/* Navigation */}
        <nav className="space-y-4 flex-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-3 border-2 transition-all duration-200 font-bold uppercase tracking-wide text-sm whitespace-nowrap overflow-hidden rounded-xl ${
                  isActive
                    ? 'bg-[#e12320] text-white border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] translate-x-[-2px] translate-y-[-2px]'
                    : 'bg-white text-gray-500 border-transparent hover:border-black hover:text-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]'
                } ${isCollapsed ? 'justify-center px-0' : ''}`
              }
              title={isCollapsed ? item.label : ""}
            >
              <div className="min-w-[20px] flex justify-center">
                  <item.icon size={20} strokeWidth={2.5} />
              </div>
              {!isCollapsed && (
                  <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      {item.label}
                  </motion.span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Toggle Button */}
        <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="mt-auto flex items-center justify-center p-2 border-[3px] border-black bg-white hover:bg-gray-100 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all rounded-xl"
        >
            {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </motion.aside>

      {/* Main Content Wrapper */}
      <motion.div 
         animate={{ marginLeft: isCollapsed ? 110 : 288 }}
         transition={{ type: "spring", stiffness: 300, damping: 30 }}
         className="flex-1 flex flex-col min-h-screen bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"
      >
          {/* Dashboard Navbar */}
          <header className="h-20 bg-white/80 backdrop-blur-md border-b-[3px] border-black sticky top-0 z-10 px-8 flex items-center justify-between">
              {/* Page Title */}
              <h1 className="text-2xl font-black uppercase tracking-tighter">
                  {navItems.find(item => item.to === location.pathname)?.label || "Dashboard"}
              </h1>

              {/* Right Side Actions */}
              <div className="flex items-center gap-6">
                  <ScoreDisplay />
                  {/* Simplified Profile - Just the Image/Icon */}
                  <div className="w-10 h-10 bg-black text-white flex items-center justify-center font-black border-[2px] border-black shadow-[3px_3px_0px_0px_#e12320] rounded-xl">
                      AU
                  </div>
              </div>
          </header>

          {/* Page Content */}
          <main className="p-8 flex-1">
             <Outlet />
          </main>
      </motion.div>
    </div>
  );
};

const Layout = () => {
    return (
        <GameProvider>
            <LayoutContent />
        </GameProvider>
    );
};

export default Layout;
