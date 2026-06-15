import { useEffect } from "react";

/**
 * Adds the `is-visible` class to every `.reveal` element as it enters
 * the viewport, triggering a short, subtle entrance animation.
 * Newly mounted elements (e.g. after filtering or "see more") are picked
 * up via a MutationObserver.
 */
export function useScrollReveal(
  selector = ".reveal",
  { threshold = 0.12, rootMargin = "0px 0px -40px 0px" } = {}
) {
  useEffect(() => {
    const observed = new Set<Element>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin }
    );

    const observeAll = () => {
      document.querySelectorAll(selector).forEach((el) => {
        if (!observed.has(el) && !el.classList.contains("is-visible")) {
          observed.add(el);
          observer.observe(el);
        }
      });
    };

    observeAll();
    const mutationObserver = new MutationObserver(observeAll);
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [selector, threshold, rootMargin]);
}
