interface SeeMoreProps {
  expanded: boolean;
  onToggle: () => void;
  moreLabel: string;
  lessLabel: string;
}

export default function SeeMore({
  expanded,
  onToggle,
  moreLabel,
  lessLabel,
}: SeeMoreProps) {
  return (
    <div className=" flex justify-center">
      <button
        onClick={onToggle}
        aria-expanded={expanded}
        className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-surface px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-accent hover:text-accent"
      >
        {expanded ? lessLabel : moreLabel}
        <svg
          className={`h-4 w-4 transition-transform ${expanded ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </div>
  );
}
