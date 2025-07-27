import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import GlassmorphismButton from "@/components/ui/glassmorphism-button";
import { CheckCircle } from "lucide-react";

function getTokenFromUrl() {
  if (typeof window === "undefined") return "";
  const params = new URLSearchParams(window.location.search);
  return params.get("token") || "";
}

const ResetPassword = () => {
  const [, setLocation] = useLocation();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const token = getTokenFromUrl();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!password || !confirmPassword) {
      setError("Please enter and confirm your new password.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!token) {
      setError("Invalid or missing token.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      if (res.ok) {
        setSuccess(true);
        setTimeout(() => setLocation("/login"), 2000);
      } else {
        const data = await res.json();
        setError(data.error || "Failed to reset password");
      }
    } catch {
      setError("Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <main className="relative z-10 min-h-screen flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glassmorphism rounded-2xl p-8 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle className="w-8 h-8 text-white" />
            </motion.div>
            <motion.h1 
              className="text-2xl font-bold mb-4 text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Password Reset Successful
            </motion.h1>
            <motion.p 
              className="text-slate-400 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              You can now log in with your new password.
            </motion.p>
          </motion.div>
        </div>
      </main>
    );
  }

  return (
    <main className="relative z-10 min-h-screen flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glassmorphism-strong rounded-2xl p-8 shadow-xl"
        >
          <div className="text-center mb-8">
            <motion.h1 
              className="text-3xl font-bold mb-2 text-gradient-primary"
              initial={{ opacity: 0 }}
            className="w-16 h-16 bg-beige-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-medium"
              transition={{ delay: 0.2 }}
            >
              Reset Your Password
            </motion.h1>
            <motion.p 
              className="text-warm-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Enter your new password below.
            </motion.p>
          </div>
          <motion.form 
            onSubmit={handleSubmit}
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <CheckCircle className="w-8 h-8 text-warm-50" />
              <Label htmlFor="password" className="text-warm-800 font-medium">New Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter new password"
                className="form-input"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-warm-800 font-medium">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="form-input"
                required
              />
            </div>
            {error && (
              <div className="text-destructive text-sm text-center bg-destructive/10 p-3 rounded-lg border border-destructive/20">{error}</div>
            )}
            <GlassmorphismButton
            className="text-warm-600 mb-6"
              className="w-full py-3"
              disabled={loading}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </GlassmorphismButton>
          </motion.form>
        </motion.div>
      </div>
    </main>
  );
};

export default ResetPassword; 