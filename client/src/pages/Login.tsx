import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "wouter";
import { Eye, EyeOff, Mail, Lock, ArrowLeft } from "lucide-react";
import { FaGoogle, FaGithub, FaApple } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import GlassmorphismButton from "@/components/ui/glassmorphism-button";
import { useAuth } from "@/contexts/AuthContext";
import { z } from "zod";

const loginSchema = z.object({
  username: z.string().min(3, "Username is required").max(32),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const Login = () => {
  const [, setLocation] = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const { login, error, loading } = useAuth();
  const [formError, setFormError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<{ username?: string; password?: string }>({});
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setValidationErrors({ ...validationErrors, [e.target.name]: undefined });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setValidationErrors({});
    setIsLoggingIn(true);
    const result = loginSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: any = {};
      result.error.issues.forEach(err => {
        if (err.path[0]) fieldErrors[err.path[0]] = err.message;
      });
      setValidationErrors(fieldErrors);
      setIsLoggingIn(false);
      return;
    }
    const success = await login(formData.username, formData.password);
    setIsLoggingIn(false);
    if (success) {
      setLocation("/");
    } else {
      setFormError(error || "Login failed");
    }
  };

  const handleSocialLogin = (provider: string) => {
    // Social login is not implemented yet
    // Optionally show a message or do nothing
    // alert('Social login is not implemented yet.');
  };

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
          <Link href="/">
            <Button variant="ghost" size="sm" className="text-warm-600 hover:text-warm-800 hover:bg-warm-200/50 transition-all duration-300">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </motion.div>

        {/* Login Form */}
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
              Welcome Back
            </motion.h1>
            <motion.p 
              className="text-warm-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Sign in to your Coexist AI account
            </motion.p>
          </div>

          {/* Social Login Buttons */}
          <motion.div 
            className="space-y-3 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <GlassmorphismButton
              variant="outline"
              className="w-full py-3 flex items-center justify-center space-x-3"
              onClick={() => handleSocialLogin("google")}
              disabled
            >
              <FaGoogle className="w-5 h-5 text-warm-600" />
              <span>Continue with Google</span>
            </GlassmorphismButton>

            <GlassmorphismButton
              variant="outline"
              className="w-full py-3 flex items-center justify-center space-x-3"
              onClick={() => handleSocialLogin("github")}
              disabled
            >
              <FaGithub className="w-5 h-5 text-warm-800" />
              <span>Continue with GitHub</span>
            </GlassmorphismButton>

            <GlassmorphismButton
              variant="outline"
              className="w-full py-3 flex items-center justify-center space-x-3"
              onClick={() => handleSocialLogin("apple")}
              disabled
            >
              <FaApple className="w-5 h-5 text-warm-800" />
              <span>Continue with Apple</span>
            </GlassmorphismButton>
          </motion.div>

          {/* Divider */}
          <motion.div 
            className="flex items-center mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Separator className="flex-1 bg-warm-400/40" />
            <span className="px-4 text-sm text-warm-600">or</span>
            <Separator className="flex-1 bg-warm-400/40" />
          </motion.div>

          {/* Login Form */}
          <motion.form 
            onSubmit={handleLogin}
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {/* Username Field */}
            <div className="space-y-2">
              <Label htmlFor="username" className="text-warm-800 font-medium">Username or Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-warm-500" />
                <Input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="Enter your username or email"
                  className="pl-10 form-input"
                  required
                />
              </div>
              {validationErrors.username && (
                <div className="text-destructive text-xs mt-1">{validationErrors.username}</div>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-warm-800 font-medium">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-warm-500" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  className="pl-10 pr-10 form-input"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-warm-500 hover:text-warm-700 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {validationErrors.password && (
                <div className="text-destructive text-xs mt-1">{validationErrors.password}</div>
              )}
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <Link href="/forgot-password">
                <button type="button" className="text-sm text-warm-600 hover:text-warm-700 transition-colors font-medium">
                  Forgot your password?
                </button>
              </Link>
            </div>

            {/* Error Message */}
            {formError && (
              <div className="text-destructive text-sm text-center bg-destructive/10 p-3 rounded-lg border border-destructive/20">{formError}</div>
            )}
            {/* Login Button */}
            <GlassmorphismButton
              type="submit"
              className="w-full py-3"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? "Signing In..." : "Sign In"}
            </GlassmorphismButton>
          </motion.form>

          {/* Sign Up Link */}
          <motion.div 
            className="text-center mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <p className="text-warm-600">
              Don't have an account?{" "}
              <Link href="/signup">
                <span className="text-warm-700 hover:text-warm-800 cursor-pointer transition-colors font-medium">
                  Sign up here
                </span>
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
};

export default Login;