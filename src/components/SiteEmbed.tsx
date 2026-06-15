interface SiteEmbedProps {
  url: string;
  title: string;
  /** Static screenshot of the site (no live iframe is used). */
  preview: string;
}

function hostOf(url: string) {
  try {
    return new URL(url).host;
  } catch {
    return url;
  }
}

/**
 * Static website preview framed in a small browser-chrome card.
 * The whole card links out to the live site.
 */
export default function SiteEmbed({ url, title, preview }: SiteEmbedProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${title} — open website`}
      className="group block overflow-hidden rounded-xl border border-line bg-surface shadow-card transition-shadow hover:shadow-raised"
    >
      <div className="flex items-center gap-2 border-b border-line px-3 py-2">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
        </span>
        <span className="truncate text-xs text-muted">{hostOf(url)}</span>
        <span className="ml-auto flex h-6 w-6 items-center justify-center rounded-md text-muted transition-colors group-hover:text-accent">
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5h5v5M19 5l-9 9M19 14v4a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h4" />
          </svg>
        </span>
      </div>
      <img
        src={preview}
        alt={`${title} — website preview`}
        loading="lazy"
        className="h-[60vh] min-h-[420px] w-full bg-white object-cover object-top"
      />
    </a>
  );
}
