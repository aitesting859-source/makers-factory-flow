import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import CustomCursor from "./components/CustomCursor";

// Lazy load page components for better code splitting
const Index = lazy(() => import("./pages/Index"));
const AdCommercialsPage = lazy(() => import("./pages/AdCommercialsPage"));
const FashionEditorialPage = lazy(() => import("./pages/FashionEditorialPage"));
const WeddingPage = lazy(() => import("./pages/WeddingPage"));
const MediaProductionPage = lazy(() => import("./pages/MediaProductionPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <CustomCursor />
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-background" />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/works/ad-commercials" element={<AdCommercialsPage />} />
            <Route path="/works/fashion-editorial" element={<FashionEditorialPage />} />
            <Route path="/works/wedding-by-tmf" element={<WeddingPage />} />
            <Route path="/works/media-production" element={<MediaProductionPage />} />
            {/* Redirect old fine-art-weddings route to new wedding-by-tmf */}
            <Route path="/works/fine-art-weddings" element={<Navigate to="/works/wedding-by-tmf" replace />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
