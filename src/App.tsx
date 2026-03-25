import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import CustomCursor from "./components/CustomCursor";

// Lazy load pages
const Index = lazy(() => import("./pages/Index"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const AdCommercialsPage = lazy(() => import("./pages/AdCommercialsPage"));
const FashionEditorialPage = lazy(() => import("./pages/FashionEditorialPage"));
const MediaProductionPage = lazy(() => import("./pages/MediaProductionPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Wedding pages
const WeddingLayout = lazy(() => import("./pages/wedding/WeddingLayout"));
const WeddingLanding = lazy(() => import("./pages/wedding/WeddingLanding"));
const WeddingPhotos = lazy(() => import("./pages/wedding/WeddingPhotos"));
const WeddingFilms = lazy(() => import("./pages/wedding/WeddingFilms"));
const WeddingStory = lazy(() => import("./pages/wedding/WeddingStory"));
const WeddingFilmDetail = lazy(() => import("./pages/wedding/WeddingFilmDetail"));
const WeddingBlog = lazy(() => import("./pages/wedding/WeddingBlog"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <CustomCursor />
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-background">Loading...</div>}>
          <Routes>
            {/* Main pages */}
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/works/ad-commercials" element={<AdCommercialsPage />} />
            <Route path="/works/fashion-editorial" element={<FashionEditorialPage />} />
            <Route path="/works/media-production" element={<MediaProductionPage />} />

            {/* Wedding by TMF - Fully Dynamic */}
            <Route path="/works/wedding-by-tmf" element={<WeddingLayout />}>
              <Route index element={<WeddingLanding />} />
              <Route path="photos" element={<WeddingPhotos />} />
              <Route path="films" element={<WeddingFilms />} />
              <Route path="films/:filmId" element={<WeddingFilmDetail />} />
              <Route path="story/:storyId" element={<WeddingStory />} />
              <Route path="blog/:blogId" element={<WeddingBlog />} />
            </Route>

            {/* Redirect old fine-art-weddings */}
            <Route path="/works/fine-art-weddings" element={<Navigate to="/works/wedding-by-tmf" replace />} />

            {/* Catch all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;