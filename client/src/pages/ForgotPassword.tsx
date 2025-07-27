import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "wouter";
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import GlassmorphismButton from "@/components/ui/glassmorphism-button";

const ForgotPassword = () => {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setIsSubmitted(true);
      } else {
        const data = await res.json();
        setError(data.error || "Failed to send reset link");
      }
    } catch {
      setError("Failed to send reset link");
    } finally {
      setLoading(false);
    }
  };

  const handleBackToLogin = () => {
    setLocation("/login");
  };

  if (isSubmitted) {
    return (
      <main className="relative z-10 min-h-screen flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glassmorphism-strong rounded-2xl p-8 text-center shadow-xl"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="w-16 h-16 bg-beige-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-medium"
            >
              <CheckCircle className="w-8 h-8 text-warm-50" />
            </motion.div>

            <motion.h1 
              className="text-2xl font-bold mb-4 text-warm-800"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Check Your Email
            </motion.h1>

            <motion.p 
              className="text-warm-600 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              We've sent a password reset link to <strong className="text-warm-800">{email}</strong>
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="space-y-4"
            >
              <GlassmorphismButton
                onClick={handleBackToLogin}
                className="w-full py-3"
              >
                Back to Login
              </GlassmorphismButton>

              <p className="text-sm text-warm-600">
                Didn't receive the email? Check your spam folder or{" "}
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="text-warm-700 hover:text-warm-800 underline font-medium"
                >
                  try again
                </button>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </main>
    );
  }

  return (
    <main className="relative z-10 min-h-screen flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <Link href="/login">
            <Button variant="ghost" size="sm" className="text-warm-600 hover:text-warm-800 hover:bg-warm-200/50">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Login
            </Button>
          </Link>
        </motion.div>

        {/* Forgot Password Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glassmorphism-strong rounded-2xl p-8 shadow-xl"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.h1 
              className="text-3xl font-bold mb-2 text-gradient-primary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Forgot Password?
            </motion.h1>
            <motion.p 
              className="text-warm-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Enter your email and we'll send you a reset link
            </motion.p>
          </div>

          {/* Form */}
          <motion.form 
            onSubmit={handleSubmit}
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-warm-800 font-medium">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-warm-500" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="pl-10 form-input"
                  required
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="text-destructive text-sm text-center bg-destructive/10 p-3 rounded-lg border border-destructive/20">{error}</div>
            )}

            {/* Submit Button */}
            <GlassmorphismButton
              type="submit"
              className="w-full py-3"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </GlassmorphismButton>
          </motion.form>

          {/* Additional Info */}
          <motion.div 
            className="text-center mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-sm text-warm-600">
              Remember your password?{" "}
              <Link href="/login">
                <span className="text-warm-700 hover:text-warm-800 cursor-pointer transition-colors font-medium">
                  Sign in here
                </span>
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
};

export default ForgotPassword;