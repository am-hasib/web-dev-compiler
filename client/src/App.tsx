import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Compiler from "./pages/Compiler";
import { ThemeProvider } from "./components/theme-provider";
import { Separator } from "./components/ui/separator";

export default function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <div>
        <div className="w-full bg-background h-16 flex items-center px-4 text-foreground">
          <Header />
        </div>
        <Separator  />
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/compiler" element={<Compiler />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </ThemeProvider>
  );
}
