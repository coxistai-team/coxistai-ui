import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "wouter";
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft } from "lucide-react";
import { FaGoogle, FaGithub, FaApple } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import GlassmorphismButton from "@/components/ui/glassmorphism-button";
import { useAuth } from "@/contexts/AuthContext";
import { z } from "zod";

const signupSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  username: z.string().min(3, "Username is required").max(32),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(8, "Password must be at least 8 characters"),
});

const Signup = () => {
  const [, setLocation] = useLocation();
  const { signup, error, loading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [formError, setFormError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<{ fullName?: string; username?: string; email?: string; password?: string; confirmPassword?: string }>({});
  const [isSigningUp, setIsSigningUp] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setValidationErrors({ ...validationErrors, [e.target.name]: undefined });
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setValidationErrors({});
    setIsSigningUp(true);
    const result = signupSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: any = {};
      result.error.issues.forEach(err => {
        if (err.path[0]) fieldErrors[err.path[0]] = err.message;
      });
      setValidationErrors(fieldErrors);
      setIsSigningUp(false);
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setValidationErrors({ confirmPassword: "Passwords do not match" });
      setIsSigningUp(false);
      return;
    }
    if (!agreeToTerms) {
      setFormError("Please agree to the terms and conditions!");
      setIsSigningUp(false);
      return;
    }
    const success = await signup(formData.username, formData.email, formData.password);
    setIsSigningUp(false);
    if (success) {
    setLocation("/");
    } else {
      setFormError(error || "Signup failed");
    }
  };

  const handleSocialSignup = (provider: string) => {
    // Redirect to home page (no backend authentication)
    setLocation("/");
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

        {/* Signup Form */}
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
              Join Coexist AI
            </motion.h1>
            <motion.p 
              className="text-warm-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Create your account and start learning
            </motion.p>
          </div>

          {/* Social Signup Buttons */}
          <motion.div 
            className="space-y-3 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <GlassmorphismButton
              variant="outline"
              className="w-full py-3 flex items-center justify-center space-x-3"
              onClick={() => handleSocialSignup("google")}
            >
              <FaGoogle className="w-5 h-5 text-warm-600" />
              <span>Sign up with Google</span>
            </GlassmorphismButton>

            <GlassmorphismButton
              variant="outline"
              className="w-full py-3 flex items-center justify-center space-x-3"
              onClick={() => handleSocialSignup("github")}
            >
              <FaGithub className="w-5 h-5 text-warm-800" />
              <span>Sign up with GitHub</span>
            </GlassmorphismButton>

            <GlassmorphismButton
              variant="outline"
              className="w-full py-3 flex items-center justify-center space-x-3"
              onClick={() => handleSocialSignup("apple")}
            >
              <FaApple className="w-5 h-5 text-warm-800" />
              <span>Sign up with Apple</span>
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

          {/* Signup Form */}
          <motion.form 
            onSubmit={handleSignup}
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {/* Full Name Field */}
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-warm-800 font-medium">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-warm-500" />
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className="pl-10 form-input"
                  required
                />
              </div>
              {validationErrors.fullName && (
                <div className="text-destructive text-xs mt-1">{validationErrors.fullName}</div>
              )}
            </div>

            {/* Username Field */}
            <div className="space-y-2">
              <Label htmlFor="username" className="text-warm-800 font-medium">Username</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-warm-500" />
                <Input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="Choose a username"
                  className="pl-10 form-input"
                  required
                />
              </div>
              {validationErrors.username && (
                <div className="text-destructive text-xs mt-1">{validationErrors.username}</div>
              )}
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-warm-800 font-medium">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-warm-500" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email address"
                  className="pl-10 form-input"
                  required
                />
              </div>
              {validationErrors.email && (
                <div className="text-destructive text-xs mt-1">{validationErrors.email}</div>
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
                  placeholder="Create a password"
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

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-warm-800 font-medium">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-warm-500" />
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm your password"
                  className="pl-10 pr-10 form-input"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-warm-500 hover:text-warm-700 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {validationErrors.confirmPassword && (
                <div className="text-destructive text-xs mt-1">{validationErrors.confirmPassword}</div>
              )}
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start space-x-3">
              <Checkbox
                id="terms"
                checked={agreeToTerms}
                onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
                className="mt-1 border-warm-400 data-[state=checked]:bg-warm-600"
              />
              <Label htmlFor="terms" className="text-sm text-warm-600 leading-5">
                I agree to the{" "}
                <Link href="/terms">
                  <span className="text-warm-700 hover:text-warm-800 cursor-pointer font-medium">
                    Terms of Service
                  </span>
                </Link>
                {" "}and{" "}
                <Link href="/privacy">
                  <span className="text-warm-700 hover:text-warm-800 cursor-pointer font-medium">
                    Privacy Policy
                  </span>
                </Link>
              </Label>
            </div>

            {/* Error Message */}
            {formError && (
              <div className="text-destructive text-sm text-center bg-destructive/10 p-3 rounded-lg border border-destructive/20">{formError}</div>
            )}
            {/* Signup Button */}
            <GlassmorphismButton
              type="submit"
              className="w-full py-3"
              disabled={isSigningUp}
            >
              {isSigningUp ? "Signing up..." : "Create Account"}
            </GlassmorphismButton>
          </motion.form>

          {/* Login Link */}
          <motion.div 
            className="text-center mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <p className="text-warm-600">
              Already have an account?{" "}
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

export default Signup;