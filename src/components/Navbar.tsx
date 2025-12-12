import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useTranslation } from "react-i18next";
import type { PortfolioData } from "../types";
import { scrollToSection } from "./ScrollToSection";

type NavbarProps = {
  activeSection: string;
  showNavbar: boolean;
  data: PortfolioData;
};

export const Navbar = ({ activeSection, showNavbar, data }: NavbarProps) => {
  const { t } = useTranslation();
  const navItems = ["home", "work", "experience", "education", "contact"];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-md z-50 transition-transform duration-300 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20 gap-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {data.personal.name}
            </span>
          </div>
          <div className="hidden md:flex gap-1">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  activeSection === item
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {t(`page.nav.${item}`)}
              </button>
            ))}
          </div>
          <div className="top-4 right-4 sm:top-6 sm:right-6 z-20">
            <LanguageSwitcher />
          </div>
          {/* Mobile menu */}
          <div className="md:hidden">
            <select
              value={activeSection}
              onChange={(e) => scrollToSection(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 font-medium"
            >
              {navItems.map((item) => (
                <option key={item} value={item}>
                  {t(`page.nav.${item}`)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </nav>
  );
};
