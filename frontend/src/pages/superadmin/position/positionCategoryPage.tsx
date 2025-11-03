import React, { useEffect, useState } from "react";
import {
  getPositionCategories,
  createPositionCategory,
  updatePositionCategory,
  deletePositionCategory,
} from "../../../services/positionCategoryService";
import Dialog from "../components/dialog";

interface Category {
  position_id: number;
  position_name: string;
}

export default function PositionCategoryPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [form, setForm] = useState({ position_name: "" });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const res = await getPositionCategories();
    setCategories(res.data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await updatePositionCategory(editingId, form);
    } else {
      await createPositionCategory(form);
    }
    setForm({ position_name: "" });
    setEditingId(null);
    loadCategories();
  };

  const handleEdit = (cat: Category) => {
    setEditingId(cat.position_id);
    setForm({ position_name: cat.position_name });
  };

  const openDeleteConfirm = (id: number) => {
    setDeleteId(id);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    if (deleteId !== null) {
      await deletePositionCategory(deleteId);
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
        Ажилтны албан тушаал ангилал
      </h1>

      <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Нэр"
          value={form.position_name}
          onChange={(e) => setForm({ ...form, position_name: e.target.value })}
          className="border p-2 flex-1"
          required
        />
        
        <button className="bg-slate-700 hover:bg-slate-900 text-white text-sm px-4 py-2 rounded">
          {editingId ? "Засах" : "Нэмэх"}
        </button>
      </form>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">#</th>
            <th className="border p-2">Нэр</th>
            <th className="border p-2"></th>
          </tr>
        </thead>
        <tbody>
          {categories.map((c, i) => (
            <tr key={c.position_id}>
              <td className="border p-2 text-center">{i + 1}</td>
              <td className="border p-2">{c.position_name}</td>
              <td className="border p-2 flex gap-2 justify-center">
                <button
                  onClick={() => handleEdit(c)}
                  className="text-slate-900 hover:text-blue-700 px-2 py-1 text-sm"
                >
                  Засах
                </button>
                <button
                  onClick={() => openDeleteConfirm(c.position_id)}
                  className="text-red-600 hover:text-red-900 px-2 py-1 text-sm"
                >
                  Устгах
                </button>
              </td>
            </tr>
          ))}
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
}
