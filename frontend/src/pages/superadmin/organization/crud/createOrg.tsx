import React, { useState } from "react";
import axios from "axios";

interface Props {
  onAdded: () => void;
  onClose: () => void;
}

const CreateOrg: React.FC<Props> = ({ onAdded, onClose }) => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [orgName, setOrgName] = useState("");
  const [orgAddress, setOrgAddress] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const API_URL = "http://localhost:5000/api/organization";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await axios.post(API_URL, {
        phone,
        password,
        org_name: orgName,
        org_address: orgAddress,
        email,
      });
      onAdded(); // шинэ жагсаалтыг татаж авах
      onClose(); // modal хаах
    } catch (err: any) {
      setError(err.response?.data?.error || "Алдаа гарлаа");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="text-red-600">{error}</div>}

      <input
        type="text"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Утасны дугаар"
        className="w-full border p-2 rounded"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Нууц үг"
        className="w-full border p-2 rounded"
      />
      <input
        type="text"
        value={orgName}
        onChange={(e) => setOrgName(e.target.value)}
        placeholder="Байгууллагын нэр"
        className="w-full border p-2 rounded"
      />
      <input
        type="text"
        value={orgAddress}
        onChange={(e) => setOrgAddress(e.target.value)}
        placeholder="Хаяг"
        className="w-full border p-2 rounded"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="w-full border p-2 rounded"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Нэмэх
      </button>
    </form>
  );
};

export default CreateOrg;
