
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HabitProvider } from "@/contexts/HabitContext";
import Index from "./pages/Index";
import HabitDetail from "./pages/HabitDetail";
import EditHabit from "./pages/EditHabit";
import SelectDays from "./pages/SelectDays";
import NotFound from "./pages/NotFound";
import HabitFrequency from "./pages/HabitFrequency";
import HabitTimeRange from "./pages/HabitTimeRange";
import HabitReminder from "./pages/HabitReminder";
import React from "react";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <HabitProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/habit/:habitId" element={<HabitDetail />} />
            <Route path="/edit-habit/:habitId" element={<EditHabit />} />
            <Route path="/select-days/:habitId" element={<SelectDays />} />
            <Route path="/habit/:habitId/frequency" element={<HabitFrequency />} />
            <Route path="/habit/:habitId/time" element={<HabitTimeRange />} />
            <Route path="/habit/:habitId/reminder" element={<HabitReminder />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </HabitProvider>
      </TooltipProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
