import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

type FlagProps = {
  className?: string;
};

const FlagFrance = ({ className }: FlagProps) => (
  <svg
    viewBox="0 0 60 40"
    className={className ?? ""}
    aria-hidden="true"
    focusable="false"
    role="img"
  >
    <rect width="60" height="40" fill="#ED2939" />
    <rect width="40" height="40" fill="#fff" />
    <rect width="20" height="40" fill="#002395" />
  </svg>
);

const FlagUK = ({ className }: FlagProps) => (
  <svg
    viewBox="0 0 60 40"
    className={className ?? ""}
    aria-hidden="true"
    focusable="false"
    role="img"
  >
    <rect width="60" height="40" fill="#012169" />
    <path d="M0 0 L60 40" stroke="#fff" strokeWidth="8" />
    <path d="M60 0 L0 40" stroke="#fff" strokeWidth="8" />
    <path d="M0 0 L60 40" stroke="#C8102E" strokeWidth="4" />
    <path d="M60 0 L0 40" stroke="#C8102E" strokeWidth="4" />
    <rect x="24" width="12" height="40" fill="#fff" />
    <rect y="14" width="60" height="12" fill="#fff" />
    <rect x="27" width="6" height="40" fill="#C8102E" />
    <rect y="17" width="60" height="6" fill="#C8102E" />
  </svg>
);

const FlagKorea = ({ className }: FlagProps) => (
  <svg
    viewBox="0 0 60 40"
    className={className ?? ""}
    aria-hidden="true"
    focusable="false"
    role="img"
  >
    <rect width="60" height="40" fill="#fff" />
    <circle cx="30" cy="20" r="11" fill="#CD2E3A" />
    <path
      d="M30 9a11 11 0 0 1 0 22 5.5 5.5 0 0 0 0-11 5.5 5.5 0 0 1 0-11"
      fill="#0047A0"
    />
    <path
      d="M30 31a11 11 0 0 1 0-22 5.5 5.5 0 0 0 0 11 5.5 5.5 0 0 1 0 11"
      fill="#0047A0"
    />
    <g stroke="#000" strokeWidth="2" strokeLinecap="round">
      <line x1="11" y1="10" x2="21" y2="10" />
      <line x1="11" y1="14" x2="21" y2="14" />
      <line x1="11" y1="18" x2="21" y2="18" />
      <line x1="39" y1="10" x2="44" y2="10" />
      <line x1="46" y1="10" x2="51" y2="10" />
      <line x1="39" y1="14" x2="51" y2="14" />
      <line x1="39" y1="18" x2="44" y2="18" />
      <line x1="46" y1="18" x2="51" y2="18" />
      <line x1="11" y1="22" x2="21" y2="22" />
      <line x1="11" y1="26" x2="16" y2="26" />
      <line x1="17" y1="26" x2="21" y2="26" />
      <line x1="11" y1="30" x2="21" y2="30" />
      <line x1="39" y1="22" x2="44" y2="22" />
      <line x1="46" y1="22" x2="51" y2="22" />
      <line x1="39" y1="26" x2="44" y2="26" />
      <line x1="46" y1="26" x2="51" y2="26" />
      <line x1="39" y1="30" x2="44" y2="30" />
      <line x1="46" y1="30" x2="51" y2="30" />
    </g>
  </svg>
);

const languages = [
  {
    code: "fr",
    label: "Français",
    abbr: "FR",
    Flag: FlagFrance,
  },
  { code: "en", label: "English", abbr: "EN", Flag: FlagUK },
  { code: "ko", label: "한국어", abbr: "KO", Flag: FlagKorea },
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
