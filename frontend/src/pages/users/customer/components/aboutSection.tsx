import React from "react";
import { Sparkles, Heart, Star } from "lucide-react";

export default function AboutSection() {
  return (
    <section className="mt-20 px-8 md:px-24 py-20 bg-white rounded-3xl shadow-lg mx-8 md:mx-16">
      <div className="text-center mb-14">
        <h2 className="text-4xl font-semibold text-amber-700 mb-4">
          About Velora
        </h2>
        <div className="w-20 h-1 bg-amber-700 mx-auto rounded-full"></div>
        <p className="text-amber-800 mt-6 text-lg max-w-2xl mx-auto">
          Velora бол таны гоо сайхны аяллын хамтрагч. Бид таныг өөртөө итгэлтэй, 
          үзэсгэлэнтэй байхад туслах мэргэжлийн үйлчилгээ үзүүлэгчдийг холбодог.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10">
        {/* mission */}
        <div className="bg-neutral-100 p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center">
          <div className="flex justify-center mb-4">
            <Sparkles className="text-amber-700 w-12 h-12 animate-pulse" />
          </div>
          <h3 className="text-2xl font-semibold text-amber-700 mb-2">
            Our Mission
          </h3>
          <p className="text-amber-800 leading-relaxed">
            Хэрэглэгчдэд хамгийн тохирсон гоо сайхны үйлчилгээ үзүүлэгчийг хурдан, 
            хялбар, итгэлтэйгээр олох орчинг бүрдүүлэх.
          </p>
        </div>

        {/* vision */}
        <div className="bg-neutral-100 p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center">
          <div className="flex justify-center mb-4">
            <Heart className="text-amber-700 w-12 h-12 animate-bounce" />
          </div>
          <h3 className="text-2xl font-semibold text-amber-700 mb-2">
            Our Vision
          </h3>
          <p className="text-amber-800 leading-relaxed">
            Гоо сайхны салбарт дижитал хувьсгал авчирч, үйлчилгээ үзүүлэгч ба 
            хэрэглэгчийг нэгэн экосистемд холбох тэргүүлэгч платформ болох.
          </p>
        </div>

        {/*values*/}
        <div className="bg-neutral-100 p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center">
          <div className="flex justify-center mb-4">
            <Star className="text-amber-700 w-12 h-12 animate-pulse" />
          </div>
          <h3 className="text-2xl font-semibold text-amber-700 mb-2">
            Our Values
          </h3>
          <p className="text-amber-800 leading-relaxed">
            Чанар, итгэлцэл, гоо үзэсгэлэн — эдгээр нь Velora-ийн гол үнэт зүйлс юм. 
            Бид хэрэглэгч бүрийг гэрэлтүүлэхийг зорьдог.
          </p>
        </div>
      </div>
    </section>
  );
}
