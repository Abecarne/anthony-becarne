import { useTranslation } from "react-i18next";
import SectionHeader from "@/components/SectionHeader";
import type { PortfolioData } from "@/types";

export default function Education({ data }: { data: PortfolioData }) {
  const { t } = useTranslation();

  return (
    <section id="education" className="px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow={t("page.nav.education")}
          title={t("page.education.title")}
          description={t("page.education.description")}
        />

        <div className="mt-12 space-y-5">
          {data.education.map((edu) => (
            <article
              key={edu.id}
              className="reveal grid gap-6 rounded-2xl border border-line bg-surface p-6 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-raised sm:grid-cols-[180px_1fr] sm:p-8"
            >
              <div className="flex items-start gap-4 sm:flex-col sm:gap-4">
                {edu.image && (
                  <img src={edu.image} alt={edu.institution} className="h-11 w-auto max-w-[120px] object-contain" loading="lazy" />
                )}
                <p className="inline-flex rounded-full bg-accent-soft px-2.5 py-0.5 text-xs font-semibold text-accent">
                  {edu.year}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-ink">{edu.degree}</h3>
                <p className="mt-0.5 text-sm font-semibold text-accent">{edu.institution}</p>
                <p className="mt-1 text-sm text-muted">{edu.field}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{edu.description}</p>

                {edu.achievements && edu.achievements.length > 0 && (
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {edu.achievements.map((item) => (
                      <li key={item} className="rounded-full border border-line bg-canvas px-3 py-1 text-xs font-medium text-ink">
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
