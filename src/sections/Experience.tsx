import { useState } from "react";
import { useTranslation } from "react-i18next";
import SectionHeader from "@/components/SectionHeader";
import SeeMore from "@/components/SeeMore";
import SiteEmbed from "@/components/SiteEmbed";
import { PREVIEW_COUNT } from "@/lib/site";
import type { Experience as ExperienceType, PortfolioData } from "@/types";

const META_ICONS = {
  type: "M6 7V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2m-12 0h12m-12 0a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2",
  duration: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2Z",
  location: "M12 21s-7-5.5-7-11a7 7 0 1 1 14 0c0 5.5-7 11-7 11Zm0-8.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z",
};

function Meta({ kind, children }: { kind: keyof typeof META_ICONS; children: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted">
      <svg className="h-3.5 w-3.5 text-faint" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d={META_ICONS[kind]} />
      </svg>
      {children}
    </span>
  );
}

function Bullets({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h4 className="text-sm font-semibold text-ink">{title}</h4>
      <ul className="mt-3 space-y-2.5">
        {items.map((item, i) => (
          <li key={i} className="flex gap-3 text-sm leading-relaxed text-muted">
            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gradient-to-r from-accent to-violet" aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ExperienceContent({ exp }: { exp: ExperienceType }) {
  const { t } = useTranslation();
  return (
    <div>
      {exp.image && (
        <img src={exp.image} alt={exp.company} className="h-10 w-auto max-w-[130px] object-contain" loading="lazy" />
      )}
      <h3 className="mt-4 text-2xl font-bold leading-tight text-ink">{exp.position}</h3>
      <p className="mt-1 text-base font-semibold text-accent">{exp.company}</p>

      {exp.focus && exp.focus.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {exp.focus.map((f) =>
            f === "pm" ? (
              <span key={f} className="rounded-full bg-gradient-to-r from-accent to-violet px-2.5 py-0.5 text-[11px] font-semibold text-white">
                {t("page.experience.focus.pm")}
              </span>
            ) : (
              <span key={f} className="rounded-full bg-accent-soft px-2.5 py-0.5 text-[11px] font-semibold text-accent">
                {t(`page.experience.focus.${f}`)}
              </span>
            )
          )}
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5">
        <Meta kind="type">{exp.type}</Meta>
        <Meta kind="duration">{exp.duration}</Meta>
        <Meta kind="location">{exp.location}</Meta>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-muted">{exp.description}</p>

      <div className="mt-6 space-y-6">
        {exp.responsibilities.length > 0 && (
          <Bullets title={t("page.experience.responsibilities")} items={exp.responsibilities} />
        )}
        {exp.achievements && exp.achievements.length > 0 && (
          <Bullets title={t("page.experience.achievements")} items={exp.achievements} />
        )}
        <div>
          <h4 className="text-sm font-semibold text-ink">{t("page.experience.technologies")}</h4>
          <ul className="mt-3 flex flex-wrap gap-2">
            {exp.technologies.map((tech) => (
              <li key={tech} className="rounded-full border border-line bg-surface px-3 py-1 text-xs font-medium text-ink">
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {exp.website && (
        <a
          href={exp.website}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-violet transition-opacity hover:opacity-80"
        >
          {t("page.experience.website")}
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5h5v5M19 5l-9 9M19 14v4a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h4" />
          </svg>
        </a>
      )}
    </div>
  );
}

function ExperienceRow({ exp }: { exp: ExperienceType }) {
  // With a website preview: comfortable content on the left (aligned to the
  // page container) and a large screenshot that bleeds to the right edge.
  if (exp.website && exp.preview) {
    return (
      <article className="reveal border-t border-line">
        <div className="px-6 py-12 lg:grid lg:grid-cols-2 lg:gap-12 lg:py-14 lg:pr-0 lg:pl-[max(1.5rem,calc((100vw_-_72rem)/2))]">
          <div className="lg:max-w-xl">
            <ExperienceContent exp={exp} />
          </div>
          <div className="mt-8 hidden lg:sticky lg:top-28 lg:mt-0 lg:block lg:self-start">
            <SiteEmbed url={exp.website} title={exp.company} preview={exp.preview} />
          </div>
        </div>
      </article>
    );
  }

  // No website: single, comfortable reading column within the page container.
  return (
    <article className="reveal border-t border-line">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="max-w-3xl">
          <ExperienceContent exp={exp} />
        </div>
      </div>
    </article>
  );
}

export default function Experience({ data }: { data: PortfolioData }) {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);

  const visible = expanded
    ? data.experience
    : data.experience.slice(0, PREVIEW_COUNT);
  const hasMore = data.experience.length > PREVIEW_COUNT;

  return (
    <section id="experience" className="mt-12">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          eyebrow={t("page.nav.experience")}
          title={t("page.experience.title")}
          description={t("page.experience.description")}
        />
      </div>

      <div className="mt-6">
        {visible.map((exp) => (
          <ExperienceRow key={exp.id} exp={exp} />
        ))}
      </div>

      {hasMore && (
        <div className="mx-auto max-w-6xl px-6">
          <SeeMore
            expanded={expanded}
            onToggle={() => setExpanded((v) => !v)}
            moreLabel={t("page.experience.showMore")}
            lessLabel={t("page.experience.showLess")}
          />
        </div>
      )}
    </section>
  );
}
