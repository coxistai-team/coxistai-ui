import { motion } from "framer-motion";
import { MessageCircle, Mail, Phone, Clock, HelpCircle, Book, Users, Search } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import GlassmorphismButton from "@/components/ui/glassmorphism-button";

const Support = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const supportOptions = [
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Chat with our support team in real-time",
      availability: "24/7",
      responseTime: "< 5 minutes",
      action: "Start Chat",
      color: "bg-blue-500",
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us a detailed message",
      availability: "Always open",
      responseTime: "< 24 hours",
      action: "Send Email",
      color: "bg-green-500",
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak directly with our experts",
      availability: "Mon-Fri 9AM-6PM PST",
      responseTime: "Immediate",
      action: "Call Now",
      color: "bg-purple-500",
    },
  ];

  const faqCategories = [
    { id: "all", name: "All", count: 12 },
    { id: "account", name: "Account", count: 4 },
    { id: "billing", name: "Billing", count: 3 },
    { id: "features", name: "Features", count: 5 },
  ];

  const faqs = [
    {
      category: "account",
      question: "How do I reset my password?",
      answer: "You can reset your password by clicking on 'Forgot Password' on the login page. We'll send you a secure link to create a new password.",
    },
    {
      category: "account",
      question: "How do I update my profile information?",
      answer: "Go to Profile Settings from the navigation menu. You can update your personal information, preferences, and account settings there.",
    },
    {
      category: "billing",
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and bank transfers. All payments are processed securely through Stripe.",
    },
    {
      category: "billing",
      question: "Can I cancel my subscription anytime?",
      answer: "Yes, you can cancel your subscription at any time from the Billing & Subscription page. Your access will continue until the end of your current billing period.",
    },
    {
      category: "features",
      question: "How does the AI tutor work?",
      answer: "Our AI tutor uses advanced language models to provide personalized learning assistance. You can ask questions, upload documents, and get step-by-step explanations.",
    },
    {
      category: "features",
      question: "Can I share my notes with other students?",
      answer: "Yes, you can make your notes public or share them with specific users using the sharing options in Notes Hub.",
    },
    {
      category: "features",
      question: "How do I join study groups?",
      answer: "Visit the Community section to browse available study groups. You can join existing groups or create your own based on your subjects and schedule.",
    },
    {
      category: "account",
      question: "Is my data secure?",
      answer: "Yes, we use industry-standard encryption and security measures to protect your data. Read our Privacy Policy for detailed information.",
    },
    {
      category: "features",
      question: "Can I use Coexist AI offline?",
      answer: "Some features like viewing downloaded notes work offline, but most AI-powered features require an internet connection for optimal performance.",
    },
    {
      category: "billing",
      question: "Do you offer student discounts?",
      answer: "Yes, we offer special pricing for verified students. Contact our support team with your student ID to learn about available discounts.",
    },
    {
      category: "features",
      question: "How do I export my data?",
      answer: "You can export your notes, documents, and other data from the Settings page. We support various formats including PDF, DOCX, and JSON.",
    },
    {
      category: "account",
      question: "How do I delete my account?",
      answer: "Account deletion can be requested through Privacy Settings. Please note that this action is permanent and cannot be undone.",
    },
  ];

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const resources = [
    {
      icon: Book,
      title: "User Guide",
      description: "Complete documentation and tutorials",
      link: "/docs",
    },
    {
      icon: Users,
      title: "Community Forum",
      description: "Connect with other users and share tips",
      link: "/community",
    },
    {
      icon: HelpCircle,
      title: "Video Tutorials",
      description: "Watch step-by-step guides and demos",
      link: "/tutorials",
    },
  ];

  return (
    <main className="relative z-10 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center space-x-2 glassmorphism rounded-full px-4 py-2 mb-6">
            <HelpCircle className="w-4 h-4 text-warm-600" />
            <span className="text-sm font-semibold text-warm-700">Support Center</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gradient-primary">
            How Can We Help?
          </h1>
          <p className="text-xl text-warm-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Get the support you need to make the most of your Coexist AI experience. 
            We're here to help you succeed in your learning journey.
          </p>
        </motion.div>

        {/* Support Options */}
        <motion.div
          className="grid md:grid-cols-3 gap-8 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {supportOptions.map((option, index) => (
            <Card key={index} className="glassmorphism border-warm-400/30 hover:border-warm-500/50 transition-all duration-300 group card-hover">
              <CardHeader className="text-center">
                <div className="w-16 h-16 gradient-warm rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-medium">
                  <option.icon className="w-8 h-8 text-warm-50" />
                </div>
                <CardTitle className="text-warm-800">{option.title}</CardTitle>
                <CardDescription className="text-warm-600">{option.description}</CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-center space-x-2">
                    <Clock className="w-4 h-4 text-warm-600" />
                    <span className="text-sm text-warm-600">{option.availability}</span>
                  </div>
                  <Badge variant="secondary" className="bg-warm-200/50 text-warm-700 border border-warm-400/30">
                    Response: {option.responseTime}
                  </Badge>
                </div>
                <GlassmorphismButton className="w-full">
                  {option.action}
                </GlassmorphismButton>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-warm-800">Frequently Asked Questions</h2>
            <p className="text-warm-600 mb-8">Find quick answers to common questions</p>
            
            {/* Search Bar */}
            <div className="max-w-md mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-warm-500" />
                <Input
                  placeholder="Search FAQs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 form-input"
                />
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex justify-center space-x-4 mb-8">
              {faqCategories.map((category) => (
                <GlassmorphismButton
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name} ({category.count})
                </GlassmorphismButton>
              ))}
            </div>
          </div>

          {/* FAQ List */}
          <div className="max-w-4xl mx-auto space-y-4">
            {filteredFaqs.map((faq, index) => (
              <Card key={index} className="glassmorphism border-warm-400/30 hover:border-warm-500/50 transition-all duration-300 card-hover">
                <CardHeader>
                  <CardTitle className="text-lg text-warm-800 flex items-start space-x-3">
                    <HelpCircle className="w-5 h-5 text-warm-600 mt-0.5 flex-shrink-0" />
                    <span>{faq.question}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-warm-700 leading-relaxed pl-8">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Additional Resources */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-8 text-warm-800">Additional Resources</h2>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {resources.map((resource, index) => (
              <Card key={index} className="glassmorphism border-warm-400/30 hover:border-warm-500/50 transition-all duration-300 group cursor-pointer card-hover">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 gradient-warm rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-medium">
                    <resource.icon className="w-6 h-6 text-warm-50" />
                  </div>
                  <CardTitle className="text-warm-800">{resource.title}</CardTitle>
                  <CardDescription className="text-warm-600">{resource.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>

          {/* Contact Form */}
          <Card className="glassmorphism-strong border-warm-400/30 max-w-2xl mx-auto shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-warm-800">Still Need Help?</CardTitle>
              <CardDescription className="text-warm-600">
                Send us a message and we'll get back to you as soon as possible
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <Input placeholder="Your Name" className="form-input" />
                <Input placeholder="Your Email" type="email" className="form-input" />
              </div>
              <Input placeholder="Subject" className="form-input" />
              <Textarea 
                placeholder="Describe your issue or question..." 
                rows={5}
                className="form-input"
              />
              <GlassmorphismButton className="w-full">
                Send Message
              </GlassmorphismButton>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </main>
  );
};

export default Support;