import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
// Initialize i18n (ensures any useTranslation hooks have an instance)
import "./i18n";

createRoot(document.getElementById("root")!).render(<App />);
