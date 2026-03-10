import React, { useEffect, useState } from "react";
import { getServiceCategories } from "../../../../services/serviceCategoryService";
import haircutImg from "../../../../assets/haircut.jpg";
import manicureImg from "../../../../assets/manicure.jpg";
import eyelashImg from "../../../../assets/eyelash.jpg";
import eyebrowImg from "../../../../assets/eyebrow.jpg";
import beautyImg from "../../../../assets/beauty.jpg";
import makeupImg from "../../../../assets/makeup.jpg";
import massageImg from "../../../../assets/massage.jpg";
import waxImg from "../../../../assets/wax.jpg";

interface ServiceCategory {
  sc_id: number;
  sc_name: string;
  sc_desc?: string;
}

export default function CategorySection() {
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await getServiceCategories();
      setCategories(res.data);
    } catch (err) {
      console.error("Үйлчилгээний категори авахад алдаа:", err);
    } finally {
      setLoading(false);
    }
  };

  const imageMap: { [key: string]: string } = {
    "Үс засалт": haircutImg,
    "Маникюр & Педикюр": manicureImg,
    "Сормуус & Хөмсөг": eyelashImg,
    "Хөмсөг шивээс": eyebrowImg,
    "Гоо сайхан": beautyImg,
    "Будалт & гоёл": makeupImg,
    "Wax": waxImg,
    "Массаж": massageImg,
  };

  return (
    <div className="mt-16 px-8 ml-8">
      <h2 className="text-4xl font-semibold mb-4 text-amber-700 ml-8">Үйлчилгээний категори</h2>
      {loading ? (
        <p>Уншиж байна...</p>
      ) : (
        <div className="flex flex-nowrap overflow-x-auto scrollbar-hide py-2 gap-12">
          {categories.map((cat) => (
            <div key={cat.sc_id} className="flex flex-col items-center w-48 flex-shrink-0">
              <div className="w-48 h-48 rounded-full overflow-hidden shadow-lg">
                <img
                  src={imageMap[cat.sc_name] || beautyImg} 
                  className="w-full h-full object-cover"
                  alt={cat.sc_name}
                />
              </div>
              <span className="mt-2 text-center text-sm md:text-base text-amber-700">
                {cat.sc_name}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
