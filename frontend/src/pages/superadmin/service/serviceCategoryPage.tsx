import React, { useEffect, useState } from "react";
import {
  getServiceCategories,
  createServiceCategory,
  updateServiceCategory,
  deleteServiceCategory,
} from "../../../services/serviceCategoryService";
import Dialog from "../components/dialog";

interface Category {
  sc_id: number;
  sc_name: string;
  sc_desc?: string;
}

const ServiceCategoryPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [form, setForm] = useState({ sc_name: "", sc_desc: "" });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const res = await getServiceCategories();
      console.log("SERVICE CATEGORY DATA:", res.data);
      setCategories(res.data);
    } catch (err) {
      console.error("ServiceCategory fetch error:", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateServiceCategory(editingId, form);
      } else {
        await createServiceCategory(form);
      }
      setForm({ sc_name: "", sc_desc: "" });
      setEditingId(null);
      loadCategories();
    } catch (err) {
      console.error("Submit error:", err);
    }
  };

  const handleEdit = (cat: Category) => {
    setEditingId(cat.sc_id);
    setForm({ sc_name: cat.sc_name, sc_desc: cat.sc_desc || "" });
  };

  const openDeleteConfirm = (id: number) => {
    setDeleteId(id);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    if (deleteId !== null) {
      try {
        await deleteServiceCategory(deleteId);
        loadCategories();
      } catch (err) {
        console.error("Delete error:", err);
      }
    }
    setShowConfirm(false);
    setDeleteId(null);
  };

  const cancelDelete = () => {
    setShowConfirm(false);
    setDeleteId(null);
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4 text-center">Үйлчилгээний ангилал</h1>

      <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Нэр"
          value={form.sc_name}
          onChange={(e) => setForm({ ...form, sc_name: e.target.value })}
          className="border p-2 flex-1"
          required
        />
        <input
          type="text"
          placeholder="Тайлбар"
          value={form.sc_desc}
          onChange={(e) => setForm({ ...form, sc_desc: e.target.value })}
          className="border p-2 flex-1"
        />
        <button className="bg-slate-700 hover:bg-slate-900 text-white px-4 py-2 rounded text-sm">
          {editingId ? "Засах" : "Нэмэх"}
        </button>
      </form>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">#</th>
            <th className="border p-2">Нэр</th>
            <th className="border p-2">Тайлбар</th>
            <th className="border p-2"></th>
          </tr>
        </thead>
        <tbody>
          {categories.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center p-4 text-gray-500">
                Ангилал байхгүй
              </td>
            </tr>
          ) : (
            categories.map((c, i) => (
              <tr key={c.sc_id} className="hover:bg-gray-50">
                <td className="border p-2 text-center">{i + 1}</td>
                <td className="border p-2">{c.sc_name}</td>
                <td className="border p-2">{c.sc_desc}</td>
                <td className="border p-2 flex gap-2 justify-center">
                  <button
                    onClick={() => handleEdit(c)}
                    className="text-slate-900 hover:text-blue-700 px-2 py-1 text-sm"
                  >
                    Засах
                  </button>
                  <button
                    onClick={() => openDeleteConfirm(c.sc_id)}
                    className="text-red-600 hover:text-red-900 px-2 py-1 text-sm"
                  >
                    Устгах
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <Dialog
        open={showConfirm}
        title="Устгах уу?"
        message="Та энэ ангиллыг устгахдаа итгэлтэй байна уу?"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
};

export default ServiceCategoryPage;
