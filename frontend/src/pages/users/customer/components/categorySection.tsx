import React from "react";
import haircutImg from "../../../../assets/haircut.jpg";
import manicureImg from "../../../../assets/manicure.jpg";
import eyelashImg from "../../../../assets/eyelash.jpg";
import eyebrowImg from "../../../../assets/eyebrow.jpg";
import beautyImg from "../../../../assets/beauty.jpg";
import makeupImg from "../../../../assets/makeup.jpg";
import massageImg from "../../../../assets/massage.jpg";
import waxImg from "../../../../assets/wax.jpg";

const categories = [
  { id: 1, name: "Үс засалт", img: haircutImg },
  { id: 2, name: "Маникюр & Педикюр", img: manicureImg },
  { id: 3, name: "Сормуус & Хөмсөг", img: eyelashImg },
  { id: 4, name: "Хөмсөг шивээс", img: eyebrowImg },
  { id: 5, name: "Гоо сайхан", img: beautyImg },
  { id: 6, name: "Будалт & гоёл", img: makeupImg },
  { id: 7, name: "Wax", img: waxImg },
  { id: 8, name: "Массаж", img: massageImg },
];

export default function CategorySection() {
  return (
    <div className="mt-16 px-8 ml-8">
      <h2 className="text-4xl font-semibold mb-4 text-amber-700 ml-8">Categories</h2>
      <div className="flex flex-nowrap overflow-x-auto scrollbar-hide py-2 gap-12">
        {categories.map((cat) => (
          <div key={cat.id} className="flex flex-col items-center w-48 flex-shrink-0">
            <div className="w-48 h-48 rounded-full overflow-hidden shadow-lg">
              <img src={cat.img} className="w-full h-full object-cover" />
            </div>
            <span className="mt-2 text-center text-sm md:text-base text-amber-700">
              {cat.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
