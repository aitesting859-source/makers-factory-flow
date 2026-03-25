import { useState, useEffect } from "react";
import supabase from "../lib/supabase";

export const usePageContent = (pageId) => {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSections = async () => {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from("page_sections")
        .select("*")
        .eq("page_id", pageId)
        .order("sort_order");

      if (fetchError) {
        setError(fetchError.message);
        setSections([]);
      } else {
        setSections(data || []);
      }
      setLoading(false);
    };

    if (pageId) fetchSections();
  }, [pageId]);

  // Get a specific section by its section_id
  const getSection = (sectionId) =>
    sections.find((s) => s.section_id === sectionId);

  // Get text value from a section
  const getText = (sectionId) => getSection(sectionId)?.text_value || "";

  // Get media URL from a section
  const getMedia = (sectionId) => getSection(sectionId)?.media_url || "";

  // Get gallery URLs (filters out empty strings)
  const getGallery = (sectionId) =>
    getSection(sectionId)?.media_urls?.filter(Boolean) || [];

  // Get content type of a section
  const getType = (sectionId) => getSection(sectionId)?.content_type || "";

  return { sections, loading, error, getSection, getText, getMedia, getGallery, getType };
};