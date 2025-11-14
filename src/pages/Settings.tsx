import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import logo from '@/assets/logo.png';
import { useNavigate } from 'react-router-dom';
import i18n from '@/i18n';
import { useEffect, useState } from 'react';
import BottomNav from '@/components/BottomNav';

export default function Settings() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [lang, setLang] = useState(i18n.language || 'en');

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const handleLogout = () => {
    toast({
      title: 'Logged out',
      description: 'You have been successfully logged out',
    });
    window.location.href = '/';
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
    <div className="min-h-screen bg-background pb-20">
      <header className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <img src={logo} alt="MY GYM" className="w-10 h-10" />
          <div>
            <h1 className="text-xl font-bold text-foreground">Settings</h1>
            <p className="text-xs text-muted-foreground">Manage your account and preferences</p>
          </div>
        </div>
      </header>
      <div className="p-6 space-y-8 max-w-xl mx-auto">
        {/* Account Section */}
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>Manage your account settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="destructive" className="w-full" onClick={handleLogout}>
              Log out
            </Button>
          </CardContent>
        </Card>

        {/* Plans Section (Meal Plan) */}
        <Card>
          <CardHeader>
            <CardTitle>Plans</CardTitle>
            <CardDescription>View and manage your plans</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="default" className="w-full" onClick={() => navigate('/memberships')}>
              Payment Plans
            </Button>
          </CardContent>
        </Card>

        {/* Other Options Section */}
        <Card>
          <CardHeader>
            <CardTitle>Other Options</CardTitle>
            <CardDescription>Customize your experience</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Dark Mode</span>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <span>Notifications</span>
              <Switch />
            </div>
            <div className="flex items-center justify-between gap-4">
              <span>Language</span>
              <select
                className="border rounded px-2 py-1 bg-background text-foreground"
                value={lang}
                onChange={handleLanguageChange}
              >
                <option value="en">English</option>
                <option value="de">German</option>
                <option value="fr">French</option>
              </select>
            </div>
          </CardContent>
        </Card>
      </div>
      <BottomNav />
    </div>
  );
}
