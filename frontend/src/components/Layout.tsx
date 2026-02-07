import React, { useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, Search, Heart, MessageCircle, Image, PlayCircle, Menu, ChevronLeft, ChevronRight, Bell, User, FileSearch, Cloud } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navItems = [
    { to: "/dashboard", end: true, icon: LayoutDashboard, label: "Dashboard" },
    { to: "/dashboard/play", icon: PlayCircle, label: "Click or Cap" },
    { to: "/dashboard/analyze", label: "Analyze Text", icon: FileSearch },
    { to: "/dashboard/image-analysis", icon: Image, label: "Image Analysis" },
    { to: "/dashboard/hate-weather", icon: Cloud, label: "Hate Weather Report" },
    { to: "/dashboard/empathy", icon: Heart, label: "Empathy Mirror" },
    { to: "/dashboard/de-escalate", icon: MessageCircle, label: "De-Escalator" },
  ];

  // Close mobile menu when route changes
  React.useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen bg-white text-black font-sans selection:bg-[#e12320] selection:text-white overflow-hidden">
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar - Desktop (Static) */}
      <motion.aside 
        animate={{ width: isCollapsed ? 110 : 288 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="hidden md:flex bg-white border-r-[3px] border-black flex-col p-6 sticky top-0 h-screen z-20 shrink-0"
      >
        {/* Header / Logo */}
        <div className="flex items-center gap-3 mb-10 overflow-hidden">
             <div className="min-w-[40px] w-10 h-10 flex items-center justify-center border-[3px] border-black bg-white shadow-[3px_3px_0px_0px_#e12320] rounded-xl overflow-hidden shrink-0">
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
        <nav className="space-y-4 flex-1 overflow-y-auto no-scrollbar">
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

      {/* Sidebar - Mobile (Overlay) */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsMobileOpen(false)}
            />
            <motion.aside 
               initial={{ x: "-100%" }}
               animate={{ x: 0 }}
               exit={{ x: "-100%" }}
               transition={{ type: "spring", stiffness: 300, damping: 30 }}
               className="fixed inset-y-0 left-0 w-[288px] bg-white border-r-[3px] border-black flex flex-col p-6 z-50 md:hidden"
            >
                {/* Header / Logo */}
                <div className="flex items-center gap-3 mb-10">
                     <div className="w-10 h-10 flex items-center justify-center border-[3px] border-black bg-white shadow-[3px_3px_0px_0px_#e12320] rounded-xl overflow-hidden shrink-0">
                         <img src="/logo.png" alt="Logo" className="w-full h-full object-cover" />
                     </div>
                     <span className="text-xl font-black uppercase tracking-tighter whitespace-nowrap">
                        Click or <span className="text-[#e12320]">Cap</span>
                     </span>
                     <button 
                        onClick={() => setIsMobileOpen(false)}
                        className="ml-auto p-1"
                     >
                       <ChevronLeft size={24} />
                     </button>
                </div>

                <nav className="space-y-4 flex-1 overflow-y-auto">
                  {navItems.map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      end={item.end}
                      onClick={() => setIsMobileOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-3 border-2 transition-all duration-200 font-bold uppercase tracking-wide text-sm whitespace-nowrap overflow-hidden rounded-xl ${
                          isActive
                            ? 'bg-[#e12320] text-white border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] translate-x-[-2px] translate-y-[-2px]'
                            : 'bg-white text-gray-500 border-transparent hover:border-black hover:text-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]'
                        }`
                      }
                    >
                      <div className="min-w-[20px] flex justify-center">
                          <item.icon size={20} strokeWidth={2.5} />
                      </div>
                      <span>{item.label}</span>
                    </NavLink>
                  ))}
                </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col min-h-screen min-w-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
          {/* Dashboard Navbar */}
          <header className="h-16 md:h-20 bg-white/80 backdrop-blur-md border-b-[3px] border-black sticky top-0 z-10 px-4 md:px-8 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-4 min-w-0">
                {/* Mobile Menu Button */}
                <button 
                  className="md:hidden p-2 -ml-2 hover:bg-gray-100 rounded-lg shrink-0"
                  onClick={() => setIsMobileOpen(true)}
                >
                  <Menu size={24} />
                </button>

                {/* Page Title */}
                <h1 className="text-lg md:text-2xl font-black uppercase tracking-tighter truncate">
                    {navItems.find(item => item.to === location.pathname)?.label || "Dashboard"}
                </h1>
              </div>

              {/* Right Side Actions */}
              <div className="flex items-center gap-6 shrink-0">
                  <ScoreDisplay />
              </div>
          </header>

          {/* Page Content */}
          <main className="p-4 md:p-8 flex-1 overflow-x-hidden">
             <Outlet />
          </main>
      </div>
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
