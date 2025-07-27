import { motion } from "framer-motion";
import { User, Mail, Key, Shield } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useUser } from "@/contexts/UserContext";

export default function UserInfoDisplay() {
  const { user } = useUser();

  if (!user) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto mb-8"
    >
      <Card className="glassmorphism border-warm-400/30 shadow-medium">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-warm-700">
            <Shield className="h-5 w-5" />
            Current User Session
          </CardTitle>
          <CardDescription>
            You are currently logged in with the default demo account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <User className="h-4 w-4 text-warm-600" />
              <div>
                <p className="text-sm font-medium">Username</p>
                <p className="text-sm text-warm-700">{user.username}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-warm-600" />
              <div>
                <p className="text-sm font-medium">Email</p>
                <p className="text-sm text-warm-700">{user.email || 'alex.johnson@email.com'}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Key className="h-4 w-4 text-warm-600" />
              <div>
                <p className="text-sm font-medium">Password</p>
                <p className="text-sm text-warm-700">default123</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <User className="h-4 w-4 text-warm-600" />
              <div>
                <p className="text-sm font-medium">Full Name</p>
                <p className="text-sm text-warm-700">
                  {user.firstName} {user.lastName}
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 pt-2">
            <Badge className="bg-beige-400/30 text-warm-700 border border-beige-400/40">
              Demo Account
            </Badge>
            <Badge className="bg-warm-500/20 text-warm-700 border border-warm-500/40">
              Pro Plan Active
            </Badge>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}