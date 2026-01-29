import { sidebarState } from "@/lib/sidebarState";
import { useEffect, useState, type MouseEvent } from "react";
import { useTranslation } from "react-i18next";

interface Experience {
  id: number;
  position: string;
  company: string;
  image?: string;
  type: string;
  duration: string;
  location: string;
  description: string;
  responsibilities: string[];
  technologies: string[];
  achievements?: string[];
}

interface ExperienceGridProps {
  experiences: Experience[];
}

interface ExperienceModalProps {
  experience: Experience;
  isOpen: boolean;
  onClose: () => void;
}

function ExperienceModal({ experience, isOpen, onClose }: ExperienceModalProps) {
  const { t } = useTranslation();

  useEffect(() => {
    if (!isOpen || !experience) return;

    document.body.style.overflow = "hidden";

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose, experience]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white/95 backdrop-blur-md rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-start gap-4">
              {experience.image && (
                <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center flex-shrink-0 shadow-md">
                  <img
                    src={experience.image}
                    alt={`${experience.company} logo`}
                    className="object-contain max-w-full max-h-full"
                    loading="lazy"
                  />
                </div>
              )}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {experience.position}
                </h2>
                <h3 className="text-xl font-semibold text-blue-600">
                  {experience.company}
                </h3>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
            >
              ×
            </button>
          </div>

          {/* Meta info */}
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg text-base font-bold shadow-md">
              {experience.duration}
            </span>
            <span className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg text-base font-semibold shadow-md">
              {experience.type}
            </span>
            <span className="px-4 py-2 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-lg text-base font-semibold shadow-md">
              {experience.location}
            </span>
          </div>

          {/* Description */}
          <div className="mb-6">
            <p className="text-gray-700 leading-relaxed text-lg">
              {experience.description}
            </p>
          </div>

          {/* Responsibilities */}
          <div className="mb-6">
            <h4 className="text-xl font-semibold text-gray-900 mb-3">
              {t("page.experience.responsibilities")}
            </h4>
            <ul className="space-y-2">
              {experience.responsibilities.map((responsibility, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">{responsibility}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technologies */}
          <div className="mb-6">
            <h4 className="text-xl font-semibold text-gray-900 mb-3">
              {t("page.experience.technologies")}
            </h4>
            <div className="flex flex-wrap gap-2">
              {experience.technologies.map((tech) => (
                <span
                  key={tech}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Achievements */}
          {experience.achievements && experience.achievements.length > 0 && (
            <div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">
                {t("page.experience.achievements")}
              </h4>
              <ul className="space-y-2">
                {experience.achievements.map((achievement, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ExperienceGrid({ experiences }: ExperienceGridProps) {
  const [selectedExperience, setSelectedExperience] =
    useState<Experience | null>(null);
  const { t } = useTranslation();

  const handleExperienceClick = (experience: Experience) => {
    setSelectedExperience(experience);
    sidebarState.hide();
  };

  const handleCloseModal = () => {
    setSelectedExperience(null);
    sidebarState.show();
  };

  if (experiences.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">{t("page.experience.noExperiences")}</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {experiences.map((experience, index) => (
          <div
            key={experience.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer scroll-reveal-scale"
            style={{ animationDelay: `${(index % 3) * 0.1}s` }}
            onClick={() => handleExperienceClick(experience)}
          >
            {/* Company Image */}
            <div className="relative h-32 overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
              {experience.image ? (
                <img
                  src={experience.image}
                  alt={`${experience.company} logo`}
                  className="object-contain max-w-[80%] max-h-[80%]"
                  loading="lazy"
                />
              ) : (
                <span className="text-4xl font-bold text-gray-400">
                  {experience.company
                    .split(" ")
                    .map((word) => word[0])
                    .join("")
                    .slice(0, 3)}
                </span>
              )}
            </div>

            {/* Experience Info */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                {experience.position}
              </h3>
              <p className="text-blue-600 font-semibold mb-3">
                {experience.company}
              </p>
              <p className="text-gray-700 text-sm mb-4 line-clamp-2">
                {experience.description}
              </p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 mb-4">
                {experience.technologies.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium"
                  >
                    {tech}
                  </span>
                ))}
                {experience.technologies.length > 3 && (
                  <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium">
                    +{experience.technologies.length - 3}
                  </span>
                )}
              </div>

              {/* Meta */}
              <div className="flex flex-wrap gap-2 text-sm">
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded font-medium">
                  {experience.duration}
                </span>
                <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded font-medium">
                  {experience.type}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <ExperienceModal
        experience={selectedExperience!}
        isOpen={selectedExperience !== null}
        onClose={handleCloseModal}
      />
    </>
  );
}
