import React, { useEffect, useState } from "react";
import api from "../../../../../../services/api";
import Table from "../components/table";
import Dialog from "../components/dialog";
import { getPositionCategories } from "../../../../../../services/positionCategoryService";

interface Position {
  position_id: number;
  position_name: string;
}

interface Employee {
  emp_id: number;
  emp_name: string;
  phone: string;
  email: string;
  position_name: string;
}

const EmployeePage: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [positions, setPositions] = useState<Position[]>([]);
  const [empName, setEmpName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [positionId, setPositionId] = useState<number | "">("");

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;
  const totalPages = Math.ceil(employees.length / pageSize);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const paginatedData = employees.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  useEffect(() => {
    fetchEmployees();
    fetchPositions();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await api.get("/employee");
      setEmployees(res.data);
    } catch (error) {
      console.error("Failed to fetch employees:", error);
    }
  };

  const fetchPositions = async () => {
    try {
      const res = await getPositionCategories();
      setPositions(res.data);
    } catch (error) {
      console.error("Failed to fetch positions:", error);
    }
  };

  const handleDeleteAsk = (id: number) => {
    setDeleteId(id);
    setDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!deleteId) return;
    try {
      await api.delete(`/employee/${deleteId}`);
      fetchEmployees();
      setDialogOpen(false);
    } catch (error) {
      console.error("Failed to delete employee:", error);
    }
  };

  const validateName = (name: string) =>
  /^[A-Za-zА-Яа-яЁёӨөҮү0-9\s]{1,20}$/.test(name);
  const validatePhone = (phone: string) => /^[0-9]{8}$/.test(phone);
  const validateEmail = (email: string) =>
    /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email);

  const nameBorder =
    empName === "" || validateName(empName)
      ? "border-gray-300"
      : "border-red-500";
  const phoneBorder =
    phone === "" || validatePhone(phone) ? "border-gray-300" : "border-red-500";
  const emailBorder =
    email === "" || validateEmail(email) ? "border-gray-300" : "border-red-500";

  const handleCreate = async () => {
    if (!empName || !phone || !positionId) {
      return alert("Талбаруудыг бөглөнө үү");
    }
    if (!validateName(empName)) return alert("Нэр буруу форматтай байна");
    if (!validatePhone(phone)) return alert("Утас буруу форматтай байна");
    if (email && !validateEmail(email)) return alert("Email буруу форматтай байна");

    try {
      await api.post("/employee", {
        emp_name: empName,
        phone,
        email,
        position_id: positionId,
      });
      setEmpName("");
      setPhone("");
      setEmail("");
      setPositionId("");
      fetchEmployees();
    } catch (error) {
      console.error("Failed to create employee:", error);
    }
  };

  return (
    <div className="flex gap-6">
      {/* LEFT FORM */}
      <div className="w-1/3 p-4 border rounded space-y-4 bg-white shadow-md">
        <h2 className="text-2xl font-bold text-sky-600 mb-4">Ажилтан нэмэх</h2>

        <input
          className={`border ${nameBorder} p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent`}
          value={empName}
          placeholder="Нэр"
          onChange={(e) => {
            const filtered = e.target.value
              .replace(/[^A-Za-zА-Яа-яЁёӨөҮү0-9\s]/g, "")
              .slice(0, 20);
            setEmpName(filtered);
          }}
        />

        <input
          className={`border ${phoneBorder} p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent`}
          value={phone}
          placeholder="Утас"
          onChange={(e) => {
            const onlyNumbers = e.target.value.replace(/\D/g, "").slice(0, 8);
            setPhone(onlyNumbers);
          }}
        />

        <input
          className={`border ${emailBorder} p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent`}
          value={email}
          placeholder="Email"
          onChange={(e) => {
            const filtered = e.target.value.replace(/[^A-Za-z0-9@.]/g, "").slice(0, 20);
            setEmail(filtered);
          }}
        />

        <div className="relative">
          <select
            value={positionId}
            onChange={(e) => setPositionId(Number(e.target.value))}
            className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent appearance-none bg-white text-gray-700"
          >
            <option value="">Албан тушаал</option>
            {positions.map((p) => (
              <option key={p.position_id} value={p.position_id}>
                {p.position_name}
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
            { key: "emp_name", label: "Нэр" },
            { key: "phone", label: "Утас" },
            { key: "email", label: "Email" },
            { key: "position_name", label: "Албан тушаал" },
          ]}
          data={paginatedData}
          actions={(row) => (
            <button
              className="text-red-500"
              onClick={() => handleDeleteAsk(row.emp_id)}
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

export default EmployeePage;
