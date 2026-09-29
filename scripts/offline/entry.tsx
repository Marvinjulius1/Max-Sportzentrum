// Client-only entry for the single-file offline build (scripts/build-offline.mjs).
import { createRoot } from "react-dom/client";
import Home from "@/app/page";
import Cursor from "@/components/Cursor";
import SmoothScroll from "@/components/SmoothScroll";

function App() {
  return (
    <>
      <SmoothScroll />
      <Home />
      <Cursor />
      <div className="grain" aria-hidden="true" />
    </>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
