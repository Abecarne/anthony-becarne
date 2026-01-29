interface ExperienceType {
  id: string;
  name: string;
  description: string;
}

interface ExperienceTypeSelectorProps {
  types: ExperienceType[];
  selectedType: string;
  onTypeChange: (typeId: string) => void;
  getTypeCount: (typeId: string) => number;
}

export default function ExperienceTypeSelector({
  types,
  selectedType,
  onTypeChange,
  getTypeCount,
}: ExperienceTypeSelectorProps) {
  return (
    <div className="experience-type-selector mb-12">
      <div className="flex flex-wrap gap-3 justify-center">
        {types.map((type) => {
          const count = getTypeCount(type.id);
          const isActive = selectedType === type.id;

          return (
            <button
              key={type.id}
              onClick={() => onTypeChange(type.id)}
              className={`
                px-6 py-3 rounded-full text-sm font-semibold transition-all duration-200 border-2
                ${
                  isActive
                    ? "bg-blue-600 text-white border-blue-600 shadow-lg transform scale-105"
                    : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-gray-300 hover:shadow-md"
                }
              `}
              title={type.description}
            >
              {type.name}
              <span
                className={`
                ml-2 px-2 py-1 rounded-full text-xs font-bold
                ${isActive ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-600"}
              `}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
