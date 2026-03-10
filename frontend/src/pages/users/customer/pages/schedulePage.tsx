// frontend/src/pages/users/customer/pages/schedule/schedulePage.tsx
import React, { useEffect, useState } from "react";
import Header from "../components/header";
import { getSchedules } from "../../../../services/scheduleService";
import { getServiceCategories } from "../../../../services/serviceCategoryService";
import Filter from "./components/filter";
import Table from "./components/table";

interface Schedule {
  sch_id: number;
  emp_name: string;
  service_name: string;
  start_time: string;
  duration: number;
  notes?: string;
  sc_name: string; // ангиллын нэр
}

interface ServiceCategory {
  sc_id: number;
  sc_name: string;
}

const SchedulePage: React.FC = () => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [filteredSchedules, setFilteredSchedules] = useState<Schedule[]>([]);
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("Бүх үйлчилгээ");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    try {
      const res = await getSchedules();
      setSchedules(res.data);
      setFilteredSchedules(res.data);
    } catch (err) {
      console.error("Хуваарь авахад алдаа:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await getServiceCategories();
      setCategories(res.data);
    } catch (err) {
      console.error("Категори авахад алдаа:", err);
    }
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (category === "Бүх үйлчилгээ") {
      setFilteredSchedules(schedules);
    } else {
      setFilteredSchedules(schedules.filter((sch) => sch.sc_name === category));
    }
  };

  return (
    <>
      <Header />
      <div className="px-6 py-12 bg-gradient-to-b from-amber-50 to-white min-h-screen">
        {/* Категори шүүлтүүр */}
        <Filter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />

        {/* Хуваарь */}
        {loading ? (
  <div className="text-center text-gray-500">Уншиж байна...</div>
) : filteredSchedules.length === 0 ? (
  <div className="text-center text-gray-500">Одоогоор хуваарь байхгүй байна.</div>
) : (
  <Table schedules={filteredSchedules} />
)}
      </div>
    </>
  );
};

export default SchedulePage;
