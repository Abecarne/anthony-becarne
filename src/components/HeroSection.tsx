import ExperienceCarousel from "@/components/ExperienceCarousel";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { scrollToSection } from "@/components/ScrollToSection";
import { useTranslation } from "react-i18next";
import type { PortfolioData } from "@/types";

export const HeroSection = ({ data }: { data: PortfolioData }) => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col">
      <section
        id="home"
        className="flex-1 flex items-center justify-center px-6 py-16 bg-gradient-to-br from-blue-50/30 to-purple-50/30 relative overflow-hidden"
      >
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20">
          <LanguageSwitcher />
        </div>
        <div className="max-w-7xl w-full mx-auto pt-20 relative z-10">
          <div className="text-center">
            <div className="relative inline-block hero-animate">
              <h1
                className="text-7xl md:text-8xl lg:text-9xl font-black uppercase mb-6 leading-none tracking-tight"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {data.personal.name}
                </span>
              </h1>
              <div className="freelance-badge absolute -top-2 -right-4 md:-top-4 md:-right-8 lg:-top-6 lg:-right-12 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 md:px-4 md:py-1.5 rounded-full text-xs md:text-sm font-bold shadow-lg flex items-center gap-2 whitespace-nowrap">
                <span className="blink-dot w-2 h-2 md:w-2.5 md:h-2.5 bg-white rounded-full inline-block"></span>
                {t("page.freelanceBadge")}
              </div>
            </div>

            <h2
              className="text-3xl md:text-4xl text-gray-800 font-bold uppercase mb-6 tracking-wider hero-animate-delay-1"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              {data.personal.title}
            </h2>

            <p className="text-xl text-gray-700 leading-relaxed max-w-2xl mb-12 mx-auto hero-animate-delay-2">
              {data.personal.bio}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center hero-animate-delay-3">
              <a
                href="https://calendly.com/anthony-becarne/30min"
                target="_blank"
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-6 py-3 rounded-lg font-semibold text-base transition-all shadow-lg uppercase tracking-wide"
              >
                {t("page.cta.book")}
              </a>

              <button
                onClick={() => scrollToSection("contact")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold text-base transition-colors shadow-lg uppercase tracking-wide"
              >
                {t("page.cta.email")}
              </button>

              <button
                onClick={() => scrollToSection("work")}
                className="bg-white hover:bg-gray-50 text-blue-600 px-6 py-3 rounded-lg font-semibold text-base border-2 border-blue-600 transition-colors shadow-lg uppercase tracking-wide"
              >
                {t("page.cta.viewWork")}
              </button>
            </div>
          </div>
        </div>
      </section>

      <ExperienceCarousel experiences={data.experience} />
    </div>
  );
};
