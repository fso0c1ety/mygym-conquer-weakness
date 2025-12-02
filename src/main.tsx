import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
// Initialize i18n (ensures any useTranslation hooks have an instance)
import "./i18n";
import { App as CapacitorApp } from '@capacitor/app';

// Handle Android back button
CapacitorApp.addListener('backButton', ({ canGoBack }) => {
  if (canGoBack) {
    window.history.back();
  } else {
    // Only exit app if we're on the login page
    if (window.location.pathname === '/') {
      CapacitorApp.exitApp();
    } else {
      // Navigate to dashboard instead of exiting
      window.location.href = '/dashboard';
    }
  }
});

createRoot(document.getElementById("root")!).render(<App />);
