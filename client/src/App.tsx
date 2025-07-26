import { Switch, Route, useLocation } from "wouter"; 
import { useEffect } from "react"; 
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navigation from "@/components/layout/Navigation";
import AnimatedBackground from "@/components/layout/AnimatedBackground";

import { LoadingProvider } from "@/contexts/LoadingContext";
import { PageLoadingProvider } from "@/contexts/PageLoadingContext";
import { UserProvider } from "@/contexts/UserContext";
import { AuthProvider } from "@/contexts/AuthContext";
import PageLoader from "@/components/ui/page-loader";
import { useScrollToTop } from "@/hooks/useScrollToTop";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Home from "@/pages/Home";
import SparkTutorChat from "@/pages/SparkTutorChat";
import NotesHub from "@/pages/NotesHub";
import Community from "@/pages/Community";
import CollegeRecommender from "@/pages/CollegeRecommender";
import AIPresentations from "@/pages/AIPresentations";
import SmartCalendar from "@/pages/SmartCalendar";
import CodeSpark from "@/pages/CodeSpark";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import ForgotPassword from "@/pages/ForgotPassword";
import ResetPassword from "@/pages/ResetPassword";
import LoadingDemo from "@/pages/LoadingDemo";
import ProfileSettings from "@/pages/ProfileSettings";
import BillingSubscription from "@/pages/BillingSubscription";
import NotificationSettings from "@/pages/NotificationSettings";
import PrivacySettings from "@/pages/PrivacySettings";
import GeneralSettings from "@/pages/GeneralSettings";
import Support from "@/pages/Support";
import NotFound from "@/pages/not-found";
import SparkTutorPreview from "@/pages/SparkTutorPreview";
import NotesHubPreview from "@/pages/NotesHubPreview";
import CommunityPreview from "@/pages/CommunityPreview";
import CollegeRecommenderPreview from "@/pages/CollegeRecommenderPreview";
import AIPresentationsPreview from "@/pages/AIPresentationsPreview";
import SmartCalendarPreview from "@/pages/SmartCalendarPreview";
import CodeSparkPreview from "@/pages/CodeSparkPreview";
import PasswordGate from "@/components/PasswordGate";

// Adding GA4 initialization
import ReactGA from "react-ga4";
ReactGA.initialize("G-Y3R66DW7YJ"); 

function Router() {
  useScrollToTop();
  
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/chat" component={() => <ProtectedRoute component={SparkTutorChat} previewComponent={SparkTutorPreview} />} />
      <Route path="/notes" component={() => <ProtectedRoute component={NotesHub} previewComponent={NotesHubPreview} />} />
      <Route path="/community" component={() => <ProtectedRoute component={Community} previewComponent={CommunityPreview} />} />
      <Route path="/college" component={() => <ProtectedRoute component={CollegeRecommender} previewComponent={CollegeRecommenderPreview} />} />
      <Route path="/presentations" component={() => <ProtectedRoute component={AIPresentations} previewComponent={AIPresentationsPreview} />} />
      <Route path="/calendar" component={() => <ProtectedRoute component={SmartCalendar} previewComponent={SmartCalendarPreview} />} />
      <Route path="/smart-calendar" component={() => <ProtectedRoute component={SmartCalendar} previewComponent={SmartCalendarPreview} />} />
      <Route path="/code" component={() => <ProtectedRoute component={CodeSpark} previewComponent={CodeSparkPreview} />} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/forgot-password" component={ForgotPassword} />
      <Route path="/reset-password" component={ResetPassword} />
      <Route path="/profile" component={ProfileSettings} />
      <Route path="/billing" component={BillingSubscription} />
      <Route path="/notifications" component={NotificationSettings} />
      <Route path="/privacy" component={PrivacySettings} />
      <Route path="/settings" component={GeneralSettings} />
      <Route path="/support" component={Support} />
      <Route path="/demo" component={LoadingDemo} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [location] = useLocation(); 

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: location });
  }, [location]);

  return (
    <PasswordGate>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <UserProvider>
            <TooltipProvider>
              <LoadingProvider>
                <PageLoadingProvider>
                  <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden">
                    <AnimatedBackground />
                    <Navigation />
                    <div className="relative z-10">
                      <Router />
                    </div>
                    <Toaster />
                  </div>
                </PageLoadingProvider>
              </LoadingProvider>
            </TooltipProvider>
          </UserProvider>
        </AuthProvider>
      </QueryClientProvider>
    </PasswordGate>
  );
}

export default App;
