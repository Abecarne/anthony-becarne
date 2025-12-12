import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

interface Experience {
  id: number;
  company: string;
  image?: string;
  position: string;
}

interface ExperienceCarouselProps {
  experiences: Experience[];
}

export default function ExperienceCarousel({
  experiences,
}: ExperienceCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollPosition = 0;
    const scrollSpeed = 1;

    const scroll = () => {
      scrollPosition += scrollSpeed;

      if (scrollContainer.scrollWidth > 0) {
        const maxScroll = scrollContainer.scrollWidth / 2;

        if (scrollPosition >= maxScroll) {
          scrollPosition = 0;
        }

        scrollContainer.scrollLeft = scrollPosition;
      }

      requestAnimationFrame(scroll);
    };

    const animationFrame = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationFrame);
  }, [experiences]);

  const duplicatedExperiences = [
    ...experiences,
    ...experiences,
    ...experiences,
  ];

  return (
    <div className="w-full bg-white/80 backdrop-blur-sm border-y border-gray-200 py-8 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-4">
        <h3 className="text-center text-sm font-semibold text-gray-600 uppercase tracking-wider">
          {t("page.carousel")}
        </h3>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-12 overflow-x-hidden"
        style={{ scrollBehavior: "auto" }}
      >
        {duplicatedExperiences.map((exp, index) => (
          <div
            key={`${exp.id}-${index}`}
            className="flex-shrink-0 flex items-center gap-4 px-6 py-4 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
            style={{ minWidth: "250px" }}
          >
            {exp.image && (
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center flex-shrink-0 border border-gray-100">
                <img
                  src={exp.image}
                  alt={`${exp.company} logo`}
                  width={48}
                  height={48}
                  className="object-contain max-w-full max-h-full"
                  loading="lazy"
                />
              </div>
            )}
            <div className="flex flex-col">
              <span className="font-bold text-gray-900 text-base whitespace-nowrap">
                {exp.company}
              </span>
              <span className="text-sm text-gray-600 whitespace-nowrap">
                {exp.position}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
