"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { useLocation } from "wouter"
import {
  MessageCircle,
  NotebookPen,
  Users,
  GraduationCap,
  Presentation,
  Calendar,
  Code,
  ArrowRight,
  Sparkles,
  Brain,
  Trophy,
  Star,
  Clock,
  Rocket,
} from "lucide-react"
import GlassmorphismButton from "@/components/ui/glassmorphism-button"

const Home = () => {
  const [, setLocation] = useLocation()
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 }
  const ySpring = useSpring(y, springConfig)

  const features = [
    {
      icon: MessageCircle,
      title: "AI Tutor Chat",
      description: "Get instant help with homework and complex concepts",
      path: "/chat",
      gradient: "from-blue-500 via-purple-500 to-pink-500",
      size: "large",
      stats: "24/7 Available",
      badge: "Most Popular",
    },
    {
      icon: NotebookPen,
      title: "Smart Notes",
      description: "Organize and search your notes with AI",
      path: "/notes",
      gradient: "from-green-400 via-emerald-500 to-teal-600",
      size: "medium",
      stats: "50K+ Notes",
    },
    {
      icon: Users,
      title: "Study Groups",
      description: "Connect with fellow learners",
      path: "/community",
      gradient: "from-orange-400 via-red-500 to-pink-600",
      size: "medium",
      stats: "2.8K Members",
    },
    {
      icon: Presentation,
      title: "AI Presentations",
      description: "Create stunning slides instantly",
      path: "/presentations",
      gradient: "from-purple-500 via-violet-500 to-indigo-600",
      size: "large",
      stats: "Export to PPT",
      badge: "New",
    },
    {
      icon: Calendar,
      title: "Smart Calendar",
      description: "AI-powered scheduling",
      path: "/calendar",
      gradient: "from-cyan-400 via-blue-500 to-indigo-600",
      size: "small",
      stats: "Google Sync",
    },
    {
      icon: Code,
      title: "CodeSpark",
      description: "Interactive programming lessons",
      path: "/code",
      gradient: "from-yellow-400 via-orange-500 to-red-600",
      size: "medium",
      stats: "5 Languages",
    },
    {
      icon: GraduationCap,
      title: "College Finder",
      description: "Find your perfect college match",
      path: "/college",
      gradient: "from-emerald-400 via-green-500 to-teal-600",
      size: "small",
      stats: "1000+ Colleges",
    },
  ]

  const stats = [
    { label: "Active Students", value: "50K+", icon: Users, color: "text-blue-400" },
    { label: "Success Rate", value: "98%", icon: Trophy, color: "text-green-400" },
    { label: "AI Responses", value: "1M+", icon: Brain, color: "text-purple-400" },
    { label: "Study Hours", value: "500K+", icon: Clock, color: "text-orange-400" },
  ]

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Computer Science Student",
      content: "Coexist AI helped me ace my algorithms course. The AI tutor explains complex concepts so clearly!",
      avatar: "SC",
      rating: 5,
    },
    {
      name: "Marcus Johnson",
      role: "High School Senior",
      content: "The college recommender found my dream school. I got accepted with a scholarship!",
      avatar: "MJ",
      rating: 5,
    },
    {
      name: "Elena Rodriguez",
      role: "Medical Student",
      content: "Study groups feature connected me with amazing peers. We support each other every day.",
      avatar: "ER",
      rating: 5,
    },
  ]

  return (
    <main
      ref={containerRef}
      className="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Hero Section */}
      <motion.section
        className="relative z-10 min-h-screen flex items-center justify-center px-4 pt-20"
        style={{ y: ySpring, opacity, scale }}
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Floating Badge */}
            <motion.div
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-xl rounded-full px-6 py-3 mb-8 border border-blue-400/20 relative overflow-hidden"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8, type: "spring", stiffness: 100 }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full"
                animate={{
                  x: [-100, 100],
                  opacity: [0, 0.5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <Sparkles className="w-5 h-5 text-blue-400" />
              </motion.div>
              <span className="text-sm font-semibold text-blue-300 relative z-10">
                Next-Generation AI Learning Platform
              </span>
              <motion.div
                className="w-2 h-2 bg-blue-400 rounded-full relative z-10"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
            </motion.div>

            {/* Main Title with 3D Effect */}
            <motion.div className="relative mb-8">
              <motion.h1
                className="text-6xl md:text-8xl font-bold mb-6 leading-tight relative z-10"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                <span className="inline-block">
                  {"Build ".split("").map((letter, index) => (
                    <motion.span
                      key={index}
                      className="inline-block bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent"
                      initial={{ opacity: 0, y: 50, rotateX: -90 }}
                      animate={{ opacity: 1, y: 0, rotateX: 0 }}
                      transition={{
                        delay: 0.3 + index * 0.1,
                        duration: 0.8,
                        type: "spring",
                        stiffness: 100,
                      }}
                      whileHover={{
                        scale: 1.1,
                        textShadow: "0 0 20px rgba(99, 102, 241, 0.8)",
                        transition: { duration: 0.2 },
                      }}
                    >
                      {letter}
                    </motion.span>
                  ))}
                </span>
                <br />
                <span className="inline-block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {"your skills ".split("").map((letter, index) => (
                    <motion.span
                      key={index}
                      className="inline-block"
                      initial={{ opacity: 0, y: 50, rotateX: -90 }}
                      animate={{ opacity: 1, y: 0, rotateX: 0 }}
                      transition={{
                        delay: 0.8 + index * 0.1,
                        duration: 0.8,
                        type: "spring",
                        stiffness: 100,
                      }}
                      whileHover={{
                        scale: 1.1,
                        textShadow: "0 0 20px rgba(168, 85, 247, 0.8)",
                        transition: { duration: 0.2 },
                      }}
                    >
                      {letter === " " ? "\u00A0" : letter}
                    </motion.span>
                  ))}
                </span>
                <br />
                <span className="inline-block bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  {"online".split("").map((letter, index) => (
                    <motion.span
                      key={index}
                      className="inline-block"
                      initial={{ opacity: 0, y: 50, rotateX: -90 }}
                      animate={{ opacity: 1, y: 0, rotateX: 0 }}
                      transition={{
                        delay: 1.3 + index * 0.1,
                        duration: 0.8,
                        type: "spring",
                        stiffness: 100,
                      }}
                      whileHover={{
                        scale: 1.1,
                        textShadow: "0 0 20px rgba(34, 197, 94, 0.8)",
                        transition: { duration: 0.2 },
                      }}
                    >
                      {letter}
                    </motion.span>
                  ))}
                </span>
              </motion.h1>

              {/* 3D Shadow Effect */}
              <motion.div
                className="absolute inset-0 text-6xl md:text-8xl font-bold leading-tight text-slate-800/20 blur-sm"
                style={{ transform: "translate(4px, 4px)" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8, duration: 0.5 }}
              >
                Build
                <br />
                your skills
                <br />
                online
              </motion.div>
            </motion.div>

            <motion.p
              className="text-xl md:text-2xl text-slate-300 mb-8 leading-relaxed max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 0.8 }}
            >
              Learn and improve your skills with interactive courses and skill tests built specifically for future
              professionals
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.2, duration: 0.8 }}
            >
              <motion.div whileHover={{ scale: 1.05, rotateY: 5 }} whileTap={{ scale: 0.95 }}>
                <GlassmorphismButton
                  size="lg"
                  onClick={() => setLocation("/chat")}
                  className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 border-0 shadow-lg shadow-blue-500/25 px-8 py-4 text-lg font-semibold"
                >
                  Get started
                  <ArrowRight className="inline w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </GlassmorphismButton>
              </motion.div>

              <motion.button
                className="text-slate-300 hover:text-white transition-colors duration-300 px-6 py-3 font-semibold text-lg"
                onClick={() => setLocation("/presentations")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Watch Demo
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.4, duration: 0.8 }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center p-4 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-700/50 backdrop-blur-sm border border-slate-600/30"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.6 + index * 0.1, duration: 0.6 }}
                  whileHover={{
                    scale: 1.05,
                    rotateY: 5,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                  }}
                >
                  <stat.icon className={`w-6 h-6 mx-auto mb-2 ${stat.color}`} />
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-slate-400">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Bento Grid Features Section */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
              Everything you need to succeed
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Discover powerful tools designed to accelerate your learning journey
            </p>
          </motion.div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 auto-rows-[200px]">
            {features.map((feature, index) => {
              const gridClasses = {
                large: "md:col-span-2 md:row-span-2",
                medium: "md:col-span-2 md:row-span-1",
                small: "md:col-span-1 md:row-span-1",
              }

              return (
                <motion.div
                  key={feature.title}
                  className={`${gridClasses[feature.size]} relative group cursor-pointer`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{
                    scale: 1.02,
                    rotateY: 5,
                    z: 50,
                  }}
                  onClick={() => setLocation(feature.path)}
                >
                  <div
                    className={`h-full w-full rounded-3xl bg-gradient-to-br ${feature.gradient} p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl`}
                  >
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16" />
                      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-12 -translate-x-12" />
                    </div>

                    {/* Badge */}
                    {feature.badge && (
                      <motion.div
                        className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-semibold text-white"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                      >
                        {feature.badge}
                      </motion.div>
                    )}

                    {/* Icon */}
                    <motion.div
                      className="relative z-10"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4">
                        <feature.icon className="w-6 h-6 text-white" />
                      </div>
                    </motion.div>

                    {/* Content */}
                    <div className="relative z-10">
                      <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                      <p className="text-white/80 text-sm mb-3 leading-relaxed">{feature.description}</p>

                      {/* Stats */}
                      <div className="flex items-center justify-between">
                        <span className="text-white/60 text-xs font-medium">{feature.stats}</span>
                        <motion.div
                          className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
                          whileHover={{ scale: 1.1 }}
                        >
                          <ArrowRight className="w-4 h-4 text-white" />
                        </motion.div>
                      </div>
                    </div>

                    {/* Hover Effect */}
                    <motion.div
                      className="absolute inset-0 bg-white/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={false}
                    />
                  </div>
                </motion.div>
              )
            })}

            {/* Special Cards */}
            <motion.div
              className="md:col-span-2 md:row-span-1 relative group cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.6 }}
              whileHover={{ scale: 1.02, rotateY: 5 }}
            >
              <div className="h-full w-full rounded-3xl bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 p-6 flex items-center justify-center relative overflow-hidden shadow-2xl">
                <div className="text-center relative z-10">
                  <Trophy className="w-12 h-12 text-white mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2">Competitive Advantage</h3>
                  <p className="text-white/80 text-sm">Stay ahead with cutting-edge skills</p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
              Loved by students worldwide
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Join thousands of learners who have transformed their education with Coexist AI
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                className="relative group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                whileHover={{ scale: 1.05, rotateY: 5 }}
              >
                <div className="h-full bg-gradient-to-br from-slate-800/50 to-slate-700/50 backdrop-blur-sm border border-slate-600/30 rounded-3xl p-6 relative overflow-hidden">
                  {/* Stars */}
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>

                  {/* Content */}
                  <p className="text-slate-300 mb-6 leading-relaxed">"{testimonial.content}"</p>

                  {/* Author */}
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-white">{testimonial.name}</div>
                      <div className="text-sm text-slate-400">{testimonial.role}</div>
                    </div>
                  </div>

                  {/* Hover Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={false}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 backdrop-blur-sm border border-slate-600/30 rounded-3xl p-12 relative overflow-hidden"
          >
            {/* Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-full blur-3xl" />

            <div className="relative z-10">
              <motion.div
                className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <Rocket className="w-8 h-8 text-white" />
              </motion.div>

              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
                Ready to transform your learning?
              </h2>
              <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                Join thousands of students who are already building their future with Coexist AI
              </p>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <GlassmorphismButton
                  size="lg"
                  onClick={() => setLocation("/signup")}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 border-0 shadow-lg shadow-blue-500/25 px-8 py-4 text-lg font-semibold"
                >
                  Start Learning Today
                  <ArrowRight className="inline w-5 h-5 ml-2" />
                </GlassmorphismButton>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}

export default Home
