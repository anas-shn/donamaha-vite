import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Donasi from "./pages/Donasi";
import DonasiDetail from "./pages/DonasiDetail";
import Payment from "./pages/Payment";
import Riwayat from "./pages/Riwayat";
import Report from "./pages/Report";
import ReportFeed from "./pages/ReportFeed";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/donasi" element={<Donasi />} />
          <Route path="/donasi/:id" element={<DonasiDetail />} />
          <Route path="/donasi/:id/report" element={<Report />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/riwayat" element={<Riwayat />} />
          <Route path="/laporan" element={<ReportFeed />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
