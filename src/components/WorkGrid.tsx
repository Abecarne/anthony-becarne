import { sidebarState } from "@/lib/sidebarState";
import { useEffect, useState, type MouseEvent } from "react";
import { useTranslation } from "react-i18next";
import type { WorkProject } from "../types";

interface WorkGridProps {
  projects: WorkProject[];
}

interface ProjectModalProps {
  project: WorkProject;
  isOpen: boolean;
  onClose: () => void;
}

function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const { t } = useTranslation();

  useEffect(() => {
    if (!isOpen) return;

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
  }, [isOpen, onClose]);

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
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {project.title}
              </h2>
              <p className="text-lg text-gray-600">{project.client}</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
            >
              ×
            </button>
          </div>

          {/* Image/Video */}
          <div className="mb-6">
            {project.hasVideo && project.video ? (
              <div className="relative w-full h-64 md:h-96 bg-gray-100 rounded-lg overflow-hidden">
                <iframe
                  src={project.video}
                  title={project.title}
                  className="w-full h-full"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="relative w-full h-64 md:h-96">
                <img
                  src={project.image}
                  alt={project.title}
                  className="object-cover rounded-lg w-full h-full"
                  loading="lazy"
                />
              </div>
            )}
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              {t("page.work.descriptionTitle")}
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Details */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {t("page.work.technologies")}
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {t("page.work.details")}
              </h3>
              <div className="space-y-2">
                <p>
                  <span className="font-medium">
                    {t("page.work.duration")} :
                  </span>{" "}
                  {project.duration}
                </p>
                <p>
                  <span className="font-medium">{t("page.work.year")} :</span>{" "}
                  {project.year}
                </p>
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="flex gap-4">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
              >
                {t("page.work.demo")}
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
              >
                {t("page.work.code")}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function WorkGrid({ projects }: WorkGridProps) {
  const [selectedProject, setSelectedProject] = useState<WorkProject | null>(
    null
  );
  const { t } = useTranslation();

  const handleProjectClick = (project: WorkProject) => {
    setSelectedProject(project);
    sidebarState.hide();
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
    sidebarState.show();
  };

  if (projects.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">{t("page.work.noProjects")}</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {projects.map((project) => {
          const isVideoProject = project.hasVideo && Boolean(project.video);
          const mediaSrc = isVideoProject
            ? (project.video as string) || project.image
            : project.image;

          return (
            <div
              key={project.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              onClick={() => handleProjectClick(project)}
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={mediaSrc}
                  alt={project.title}
                  className="object-cover hover:scale-105 transition-transform duration-300 w-full h-full"
                  loading="lazy"
                />
                {isVideoProject && (
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center hover:bg-opacity-40 transition-all duration-300">
                    <div className="bg-red-600 hover:bg-red-700 rounded-full p-4 shadow-lg transform hover:scale-110 transition-all duration-300">
                      <svg
                        className="w-8 h-8 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                )}
              </div>

              {/* Project Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-600 mb-3">{project.client}</p>
                <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>

                {/* Project Meta */}
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>{project.year}</span>
                  <span>{project.duration}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      <ProjectModal
        project={selectedProject!}
        isOpen={selectedProject !== null}
        onClose={handleCloseModal}
      />
    </>
  );
}
