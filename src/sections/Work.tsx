import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import FilterTabs from "@/components/FilterTabs";
import SectionHeader from "@/components/SectionHeader";
import SeeMore from "@/components/SeeMore";
import { PREVIEW_COUNT } from "@/lib/site";
import type { PortfolioData, WorkProject } from "@/types";

function ProjectRow({
  project,
  categoryName,
}: {
  project: WorkProject;
  categoryName?: string;
}) {
  const { t } = useTranslation();
  const media = [project.image, ...(project.images ?? [])].filter(Boolean);
  const hasScrollingMedia =
    media.length > 1 || (project.hasVideo && Boolean(project.video));

  return (
    <article
      className={`reveal grid gap-8 border-t border-line py-12 lg:grid-cols-2 lg:gap-16 ${
        hasScrollingMedia ? "lg:min-h-screen" : ""
      }`}
    >
      {/* Left — pinned mission content */}
      <div className="lg:sticky lg:top-28 lg:self-start">
        {categoryName && (
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-violet">
            {categoryName}
          </span>
        )}
        <h3 className="mt-2 text-2xl font-bold leading-tight text-ink sm:text-3xl">
          {project.title}
        </h3>
        <p className="mt-1 text-base font-semibold text-accent">{project.client}</p>

        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs font-medium text-muted">
          <span>{project.year}</span>
          {project.duration && <span>· {project.duration}</span>}
        </div>

        <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
          {project.description}
        </p>

        <ul className="mt-5 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <li key={tech} className="rounded-full border border-line bg-surface px-3 py-1 text-xs font-medium text-ink">
              {tech}
            </li>
          ))}
        </ul>

        {(project.demoUrl || project.githubUrl) && (
          <div className="mt-6 flex flex-wrap gap-3">
            {project.demoUrl && (
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-accent to-violet px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90">
                {t("page.work.demo")}
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5h5v5M19 5l-9 9M19 14v4a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h4" />
                </svg>
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-line-strong bg-surface px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-ink">
                {t("page.work.code")}
              </a>
            )}
          </div>
        )}
      </div>

      {/* Right — scrolling media */}
      <div className="space-y-5">
        {project.hasVideo && project.video && (
          <div className="hidden aspect-video w-full overflow-hidden rounded-xl border border-line bg-surface shadow-card lg:block">
            <iframe src={project.video} title={project.title} className="h-full w-full" allowFullScreen />
          </div>
        )}
        {media.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={`${project.title} — ${i + 1}`}
            className={`w-full rounded-xl border border-line bg-surface object-cover shadow-card ${
              i === 0 ? "" : "hidden lg:block"
            }`}
            loading="lazy"
          />
        ))}
      </div>
    </article>
  );
}

export default function Work({ data }: { data: PortfolioData }) {
  const { t } = useTranslation();
  const [category, setCategory] = useState("all");
  const [expanded, setExpanded] = useState(false);

  const filtered = useMemo(
    () =>
      category === "all"
        ? data.work
        : data.work.filter((p) => p.category === category),
    [data.work, category]
  );

  const visible = expanded ? filtered : filtered.slice(0, PREVIEW_COUNT);
  const hasMore = filtered.length > PREVIEW_COUNT;

  const selectCategory = (id: string) => {
    setCategory(id);
    setExpanded(false);
  };

  const tabs = data.categories.map((c) => ({
    id: c.id,
    label: c.name,
    description: c.description,
    count:
      c.id === "all"
        ? data.work.length
        : data.work.filter((p) => p.category === c.id).length,
  }));

  const categoryName = (id: string) =>
    data.categories.find((c) => c.id === id && c.id !== "all")?.name;

  return (
    <section id="work" className="px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow={t("page.nav.work")}
          title={t("page.work.title")}
          description={t("page.work.description")}
        />

        <div className="reveal mt-10">
          <FilterTabs
            items={tabs}
            value={category}
            onChange={selectCategory}
            ariaLabel={t("page.work.title")}
          />
        </div>

        {filtered.length === 0 ? (
          <p className="mt-12 text-muted">{t("page.work.noProjects")}</p>
        ) : (
          <div className="mt-4">
            {visible.map((project) => (
              <ProjectRow
                key={project.id}
                project={project}
                categoryName={categoryName(project.category)}
              />
            ))}
          </div>
        )}

        {hasMore && (
          <SeeMore
            expanded={expanded}
            onToggle={() => setExpanded((v) => !v)}
            moreLabel={t("page.work.showMore")}
            lessLabel={t("page.work.showLess")}
          />
        )}
      </div>
    </section>
  );
}
