import React, { useState, useEffect } from "react";
import api from "../../../../services/api";

interface Props {
  onAdded: () => void;
  onClose: () => void;
  initialData?: any;
}

const CreateOrg: React.FC<Props> = ({ onAdded, onClose, initialData }) => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [orgName, setOrgName] = useState("");
  const [orgAddress, setOrgAddress] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (initialData) {
      setPhone(initialData.phone);
      setOrgName(initialData.org_name);
      setOrgAddress(initialData.org_address);
      setEmail(initialData.email);
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      if (initialData) {
        await api.put(`/organizations/${initialData.org_id}`, { phone, org_name: orgName, org_address: orgAddress, email });
      } else {
        await api.post("/organizations", { phone, org_name: orgName, org_address: orgAddress, email });
      }
      onAdded();
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.error || "Алдаа гарлаа");
    }
  };

  return (
    <div className="fixed inset-0 z-[60] bg-black bg-opacity-30 flex justify-center items-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-xl w-full max-w-4xl max-h-[90vh] flex flex-col relative p-6 overflow-y-auto"
      >
        <div className="absolute top-4 right-4">
          <button
           type="button"
           onClick={onClose}
           className="text-gray-500 hover:text-gray-800 text-2xl font-bold"
           aria-label="Буцах">  ×
           </button>
        </div>

        <h2 className="text-2xl font-semibold mb-6 text-center">
          Байгууллага нэмэх
        </h2>

        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block font-medium mb-1">Утасны дугаар:</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
              maxLength={8}
              className="border px-3 py-2 w-full rounded"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Нууц үг:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border px-3 py-2 w-full rounded"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Байгууллагын нэр:</label>
            <input
              type="text"
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
              className="border px-3 py-2 w-full rounded"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Хаяг:</label>
            <input
              type="text"
              value={orgAddress}
              onChange={(e) => setOrgAddress(e.target.value)}
              className="border px-3 py-2 w-full rounded"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block font-medium mb-1">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border px-3 py-2 w-full rounded"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Нэмэх
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateOrg;
