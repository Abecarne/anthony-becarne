import { useEffect } from "react";
import { useTranslation } from "react-i18next";

function updateMetaTag(
  attribute: "name" | "property",
  key: string,
  content: string
) {
  let element = document.querySelector(
    `meta[${attribute}="${key}"]`
  ) as HTMLMetaElement | null;

  if (element) {
    element.setAttribute("content", content);
  } else {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    element.setAttribute("content", content);
    document.head.appendChild(element);
  }
}

export function useSEO() {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const title = t("seo.title");
    const description = t("seo.description");
    const locale = t("seo.locale");
    const lang = i18n.language.split("-")[0];

    document.documentElement.lang = lang;
    document.title = title;

    updateMetaTag("name", "description", description);
    updateMetaTag("property", "og:title", title);
    updateMetaTag("property", "og:description", description);
    updateMetaTag("property", "og:locale", locale);
    updateMetaTag("name", "twitter:title", title);
    updateMetaTag("name", "twitter:description", description);
  }, [t, i18n.language]);
}
