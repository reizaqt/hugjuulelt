import React, { useEffect, useState } from "react";
import api from "../../../../../services/api";

interface Employee {
  emp_id: number;
  emp_name: string;
  position_name: string;
}

interface Service {
  service_id: number;
  service_name: string;
}

interface Schedule {
  sch_id: number;
  emp_name: string;
  service_name: string;
  start_time: string;
}

const Dashboard: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [empRes, servRes, schRes] = await Promise.all([
        api.get("/employee"),
        api.get("/services"),
        api.get("/schedule"),
      ]);
      setEmployees(empRes.data);
      setServices(servRes.data);
      setSchedules(schRes.data);
    } catch (err) {
      console.error("Dashboard data fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {loading ? (
        <p>Уншиж байна...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white shadow-md rounded-xl p-4 border border-gray-200">
            <h2 className="text-xl font-semibold mb-2 text-sky-600">Ажилтнууд</h2>
            <p className="text-3xl font-bold text-gray-800">{employees.length}</p>
          </div>

          <div className="bg-white shadow-md rounded-xl p-4 border border-gray-200">
            <h2 className="text-xl font-semibold mb-2 text-sky-600">Үйлчилгээ</h2>
            <p className="text-3xl font-bold text-gray-800">{services.length}</p>
          </div>

          <div className="bg-white shadow-md rounded-xl p-4 border border-gray-200">
            <h2 className="text-xl font-semibold mb-2 text-sky-600">Ойрын хуваарь</h2>
            <p className="text-3xl font-bold text-gray-800">{schedules.length}</p>
          </div>
        </div>
      )}

      <div className="mt-8 bg-white shadow-md rounded-xl border border-gray-200 p-6">
        <h2 className="text-2xl font-semibold mb-4 text-sky-600">Сүүлийн хуваарь</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gradient-to-r from-sky-400 to-sky-500 text-white">
              <tr>
                <th className="p-3 font-semibold text-sm uppercase tracking-wide border-b">Ажилтан</th>
                <th className="p-3 font-semibold text-sm uppercase tracking-wide border-b">Үйлчилгээ</th>
                <th className="p-3 font-semibold text-sm uppercase tracking-wide border-b">Эхлэх цаг</th>
              </tr>
            </thead>
            <tbody>
              {schedules.slice(0, 5).map((sch) => (
                <tr key={sch.sch_id} className="hover:bg-gray-50 transition-colors text-gray-800">
                  <td className="p-3 border-b text-sm">{sch.emp_name}</td>
                  <td className="p-3 border-b text-sm">{sch.service_name}</td>
                  <td className="p-3 border-b text-sm">{new Date(sch.start_time).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
