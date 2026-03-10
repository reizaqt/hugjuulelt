import React, { useState } from "react";
import DownloadIcon from "../../../components/icons/downloadIcon"; 
import ExportIcon from "../../../components/icons/exportIcon"; 
import Dialog from "../components/dialog"; 

interface Column {
  key: string;
  label: string;
  className?: string;
}

interface TableProps {
  columns: Column[];
  data: any[];
  actions?: (row: any) => React.ReactNode;
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

const Table: React.FC<TableProps> = ({
  columns,
  data,
  actions,
  currentPage,
  totalPages,
  setCurrentPage,
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const visiblePages = () => {
    const pages = [];
    const start = Math.max(1, currentPage - 1);
    const end = Math.min(totalPages, currentPage + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  const downloadCSV = () => {
    if (!data.length) return;

    const headers = columns.map((col) => col.label).join(",");
    const rows = data.map((row) =>
      columns.map((col) => `"${row[col.key] ?? ""}"`).join(",")
    );
    const csvContent = [headers, ...rows].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "table_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadClick = () => {
    setDialogOpen(true);
  };

  const handleExportClick = () => {
    // 
  };

  const handleConfirmDownload = () => {
    downloadCSV();
    setDialogOpen(false);
  };

  return (
    <div className="border rounded-xl p-6 bg-white shadow-md">
      <div className="flex justify-end items-center mb-4 gap-2">
        <button
          onClick={handleDownloadClick}
          className="flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-200 transition-colors text-sky-400"
        >
          <DownloadIcon className="w-4 h-4" />
        </button>

        <button
          onClick={handleExportClick}
          className="flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-200 transition-colors text-sky-400"
        >
          <ExportIcon className="w-4 h-4" />
        </button>
      </div>

      <table className="w-full text-left border-collapse">
        <thead className="bg-gradient-to-r from-sky-400 to-sky-500 text-white">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className={`p-3 font-semibold text-sm uppercase tracking-wide border-b ${col.className}`}
              >
                {col.label}
              </th>
            ))}
            {actions && (
              <th className="p-3 font-semibold text-sm uppercase tracking-wide border-b">
                Үйлдэл
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr
              key={idx}
              className="hover:bg-gray-50 transition-colors text-gray-800"
            >
              {columns.map((col) => (
                <td key={col.key} className="p-3 border-b text-sm">
                  {row[col.key]}
                </td>
              ))}
              {actions && <td className="p-3 border-b text-sm">{actions(row)}</td>}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-5">
        <div className="flex gap-1">
          <button
            onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
            className="px-2.5 py-1 text-sm rounded-lg hover:bg-gray-200 disabled:opacity-40"
          >
            ‹
          </button>
          {visiblePages().map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 text-sm rounded-lg transition-all ${
                currentPage === page
                  ? "bg-gradient-to-r from-sky-400 to-sky-500 text-white"
                  : "hover:bg-gray-200 text-gray-700"
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-2.5 py-1 text-sm rounded-lg hover:bg-gray-200 disabled:opacity-40"
          >
            ›
          </button>
        </div>
      </div>

      <Dialog
        open={dialogOpen}
        title="Татаж авах"
        message="Та хүснэгтийг CSV болгон татаж авахыг хүсэж байна уу?"
        onConfirm={handleConfirmDownload}
        onCancel={() => setDialogOpen(false)}
      />
    </div>
  );
};

export default Table;
