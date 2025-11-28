import React, { useEffect, useState } from 'react';
import { getSchedules, createSchedule, updateSchedule, deleteSchedule } from '../../../../../../services/scheduleService';

interface Schedule {
  id: number;
  date: string;
  time: string;
  employeeName: string;
}

const SchedulePage: React.FC = () => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    try {
      setLoading(true);
      const data = await getSchedules();
      setSchedules(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Мэдээллийг устгах уу?')) {
      await deleteSchedule(id);
      fetchSchedules();
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Хуваарь</h2>

      {loading ? (
        <p>Уншиж байна...</p>
      ) : (
        <table className="w-full border rounded bg-white">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-2">Огноо</th>
              <th className="border p-2">Цаг</th>
              <th className="border p-2">Ажилтан</th>
              <th className="border p-2">Үйлдэл</th>
            </tr>
          </thead>
          <tbody>
            {schedules.map((s) => (
              <tr key={s.id}>
                <td className="border p-2">{s.date}</td>
                <td className="border p-2">{s.time}</td>
                <td className="border p-2">{s.employeeName}</td>
                <td className="border p-2">
                  <button className="text-blue-500 mr-2" onClick={() => alert('Засах модаль нээх')}>
                    Засах
                  </button>
                  <button className="text-red-500" onClick={() => handleDelete(s.id)}>
                    Устгах
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SchedulePage;
