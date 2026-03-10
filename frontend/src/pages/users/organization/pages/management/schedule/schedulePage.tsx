import React, { useEffect, useState } from "react";
import { getEmployees } from "../../../../../../services/employeeService";
import { getServices } from "../../../../../../services/serviceService";
import { getSchedules, createSchedule, deleteSchedule } from "../../../../../../services/scheduleService";
import Table from "../components/table";
import Dialog from "../components/dialog";

interface Employee {
  emp_id: number;
  emp_name: string;
}

interface Service {
  service_id: number;
  service_name: string;
  service_price: number;
}

interface Schedule {
  sch_id: number;
  emp_id: number;
  service_id: number;
  service_price: number;
  start_time: string;
  duration: number;
  notes?: string;
  emp_name: string;
  service_name: string;
}

const SchedulePage: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [schedules, setSchedules] = useState<Schedule[]>([]);

  const [empId, setEmpId] = useState<number | "">("");
  const [serviceId, setServiceId] = useState<number | "">("");
  const [servicePrice, setServicePrice] = useState<number | "">("");
  const [startTime, setStartTime] = useState("");
  const [duration, setDuration] = useState<number | "">("");
  const [notes, setNotes] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;
  const totalPages = Math.ceil(schedules.length / pageSize);
  const paginatedData = schedules.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  useEffect(() => {
    fetchEmployees();
    fetchServices();
    fetchSchedules();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await getEmployees();
      setEmployees(res.data);
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

  const fetchSchedules = async () => {
    try {
      const res = await getSchedules();
      setSchedules(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreate = async () => {
    if (!empId || !serviceId || !servicePrice || !startTime || !duration) {
      alert("Бүх шаардлагатай талбарыг бөглөнө үү");
      return;
    }

    try {
      await createSchedule({
        emp_id: empId,
        service_id: serviceId,
        service_price: servicePrice,
        start_time: startTime,
        duration,
        notes,
      });

      // Reset form
      setEmpId("");
      setServiceId("");
      setServicePrice("");
      setStartTime("");
      setDuration("");
      setNotes("");

      fetchSchedules();
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
    await deleteSchedule(deleteId);
    fetchSchedules();
    setDialogOpen(false);
  };

  return (
    <div className="flex gap-6">
      {/* LEFT FORM */}
      <div className="w-1/3 p-4 border rounded space-y-4 bg-white shadow-md">
        <h2 className="text-2xl font-bold text-sky-600 mb-4">Хуваарь нэмэх</h2>

        <div className="relative">
          <select
            value={empId}
            onChange={(e) => setEmpId(Number(e.target.value))}
            className={`appearance-none border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent ${
              empId === "" ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Ажилтан сонго</option>
            {employees.map((e) => (
              <option key={e.emp_id} value={e.emp_id}>
                {e.emp_name}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-sky-400">
            ▼
          </div>
        </div>

        <div className="relative">
          <select
            value={serviceId}
            onChange={(e) => setServiceId(Number(e.target.value))}
            className={`appearance-none border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent ${
              serviceId === "" ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Үйлчилгээ сонго</option>
            {services.map((s) => (
              <option key={s.service_id} value={s.service_id}>
                {s.service_name} ({s.service_price}₮)
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-sky-400">
            ▼
          </div>
        </div>

        <input
          type="text"
          placeholder="Үнэ"
          value={servicePrice !== "" ? servicePrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : ""}
          onChange={(e) => {
            const rawValue = e.target.value.replace(/,/g, "");
            if (/^\d*$/.test(rawValue)) {
              setServicePrice(rawValue === "" ? "" : Number(rawValue));
            }
          }}
          className={`border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent ${
            !servicePrice ? "border-red-500" : "border-gray-300"
          }`}
          title="Зөвхөн тоо оруулна уу"
        />

        <input
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          className={`border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent ${
            !startTime ? "border-red-500" : "border-gray-300"
          }`}
          title="Хугацааг сонгоно уу"
        />

        <input
          type="number"
          placeholder="Хугацаа (минут)"
          value={duration}
          onChange={(e) => {
            let val = Number(e.target.value);
            if (val < 0) val = 0;
            if (val > 999) val = 999;
            setDuration(val);
          }}
          className={`border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent ${
            !duration ? "border-red-500" : "border-gray-300"
          }`}
          title="1-3 оронтой тоо оруулна уу"
        />

        <textarea
          placeholder="Тайлбар"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
        />

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
            { key: "emp_name", label: "Ажилтан" },
            { key: "service_name", label: "Үйлчилгээ" },
            { key: "service_price", label: "Үнэ" },
            { key: "start_time", label: "Эхлэх цаг" },
            { key: "duration", label: "Хугацаа" },
            { key: "notes", label: "Тайлбар" },
          ]}
          data={paginatedData.map((s) => ({
            ...s,
            start_time: new Date(s.start_time).toLocaleString(),
          }))}
          actions={(row) => (
            <button className="text-red-500" onClick={() => handleDeleteAsk(row.sch_id)}>
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

export default SchedulePage;
