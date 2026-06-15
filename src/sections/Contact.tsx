import { useTranslation } from "react-i18next";
import ResumeDownloadDropdown from "@/components/ResumeDownloadDropdown";
import SectionHeader from "@/components/SectionHeader";
import { CALENDLY_URL } from "@/lib/site";
import type { PortfolioData } from "@/types";

export default function Contact({ data }: { data: PortfolioData }) {
  const { t } = useTranslation();
  const { personal, contact } = data;
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

  const details = [
    { label: t("page.contact.infos.email"), value: personal.email, href: `mailto:${personal.email}` },
    { label: t("page.contact.infos.phone"), value: personal.phone, href: `tel:${personal.phone.replace(/\s/g, "")}` },
    { label: t("page.contact.infos.location"), value: personal.location },
    { label: t("page.contact.infos.timezone"), value: contact.timezone },
  ];

  return (
    <section id="contact" className="px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow={t("page.nav.contact")}
          title={t("page.contact.title")}
          description={t("page.contact.description")}
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {/* Contact details */}
          <div className="reveal rounded-2xl border border-line bg-surface p-6 shadow-card sm:p-8">
            <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-faint">
              {t("page.contact.infos.title")}
            </h3>
            <dl className="mt-5 space-y-4">
              {details.map((d) => (
                <div key={d.label}>
                  <dt className="text-xs text-muted">{d.label}</dt>
                  <dd className="mt-0.5">
                    {d.href ? (
                      <a href={d.href} className="font-medium text-ink transition-colors hover:text-accent">
                        {d.value}
                      </a>
                    ) : (
                      <span className="font-medium text-ink">{d.value}</span>
                    )}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-6 flex gap-3 border-t border-line pt-6">
              <a href={personal.socialLinks.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-ink hover:bg-ink hover:text-white">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 .5C5.7.5.5 5.7.5 12a11.5 11.5 0 0 0 7.9 10.9c.6.1.8-.2.8-.5v-2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.6 18.3 5 18.3 5c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.6.8.5A11.5 11.5 0 0 0 23.5 12C23.5 5.7 18.3.5 12 .5Z" />
                </svg>
              </a>
              <a href={personal.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-[#0A66C2] hover:bg-[#0A66C2] hover:text-white">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zm1.78 13.02H3.56V9h3.56v11.45zM22.22 0H1.77C.8 0 0 .77 0 1.73v20.54C0 23.23.8 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
                </svg>
              </a>
            </div>
          </div>

          {/* CTA panel */}
          <div className="reveal flex flex-col justify-center rounded-2xl bg-gradient-to-br from-accent to-violet p-8 text-white shadow-raised sm:p-10">
            <h3 className="text-2xl font-bold">{t("page.cta.title")}</h3>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-white/85">
              {t("page.cta.description")}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-accent transition-transform hover:-translate-y-0.5">
                {t("page.cta.book")}
              </a>
              <a href={`mailto:${personal.email}?subject=Project Inquiry`} className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white/10">
                {t("page.cta.email")}
              </a>
              <ResumeDownloadDropdown
                links={resumeLinks}
                label={t("page.cta.downloadCV")}
                tone="inverted"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
