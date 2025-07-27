import { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { NAVIGATION_ITEMS } from "@/lib/constants";
import UserProfileDropdown from "@/components/ui/user-profile-dropdown";
import { useAuth } from "@/contexts/AuthContext";
import { usePageLoading } from "@/contexts/PageLoadingContext";
import logo1x from "../../../assets/1x.png";

const Navigation = () => {
  const [location, setLocation] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();
  const { showPageLoader, hidePageLoader } = usePageLoading();

  const isActive = (path: string) => location === path;
  const isDropdownActive = (dropdown: readonly any[]) => dropdown.some(item => location === item.path);

  const handleNavigation = (path: string) => {
    if (path !== location) {
      showPageLoader();
      
      // Simulate page loading time
      setTimeout(() => {
        setLocation(path);
        setMobileMenuOpen(false);
        setActiveDropdown(null);
        
        // Hide loader after navigation
        setTimeout(() => {
          hidePageLoader();
        }, 300);
      }, 100);
    } else {
      setMobileMenuOpen(false);
      setActiveDropdown(null);
    }
  };

  const handleDropdownToggle = (itemId: string) => {
    setActiveDropdown(activeDropdown === itemId ? null : itemId);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 glassmorphism-strong border-b border-slate-200/20 dark:border-white/10 bg-white/90 dark:bg-slate-900/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <motion.div 
              className="flex items-center space-x-3 cursor-pointer"
              onClick={() => handleNavigation('/')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img 
                src={logo1x} 
                alt="Coexist AI Logo" 
                className="w-20 h-20 rounded-xl shadow-lg object-cover" 
                width={20} 
                height={20} 
                loading="eager"
              />
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">Coexist AI</span>
                <div className="text-xs text-slate-600 dark:text-slate-400">Learning Platform</div>
              </div>
            </motion.div>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {NAVIGATION_ITEMS.map((item) => (
                <div key={item.id} className="relative">
                  {'dropdown' in item ? (
                    <div 
                      className="relative"
                      onMouseEnter={() => setActiveDropdown(item.id)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <motion.button
                        className={`nav-link px-4 py-3 rounded-xl transition-all duration-300 flex items-center space-x-2 ${
                          isDropdownActive(item.dropdown) ? 'active' : ''
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span>{item.label}</span>
                        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                          activeDropdown === item.id ? 'rotate-180' : ''
                        }`} />
                      </motion.button>
                      
                      <AnimatePresence>
                        {activeDropdown === item.id && (
                          <motion.div
                            className="absolute top-full left-0 mt-2 w-80 glassmorphism-strong rounded-xl border border-warm-400/30 shadow-xl overflow-hidden"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className="p-2">
                              {item.dropdown.map((dropdownItem) => (
                                <motion.button
                                  key={dropdownItem.id}
                                  className={`w-full text-left p-4 rounded-lg transition-all duration-200 ${
                                    isActive(dropdownItem.path) ? 'bg-warm-500/20 text-warm-700' : 'text-warm-900 hover:bg-warm-200/50'
                                  }`}
                                  onClick={() => handleNavigation(dropdownItem.path)}
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                >
                                  <div className="font-medium">{dropdownItem.label}</div>
                                  <div className="text-xs text-warm-600 mt-1">{dropdownItem.description}</div>
                                </motion.button>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <motion.button
                      className={`nav-link px-4 py-3 rounded-xl transition-all duration-300 ${
                        'path' in item && isActive(item.path) ? 'active' : ''
                      }`}
                      onClick={() => 'path' in item && handleNavigation(item.path)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {item.label}
                    </motion.button>
                  )}
                </div>
              ))}
              
              {/* Auth Section */}
              <div className="ml-4 flex items-center space-x-3">
                {isAuthenticated ? (
                  <UserProfileDropdown />
                ) : (
                  <>
                    <motion.button
                      className="px-4 py-2 text-warm-800 hover:text-warm-600 transition-colors font-medium"
                      onClick={() => handleNavigation('/login')}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Login
                    </motion.button>
                    <motion.button
                      className="glassmorphism-button px-6 py-3 rounded-xl font-semibold"
                      onClick={() => handleNavigation('/signup')}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Sign Up
                    </motion.button>
                  </>
                )}
              </div>
            </div>
            
            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <motion.button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-warm-800 p-3 glassmorphism rounded-xl"
                whileTap={{ scale: 0.95 }}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </motion.button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              {/* Mobile Menu Backdrop */}
              <div 
                className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                onClick={() => setMobileMenuOpen(false)}
              />
              <motion.div
                className="lg:hidden glassmorphism-strong mt-2 mx-4 rounded-xl border border-warm-400/30 overflow-hidden relative z-50 max-h-[calc(100vh-6rem)] overflow-y-auto custom-scrollbar"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="p-4 space-y-2">
                  {NAVIGATION_ITEMS.map((item) => (
                    <div key={item.id}>
                      {'dropdown' in item ? (
                        <div>
                          <button
                            className="w-full text-left px-4 py-3 rounded-lg font-semibold text-warm-800 hover:bg-warm-200/50 transition-colors"
                            onClick={() => handleDropdownToggle(item.id)}
                          >
                            <div className="flex items-center justify-between">
                              <span>{item.label}</span>
                              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                                activeDropdown === item.id ? 'rotate-180' : ''
                              }`} />
                            </div>
                          </button>
                          <AnimatePresence>
                            {activeDropdown === item.id && (
                              <motion.div
                                className="ml-4 mt-2 space-y-1"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2 }}
                              >
                                {item.dropdown.map((dropdownItem) => (
                                  <button
                                    key={dropdownItem.id}
                                    className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                                      isActive(dropdownItem.path) ? 'bg-warm-500/20 text-warm-700' : 'text-warm-700 hover:bg-warm-200/50'
                                    }`}
                                    onClick={() => handleNavigation(dropdownItem.path)}
                                  >
                                    <div className="font-medium">{dropdownItem.label}</div>
                                    <div className="text-xs text-warm-600 mt-1">{dropdownItem.description}</div>
                                  </button>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <button
                          className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 ${
                            'path' in item && isActive(item.path) ? 'bg-warm-500/20 text-warm-700' : 'text-warm-800 hover:bg-warm-200/50'
                          }`}
                          onClick={() => 'path' in item && handleNavigation(item.path)}
                        >
                          {item.label}
                        </button>
                      )}
                    </div>
                  ))}
                  <div className="mt-4 space-y-4">
                    {isAuthenticated ? (
                      <div className="border-t border-slate-200/30 dark:border-white/10 pt-4">
                        <UserProfileDropdown className="w-full" />
                      </div>
                    ) : (
                      <div className="flex space-x-2">
                        <button
                          className="flex-1 px-4 py-3 rounded-lg font-semibold text-warm-800 border border-warm-400/40 hover:bg-warm-200/50 transition-colors"
                          onClick={() => handleNavigation('/login')}
                        >
                          Login
                        </button>
                        <button
                          className="flex-1 glassmorphism-button px-4 py-3 rounded-lg font-semibold"
                          onClick={() => handleNavigation('/signup')}
                        >
                          Sign Up
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default Navigation;