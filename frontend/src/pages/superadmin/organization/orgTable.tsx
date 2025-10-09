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

  const API_URL = "http://localhost:5000/api/organization";

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

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Байгууллагууд</h1>
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
            <th className="border p-2">Нэр</th>
            <th className="border p-2">Хаяг</th>
            <th className="border p-2">Email</th>
          </tr>
        </thead>
        <tbody>
          {organizations.map((org) => (
            <tr key={org.org_id} className="hover:bg-gray-100">
              <td className="border p-2">{org.org_name}</td>
              <td className="border p-2">{org.org_address}</td>
              <td className="border p-2">{org.email}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* CreateOrg modal */}
      {showCreateModal && (
        <CreateOrg
          onAdded={() => fetchOrganizations()} // шинэ жагсаалт татах
          onClose={() => setShowCreateModal(false)} // modal хаах
        />
      )}
    </div>
  );
};

export default OrgTable;
