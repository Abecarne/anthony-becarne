import { useTranslation } from "react-i18next";

import FloatingSocial from "@/components/FloatingSocial";
import Footer from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { usePortfolioData } from "@/hooks/usePortfolioData";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useSEO } from "@/hooks/useSEO";

import TrustedBy from "@/components/TrustedBy";
import Contact from "@/sections/Contact";
import Education from "@/sections/Education";
import Experience from "@/sections/Experience";
import Hero from "@/sections/Hero";
import Skills from "@/sections/Skills";
import Work from "@/sections/Work";

export default function App() {
  const { t } = useTranslation();
  const { data, loading, error } = usePortfolioData();

  useSEO();
  useScrollReveal();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center" role="status" aria-live="polite">
        <span className="h-10 w-10 animate-spin rounded-full border-2 border-line border-t-accent" />
        <span className="sr-only">Loading</span>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6 text-center">
        <p className="text-muted">{t("page.error")}</p>
      </div>
    );
  }

  return (
    <>
      <Navbar
        name={data.personal.name}
        resume={data.personal.resume}
        resumeSoftwareDeveloper={data.personal.resumeSoftwareDeveloper}
        resumeProjectManager={data.personal.resumeProjectManager}
      />
      <FloatingSocial
        linkedin={data.personal.socialLinks.linkedin}
        email={data.personal.email}
        phone={data.personal.phone}
        resume={data.personal.resume}
        resumeSoftwareDeveloper={data.personal.resumeSoftwareDeveloper}
        resumeProjectManager={data.personal.resumeProjectManager}
      />
      <main>
        <Hero data={data} />
        <TrustedBy experiences={data.experience} />
        <Experience data={data} />
        <Work data={data} />
        <Skills data={data} />
        <Education data={data} />
        <Contact data={data} />
      </main>
      <Footer data={data} />
    </>
  );
}
