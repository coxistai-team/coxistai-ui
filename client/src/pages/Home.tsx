import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  BookOpen, 
  Users, 
  Calendar, 
  Code, 
  Presentation, 
  MessageSquare,
  ArrowRight,
  CheckCircle,
  Star,
  Play,
  ChevronRight
} from "lucide-react";
import { useLocation } from "wouter";
import GlassmorphismButton from "@/components/ui/glassmorphism-button";
import { useAuth } from "@/contexts/AuthContext";

const Home = () => {
  const [location, setLocation] = useLocation();
  const { isAuthenticated } = useAuth();
  const [currentFeature, setCurrentFeature] = useState(0);

  const features = [
    {
      id: 'chat',
      title: 'AI Tutor',
      description: 'Get instant help with homework, explanations, and step-by-step problem solving',
      icon: Sparkles,
      path: '/chat',
      gradient: 'from-blue-500 to-green-500',
      color: 'blue'
    },
    {
      id: 'notes',
      title: 'Notes Hub',
      description: 'Smart note-taking with AI-powered organization and search',
      icon: BookOpen,
      path: '/notes',
      gradient: 'from-purple-500 to-pink-500',
      color: 'purple'
    },
    {
      id: 'presentations',
      title: 'AI Presentations',
      description: 'Create stunning slides and presentations with AI assistance',
      icon: Presentation,
      path: '/presentations',
      gradient: 'from-orange-500 to-red-500',
      color: 'orange'
    },
    {
      id: 'calendar',
      title: 'Smart Calendar',
      description: 'AI-powered scheduling and time management for students',
      icon: Calendar,
      path: '/calendar',
      gradient: 'from-green-500 to-teal-500',
      color: 'green'
    },
    {
      id: 'code',
      title: 'CodeSpark',
      description: 'Interactive programming lessons with hands-on practice',
      icon: Code,
      path: '/code',
      gradient: 'from-indigo-500 to-purple-500',
      color: 'indigo'
    },
    {
      id: 'community',
      title: 'Community',
      description: 'Connect with other learners, join study groups, and share knowledge',
      icon: Users,
      path: '/community',
      gradient: 'from-pink-500 to-rose-500',
      color: 'pink'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleFeatureClick = (path: string) => {
    setLocation(path);
  };

  return (
    <main className="relative z-10 pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                Coexist AI
              </span>
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Transform your learning with AI-powered education tools. 
              Get instant help, create smart notes, and connect with a community of learners.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <GlassmorphismButton 
                size="lg"
                onClick={() => handleFeatureClick('/chat')}
                className="text-lg px-8 py-4"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Start Learning
              </GlassmorphismButton>
              {!isAuthenticated && (
                <GlassmorphismButton 
                  variant="outline"
                  size="lg"
                  onClick={() => handleFeatureClick('/signup')}
                  className="text-lg px-8 py-4"
                >
                  <Users className="w-5 h-5 mr-2" />
                  Join Community
                </GlassmorphismButton>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-transparent to-slate-50 dark:to-slate-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4">Powerful Learning Tools</h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Everything you need to excel in your studies, powered by artificial intelligence
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.id}
                className="group relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div 
                  className={`p-6 rounded-2xl glassmorphism-strong border border-slate-200/20 dark:border-white/10 cursor-pointer transition-all duration-300 group-hover:shadow-xl`}
                  onClick={() => handleFeatureClick(feature.path)}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-slate-800 dark:text-slate-200">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-4">
                    {feature.description}
                  </p>
                  <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">
                    <span>Learn more</span>
                    <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl font-bold text-blue-600 mb-2">24/7</div>
              <div className="text-slate-600 dark:text-slate-400">AI Tutor Availability</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl font-bold text-green-600 mb-2">100+</div>
              <div className="text-slate-600 dark:text-slate-400">Learning Resources</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl font-bold text-purple-600 mb-2">10K+</div>
              <div className="text-slate-600 dark:text-slate-400">Active Learners</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-500 to-green-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Ready to Transform Your Learning?
          </motion.h2>
          <motion.p 
            className="text-xl text-blue-100 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Join thousands of students who are already using AI to accelerate their education
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <GlassmorphismButton 
              size="lg"
              onClick={() => handleFeatureClick('/chat')}
              className="text-lg px-8 py-4 bg-white/20 hover:bg-white/30 text-white border-white/30"
            >
              <Play className="w-5 h-5 mr-2" />
              Start Free Trial
            </GlassmorphismButton>
            <GlassmorphismButton 
              variant="outline"
              size="lg"
              onClick={() => handleFeatureClick('/signup')}
              className="text-lg px-8 py-4 border-white/30 text-white hover:bg-white/10"
            >
              Create Account
            </GlassmorphismButton>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Home;
