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

  return (
    <div className="flex items-center gap-1 rounded-full border border-gray-200 bg-white/90 px-2 py-1 shadow-sm">
      {languages.map((lang) => {
        const Flag = lang.Flag;
        const isActive = lang.code === activeLang;

        return (
          <button
            key={lang.code}
            type="button"
            onClick={() => {
              if (lang.code !== activeLang) {
                i18n.changeLanguage(lang.code);
              }
            }}
            className={`flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-wide transition-colors ${
              isActive
                ? "bg-blue-600 text-white shadow"
                : "text-gray-600 hover:bg-gray-100"
            }`}
            aria-pressed={isActive}
            aria-label={`Switch to ${lang.label}`}
          >
            <Flag className={iconClasses} />
            <span>{lang.abbr}</span>
          </button>
        );
      })}
    </div>
  );
};

export default LanguageSwitcher;
