import { createRoot } from "react-dom/client";
import "./index.css";
import { AppRoutes } from "./components/appRoutes.tsx";

createRoot(document.getElementById("root")!).render(<AppRoutes />);
