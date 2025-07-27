import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { ArrowRight, Sparkles, Lock } from "lucide-react";
import GlassmorphismButton from "@/components/ui/glassmorphism-button";

interface FeaturePreviewProps {
  feature: {
    title: string;
    subtitle: string;
    description: string;
    image: string;
    benefits: string[];
    gradient: string;
  };
}

const FeaturePreview = ({ feature }: FeaturePreviewProps) => {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-beige-200 via-warm-200 to-beige-300 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-warm-500/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-beige-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-warm-600/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
          {/* Left Side - Feature Image/Illustration */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="glassmorphism-strong rounded-3xl p-8 border border-warm-400/30 shadow-xl">
              <div className="aspect-square rounded-2xl bg-warm-100 border border-warm-300 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full gradient-warm flex items-center justify-center shadow-medium">
                    <Sparkles className="w-12 h-12 text-warm-50" />
                  </div>
                  <h3 className="text-2xl font-bold text-warm-800 mb-2">{feature.title}</h3>
                  <p className="text-warm-600">{feature.subtitle}</p>
                </div>
              </div>
            </div>
            
            {/* Floating Elements */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-4 -right-4 w-16 h-16 glassmorphism rounded-full flex items-center justify-center border border-warm-400/30 shadow-medium"
            >
              <Lock className="w-8 h-8 text-warm-600" />
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
                className="inline-flex items-center space-x-2 px-4 py-2 bg-warm-200/50 rounded-full mb-6 border border-warm-400/40"
              >
                <Lock className="w-4 h-4 text-warm-600" />
                <span className="text-sm font-medium text-warm-700">Premium Feature</span>
              </motion.div>

              <h1 className="text-5xl font-bold text-warm-800 mb-4 leading-tight text-shadow-soft">
                {feature.title}
              </h1>
              <p className="text-xl text-warm-600 mb-6 leading-relaxed">
                {feature.description}
              </p>
            </div>

            {/* Benefits List */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-warm-800 mb-4">What you'll get:</h3>
              {feature.benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <div className="w-6 h-6 gradient-warm rounded-full flex items-center justify-center flex-shrink-0 shadow-soft">
                    <div className="w-2 h-2 bg-warm-50 rounded-full"></div>
                  </div>
                  <span className="text-warm-700">{benefit}</span>
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
                onClick={() => setLocation('/signup')}
                className="flex-1 sm:flex-none"
              >
                <span>Sign Up to Access</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </GlassmorphismButton>
              
              <GlassmorphismButton
                onClick={() => setLocation('/login')}
                variant="outline"
                className="flex-1 sm:flex-none"
              >
                Already have an account? Login
              </GlassmorphismButton>
            </motion.div>

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="bg-warm-200/30 rounded-xl p-6 border border-warm-400/40"
            >
              <div className="flex items-start space-x-3">
                <Sparkles className="w-5 h-5 text-warm-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-warm-800 mb-1">Join thousands of learners</h4>
                  <p className="text-sm text-warm-600">
                    Create your free account and unlock the full potential of AI-powered learning
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default FeaturePreview;