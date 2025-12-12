import CategorySelector from "@/components/CategorySelector";
import MeshBackground from "@/components/MeshBackground";
import WorkGrid from "@/components/WorkGrid";
import { usePortfolioData } from "@/hooks/usePortfolioData";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { HeroSection } from "@/components/HeroSection";
import { Navbar } from "@/components/Navbar";

function HomePage() {
  const {
    data,
    loading,
    error,
    selectedCategory,
    setSelectedCategory,
    filteredProjects,
    getCategoryCount,
  } = usePortfolioData();

  const [activeSection, setActiveSection] = useState("home");
  const [showNavbar, setShowNavbar] = useState(false);
  const [expandedExp, setExpandedExp] = useState<number[] | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "work", "experience", "education", "contact"];
      const scrollPosition = window.scrollY + 100;

      const workSection = document.getElementById("work");
      if (workSection) {
        const workOffsetTop = workSection.offsetTop;
        setShowNavbar(window.scrollY >= workOffsetTop - 100);
      }

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-500 text-center">
          <p className="text-xl font-semibold">{t("page.error")}</p>
          <p className="text-sm mt-2">{error}</p>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="relative min-h-screen">
      <Navbar
        activeSection={activeSection}
        showNavbar={showNavbar}
        data={data}
      />

      <HeroSection data={data} />

      {/* Work Section */}
      <section id="work" className="min-h-screen px-6 py-24 bg-white/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {t("page.work.title")}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t("page.work.description")}
            </p>
          </div>

          <CategorySelector
            categories={data.categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            getCategoryCount={getCategoryCount}
          />

          <WorkGrid projects={filteredProjects} />

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              {t("page.work.showing", {
                count: filteredProjects.length,
                total: data.work.length,
              })}
              {selectedCategory !== "all" &&
                ` in ${
                  data.categories.find((c) => c.id === selectedCategory)?.name
                }`}
            </p>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section
        id="experience"
        className="min-h-screen px-6 py-24 bg-gray-100/80"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {t("page.experience.title")}
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {t("page.experience.description")}
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gray-300 hidden md:block"></div>

            <div className="space-y-12">
              {data.experience.map((exp) => (
                <div key={exp.id} className="relative">
                  <div className="absolute left-6 top-8 w-4 h-4 bg-blue-500 rounded-full border-4 border-white shadow-lg hidden md:block"></div>
                  <div className="bg-white rounded-xl shadow-lg border p-8 md:ml-16">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-3">
                      <div className="flex items-start gap-4">
                        {exp.image && (
                          <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                            <img
                              src={exp.image}
                              alt={`${exp.company} logo`}
                              width={64}
                              height={64}
                              className="object-contain max-w-full max-h-full"
                              loading="lazy"
                            />
                          </div>
                        )}
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900 mb-1">
                            {exp.position}
                          </h2>
                          <h3 className="text-xl font-semibold text-blue-600 mb-2">
                            {exp.company}
                          </h3>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 items-start justify-end">
                        <span className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg text-base font-bold shadow-md whitespace-nowrap">
                          {exp.duration}
                        </span>
                        <span className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg text-base font-semibold shadow-md whitespace-nowrap">
                          {exp.type}
                        </span>
                        <span className="px-4 py-2 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-lg text-base font-semibold shadow-md whitespace-nowrap">
                          {exp.location}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed mb-2">
                      {exp.description}
                    </p>
                    <button
                      className="text-blue-600 font-semibold flex items-center gap-1 hover:underline mb-2"
                      onClick={() =>
                        setExpandedExp(
                          expandedExp?.find((id) => id === exp.id)
                            ? expandedExp.filter((id) => id !== exp.id)
                            : [...(expandedExp || []), exp.id]
                        )
                      }
                    >
                      {expandedExp?.find((id) => id === exp.id)
                        ? t("page.experience.hideDetails")
                        : t("page.experience.seeDetails")}
                    </button>
                    {expandedExp?.find((id) => id === exp.id) && (
                      <div className="mt-4">
                        <div className="mb-4">
                          <h4 className="text-lg font-semibold text-gray-900 mb-2">
                            {t("page.experience.responsibilities")}
                          </h4>
                          <ul className="space-y-2">
                            {exp.responsibilities.map(
                              (responsibility, respIndex) => (
                                <li
                                  key={respIndex}
                                  className="flex items-start gap-3"
                                >
                                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                  <span className="text-gray-700">
                                    {responsibility}
                                  </span>
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                        <div className="mb-4">
                          <h4 className="text-lg font-semibold text-gray-900 mb-2">
                            {t("page.experience.technologies")}
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {exp.technologies.map((tech) => (
                              <span
                                key={tech}
                                className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium border"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-2">
                            {t("page.experience.achievements")}
                          </h4>
                          <ul className="space-y-2">
                            {exp.achievements.map((achievement, achIndex) => (
                              <li
                                key={achIndex}
                                className="flex items-start gap-3"
                              >
                                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                                <span className="text-gray-700">
                                  {achievement}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="min-h-screen px-6 py-24 bg-white/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {t("page.education.title")}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t("page.education.description")}
            </p>
          </div>

          <div className="space-y-12">
            {data.education.map((edu, index) => (
              <div key={edu.id} className="relative">
                {index !== data.education.length - 1 && (
                  <div className="absolute left-8 top-20 w-px h-32 bg-gray-300 hidden md:block"></div>
                )}

                <div className="bg-white rounded-xl shadow-lg border p-8 md:ml-16">
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-32 md:h-32 w-24 h-24 mx-auto md:mx-0 bg-white rounded-lg shadow-md flex items-center justify-center flex-shrink-0">
                      {edu.image ? (
                        <img
                          src={edu.image}
                          alt={`${edu.institution} logo`}
                          width={128}
                          height={128}
                          className="object-contain max-w-full max-h-full"
                          loading="lazy"
                        />
                      ) : (
                        <span className="text-2xl md:text-3xl font-bold text-gray-600">
                          {edu.institution
                            .split(" ")
                            .map((word) => word[0])
                            .join("")
                            .slice(0, 3)}
                        </span>
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="mb-4">
                        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-2">
                          <h2 className="text-2xl font-bold text-gray-900">
                            {edu.degree}
                          </h2>
                          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold self-start">
                            {edu.year}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-blue-600 mb-1">
                          {edu.institution}
                        </h3>
                        <p className="text-gray-600 font-medium">{edu.field}</p>
                      </div>

                      <p className="text-gray-700 leading-relaxed mb-6">
                        {edu.description}
                      </p>

                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-3">
                          {t("page.education.achievements")}
                        </h4>
                        <ul className="space-y-2">
                          {edu.achievements.map(
                            (achievement, achievementIndex) => (
                              <li
                                key={achievementIndex}
                                className="flex items-start gap-3"
                              >
                                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                <span className="text-gray-700">
                                  {achievement}
                                </span>
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute left-6 top-8 w-4 h-4 bg-blue-500 rounded-full border-4 border-white shadow-lg hidden md:block"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="min-h-screen px-6 py-24 bg-gradient-to-br from-blue-50/30 to-purple-50/30"
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {t("page.contact.title")}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t("page.contact.description")}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div className="space-y-8">
              <div className="bg-white rounded-xl shadow-lg border p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {t("page.contact.infos.title")}
                </h2>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {t("page.contact.infos.email")}
                      </h3>
                      <a
                        href={`mailto:${data.personal.email}`}
                        className="text-blue-600 hover:text-blue-700 transition-colors"
                      >
                        {data.personal.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {t("page.contact.infos.phone")}
                      </h3>
                      <a
                        href={`tel:${data.personal.phone}`}
                        className="text-green-600 hover:text-green-700 transition-colors"
                      >
                        {data.personal.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {t("page.contact.infos.location")}
                      </h3>
                      <p className="text-gray-600">{data.personal.location}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {t("page.contact.infos.timezone")}
                      </h3>
                      <p className="text-gray-600">{data.contact.timezone}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-4">
                    {t("page.contact.infos.connect")}
                  </h3>
                  <div className="flex gap-4">
                    <a
                      href={data.personal.socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-gray-800 text-white rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                    </a>
                    <a
                      href={data.personal.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                    <a
                      href={data.personal.socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-blue-400 text-white rounded-lg flex items-center justify-center hover:bg-blue-500 transition-colors"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg border p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {t("page.contact.availability.title")}
                  </h3>
                </div>
                <p className="text-green-600 font-semibold mb-2">
                  {data.contact.availability}
                </p>
                <p className="text-gray-600 text-sm">
                  {t("page.contact.availability.description")}
                </p>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-white rounded-xl shadow-lg border p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {t("page.contact.services.title")}
                </h2>
                <div className="space-y-4">
                  {data.contact.services.map((service) => (
                    <div key={service} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{service}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg border p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {t("page.contact.pricing.title")}
                </h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                    <span className="text-gray-700">
                      {t("page.contact.pricing.daily")}
                    </span>
                    <span className="font-semibold text-gray-900">
                      {data.contact.rates.daily}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                    <span className="text-gray-700">
                      {t("page.contact.pricing.project")}
                    </span>
                    <span className="font-semibold text-gray-900">
                      {data.contact.rates.project}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">
                      {t("page.contact.pricing.retainer")}
                    </span>
                    <span className="font-semibold text-gray-900">
                      {data.contact.rates.retainer}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg border p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {t("page.contact.languages.title")}
                </h2>
                <div className="space-y-3">
                  {data.contact.languages.map((language) => (
                    <div key={language} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-700">{language}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <div className="bg-blue-50 rounded-xl p-8 border border-blue-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {t("page.cta.title")}
              </h3>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                {t("page.cta.description")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://calendly.com/anthony-becarne/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold text-base transition-all shadow-lg"
                >
                  {t("page.cta.book")}
                </a>
                <a
                  href={`mailto:${data.personal.email}?subject=Project Inquiry`}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors shadow-lg"
                >
                  {t("page.cta.email")}
                </a>
                <a
                  href={`tel:${data.personal.phone}`}
                  className="bg-white hover:bg-gray-50 text-blue-600 px-8 py-3 rounded-lg font-semibold border-2 border-blue-600 transition-colors shadow-lg"
                >
                  {t("page.cta.call")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function App() {
  return (
    <div className="antialiased relative bg-gradient-to-br from-slate-100 via-white to-slate-100">
      <MeshBackground className="opacity-80" />
      <div className="relative min-h-screen">
        <main className="relative z-10">
          <HomePage />
        </main>
      </div>
    </div>
  );
}
