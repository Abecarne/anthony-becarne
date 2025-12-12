import { useCallback, useMemo, useState } from "react";
import type { Category, WorkProject } from "@/types";

interface UseProjectFilterProps {
  projects: WorkProject[];
  categories: Category[];
}

export function useProjectFilter({ projects, categories }: UseProjectFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Filter projects based on selected category
  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'all') {
      return projects;
    }
    return projects.filter(project => project.category === selectedCategory);
  }, [projects, selectedCategory]);

  // Get projects count for each category
  const getCategoryCount = useCallback((categoryId: string) => {
    if (categoryId === 'all') return projects.length;
    return projects.filter(project => project.category === categoryId).length;
  }, [projects]);

  // Get projects by category
  const getProjectsByCategory = useCallback((categoryId: string) => {
    if (categoryId === 'all') return projects;
    return projects.filter(project => project.category === categoryId);
  }, [projects]);

  // Get category statistics
  const categoryStats = useMemo(() => {
    return categories.map(category => ({
      ...category,
      count: getCategoryCount(category.id)
    }));
  }, [categories, getCategoryCount]);

  return {
    selectedCategory,
    setSelectedCategory,
    filteredProjects,
    getCategoryCount,
    getProjectsByCategory,
    categoryStats
  };
}
