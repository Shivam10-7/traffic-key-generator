
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import Index from "./pages/Index";
import DocsPage from "./pages/DocsPage";
import GeneratorPage from "./pages/GeneratorPage";
import TrafficSimulatorPage from "./pages/TrafficSimulatorPage";
import NotFound from "./pages/NotFound";
import AnimatedCursor from '@/components/AnimatedCursor';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <UserProvider>
          <Toaster />
          <Sonner />
          <AnimatedCursor />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/docs" element={<DocsPage />} />
              <Route path="/generator" element={<GeneratorPage />} />
              <Route path="/simulator" element={<TrafficSimulatorPage />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </UserProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
