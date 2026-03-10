// frontend/src/pages/users/customer/components/filter.tsx
import React from "react";

interface ServiceCategory {
  sc_id: number;
  sc_name: string;
}

interface FilterProps {
  categories: ServiceCategory[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const Filter: React.FC<FilterProps> = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 mb-8">
      <button
        onClick={() => onCategoryChange("Бүх үйлчилгээ")}
        className={`px-4 py-2 rounded-full font-medium ${
          selectedCategory === "Бүх үйлчилгээ"
            ? "bg-amber-500 text-white"
            : "bg-white border border-amber-500 text-amber-700"
        }`}
      >
        Бүгд
      </button>

      {categories.map((cat) => (
        <button
          key={cat.sc_id}
          onClick={() => onCategoryChange(cat.sc_name)}
          className={`px-4 py-2 rounded-full font-medium ${
            selectedCategory === cat.sc_name
              ? "bg-amber-500 text-white"
              : "bg-white border border-amber-500 text-amber-700"
          }`}
        >
          {cat.sc_name}
        </button>
      ))}
    </div>
  );
};

export default Filter;
