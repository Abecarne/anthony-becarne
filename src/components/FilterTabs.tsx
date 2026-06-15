export interface FilterTab {
  id: string;
  label: string;
  count: number;
  description?: string;
}

interface FilterTabsProps {
  items: FilterTab[];
  value: string;
  onChange: (id: string) => void;
  ariaLabel: string;
}

export default function FilterTabs({
  items,
  value,
  onChange,
  ariaLabel,
}: FilterTabsProps) {
  return (
    <div role="tablist" aria-label={ariaLabel} className="flex flex-wrap gap-2">
      {items.map((item) => {
        const isActive = value === item.id;
        return (
          <button
            key={item.id}
            role="tab"
            aria-selected={isActive}
            title={item.description}
            onClick={() => onChange(item.id)}
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              isActive
                ? "border-transparent bg-gradient-to-r from-accent to-violet text-white shadow-sm"
                : "border-line bg-surface text-muted hover:border-line-strong hover:text-ink"
            }`}
          >
            {item.label}
            <span className={`text-xs ${isActive ? "text-white/75" : "text-faint"}`}>
              {item.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
