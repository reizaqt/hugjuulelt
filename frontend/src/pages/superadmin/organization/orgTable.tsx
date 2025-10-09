import React, { useState, useEffect } from "react";
import axios from "axios";
import CreateOrg from "./crud/createOrg"; // CreateOrg-ийн файл замыг зөв зааж өгөх

interface Org {
  org_id: number;
  org_name: string;
  org_address: string;
  email: string;
}

const OrgTable: React.FC = () => {
  const [organizations, setOrganizations] = useState<Org[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const API_URL = "http://localhost:5000/api/organization";

  // API
  const fetchOrganizations = async () => {
    try {
      const res = await axios.get(API_URL);
      setOrganizations(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchOrganizations();
  }, []);

  const totalPages = Math.ceil(organizations.length / itemsPerPage);
  const paginatedData = organizations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const visiblePages = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Бүртгэлтэй байгууллагууд</h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-slate-700 hover:bg-slate-900 text-white text-sm px-4 py-2 rounded"
        >
          Байгууллага нэмэх
        </button>
      </div>

      <table className="w-full border rounded">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Байгууллагын нэр</th>
            <th className="border p-2">Байгууллагын дугаар</th>
            <th className="border p-2">Байгууллагын хаяг</th>
            <th className="border p-2">Мэйл хаяг</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center p-4 text-gray-500">
                Байгууллага байхгүй
              </td>
            </tr>
          ) : (
            paginatedData.map((org) => (
              <tr key={org.org_id} className="hover:bg-gray-100">
                <td className="border p-2">{org.org_name}</td>
                <td className="border p-2">{org.org_id}</td>
                <td className="border p-2">{org.org_address}</td>
                <td className="border p-2">{org.email}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-4">
        <div className="flex gap-1">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-2 py-1 text-gray-600 hover:bg-gray-200 rounded disabled:opacity-50"
          >
            ‹
          </button>
          {visiblePages().map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-2 py-1 rounded ${
                currentPage === page
                  ? "bg-slate-700 text-white"
                  : "hover:bg-gray-200 text-gray-700"
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-2 py-1 text-gray-600 hover:bg-gray-200 rounded disabled:opacity-50"
          >
            ›
          </button>
        </div>

        <select
          className="border border-gray-300 rounded px-3 py-1 text-sm"
          value={itemsPerPage}
          onChange={(e) => {
            setItemsPerPage(Number(e.target.value));
            setCurrentPage(1);
          }}
        >
          {[5, 10, 20, 50].map((opt) => (
            <option key={opt} value={opt}>
              {opt} / хуудас
            </option>
          ))}
        </select>
      </div>

      {/* CreateOrg modal */}
      {showCreateModal && (
        <CreateOrg
          onAdded={() => fetchOrganizations()}
          onClose={() => setShowCreateModal(false)}
        />
      )}
    </div>
  );
};

export default OrgTable;
