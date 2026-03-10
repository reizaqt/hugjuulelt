import React from "react";

interface Schedule {
  sch_id: number;
  emp_name: string;
  service_name: string;
  start_time: string;
  duration: number;
  notes?: string;
}

interface TableProps {
  schedules: Schedule[];
}

const Table: React.FC<TableProps> = ({ schedules }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {schedules.map((sch) => (
        <div
          key={sch.sch_id}
          className="bg-white border-2 border-amber-500 rounded-xl shadow-lg p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl min-h-[320px]"
        >
          <h3 className="text-2xl font-semibold text-amber-700 mb-3">{sch.service_name}</h3>
          <p className="text-gray-700 mb-1">
            <span className="font-medium">Ажилтан:</span> {sch.emp_name}
          </p>
          <p className="text-gray-700 mb-1">
            <span className="font-medium">Эхлэх цаг:</span>{" "}
            {new Date(sch.start_time).toLocaleString()}
          </p>
          <p className="text-gray-700 mb-1">
            <span className="font-medium">Үргэлжлэх хугацаа:</span> {sch.duration} мин
          </p>
          {sch.notes && (
            <p className="text-gray-600 mt-3 text-sm italic">
              <span className="font-medium">Тэмдэглэл:</span> {sch.notes}
            </p>
          )}

          <div className="mt-4 flex gap-3">
            <button className="flex-1 bg-amber-300 text-white font-medium py-1.5 text-sm rounded-lg hover:bg-amber-600 transition-colors">
              Илүү дэлгэрэнгүй
            </button>
            <button className="flex-1 bg-amber-500 text-white font-medium py-1.5 text-sm rounded-lg hover:bg-amber-600 transition-colors">
              Захиалах
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Table;
