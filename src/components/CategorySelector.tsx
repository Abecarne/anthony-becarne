import type { Category } from "@/types";

interface CategorySelectorProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
  getCategoryCount: (categoryId: string) => number;
}

export default function CategorySelector({ 
  categories, 
  selectedCategory, 
  onCategoryChange, 
  getCategoryCount 
}: CategorySelectorProps) {
  return (
    <div className="category-selector mb-12">
      <div className="flex flex-wrap gap-3 justify-center">
        {categories.map((category) => {
          const count = getCategoryCount(category.id);
          const isActive = selectedCategory === category.id;
          
          return (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`
                px-6 py-3 rounded-full text-sm font-semibold transition-all duration-200 border-2
                ${isActive 
                  ? 'bg-blue-600 text-white border-blue-600 shadow-lg transform scale-105' 
                  : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-gray-300 hover:shadow-md'
                }
              `}
              title={category.description}
            >
              {category.name}
              <span className={`
                ml-2 px-2 py-1 rounded-full text-xs font-bold
                ${isActive 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 text-gray-600'
                }
              `}>
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
