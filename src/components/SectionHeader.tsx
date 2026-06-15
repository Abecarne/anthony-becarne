interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
}

export default function SectionHeader({
  eyebrow,
  title,
  description,
}: SectionHeaderProps) {
  return (
    <div className="reveal flex max-w-2xl flex-col gap-4">
      <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
        <span className="h-px w-6 bg-gradient-to-r from-accent to-violet" aria-hidden="true" />
        {eyebrow}
      </span>
      <h2 className="text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="text-base leading-relaxed text-muted sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
