import { useEffect, useState, useCallback } from "react";
import supabase from "../lib/supabase";

export const useRealtimePageContent = (pageId) => {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const { data, error: fetchError } = await supabase
        .from("page_sections")
        .select("*")
        .eq("page_id", pageId)
        .order("sort_order");

      if (fetchError) throw fetchError;
      setSections(data || []);
    } catch (err) {
      console.error("Error fetching page content:", err);
      setError(err.message);
      setSections([]);
    } finally {
      setLoading(false);
    }
  }, [pageId]);

  useEffect(() => {
    if (!pageId) return;

    fetchData();

    const channel = supabase
      .channel(`page-${pageId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "page_sections",
          filter: `page_id=eq.${pageId}`,
        },
        () => fetchData()
      )
      .subscribe((status) => {
        if (status === "SUBSCRIPTION_ERROR") {
          console.error("Realtime subscription error");
        }
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [pageId, fetchData]);

  const getSection = (sectionId) =>
    sections.find((s) => s.section_id === sectionId);

  const getText = (sectionId) => getSection(sectionId)?.text_value || "";
  const getMedia = (sectionId) => getSection(sectionId)?.media_url || "";
  const getGallery = (sectionId) =>
    getSection(sectionId)?.media_urls?.filter(Boolean) || [];
  const getType = (sectionId) => getSection(sectionId)?.content_type || "";

  return { sections, loading, error, getSection, getText, getMedia, getGallery, getType };
};