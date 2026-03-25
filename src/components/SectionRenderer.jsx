const SectionRenderer = ({ section }) => {
  if (!section) return null;

  switch (section.content_type) {
    case "text":
      return <p>{section.text_value || ""}</p>;

    case "image":
      return section.media_url ? (
        <img
          src={section.media_url}
          alt={section.label || "Image"}
          loading="lazy"
          onError={(e) => {
            e.target.style.display = "none";
            console.warn(`Failed to load image: ${section.media_url}`);
          }}
          style={{ maxWidth: "100%", height: "auto", borderRadius: "8px" }}
        />
      ) : null;

    case "video":
      return section.media_url ? (
        <video
          src={section.media_url}
          controls
          playsInline
          muted
          loop
          style={{ maxWidth: "100%", height: "auto", borderRadius: "8px" }}
          onError={(e) => console.warn(`Failed to load video: ${section.media_url}`)}
        />
      ) : null;

    case "vimeo_url":
      return section.text_value ? (
        <div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
          <iframe
            src={section.text_value}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              border: 0,
              borderRadius: "8px",
            }}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            title={section.label || "Vimeo Video"}
          />
        </div>
      ) : null;

    case "gallery":
      return (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {section.media_urls
            ?.filter(Boolean)
            .map((url, i) => (
              <img
                key={i}
                src={url}
                alt={`${section.label || "Gallery"} ${i + 1}`}
                loading="lazy"
                style={{ width: "100%", height: "auto", borderRadius: "12px", objectFit: "cover" }}
                onError={(e) => { e.target.style.display = "none"; }}
              />
            ))}
        </div>
      );

    default:
      return <p>Unknown content type: {section.content_type}</p>;
  }
};

export default SectionRenderer;