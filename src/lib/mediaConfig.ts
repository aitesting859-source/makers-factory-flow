import { useEffect, useMemo, useState } from 'react';

type MediaPayload = Record<string, unknown>;

const MEDIA_ENDPOINT = '/api/media';

const getByPath = (obj: MediaPayload, path: string): unknown =>
  path.split('.').reduce<unknown>((acc, key) => {
    if (acc && typeof acc === 'object' && key in (acc as Record<string, unknown>)) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);

export const useMediaConfig = () => {
  const [media, setMedia] = useState<MediaPayload>({});

  useEffect(() => {
    let mounted = true;

    const loadMedia = async () => {
      try {
        const response = await fetch(MEDIA_ENDPOINT);
        if (!response.ok) {
          return;
        }

        const payload = (await response.json()) as { media?: MediaPayload };
        if (mounted && payload.media) {
          setMedia(payload.media);
        }
      } catch (error) {
        console.warn('Failed to load backend media config:', error);
      }
    };

    void loadMedia();

    return () => {
      mounted = false;
    };
  }, []);

  return useMemo(() => ({
    media,
    getMediaValue: <T>(path: string, fallback: T): T => {
      const value = getByPath(media, path);
      return (value as T) ?? fallback;
    },
    resolveMediaUrl: (fallbackUrl: string): string => {
      const replacements = (getByPath(media, 'replacements') as Record<string, string> | undefined) ?? {};
      return replacements[fallbackUrl] ?? fallbackUrl;
    },
  }), [media]);
};
