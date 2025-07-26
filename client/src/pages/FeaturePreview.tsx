"use client"

import { motion } from "framer-motion"
import { useLocation } from "wouter"
import { ArrowRight, Sparkles, Lock } from "lucide-react"
import GlassmorphismButton from "@/components/ui/glassmorphism-button"

interface FeaturePreviewProps {
  feature: {
    title: string
    subtitle: string
    description: string
    image: string
    benefits: string[]
    gradient: string
  }
}

const FeaturePreview = ({ feature }: FeaturePreviewProps) => {
  const [, setLocation] = useLocation()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 via-purple-950 to-slate-900 relative overflow-hidden">
      {/* Enhanced Background Elements with more depth */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full blur-3xl opacity-30"
          style={{
            background:
              "radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, rgba(168, 85, 247, 0.2) 50%, transparent 100%)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full blur-3xl opacity-25"
          style={{
            background:
              "radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, rgba(59, 130, 246, 0.2) 50%, transparent 100%)",
          }}
          animate={{
            scale: [1.2, 0.8, 1.2],
            rotate: [360, 180, 0],
            opacity: [0.15, 0.35, 0.15],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 5,
          }}
        />

        {/* Floating particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 100 - 50, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 8 + 5,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 3,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
          {/* Enhanced Left Side - Feature Image/Illustration */}
          <motion.div
            initial={{ opacity: 0, x: -50, rotateY: -15 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative perspective-1000"
          >
            <motion.div
              className="relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-2xl rounded-3xl p-8 border border-blue-500/30 shadow-2xl overflow-hidden"
              whileHover={{
                scale: 1.02,
                rotateY: 5,
                rotateX: 2,
              }}
              transition={{ duration: 0.3 }}
            >
              {/* Animated border glow */}
              <motion.div
                className="absolute inset-0 rounded-3xl"
                style={{
                  background:
                    "linear-gradient(45deg, rgba(99, 102, 241, 0.3), rgba(168, 85, 247, 0.3), rgba(59, 130, 246, 0.3))",
                  backgroundSize: "300% 300%",
                }}
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />

              <div className="relative z-10 aspect-square rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-700/80 border border-purple-500/30 flex items-center justify-center backdrop-blur-sm overflow-hidden">
                {/* Animated background pattern */}
                <motion.div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 25% 25%, rgba(99, 102, 241, 0.3) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(168, 85, 247, 0.3) 0%, transparent 50%)",
                  }}
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 30,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                />

                <div className="text-center relative z-10">
                  <motion.div
                    className="w-28 h-28 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-500 via-purple-600 to-cyan-500 flex items-center justify-center shadow-2xl relative overflow-hidden"
                    animate={{
                      boxShadow: [
                        "0 0 20px rgba(99, 102, 241, 0.5)",
                        "0 0 40px rgba(168, 85, 247, 0.7)",
                        "0 0 20px rgba(99, 102, 241, 0.5)",
                      ],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    >
                      <Sparkles className="w-14 h-14 text-white" />
                    </motion.div>

                    {/* Orbiting particles */}
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-white rounded-full"
                        style={{
                          top: "50%",
                          left: "50%",
                        }}
                        animate={{
                          rotate: [0, 360],
                          x: [0, 40 * Math.cos((i * 120 * Math.PI) / 180)],
                          y: [0, 40 * Math.sin((i * 120 * Math.PI) / 180)],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "linear",
                          delay: i * 0.5,
                        }}
                      />
                    ))}
                  </motion.div>

                  <motion.h3
                    className="text-2xl font-bold text-white mb-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                  >
                    {feature.title}
                  </motion.h3>
                  <motion.p
                    className="text-blue-200"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.6 }}
                  >
                    {feature.subtitle}
                  </motion.p>
                </div>
              </div>
            </motion.div>

            {/* Enhanced Floating Elements */}
            <motion.div
              animate={{
                y: [-15, 15, -15],
                rotate: [0, 10, 0],
              }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 w-20 h-20 bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-2xl rounded-full flex items-center justify-center border border-purple-500/40 shadow-2xl"
              style={{
                boxShadow: "0 0 30px rgba(168, 85, 247, 0.4)",
              }}
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <Lock className="w-10 h-10 text-purple-400" />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Side - Feature Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-full mb-6 border border-blue-400/30"
              >
                <Lock className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-medium text-blue-300">Premium Feature</span>
              </motion.div>

              <h1 className="text-5xl font-bold text-white mb-4 leading-tight bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
                {feature.title}
              </h1>
              <p className="text-xl text-slate-300 mb-6 leading-relaxed">{feature.description}</p>
            </div>

            {/* Benefits List */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white mb-4">What you'll get:</h3>
              {feature.benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/25">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <span className="text-slate-200">{benefit}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 pt-8"
            >
              <GlassmorphismButton
                onClick={() => setLocation("/signup")}
                className="flex-1 sm:flex-none bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 border-0 shadow-lg shadow-blue-500/25"
              >
                <span>Sign Up to Access</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </GlassmorphismButton>

              <GlassmorphismButton
                onClick={() => setLocation("/login")}
                variant="outline"
                className="flex-1 sm:flex-none border-blue-400/30 text-blue-300 hover:bg-blue-500/10"
              >
                Already have an account? Login
              </GlassmorphismButton>
            </motion.div>

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-xl p-6 border border-blue-400/20"
            >
              <div className="flex items-start space-x-3">
                <Sparkles className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-white mb-1">Join thousands of learners</h4>
                  <p className="text-sm text-slate-300">
                    Create your free account and unlock the full potential of AI-powered learning
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default FeaturePreview
