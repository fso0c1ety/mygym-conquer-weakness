import { Home, BarChart3, Dumbbell, Users, Apple } from "lucide-react";
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
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
      <div className="max-w-md mx-auto flex justify-around items-center h-16 px-4">
        <NavLink
          to="/dashboard"
          className="flex flex-col items-center gap-1 py-2 px-4 rounded-lg transition-colors"
          activeClassName="text-primary"
        >
          {({ isActive }) => (
            <>
              <Home className={`w-6 h-6 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
              <span className={`text-xs font-medium ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                {label("Home")}
              </span>
            </>
          )}
        </NavLink>

        <NavLink
          to="/stats"
          className="flex flex-col items-center gap-1 py-2 px-4 rounded-lg transition-colors"
          activeClassName="text-primary"
        >
          {({ isActive }) => (
            <>
              <BarChart3 className={`w-6 h-6 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
              <span className={`text-xs font-medium ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                {label("Stats")}
              </span>
            </>
          )}
        </NavLink>


        <NavLink
          to="/workouts"
          className="flex flex-col items-center gap-1 py-2 px-4 rounded-lg transition-colors"
          activeClassName="text-primary"
        >
          {({ isActive }) => (
            <>
              <Dumbbell className={`w-6 h-6 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
              <span className={`text-xs font-medium ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                {label("Workouts")}
              </span>
            </>
          )}
        </NavLink>

        <NavLink
          to="/diet-plans"
          className="flex flex-col items-center gap-1 py-2 px-4 rounded-lg transition-colors"
          activeClassName="text-primary"
        >
          {({ isActive }) => (
            <>
              <Apple className={`w-6 h-6 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
              <span className={`text-xs font-medium ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                {label("Diet Plans")}
              </span>
            </>
          )}
        </NavLink>

        <NavLink
          to="/trainers"
          className="flex flex-col items-center gap-1 py-2 px-4 rounded-lg transition-colors"
          activeClassName="text-primary"
        >
          {({ isActive }) => (
            <>
              <Users className={`w-6 h-6 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
              <span className={`text-xs font-medium ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                {label("Trainers")}
              </span>
            </>
          )}
        </NavLink>

      </div>
    </nav>
  );
};

export default BottomNav;
