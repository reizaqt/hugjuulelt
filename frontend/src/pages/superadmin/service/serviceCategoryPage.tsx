import React, { useEffect, useState } from "react";
import {
  getServiceCategories,
  createServiceCategory,
  updateServiceCategory,
  deleteServiceCategory,
} from "../../../services/serviceCategoryService";

interface Category {
  sc_id: number;
  sc_name: string;
  sc_desc?: string;
}

export default function ServiceCategoryPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [form, setForm] = useState({ sc_name: "", sc_desc: "" });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null); // ✅ устгах modal-ийн ID
  const [showConfirm, setShowConfirm] = useState(false); // ✅ modal харагдах эсэх

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const res = await getServiceCategories();
    setCategories(res.data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await updateServiceCategory(editingId, form);
    } else {
      await createServiceCategory(form);
    }
    setForm({ sc_name: "", sc_desc: "" });
    setEditingId(null);
    loadCategories();
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
      await deleteServiceCategory(deleteId);
      loadCategories();
    }
    setShowConfirm(false);
    setDeleteId(null);
  };

  const cancelDelete = () => {
    setShowConfirm(false);
    setDeleteId(null);
  };

  return (
    <div className="p-4 max-w-2xl mx-auto relative">
      <h1 className="text-2xl font-semibold mb-4 text-center">
        Үйлчилгээний ангилал
      </h1>

      {/* form */}
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
        <button className="bg-slate-700 hover:bg-slate-900 text-white text-sm px-4 py-2 rounded">
          {editingId ? "Засах" : "Нэмэх"}
        </button>
      </form>

      {/* table */}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">#</th>
            <th className="border p-2">Нэр</th>
            <th className="border p-2">Тайлбар</th>
            <th className="border p-2">Үйлдэл</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((c, i) => (
            <tr key={c.sc_id}>
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
          ))}
        </tbody>
      </table>

      {/*Custom Confirm Modal */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center max-w-sm w-full animate-fadeIn">
            <h2 className="text-lg font-semibold mb-3">Устгах уу?</h2>
            <p className="text-gray-600 mb-5 text-sm">
              Та энэ ангиллыг устгахдаа итгэлтэй байна уу?
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded bg-red-400 hover:bg-red-700 text-white text-sm"
              >
                Тийм
              </button>
              <button
                onClick={cancelDelete}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm"
              >
                Болих
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
