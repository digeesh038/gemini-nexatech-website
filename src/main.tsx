import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

if ("scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}

const container = document.getElementById("root")!;
const tree = (
  <StrictMode>
    <App />
  </StrictMode>
);

// Production builds are prerendered (scripts/prerender.js), so #root already
// holds server-rendered markup to hydrate. In dev it is empty — mount fresh.
if (container.firstElementChild) {
  hydrateRoot(container, tree);
} else {
  createRoot(container).render(tree);
}
