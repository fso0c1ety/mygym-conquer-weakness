import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Home, Dumbbell } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-red-50 via-orange-50 to-red-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="text-center px-4">
        {/* MyGym Logo */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary blur-xl opacity-30 rounded-full"></div>
            <img 
              src="/logo.svg" 
              alt="MyGym Logo" 
              className="h-24 w-24 relative z-10"
            />
          </div>
        </div>
        
        {/* 404 Error */}
        <div className="mb-6">
          <h1 className="text-8xl font-bold text-gradient-primary mb-2">404</h1>
          <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400">
            <Dumbbell className="h-5 w-5" />
            <p className="text-xl">Page Not Found</p>
          </div>
        </div>
        
        <p className="mb-8 text-gray-500 dark:text-gray-400 max-w-md mx-auto">
          Looks like this workout doesn't exist. Let's get you back on track!
        </p>
        
        {/* Return Button */}
        <a 
          href="/" 
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all duration-300"
        >
          <Home className="h-5 w-5" />
          Return to Dashboard
        </a>
      </div>
    </div>
  );
};

export default NotFound;
