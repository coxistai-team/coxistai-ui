import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Eye, EyeOff, Lock, Globe, Users, Database, AlertTriangle, User } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/contexts/UserContext";

interface PrivacySettings {
  publicProfile: boolean;
  showOnlineStatus: boolean;
  allowDirectMessages: boolean;
  shareStudyProgress: boolean;
  dataCollection: boolean;
  analyticsTracking: boolean;
  thirdPartyIntegrations: boolean;
  profileVisibility: 'public' | 'friends' | 'private';
  searchable: boolean;
  showInLeaderboards: boolean;
}

export default function PrivacySettings() {
  const { user, updateProfile } = useUser();
  const { toast } = useToast();
  
  const [settings, setSettings] = useState<PrivacySettings>({
    publicProfile: user?.publicProfile ?? false,
    showOnlineStatus: true,
    allowDirectMessages: true,
    shareStudyProgress: true,
    dataCollection: true,
    analyticsTracking: true,
    thirdPartyIntegrations: false,
    profileVisibility: 'friends',
    searchable: true,
    showInLeaderboards: true,
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleToggle = (key: keyof PrivacySettings, value: boolean | string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateProfile({
        publicProfile: settings.publicProfile,
      });
      toast({
        title: "Settings saved",
        description: "Your privacy preferences have been updated.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save privacy settings.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const privacyCategories = [
    {
      title: "Account Security",
      icon: Shield,
      description: "Protect your account and personal information",
      settings: [
        {
          key: 'publicProfile',
          label: 'Public profile',
          description: 'Allow anyone to view your profile',
          type: 'toggle'
        },
        {
          key: 'profileVisibility',
          label: 'Profile visibility',
          description: 'Choose who can see your profile',
          type: 'select',
          options: [
            { value: 'public', label: 'Everyone' },
            { value: 'friends', label: 'Friends only' },
            { value: 'private', label: 'Only me' }
          ]
        },
        {
          key: 'searchable',
          label: 'Searchable profile',
          description: 'Allow others to find you in search',
          type: 'toggle'
        }
      ]
    },
    {
      title: "Data Privacy",
      icon: Database,
      description: "Control how your data is collected and used",
      settings: [
        {
          key: 'dataCollection',
          label: 'Usage data collection',
          description: 'Allow collection of usage data for service improvement',
          type: 'toggle'
        },
        {
          key: 'analyticsTracking',
          label: 'Analytics tracking',
          description: 'Enable tracking for personalized recommendations',
          type: 'toggle'
        },
        {
          key: 'thirdPartyIntegrations',
          label: 'Third-party data sharing',
          description: 'Allow sharing data with integrated educational services',
          type: 'toggle'
        }
      ]
    },
    {
      title: "Privacy Controls",
      icon: Eye,
      description: "Manage your visibility and online presence",
      settings: [
        {
          key: 'showOnlineStatus',
          label: 'Show online status',
          description: 'Display when you\'re online to other users',
          type: 'toggle'
        },
        {
          key: 'allowDirectMessages',
          label: 'Allow direct messages',
          description: 'Let other users send you private messages',
          type: 'toggle'
        },
        {
          key: 'shareStudyProgress',
          label: 'Share study progress',
          description: 'Allow others to see your learning achievements',
          type: 'toggle'
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20 pt-24 pb-12 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Privacy Settings
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Control your privacy and data sharing preferences
          </p>
        </motion.div>

        {/* Warning Alert */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <Alert className="bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800">
            <AlertTriangle className="h-4 w-4 text-orange-600 dark:text-orange-400" />
            <AlertDescription className="text-orange-800 dark:text-orange-200">
              Changes to privacy settings may affect your learning experience and community interactions.
            </AlertDescription>
          </Alert>
        </motion.div>

        <div className="space-y-6">
          {privacyCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-white/20 dark:border-gray-700/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <category.icon className="h-5 w-5" />
                    {category.title}
                  </CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {category.settings.map((setting, settingIndex) => (
                    <div key={setting.key}>
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <Label className="text-base font-medium">{setting.label}</Label>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {setting.description}
                          </p>
                        </div>
                        
                        {setting.type === 'toggle' && (
                          <Switch
                            checked={settings[setting.key as keyof PrivacySettings] as boolean}
                            onCheckedChange={(checked) => 
                              handleToggle(setting.key as keyof PrivacySettings, checked)
                            }
                          />
                        )}
                        
                        {setting.type === 'select' && setting.options && (
                          <div className="w-48">
                            <Select
                              value={settings[setting.key as keyof PrivacySettings] as string}
                              onValueChange={(value) => 
                                handleToggle(setting.key as keyof PrivacySettings, value)
                              }
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {setting.options.map((option) => (
                                  <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        )}
                      </div>
                      
                      {settingIndex < category.settings.length - 1 && (
                        <Separator className="mt-4" />
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          ))}

          {/* Data Export & Deletion */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-white/20 dark:border-gray-700/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Data Management
                </CardTitle>
                <CardDescription>
                  Export or delete your personal data
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Export your data</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Download a copy of all your data
                    </p>
                  </div>
                  <Button variant="outline">
                    Export Data
                  </Button>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium text-red-600 dark:text-red-400">
                      Delete account
                    </Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Permanently delete your account and all data
                    </p>
                  </div>
                  <Button variant="destructive">
                    Delete Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Save Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex justify-end"
          >
            <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700" disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Save Privacy Settings'}
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}