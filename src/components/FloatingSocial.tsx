import { useTranslation } from "react-i18next";
import ResumeDownloadDropdown from "@/components/ResumeDownloadDropdown";

interface FloatingSocialProps {
  linkedin: string;
  email: string;
  phone: string;
  resume?: string;
  resumeSoftwareDeveloper?: string;
  resumeProjectManager?: string;
}

const bubble =
  "group flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface text-muted shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:text-white hover:shadow-raised";
const icon = "h-5 w-5";

/**
 * Vertical stack of quick-contact bubbles, fixed to the left edge and
 * static through scroll. Each bubble adopts its brand colour on hover.
 * Hidden on small/medium viewports to avoid overlapping content.
 */
export default function FloatingSocial({
  linkedin,
  email,
  phone,
  resume,
  resumeSoftwareDeveloper,
  resumeProjectManager,
}: FloatingSocialProps) {
  const { t } = useTranslation();
  const resumeLinks = [
    {
      href: resumeSoftwareDeveloper,
      label: t("page.cta.downloadSoftwareDeveloperCV"),
    },
    {
      href: resumeProjectManager,
      label: t("page.cta.downloadProjectManagerCV"),
    },
  ].filter((item): item is { href: string; label: string } => Boolean(item.href));
  if (resumeLinks.length === 0 && resume) {
    resumeLinks.push({ href: resume, label: t("page.cta.downloadCV") });
  }

  return (
    <div className="fixed left-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-3 xl:flex">
      <a
        href={linkedin}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        className={`${bubble} hover:border-[#0A66C2] hover:bg-[#0A66C2]`}
      >
        <svg className={icon} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zm1.78 13.02H3.56V9h3.56v11.45zM22.22 0H1.77C.8 0 0 .77 0 1.73v20.54C0 23.23.8 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
        </svg>
      </a>

      <a
        href={`mailto:${email}`}
        aria-label="Email"
        className={`${bubble} hover:border-accent hover:bg-accent`}
      >
        <svg className={icon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5A1.5 1.5 0 0 1 4.5 6h15A1.5 1.5 0 0 1 21 7.5v9a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 16.5v-9Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="m3.5 7 8.5 6 8.5-6" />
        </svg>
      </a>

      <a
        href={`tel:${phone.replace(/\s/g, "")}`}
        aria-label="Phone"
        className={`${bubble} hover:border-[#16a34a] hover:bg-[#16a34a]`}
      >
        <svg className={icon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.5 5.5C2.5 4.4 3.4 3.5 4.5 3.5H7c.5 0 .9.3 1 .8l1 3.2c.1.4 0 .8-.3 1.1L7.4 10c1 2 2.6 3.6 4.6 4.6l1.4-1.3c.3-.3.7-.4 1.1-.3l3.2 1c.5.1.8.5.8 1v2.5c0 1.1-.9 2-2 2C9.3 19.5 4.5 14.7 4.5 6.5" />
        </svg>
      </a>

      <ResumeDownloadDropdown
        links={resumeLinks}
        label={t("page.cta.downloadCV")}
        menuAlign="left"
        iconOnly
      />
    </div>
  );
}
