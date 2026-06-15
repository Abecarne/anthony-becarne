import type { IconType } from "react-icons";
import { FaAws } from "react-icons/fa6";
import {
  SiDocker,
  SiFastapi,
  SiFigma,
  SiGithubactions,
  SiGoogleanalytics,
  SiJavascript,
  SiJira,
  SiLinear,
  SiMiro,
  SiNextdotjs,
  SiNodedotjs,
  SiNotion,
  SiOpenai,
  SiPostgresql,
  SiPosthog,
  SiPython,
  SiReact,
  SiShadcnui,
  SiSupabase,
  SiTailwindcss,
  SiTrello,
  SiTypescript,
  SiVercel,
  SiVuedotjs,
  SiWhatsapp,
} from "react-icons/si";
import { VscAzure } from "react-icons/vsc";

/** Brand logo per skill name (proper nouns are identical across locales). */
const ICONS: Record<string, IconType> = {
  React: SiReact,
  "Next.js": SiNextdotjs,
  "Vue.js": SiVuedotjs,
  TypeScript: SiTypescript,
  JavaScript: SiJavascript,
  "Tailwind CSS": SiTailwindcss,
  "shadcn/ui": SiShadcnui,
  Python: SiPython,
  FastAPI: SiFastapi,
  "Node.js": SiNodedotjs,
  PostgreSQL: SiPostgresql,
  "OpenAI API": SiOpenai,
  "WhatsApp Business API": SiWhatsapp,
  Docker: SiDocker,
  "GitHub Actions": SiGithubactions,
  Azure: VscAzure,
  AWS: FaAws,
  Vercel: SiVercel,
  Supabase: SiSupabase,
  PostHog: SiPosthog,
  Linear: SiLinear,
  "Google Analytics": SiGoogleanalytics,
  Figma: SiFigma,
  Notion: SiNotion,
  Trello: SiTrello,
  Jira: SiJira,
  Miro: SiMiro,
};

export function getSkillIcon(name: string): IconType | undefined {
  return ICONS[name];
}
