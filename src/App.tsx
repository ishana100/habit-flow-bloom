
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import HabitDetail from "./pages/HabitDetail";
import EditHabit from "./pages/EditHabit";
import SelectDays from "./pages/SelectDays";
import NotFound from "./pages/NotFound";
import React from "react"; // Add explicit React import

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/habit/:habitId" element={<HabitDetail />} />
          <Route path="/edit-habit/:habitId" element={<EditHabit />} />
          <Route path="/select-days/:habitId" element={<SelectDays />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
