import React, { useEffect, useState } from "react";
import api from "../../../../../../services/api";
import Table from "../components/table";
import Dialog from "../components/dialog";
import { getServiceCategories } from "../../../../../../services/serviceCategoryService";
import { getServices, createService, deleteService } from "../../../../../../services/serviceService";

interface ServiceCategory {
  sc_id: number;
  sc_name: string;
}

interface Service {
  service_id: number;
  service_name: string;
  service_desc?: string;
  sc_id: number;
  sc_name: string;
}

const ServicePage: React.FC = () => {
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [serviceName, setServiceName] = useState("");
  const [serviceDesc, setServiceDesc] = useState("");
  const [scId, setScId] = useState<number | "">("");

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;
  const totalPages = Math.ceil(services.length / pageSize);
  const paginatedData = services.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  useEffect(() => {
    fetchCategories();
    fetchServices();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await getServiceCategories();
      setCategories(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchServices = async () => {
    try {
      const res = await getServices();
      setServices(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreate = async () => {
    if (!serviceName || !scId) {
      alert("Үйлчилгээний нэр болон ангиллыг сонгоно уу");
      return;
    }

    try {
      await createService({ service_name: serviceName, service_desc: serviceDesc, sc_id: scId });
      setServiceName("");
      setServiceDesc("");
      setScId("");
      fetchServices();
    } catch (err) {
      console.error(err);
      alert("Алдаа гарлаа");
    }
  };

  const handleDeleteAsk = (id: number) => {
    setDeleteId(id);
    setDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!deleteId) return;

    try {
      await deleteService(deleteId);
      fetchServices();
    } catch (err) {
      console.error(err);
      alert("Алдаа гарлаа");
    }

    setDialogOpen(false);
  };

  return (
    <div className="flex gap-6">
      {/* LEFT FORM */}
      <div className="w-1/3 p-4 border rounded space-y-4 bg-white shadow-md">
        <h2 className="text-2xl font-bold text-sky-600 mb-4">Үйлчилгээ нэмэх</h2>

 <input
  type="text"
  placeholder="Үйлчилгээний нэр"
  value={serviceName}
  onChange={(e) => {
    const filtered = e.target.value
      .replace(/[^A-Za-zА-Яа-яЁёӨөҮү0-9\s(),.&]/g, "")
      .slice(0, 50);
    setServiceName(filtered);
  }}
  className={`border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent ${
    !serviceName ? "border-red-500" : "border-gray-300"
  }`}
/>



        <textarea
          placeholder="Тайлбар"
          value={serviceDesc}
          onChange={(e) => setServiceDesc(e.target.value)}
          className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
        />

        <div className="relative">
          <select
            value={scId}
            onChange={(e) => setScId(Number(e.target.value))}
            className={`appearance-none border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent ${
              !scId ? "border-red-500" : "border-gray-300"
            }`}
            title="Ангилал сонгоно уу"
          >
            <option value="">Ангилал сонго</option>
            {categories.map((c) => (
              <option key={c.sc_id} value={c.sc_id}>
                {c.sc_name}
              </option>
            ))}
          </select>

          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-sky-400">
            ▼
          </div>
        </div>

        <button
          onClick={handleCreate}
          className="bg-gradient-to-r from-sky-400 to-sky-500 text-white px-4 py-2 rounded w-full font-semibold hover:from-sky-500 hover:to-sky-600 transition-colors"
        >
          Нэмэх
        </button>
      </div>

      {/* RIGHT TABLE */}
      <div className="flex-1 p-4">
        <Table
          columns={[
            { key: "service_name", label: "Нэр" },
            { key: "service_desc", label: "Тайлбар" },
            { key: "sc_name", label: "Ангилал" },
          ]}
          data={paginatedData}
          actions={(row) => (
            <button
              className="text-red-500"
              onClick={() => handleDeleteAsk(row.service_id)}
            >
              Устгах
            </button>
          )}
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      </div>

      <Dialog
        open={dialogOpen}
        title="Устгах"
        message="Энэ мэдээллийг устгах уу?"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDialogOpen(false)}
      />
    </div>
  );
};

export default ServicePage;
