import type { ResourceLanguage } from "i18next";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import type { PortfolioData } from "../types";

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
  if (!bundle) {
    throw new Error("Portfolio translations are not loaded");
  }

  if (isRecord(bundle) && "portfolio" in bundle) {
    const typed = bundle as { portfolio?: unknown };
    if (isPortfolioData(typed.portfolio)) {
      return typed.portfolio;
    }
  }

  if (isPortfolioData(bundle)) {
    return bundle;
  }

  throw new Error("Portfolio data structure is invalid");
}

export function usePortfolioData() {
  const { i18n } = useTranslation();
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useEffect(() => {
    const loadPortfolioData = () => {
      setLoading(true);
      try {
        const defaultNS = i18n.options.defaultNS;
        const namespace =
          typeof defaultNS === "string"
            ? defaultNS
            : Array.isArray(defaultNS) && defaultNS.length > 0
            ? defaultNS[0]
            : "translation";
        const bundle = i18n.getResourceBundle(
          i18n.language,
          namespace
        ) as ResourceLanguage | undefined;
        const portfolioData = resolvePortfolioData(bundle);
        setData(portfolioData);
        setError(null);
      } catch (err) {
        setData(null);
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    loadPortfolioData();

    const handleLanguageChange = () => {
      loadPortfolioData();
    };

    i18n.on("languageChanged", handleLanguageChange);
    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, [i18n]);

  // Filter projects based on selected category
  const filteredProjects =
    data?.work.filter(
      (project) =>
        selectedCategory === "all" || project.category === selectedCategory
    ) || [];

  // Get projects count for each category
  const getCategoryCount = (categoryId: string) => {
    if (!data) return 0;
    if (categoryId === "all") return data.work.length;
    return data.work.filter((project) => project.category === categoryId)
      .length;
  };

  return {
    data,
    loading,
    error,
    selectedCategory,
    setSelectedCategory,
    filteredProjects,
    getCategoryCount,
  };
}
