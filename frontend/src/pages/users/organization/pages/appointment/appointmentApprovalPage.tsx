import React, { useEffect, useState } from "react";
import api from "../../../../../services/api";
import Dialog from "../management/components/dialog";
import Table from "../management/components/table";

interface Appointment {
  app_id: number;
  cus_name: string;
  phone: string;
  emp_name: string;
  service_name: string;
  start_time: string;
  unit: number;
  total_price: number;
  status_name: string;
  status_id: number;
}

const AppointmentApprovalPage: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedAppId, setSelectedAppId] = useState<number | null>(null);
  const [newStatus, setNewStatus] = useState<number | null>(null);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const res = await api.get("/appointment?status=pending"); 
      setAppointments(res.data);
    } catch (err) {
      console.error("Appointment fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async () => {
    if (!selectedAppId || !newStatus) return;

    try {
      await api.put(`/appointment/${selectedAppId}/status`, {
        status_id: newStatus,
      });
      fetchAppointments();
      setDialogOpen(false);
    } catch (err) {
      console.error("Status update error:", err);
    }
  };

  const openDialog = (appId: number, statusId: number) => {
    setSelectedAppId(appId);
    setNewStatus(statusId);
    setDialogOpen(true);
  };

  const columns = [
    { key: "cus_name", label: "Захиалагч" },
    { key: "phone", label: "Утас" },
    { key: "emp_name", label: "Ажилтан" },
    { key: "service_name", label: "Үйлчилгээ" },
    { key: "start_time", label: "Цаг" },
    { key: "unit", label: "Нэгж" },
    { key: "total_price", label: "Үнэ" },
    { key: "status_name", label: "Төлөв" },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold text-sky-600 mb-4">
        Цаг баталгаажуулах
      </h1>

      <div className="bg-white border rounded-xl shadow-md p-4">
        {loading ? (
          <p className="text-gray-500">Уншиж байна...</p>
        ) : (
          <Table
            columns={columns}
            data={appointments}
            currentPage={1}
            totalPages={1}
            setCurrentPage={() => {}}
            actions={(row) => (
              <div className="flex gap-2">
                <button
                  className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
                  onClick={() => openDialog(row.app_id, 2)} // 2 = баталгаажсан
                >
                  Баталгаажуулах
                </button>

                <button
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                  onClick={() => openDialog(row.app_id, 3)} // 3 = татгалзсан
                >
                  Цуцлах
                </button>
              </div>
            )}
          />
        )}
      </div>

      <Dialog
        open={dialogOpen}
        title="Төлөв солих"
        message="Та уг цагийн төлөвийг өөрчлөх гэж байна. Үргэлжлүүлэх үү?"
        onCancel={() => setDialogOpen(false)}
        onConfirm={updateStatus}
      />
    </div>
  );
};

export default AppointmentApprovalPage;
