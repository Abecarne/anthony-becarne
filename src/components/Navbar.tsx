import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ResumeDownloadDropdown from "@/components/ResumeDownloadDropdown";
import { useActiveSection } from "@/hooks/useActiveSection";
import { scrollToSection } from "@/lib/scroll";
import { NAV_SECTIONS } from "@/lib/site";

interface NavbarProps {
  name: string;
  resume?: string;
  resumeSoftwareDeveloper?: string;
  resumeProjectManager?: string;
}

export function Navbar({
  name,
  resume,
  resumeSoftwareDeveloper,
  resumeProjectManager,
}: NavbarProps) {
  const { t } = useTranslation();
  const activeSection = useActiveSection(NAV_SECTIONS);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const go = (id: string) => {
    setMenuOpen(false);
    scrollToSection(id);
  };

  const resumeLinks = [
    {
      href: resumeSoftwareDeveloper,
      label: t("page.cta.downloadSoftwareDeveloperCV"),
      shortLabel: "CV Dev",
    },
    {
      href: resumeProjectManager,
      label: t("page.cta.downloadProjectManagerCV"),
      shortLabel: "CV PM",
    },
  ].filter((item): item is { href: string; label: string; shortLabel: string } =>
    Boolean(item.href)
  );
  if (resumeLinks.length === 0 && resume) {
    resumeLinks.push({
      href: resume,
      label: t("page.cta.downloadCV"),
      shortLabel: "CV",
    });
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || menuOpen
          ? "border-b border-line bg-canvas/85 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <nav
        className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-6"
        aria-label="Primary"
      >
        <button
          onClick={() => scrollToSection("top")}
          className="text-lg font-extrabold tracking-tight text-ink"
        >
          {name}
        </button>

        <div className="hidden items-center gap-0.5 lg:flex">
          {NAV_SECTIONS.map((item) => (
            <button
              key={item}
              onClick={() => go(item)}
              aria-current={activeSection === item ? "true" : undefined}
              className={`rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                activeSection === item
                  ? "text-accent"
                  : "text-muted hover:text-ink"
              }`}
            >
              {t(`page.nav.${item}`)}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <ResumeDownloadDropdown
            links={resumeLinks}
            label={t("page.cta.downloadCV")}
            compact
            className="hidden lg:inline-flex"
          />

          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <span className="relative block h-4 w-5">
              <span className={`absolute left-0 block h-0.5 w-5 bg-current transition-transform duration-300 ${menuOpen ? "top-1.5 rotate-45" : "top-0.5"}`} />
              <span className={`absolute left-0 top-1.5 block h-0.5 w-5 bg-current transition-opacity duration-200 ${menuOpen ? "opacity-0" : "opacity-100"}`} />
              <span className={`absolute left-0 block h-0.5 w-5 bg-current transition-transform duration-300 ${menuOpen ? "top-1.5 -rotate-45" : "top-2.5"}`} />
            </span>
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div id="mobile-menu" className="border-t border-line bg-canvas px-5 py-4 lg:hidden">
          <ul className="flex flex-col gap-1">
            {NAV_SECTIONS.map((item) => (
              <li key={item}>
                <button
                  onClick={() => go(item)}
                  className={`w-full rounded-lg px-3 py-3 text-left text-base font-medium transition-colors ${
                    activeSection === item
                      ? "bg-accent-soft text-accent"
                      : "text-ink hover:bg-surface"
                  }`}
                >
                  {t(`page.nav.${item}`)}
                </button>
              </li>
            ))}
          </ul>
          {resumeLinks.length > 0 && (
            <div className="mt-3 flex justify-center">
              <ResumeDownloadDropdown
                links={resumeLinks}
                label={t("page.cta.downloadCV")}
                className="w-full"
              />
            </div>
          )}
        </div>
      )}
    </header>
  );
}
