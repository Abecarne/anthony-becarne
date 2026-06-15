import { useTranslation } from "react-i18next";
import ResumeDownloadDropdown from "@/components/ResumeDownloadDropdown";
import type { PortfolioData } from "@/types";
import { scrollToSection } from "@/lib/scroll";

export default function Hero({ data }: { data: PortfolioData }) {
  const { t } = useTranslation();
  const { personal } = data;
  const resumeLinks = [
    {
      href: personal.resumeSoftwareDeveloper,
      label: t("page.cta.downloadSoftwareDeveloperCV"),
    },
    {
      href: personal.resumeProjectManager,
      label: t("page.cta.downloadProjectManagerCV"),
    },
  ].filter((item): item is { href: string; label: string } => Boolean(item.href));
  if (resumeLinks.length === 0 && personal.resume) {
    resumeLinks.push({
      href: personal.resume,
      label: t("page.cta.downloadCV"),
    });
  }

  return (
    <section id="top" className="px-6 pt-42 pb-20 sm:pt-42 sm:pb-24">
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        {/* Big display name with the freelance availability badge */}
        <div className="reveal relative inline-block">
          <h1 className="font-display text-6xl uppercase leading-[0.95] sm:text-8xl lg:text-9xl">
            <span className="text-gradient">{personal.name}</span>
          </h1>
          <span className="freelance-badge absolute -top-2 -right-3 flex items-center gap-2 whitespace-nowrap rounded-full bg-gradient-to-r from-emerald-500 to-green-500 px-3 py-1 text-xs font-bold text-white shadow-lg sm:-top-3 sm:-right-6 sm:px-4 sm:py-1.5 sm:text-sm">
            <span className="blink-dot inline-block h-2 w-2 rounded-full bg-white" aria-hidden="true" />
            {t("page.freelanceBadge")}
          </span>
        </div>

        {/* Dual positioning — Project Manager highlighted */}
        <div className="reveal mt-6 flex flex-wrap items-center justify-center gap-2">
          <span className="rounded-full bg-accent-soft px-3.5 py-1.5 text-sm font-semibold text-accent">
            {t("page.hero.roleDev")}
          </span>
          <span className="rounded-full bg-gradient-to-r from-accent to-violet px-3.5 py-1.5 text-sm font-semibold text-white shadow-sm">
            {t("page.hero.rolePm")}
          </span>
        </div>

        <p className="reveal mt-7 max-w-2xl text-lg leading-snug text-ink sm:text-xl">
          {t("page.hero.lead")}
        </p>

        <p className="reveal mt-4 max-w-xl text-base leading-relaxed text-muted">
          {personal.bio}
        </p>

        <div className="reveal mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => scrollToSection("work")}
            className="rounded-full bg-gradient-to-r from-accent to-violet px-6 py-3 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90"
          >
            {t("page.cta.viewWork")}
          </button>
          <a
            href={`mailto:${personal.email}`}
            className="rounded-full border border-line-strong bg-surface px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-accent hover:text-accent"
          >
            {t("page.cta.email")}
          </a>
          <ResumeDownloadDropdown
            links={resumeLinks}
            label={t("page.cta.downloadCV")}
          />
        </div>
      </div>
    </section>
  );
}
