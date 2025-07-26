import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, 
  X, 
  ChevronDown, 
  Sparkles,
  User,
  Settings,
  LogOut,
  Crown,
  Camera,
  Bell,
  CreditCard,
  Shield,
  Search,
  BookOpen,
  Calendar,
  MessageSquare,
  Users as UsersIcon,
  GraduationCap,
  Home as HomeIcon
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { LogoutDialog } from "@/components/ui/logout-dialog";
import { useAuth } from "@/contexts/AuthContext";
import { useUser } from "@/contexts/UserContext";

const Navigation = () => {
  const [location, setLocation] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const { user } = useUser();

  const navigationItems = [
    { 
      id: 'learning', 
      label: 'Learning', 
      icon: BookOpen,
      dropdown: [
        { id: 'chat', label: 'AI Tutor', path: '/chat', description: 'Personalized AI learning assistant', icon: MessageSquare },
        { id: 'notes', label: 'Notes Hub', path: '/notes', description: 'Smart note-taking & organization', icon: BookOpen },
        { id: 'presentations', label: 'AI Presentations', path: '/presentations', description: 'Create stunning slides with AI', icon: Sparkles },
        { id: 'calendar', label: 'Smart Calendar', path: '/calendar', description: 'AI-powered scheduling', icon: Calendar },
        { id: 'code', label: 'CodeSpark', path: '/code', description: 'Interactive programming lessons', icon: GraduationCap }
      ]
    },
    { 
      id: 'connect', 
      label: 'Connect', 
      icon: UsersIcon,
      dropdown: [
        { id: 'community', label: 'Community', path: '/community', description: 'Join study groups & forums', icon: UsersIcon },
        { id: 'college', label: 'College Finder', path: '/college', description: 'AI college recommendations', icon: GraduationCap }
      ]
    }
  ];

  const isActive = (path: string) => location === path;
  const isDropdownActive = (dropdown: any[]) => dropdown.some(item => location === item.path);

  const handleNavigation = (path: string) => {
    setLocation(path);
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  const handleDropdownToggle = (itemId: string) => {
    setActiveDropdown(activeDropdown === itemId ? null : itemId);
  };

  const handleLogout = () => {
    setShowLogoutDialog(true);
  };

  const confirmLogout = () => {
    logout();
    setShowLogoutDialog(false);
    setLocation('/login');
  };

  const getInitials = (firstName: string = '', lastName: string = '') => {
    return `${firstName[0] || ''}${lastName[0] || ''}`.toUpperCase() || 'U';
  };

  const getUserName = () => {
    if (!user) return 'User';
    const fullName = `${user.firstName || ''} ${user.lastName || ''}`.trim();
    return fullName || user.username;
  };

  return (
    <>
      <div className="relative z-50">
        {/* Background Blur Effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent pointer-events-none" />
        
        {/* Main Navigation Container */}
        <div className="relative">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              {/* Logo */}
              <motion.div 
                className="flex items-center space-x-4 cursor-pointer group"
                onClick={() => handleNavigation('/')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full animate-pulse"></div>
                </div>
                <div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
                    Coexist AI
                  </span>
                  <div className="text-xs text-white/60 font-medium">Learning Platform</div>
                </div>
              </motion.div>
              
              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center space-x-6">
                {/* Home Link */}
                <motion.button
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center space-x-2 ${
                    location === '/' 
                      ? 'bg-white/20 text-white shadow-lg backdrop-blur-sm' 
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                  onClick={() => handleNavigation('/')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <HomeIcon className="w-4 h-4" />
                  <span>Home</span>
                </motion.button>

                {/* Navigation Items */}
                {navigationItems.map((item) => (
                  <div key={item.id} className="relative">
                    <div 
                      className="relative"
                      onMouseEnter={() => setActiveDropdown(item.id)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <motion.button
                        className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center space-x-2 ${
                          isDropdownActive(item.dropdown) 
                            ? 'bg-white/20 text-white shadow-lg backdrop-blur-sm' 
                            : 'text-white/80 hover:text-white hover:bg-white/10'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <item.icon className="w-4 h-4" />
                        <span>{item.label}</span>
                        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                          activeDropdown === item.id ? 'rotate-180' : ''
                        }`} />
                      </motion.button>
                      
                      <AnimatePresence>
                        {activeDropdown === item.id && (
                          <motion.div
                            className="absolute top-full left-0 mt-3 w-80 bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/20 shadow-2xl overflow-hidden"
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className="p-3">
                              {item.dropdown.map((dropdownItem) => (
                                <motion.button
                                  key={dropdownItem.id}
                                  className={`w-full text-left p-4 rounded-xl transition-all duration-200 flex items-center space-x-3 ${
                                    isActive(dropdownItem.path) 
                                      ? 'bg-gradient-to-r from-violet-500/20 to-purple-500/20 text-violet-300 border border-violet-500/30' 
                                      : 'text-white/90 hover:bg-white/10 hover:text-white'
                                  }`}
                                  onClick={() => handleNavigation(dropdownItem.path)}
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                >
                                  <dropdownItem.icon className="w-5 h-5 flex-shrink-0" />
                                  <div className="flex-1 text-left">
                                    <div className="font-medium">{dropdownItem.label}</div>
                                    <div className="text-xs text-white/60 mt-1">{dropdownItem.description}</div>
                                  </div>
                                </motion.button>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                ))}
                
                {/* Search Bar */}
                <div className="relative">
                  <div className="flex items-center space-x-3 px-4 py-2 bg-white/10 rounded-xl border border-white/20 backdrop-blur-sm">
                    <Search className="w-4 h-4 text-white/60" />
                    <input 
                      type="text" 
                      placeholder="Search courses..."
                      className="bg-transparent text-white placeholder-white/60 text-sm outline-none flex-1 min-w-[200px]"
                    />
                  </div>
                </div>
                
                {/* Auth Section */}
                <div className="flex items-center space-x-4">
                  {isAuthenticated ? (
                    <div className="relative">
                      <motion.button
                        onClick={() => setActiveDropdown(activeDropdown === 'user' ? null : 'user')}
                        className="flex items-center space-x-3 p-3 rounded-xl hover:bg-white/10 transition-all duration-200 group backdrop-blur-sm"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="relative">
                          <Avatar className="w-10 h-10 ring-2 ring-violet-500/30 group-hover:ring-violet-500/50 transition-all duration-300">
                            <AvatarImage src={user?.avatar || undefined} alt={getUserName()} />
                            <AvatarFallback className="bg-gradient-to-br from-violet-500 to-purple-500 text-white text-sm font-semibold">
                              {getInitials(user?.firstName || '', user?.lastName || '')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full border-2 border-white"></div>
                        </div>
                        <div className="text-left">
                          <div className="text-sm font-semibold text-white">{getUserName()}</div>
                          <div className="text-xs text-white/60">Pro Member</div>
                        </div>
                        <ChevronDown className={`w-4 h-4 text-white/60 transition-transform duration-200 ${
                          activeDropdown === 'user' ? 'rotate-180' : ''
                        }`} />
                      </motion.button>

                      <AnimatePresence>
                        {activeDropdown === 'user' && (
                          <>
                            <div 
                              className="fixed inset-0 z-40"
                              onClick={() => setActiveDropdown(null)}
                            />
                            <motion.div
                              className="absolute top-full right-0 mt-3 w-80 bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/20 shadow-2xl overflow-hidden z-50"
                              initial={{ opacity: 0, y: -10, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: -10, scale: 0.95 }}
                              transition={{ duration: 0.2 }}
                            >
                              <div className="p-6 bg-gradient-to-br from-violet-500/10 to-purple-500/10">
                                <div className="flex items-center space-x-4">
                                  <div className="relative">
                                    <Avatar className="w-16 h-16 ring-4 ring-violet-500/30">
                                      <AvatarImage src={user?.avatar || undefined} alt={getUserName()} />
                                      <AvatarFallback className="bg-gradient-to-br from-violet-500 to-purple-500 text-white font-semibold text-lg">
                                        {getInitials(user?.firstName || '', user?.lastName || '')}
                                      </AvatarFallback>
                                    </Avatar>
                                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full border-3 border-white"></div>
                                  </div>
                                  <div className="flex-1">
                                    <div className="font-bold text-white text-lg">{getUserName()}</div>
                                    <div className="text-sm text-white/60">{user?.email || 'No email set'}</div>
                                    <Badge className="mt-2 text-xs bg-gradient-to-r from-violet-500 to-purple-500 text-white border-0 px-3 py-1">
                                      <Crown className="w-3 h-3 mr-1" />
                                      Pro Plan
                                    </Badge>
                                  </div>
                                </div>
                              </div>

                              <Separator className="bg-white/10" />

                              <div className="p-3">
                                <div className="grid grid-cols-2 gap-2 mb-3">
                                  <motion.button
                                    className="flex items-center space-x-3 p-3 rounded-xl hover:bg-white/10 transition-colors text-left group"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                  >
                                    <User className="w-4 h-4 text-violet-400" />
                                    <span className="text-violet-400 group-hover:text-violet-300 text-sm">Profile</span>
                                  </motion.button>
                                  <motion.button
                                    className="flex items-center space-x-3 p-3 rounded-xl hover:bg-white/10 transition-colors text-left group"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                  >
                                    <Settings className="w-4 h-4 text-blue-400" />
                                    <span className="text-blue-400 group-hover:text-blue-300 text-sm">Settings</span>
                                  </motion.button>
                                  <motion.button
                                    className="flex items-center space-x-3 p-3 rounded-xl hover:bg-white/10 transition-colors text-left group"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                  >
                                    <CreditCard className="w-4 h-4 text-emerald-400" />
                                    <span className="text-emerald-400 group-hover:text-emerald-300 text-sm">Billing</span>
                                  </motion.button>
                                  <motion.button
                                    className="flex items-center space-x-3 p-3 rounded-xl hover:bg-white/10 transition-colors text-left group"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                  >
                                    <Bell className="w-4 h-4 text-yellow-400" />
                                    <span className="text-yellow-400 group-hover:text-yellow-300 text-sm">Notifications</span>
                                  </motion.button>
                                </div>
                                
                                <Separator className="bg-white/10 my-3" />
                                
                                <motion.button
                                  onClick={handleLogout}
                                  className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-red-500/20 transition-colors text-left group"
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                >
                                  <LogOut className="w-4 h-4 text-red-400" />
                                  <span className="text-red-400 group-hover:text-red-300">Log Out</span>
                                </motion.button>
                              </div>
                            </motion.div>
                          </>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <>
                      <motion.button
                        className="px-6 py-3 text-white/90 hover:text-white transition-colors font-medium"
                        onClick={() => handleNavigation('/login')}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Sign In
                      </motion.button>
                      <motion.button
                        className="px-8 py-3 rounded-xl font-semibold bg-gradient-to-r from-violet-500 to-purple-500 text-white hover:from-violet-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                        onClick={() => handleNavigation('/signup')}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Get Started
                      </motion.button>
                    </>
                  )}
                </div>
              </div>
              
              {/* Mobile Menu Button */}
              <div className="lg:hidden">
                <motion.button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="text-white p-3 rounded-xl hover:bg-white/10 transition-colors backdrop-blur-sm"
                  whileTap={{ scale: 0.95 }}
                >
                  {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </motion.button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              <div 
                className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                onClick={() => setMobileMenuOpen(false)}
              />
              <motion.div
                className="lg:hidden bg-white/10 backdrop-blur-2xl mt-2 mx-6 rounded-2xl border border-white/20 overflow-hidden relative z-50 max-h-[calc(100vh-6rem)] overflow-y-auto"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="p-6 space-y-4">
                  {/* Search Bar */}
                  <div className="relative">
                    <div className="flex items-center space-x-3 px-4 py-3 bg-white/10 rounded-xl border border-white/20">
                      <Search className="w-4 h-4 text-white/60" />
                      <input 
                        type="text" 
                        placeholder="Search courses..."
                        className="bg-transparent text-white placeholder-white/60 text-sm outline-none flex-1"
                      />
                    </div>
                  </div>

                  {/* Navigation Items */}
                  <div className="space-y-2">
                    <button
                      className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-300 flex items-center space-x-2 ${
                        location === '/' 
                          ? 'bg-white/20 text-white' 
                          : 'text-white/90 hover:bg-white/10'
                      }`}
                      onClick={() => handleNavigation('/')}
                    >
                      <HomeIcon className="w-4 h-4" />
                      <span>Home</span>
                    </button>
                    
                    {navigationItems.map((item) => (
                      <div key={item.id}>
                        <button
                          className="w-full text-left px-4 py-3 rounded-xl font-medium text-white hover:bg-white/10 transition-colors flex items-center justify-between"
                          onClick={() => handleDropdownToggle(item.id)}
                        >
                          <div className="flex items-center space-x-3">
                            <item.icon className="w-4 h-4" />
                            <span>{item.label}</span>
                          </div>
                          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                            activeDropdown === item.id ? 'rotate-180' : ''
                          }`} />
                        </button>
                        <AnimatePresence>
                          {activeDropdown === item.id && (
                            <motion.div
                              className="ml-6 mt-2 space-y-1"
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              {item.dropdown.map((dropdownItem) => (
                                <button
                                  key={dropdownItem.id}
                                  className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 flex items-center space-x-3 ${
                                    isActive(dropdownItem.path) 
                                      ? 'bg-gradient-to-r from-violet-500/20 to-purple-500/20 text-violet-300' 
                                      : 'text-white/80 hover:bg-white/10'
                                  }`}
                                  onClick={() => handleNavigation(dropdownItem.path)}
                                >
                                  <dropdownItem.icon className="w-4 h-4 flex-shrink-0" />
                                  <div className="flex-1 text-left">
                                    <div className="font-medium">{dropdownItem.label}</div>
                                    <div className="text-xs text-white/60 mt-1">{dropdownItem.description}</div>
                                  </div>
                                </button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>

                  {/* Auth Section */}
                  <div className="pt-4 border-t border-white/20">
                    {isAuthenticated ? (
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3 p-3 rounded-xl bg-white/5">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={user?.avatar || undefined} alt={getUserName()} />
                            <AvatarFallback className="bg-gradient-to-br from-violet-500 to-purple-500 text-white text-sm">
                              {getInitials(user?.firstName || '', user?.lastName || '')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="text-sm font-semibold text-white">{getUserName()}</div>
                            <div className="text-xs text-white/60">Pro Member</div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <button className="flex items-center space-x-3 p-3 rounded-xl hover:bg-white/10 transition-colors text-left text-violet-400 text-sm">
                            <User className="w-4 h-4" />
                            <span>Profile</span>
                          </button>
                          <button className="flex items-center space-x-3 p-3 rounded-xl hover:bg-white/10 transition-colors text-left text-blue-400 text-sm">
                            <Settings className="w-4 h-4" />
                            <span>Settings</span>
                          </button>
                        </div>
                        <button
                          className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-red-500/20 transition-colors text-left text-red-400"
                          onClick={handleLogout}
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Log Out</span>
                        </button>
                      </div>
                    ) : (
                      <div className="flex space-x-3">
                        <button
                          className="flex-1 px-4 py-3 rounded-xl font-medium text-white border border-white/30 hover:bg-white/10 transition-colors"
                          onClick={() => handleNavigation('/login')}
                        >
                          Sign In
                        </button>
                        <button
                          className="flex-1 px-4 py-3 rounded-xl font-semibold bg-gradient-to-r from-violet-500 to-purple-500 text-white"
                          onClick={() => handleNavigation('/signup')}
                        >
                          Get Started
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Logout Confirmation Dialog */}
      <LogoutDialog 
        open={showLogoutDialog}
        onOpenChange={setShowLogoutDialog}
        onConfirm={confirmLogout}
      />
    </>
  );
};

export default Navigation;
