import { Home, BarChart3, Dumbbell } from "lucide-react";
import { NavLink } from "./NavLink";

const BottomNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
      <div className="max-w-md mx-auto flex justify-around items-center h-16 px-4">
        <NavLink
          to="/"
          className="flex flex-col items-center gap-1 py-2 px-4 rounded-lg transition-colors"
          activeClassName="text-primary"
        >
          {({ isActive }) => (
            <>
              <Home className={`w-6 h-6 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
              <span className={`text-xs font-medium ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                Home
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
                Stats
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
                Workouts
              </span>
            </>
          )}
        </NavLink>
      </div>
    </nav>
  );
};

export default BottomNav;
