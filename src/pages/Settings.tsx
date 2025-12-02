import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import logo from '@/assets/logo.png';
import { useNavigate } from 'react-router-dom';
import i18n from '@/i18n';
import { useEffect, useState } from 'react';
import BottomNav from '@/components/BottomNav';
import { User, CreditCard, Settings as SettingsIcon, Bell, Moon, Globe, LogOut } from 'lucide-react';

export default function Settings() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [lang, setLang] = useState(i18n.language || 'en');

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const handleLogout = () => {
    // Clear login state
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    
    toast({
      title: 'Logged out',
      description: 'You have been successfully logged out',
    });
    navigate('/');
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value;
    setLang(newLang);
    i18n.changeLanguage(newLang);
    try {
      localStorage.setItem('lang', newLang);
    } catch {}
    toast({ title: 'Language changed', description: `Current language: ${newLang.toUpperCase()}` });
  };

  return (
    <div className="min-h-screen pb-24">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 left-10 w-64 h-64 bg-secondary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="px-4 sm:px-6 pt-6 sm:pt-8 pb-4 sm:pb-6">
          <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/30 rounded-full blur-md"></div>
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-primary to-secondary p-0.5">
                <img
                  src={logo}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-foreground">Settings</h1>
              <p className="text-xs sm:text-sm text-muted-foreground">Manage your account and preferences</p>
            </div>
          </div>
        </header>

        <div className="px-4 sm:px-6 space-y-4 sm:space-y-6">
          {/* Account Section */}
          <div>
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <div className="p-1.5 bg-primary/20 rounded-lg">
                <User className="w-4 h-4 text-primary" />
              </div>
              <h2 className="text-base sm:text-lg font-bold text-foreground">Account</h2>
            </div>
            <div className="card-gradient-glow rounded-xl sm:rounded-2xl p-3 sm:p-4 backdrop-blur-sm border border-border/50">
              <Button 
                variant="ghost" 
                className="w-full justify-start gap-2 sm:gap-3 hover:bg-destructive/20 text-destructive hover:text-destructive font-semibold h-11 sm:h-12 text-sm sm:text-base" 
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
                Log out
              </Button>
            </div>
          </div>

          {/* Plans Section */}
          <div>
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <div className="p-1.5 bg-primary/20 rounded-lg">
                <CreditCard className="w-4 h-4 text-primary" />
              </div>
              <h2 className="text-base sm:text-lg font-bold text-foreground">Plans</h2>
            </div>
            <div className="card-gradient-glow rounded-xl sm:rounded-2xl p-3 sm:p-4 backdrop-blur-sm border border-border/50">
              <Button 
                variant="ghost" 
                className="w-full justify-start gap-2 sm:gap-3 hover:bg-primary/20 font-semibold h-11 sm:h-12 text-sm sm:text-base" 
                onClick={() => navigate('/memberships')}
              >
                <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                Payment Plans
              </Button>
            </div>
          </div>

          {/* Preferences Section */}
          <div>
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <div className="p-1.5 bg-primary/20 rounded-lg">
                <SettingsIcon className="w-4 h-4 text-primary" />
              </div>
              <h2 className="text-base sm:text-lg font-bold text-foreground">Preferences</h2>
            </div>
            <div className="card-gradient-glow rounded-xl sm:rounded-2xl backdrop-blur-sm border border-border/50 divide-y divide-border/30">
              <div className="p-3 sm:p-4 flex items-center justify-between">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="p-1.5 sm:p-2 bg-primary/10 rounded-lg">
                    <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  </div>
                  <span className="font-semibold text-foreground text-sm sm:text-base">Dark Mode</span>
                </div>
                <Switch />
              </div>
              <div className="p-3 sm:p-4 flex items-center justify-between">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="p-1.5 sm:p-2 bg-primary/10 rounded-lg">
                    <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  </div>
                  <span className="font-semibold text-foreground text-sm sm:text-base">Notifications</span>
                </div>
                <Switch />
              </div>
              <div className="p-3 sm:p-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="p-1.5 sm:p-2 bg-primary/10 rounded-lg">
                    <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  </div>
                  <span className="font-semibold text-foreground text-sm sm:text-base">Language</span>
                </div>
                <select
                  className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 text-foreground text-sm sm:text-base font-semibold hover:bg-card transition-colors"
                  value={lang}
                  onChange={handleLanguageChange}
                >
                  <option value="en">English</option>
                  <option value="de">German</option>
                  <option value="fr">French</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
