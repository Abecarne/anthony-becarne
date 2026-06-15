import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import FlagFR from "./Icons/FlagFR";
import FlagKR from "./Icons/FlagKR";
import FlagUK from "./Icons/FlagUK";

const languages = [
  {
    code: "fr",
    label: "Français",
    abbr: "FR",
    Flag: FlagFR,
  },
  { code: "en", label: "English", abbr: "EN", Flag: FlagUK },
  { code: "ko", label: "한국어", abbr: "KO", Flag: FlagKR },
];

const iconClasses = "w-6 h-4 rounded-[2px] shadow-sm";

const LANGUAGE_COOKIE = "portfolio_lang";
const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 365;

const getLanguageFromCookie = () => {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${LANGUAGE_COOKIE}=([^;]*)`)
  );
  return match ? decodeURIComponent(match[1]) : null;
};

const setLanguageCookie = (langCode: string) => {
  if (typeof document === "undefined") return;
  document.cookie = `${LANGUAGE_COOKIE}=${encodeURIComponent(
    langCode
  )};path=/;max-age=${COOKIE_MAX_AGE_SECONDS}`;
};

const normalizeLanguageCode = (code: string) => code.split("-")[0];

const isSupportedLanguage = (code: string) => {
  const normalized = normalizeLanguageCode(code);
  return languages.some((lang) => lang.code === normalized);
};

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [activeLang, setActiveLang] = useState(
    normalizeLanguageCode(i18n.language ?? "en")
  );
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const cookieLang = getLanguageFromCookie();
    if (
      cookieLang &&
      cookieLang !== i18n.language &&
      isSupportedLanguage(cookieLang)
    ) {
      i18n.changeLanguage(cookieLang);
    } else if (isSupportedLanguage(i18n.language ?? "")) {
      setActiveLang(normalizeLanguageCode(i18n.language ?? "en"));
    }

    const handleLanguageChange = (lang: string) => {
      const normalized = normalizeLanguageCode(lang);
      if (isSupportedLanguage(normalized)) {
        setActiveLang(normalized);
        setLanguageCookie(normalized);
      }
    };

    i18n.on("languageChanged", handleLanguageChange);
    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, [i18n]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".language-switcher")) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [isOpen]);

  const activeLanguage = languages.find((lang) => lang.code === activeLang);
  const otherLanguages = languages.filter((lang) => lang.code !== activeLang);

  if (!activeLanguage) return null;

  const ActiveFlag = activeLanguage.Flag;

  return (
    <div className="language-switcher relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 rounded-full border border-line bg-surface px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wide shadow-sm transition-colors hover:border-line-strong"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label={`Current language: ${activeLanguage.label}. Click to change.`}
      >
        <ActiveFlag className={iconClasses} />
        <span className="text-ink">{activeLanguage.abbr}</span>
        <svg
          className={`h-3 w-3 text-faint transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-1 flex flex-col gap-1 rounded-lg border border-line bg-surface p-1 shadow-card">
          {otherLanguages.map((lang) => {
            const Flag = lang.Flag;
            return (
              <button
                key={lang.code}
                type="button"
                onClick={() => {
                  i18n.changeLanguage(lang.code);
                  setIsOpen(false);
                }}
                className="flex items-center gap-2 rounded-md px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-muted transition-colors hover:bg-canvas"
                aria-label={`Switch to ${lang.label}`}
              >
                <Flag className={iconClasses} />
                <span>{lang.abbr}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
