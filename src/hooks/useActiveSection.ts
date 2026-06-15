import { useEffect, useState } from "react";

/**
 * Tracks which of the given section ids is currently in view,
 * used to highlight the active link in the navigation.
 */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string>(ids[0] ?? "");

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY + 140;
      let current = ids[0] ?? "";

      for (const id of ids) {
        const element = document.getElementById(id);
        if (element && element.offsetTop <= position) {
          current = id;
        }
      }

      // Snap to the last section once the page is scrolled to the bottom.
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 4;
      if (atBottom) current = ids[ids.length - 1] ?? current;

      setActive(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [ids]);

  return active;
}
