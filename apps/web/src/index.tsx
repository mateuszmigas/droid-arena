import { createRoot } from "react-dom/client";
import { App } from "./components/app.tsx";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import { Game } from "./pages/game.tsx";
import { Home } from "./pages/home.tsx";
import { Lobby } from "./pages/lobby.tsx";
import { Session } from "./pages/session.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route element={<App />}>
        <Route path="/" element={<Home />} />
        <Route path="local/game" element={<Game />} />
        <Route path="local/session" element={<Session sessionId="123" />} />
        <Route path="hotseat/game" element={<Game />} />
        <Route path="hotseat/session" element={<Session sessionId="123" />} />
        <Route path="join/game" element={<Game />} />
        <Route path="join/lobby" element={<Lobby />} />
        <Route path="join/session" element={<Session sessionId="123" />} />
        <Route path="create/game" element={<Game />} />
        <Route path="create/session" element={<Session sessionId="123" />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

