import { useTranslation } from "react-i18next";
import { scrollToSection } from "@/lib/scroll";
import { NAV_SECTIONS } from "@/lib/site";
import type { PortfolioData } from "@/types";

export default function Footer({ data }: { data: PortfolioData }) {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-surface/60 px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <p className="text-lg font-extrabold text-ink">{data.personal.name}</p>
            <p className="mt-2 text-sm text-muted">{t("page.footer.tagline")}</p>
          </div>

          <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
            {NAV_SECTIONS.map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="text-sm text-muted transition-colors hover:text-accent"
              >
                {t(`page.nav.${item}`)}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-line pt-6 sm:flex-row">
          <p className="text-xs text-faint">
            © {year} {data.personal.name}. {t("page.footer.rights")}
          </p>
          <div className="flex items-center gap-4">
            <a href={data.personal.socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-muted transition-colors hover:text-ink">
              GitHub
            </a>
            <a href={data.personal.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-muted transition-colors hover:text-ink">
              LinkedIn
            </a>
            <button onClick={() => scrollToSection("top")} className="text-xs font-medium text-muted transition-colors hover:text-ink">
              {t("page.footer.backToTop")} ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
