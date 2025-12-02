import { Home, BarChart3, Dumbbell, Users, Apple, ShoppingBag } from "lucide-react";
import { NavLink } from "./NavLink";
import { useToast } from "@/components/ui/use-toast";

const BottomNav = () => {
  const { toast } = useToast();

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    window.location.href = '/';
  };

  const label = (text: string) => (text.startsWith("nav.") ? text.split(".").pop()!.replace(/-/g, " ") : text);

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card/80 backdrop-blur-xl border-t border-border/50 z-50 shadow-[0_-4px_24px_-8px_rgba(0,0,0,0.4)]">
      <div className="max-w-md mx-auto flex justify-around items-center h-20 px-2">
        <NavLink
          to="/dashboard"
          className="flex flex-col items-center gap-1.5 py-2 px-3 rounded-xl transition-all duration-200"
          activeClassName="text-primary"
        >
          {({ isActive }) => (
            <>
              <div className={`p-2 rounded-xl transition-all ${isActive ? 'bg-primary/20 scale-110' : 'hover:bg-muted/50'}`}>
                <Home className={`w-5 h-5 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
              </div>
              <span className={`text-[10px] font-medium ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                {label("Home")}
              </span>
            </>
          )}
        </NavLink>

        <NavLink
          to="/shop"
          className="flex flex-col items-center gap-1.5 py-2 px-3 rounded-xl transition-all duration-200"
          activeClassName="text-primary"
        >
          {({ isActive }) => (
            <>
              <div className={`p-2 rounded-xl transition-all ${isActive ? 'bg-primary/20 scale-110' : 'hover:bg-muted/50'}`}>
                <ShoppingBag className={`w-5 h-5 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
              </div>
              <span className={`text-[10px] font-medium ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                {label("Shop")}
              </span>
            </>
          )}
        </NavLink>


        <NavLink
          to="/workouts"
          className="flex flex-col items-center gap-1.5 py-2 px-3 rounded-xl transition-all duration-200"
          activeClassName="text-primary"
        >
          {({ isActive }) => (
            <>
              <div className={`p-2.5 rounded-2xl transition-all ${isActive ? 'bg-gradient-to-br from-primary to-secondary scale-125 glow-primary' : 'hover:bg-muted/50 bg-muted/30'}`}>
                <Dumbbell className={`w-6 h-6 ${isActive ? "text-white" : "text-muted-foreground"}`} />
              </div>
              <span className={`text-[10px] font-medium ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                {label("Workouts")}
              </span>
            </>
          )}
        </NavLink>

        <NavLink
          to="/diet-plans"
          className="flex flex-col items-center gap-1.5 py-2 px-3 rounded-xl transition-all duration-200"
          activeClassName="text-primary"
        >
          {({ isActive }) => (
            <>
              <div className={`p-2 rounded-xl transition-all ${isActive ? 'bg-primary/20 scale-110' : 'hover:bg-muted/50'}`}>
                <Apple className={`w-5 h-5 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
              </div>
              <span className={`text-[10px] font-medium ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                {label("Diet")}
              </span>
            </>
          )}
        </NavLink>

        <NavLink
          to="/stats"
          className="flex flex-col items-center gap-1.5 py-2 px-3 rounded-xl transition-all duration-200"
          activeClassName="text-primary"
        >
          {({ isActive }) => (
            <>
              <div className={`p-2 rounded-xl transition-all ${isActive ? 'bg-primary/20 scale-110' : 'hover:bg-muted/50'}`}>
                <BarChart3 className={`w-5 h-5 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
              </div>
              <span className={`text-[10px] font-medium ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                {label("Stats")}
              </span>
            </>
          )}
        </NavLink>

      </div>
    </nav>
  );
};

export default BottomNav;
