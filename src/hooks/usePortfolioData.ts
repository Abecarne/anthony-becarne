import type { ResourceLanguage } from "i18next";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import type { PortfolioData } from "@/types";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const isPortfolioData = (value: unknown): value is PortfolioData => {
  if (!isRecord(value)) return false;
  const candidate = value as Partial<PortfolioData>;
  return (
    typeof candidate.personal === "object" &&
    Array.isArray(candidate.categories) &&
    Array.isArray(candidate.work) &&
    typeof candidate.contact === "object"
  );
};

function resolvePortfolioData(
  bundle: ResourceLanguage | undefined
): PortfolioData {
  if (!bundle) throw new Error("Portfolio translations are not loaded");
  if (isPortfolioData(bundle)) return bundle;
  throw new Error("Portfolio data structure is invalid");
}

/**
 * Loads the portfolio content from the active i18next resource bundle.
 * Content lives in `translations/{lang}.json` and remains the single
 * source of truth — components only consume it, never duplicate it.
 */
export function usePortfolioData() {
  const { i18n } = useTranslation();
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = () => {
      setLoading(true);
      try {
        const defaultNS = i18n.options.defaultNS;
        const namespace =
          typeof defaultNS === "string"
            ? defaultNS
            : Array.isArray(defaultNS) && defaultNS.length > 0
            ? defaultNS[0]
            : "translation";
        const bundle = i18n.getResourceBundle(i18n.language, namespace) as
          | ResourceLanguage
          | undefined;
        setData(resolvePortfolioData(bundle));
        setError(null);
      } catch (err) {
        setData(null);
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    load();
    i18n.on("languageChanged", load);
    return () => {
      i18n.off("languageChanged", load);
    };
  }, [i18n]);

  return { data, loading, error };
}
