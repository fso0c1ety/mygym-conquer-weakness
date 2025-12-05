import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import logo from '@/assets/logo.png';
import { useNavigate } from 'react-router-dom';
import i18n from '@/i18n';
import { useEffect, useState } from 'react';
import BottomNav from '@/components/BottomNav';
import { User, CreditCard, Settings as SettingsIcon, Bell, Moon, Globe, LogOut, Trash2, Edit, Mail, UserCircle } from 'lucide-react';
import { clearUserData } from '@/lib/resetUserData';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Settings() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [lang, setLang] = useState(i18n.language || 'en');
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [userName, setUserName] = useState(localStorage.getItem('userName') || '');
  const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail') || '');
  const [newName, setNewName] = useState(userName);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const handleLogout = () => {
    // Clear login state
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    
    toast({
      title: 'Logged out',
      description: 'You have been successfully logged out',
    });
    navigate('/');
  };

  const handleDeleteAccount = () => {
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) {
      toast({
        title: 'Error',
        description: 'No user logged in',
        variant: 'destructive',
      });
      return;
    }

    if (confirm('⚠️ WARNING: This will permanently delete your account, all workout history, diet plans, and progress. This action CANNOT be undone! Are you sure?')) {
      // Clear all user data
      clearUserData(userEmail);
      
      // Remove user from users list
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const updatedUsers = users.filter((u: any) => u.email !== userEmail);
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      
      // Clear login state
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userName');
      
      toast({
        title: 'Account Deleted',
        description: 'Your account has been permanently deleted',
      });
      
      // Redirect to login page
      navigate('/');
    }
  };

  const handleUpdateAccount = () => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex((u: any) => u.email === userEmail);
    
    if (userIndex === -1) {
      toast({
        title: 'Error',
        description: 'User not found',
        variant: 'destructive',
      });
      return;
    }

    // Verify current password
    if (currentPassword && users[userIndex].password !== currentPassword) {
      toast({
        title: 'Error',
        description: 'Current password is incorrect',
        variant: 'destructive',
      });
      return;
    }

    // Update user details
    if (newName && newName !== userName) {
      users[userIndex].name = newName;
      localStorage.setItem('userName', newName);
      setUserName(newName);
    }

    if (newPassword && currentPassword) {
      users[userIndex].password = newPassword;
    }

    localStorage.setItem('users', JSON.stringify(users));
    
    toast({
      title: 'Account Updated',
      description: 'Your account details have been saved',
    });
    
    setEditDialogOpen(false);
    setCurrentPassword('');
    setNewPassword('');
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
      {/* Static Background Gradient */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-primary/5 via-background to-secondary/5 pointer-events-none"></div>

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
          {/* Personal Details Section */}
          <div>
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <div className="p-1.5 bg-primary/20 rounded-lg">
                <User className="w-4 h-4 text-primary" />
              </div>
              <h2 className="text-base sm:text-lg font-bold text-foreground">Personal Details</h2>
            </div>
            <div className="card-gradient-glow rounded-xl sm:rounded-2xl backdrop-blur-sm border border-border/50 divide-y divide-border/50">
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <UserCircle className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Name</p>
                    <p className="font-semibold text-foreground">{userName}</p>
                  </div>
                </div>
              </div>
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-semibold text-foreground">{userEmail}</p>
                  </div>
                </div>
              </div>
              <div className="p-3 sm:p-4">
                <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
                  <DialogTrigger asChild>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start gap-2 sm:gap-3 hover:bg-primary/20 font-semibold h-11 sm:h-12 text-sm sm:text-base"
                    >
                      <Edit className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                      Edit Account Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Edit Account</DialogTitle>
                      <DialogDescription>
                        Update your personal information and password
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          value={newName}
                          onChange={(e) => setNewName(e.target.value)}
                          placeholder="Enter your name"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          value={userEmail}
                          disabled
                          className="opacity-50 cursor-not-allowed"
                        />
                        <p className="text-xs text-muted-foreground">Email cannot be changed</p>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="current-password">Current Password</Label>
                        <Input
                          id="current-password"
                          type="password"
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          placeholder="Enter current password"
                        />
                        <p className="text-xs text-muted-foreground">Required to change password</p>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input
                          id="new-password"
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="Enter new password (optional)"
                        />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1" onClick={() => setEditDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button className="flex-1" onClick={handleUpdateAccount}>
                        Save Changes
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="p-3 sm:p-4">
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

          {/* Danger Zone */}
          <div>
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <div className="p-1.5 bg-destructive/20 rounded-lg">
                <Trash2 className="w-4 h-4 text-destructive" />
              </div>
              <h2 className="text-base sm:text-lg font-bold text-foreground">Danger Zone</h2>
            </div>
            <div className="card-gradient-glow rounded-xl sm:rounded-2xl backdrop-blur-sm border border-destructive/50">
              <div className="p-4">
                <div className="mb-3">
                  <h3 className="font-bold text-destructive mb-1">Delete Account</h3>
                  <p className="text-sm text-muted-foreground">Permanently delete your account and all associated data. This action cannot be undone.</p>
                </div>
                <Button 
                  variant="destructive" 
                  className="w-full justify-center gap-2 font-semibold h-11 sm:h-12 text-sm sm:text-base" 
                  onClick={handleDeleteAccount}
                >
                  <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  Delete My Account
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
