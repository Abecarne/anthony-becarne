import { useTranslation } from "react-i18next";
import SectionHeader from "@/components/SectionHeader";
import { getSkillIcon } from "@/components/SkillIcon";
import type { PortfolioData, SkillCategory } from "@/types";

type Accent = "accent" | "violet";

const ICON_CLASS: Record<Accent, string> = {
  accent: "text-accent",
  violet: "text-violet",
};
const DOT_CLASS: Record<Accent, string> = {
  accent: "bg-accent",
  violet: "bg-violet",
};

function SkillChip({ name, accent }: { name: string; accent: Accent }) {
  const Icon = getSkillIcon(name);
  return (
    <li className="inline-flex items-center gap-1.5 rounded-full border border-line bg-canvas px-3 py-1.5 text-sm font-medium text-ink">
      {Icon ? (
        <Icon className={`h-4 w-4 ${ICON_CLASS[accent]}`} aria-hidden="true" />
      ) : (
        <span className={`h-1.5 w-1.5 rounded-full ${DOT_CLASS[accent]}`} aria-hidden="true" />
      )}
      {name}
    </li>
  );
}

function CategoryCard({
  category,
  accent,
}: {
  category: SkillCategory;
  accent: Accent;
}) {
  return (
    <div className="reveal rounded-2xl border border-line bg-surface p-6 shadow-card sm:p-8">
      <div className="flex items-center gap-3">
        <span className={`h-2.5 w-2.5 rounded-full ${DOT_CLASS[accent]}`} aria-hidden="true" />
        <h3 className="text-xl font-bold text-ink">{category.label}</h3>
      </div>

      <div className="mt-6 space-y-6">
        {category.groups.map((group) => (
          <div key={group.title}>
            <h4 className="text-xs font-semibold uppercase tracking-[0.12em] text-faint">
              {group.title}
            </h4>
            <ul className="mt-3 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <SkillChip key={item} name={item} accent={accent} />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Skills({ data }: { data: PortfolioData }) {
  const { t } = useTranslation();

  return (
    <section id="skills" className="px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow={t("page.nav.skills")}
          title={t("page.skills.title")}
          description={t("page.skills.description")}
        />

        <div className="mt-8 grid gap-6 lg:grid-cols-2 lg:gap-8">
          <CategoryCard category={data.skills.development} accent="accent" />
          <CategoryCard category={data.skills.management} accent="violet" />
        </div>
      </div>
    </section>
  );
}
