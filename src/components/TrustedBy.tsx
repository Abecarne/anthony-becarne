import { useTranslation } from "react-i18next";
import type { Experience } from "@/types";

/**
 * Static "trusted by" band shown as the hero footer: bare company logo
 * above the role held there. Logos carry no frame, background or radius.
 */
export default function TrustedBy({
  experiences,
}: {
  experiences: Experience[];
}) {
  const { t } = useTranslation();

  const companies = experiences
    .filter((exp) => exp.image)
    .filter(
      (exp, index, list) =>
        list.findIndex((e) => e.company === exp.company) === index
    );
  const mobileCompanies = companies.slice(0, 4);

  if (companies.length === 0) return null;

  return (
    <section className="border-y border-line bg-surface/40 px-4 py-3 sm:px-6 sm:py-6">
      <div className="mx-auto ">
        <h2 className="hidden text-center text-xs font-semibold uppercase tracking-[0.18em] text-faint sm:block">
          {t("page.carousel")}
        </h2>

        <ul className="flex flex-nowrap items-center justify-center gap-3 sm:hidden">
          {mobileCompanies.map((exp) => (
            <li
              key={exp.company}
              className="flex h-8 w-12 shrink-0 items-center justify-center"
            >
              <img
                src={exp.image}
                alt={exp.company}
                className="max-h-7 max-w-12 object-contain"
                loading="lazy"
              />
            </li>
          ))}
          <li
            className="shrink-0 rounded-full border border-line bg-surface px-2.5 py-1 text-xs font-bold text-muted"
            aria-label={`${companies.length} trusted by`}
          >
            +{companies.length}
          </li>
        </ul>

        <ul className="mt-6 hidden flex-wrap items-start justify-center gap-x-10 gap-y-8 sm:flex sm:gap-x-8">
          {companies.map((exp) => (
            <li
              key={exp.company}
              className="flex w-40 flex-col items-center gap-2 text-center"
            >
              <img
                src={exp.image}
                alt={exp.company}
                className="h-12 w-auto max-w-[110px] object-contain"
                loading="lazy"
              />
              <div className="min-w-0">
                <p className="truncate text-xs font-bold text-ink">{exp.company}</p>
                <p className="text-xs leading-tight text-muted">{exp.position}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
