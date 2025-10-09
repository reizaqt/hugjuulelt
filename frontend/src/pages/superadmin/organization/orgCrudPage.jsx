import React, { useState, useEffect } from "react";
import axios from "axios";

const OrgCrudPage = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [orgName, setOrgName] = useState("");
  const [orgAddress, setOrgAddress] = useState("");
  const [email, setEmail] = useState("");
  const [organizations, setOrganizations] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const API_URL = "http://localhost:5000/api/organization";

  // Байгууллагын жагсаалт авах
  const fetchOrganizations = async () => {
    try {
      const res = await axios.get(API_URL);
      setOrganizations(res.data);
    } catch (err) {
      console.error(err);
      setError("Байгууллагын жагсаалтыг авахад алдаа гарлаа");
    }
  };

  useEffect(() => {
    fetchOrganizations();
  }, []);

  // Form илгээх
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const res = await axios.post(API_URL, {
        phone,
        password,
        org_name: orgName,
        org_address: orgAddress,
        email,
      });
      setMessage(res.data.message);
      // Form хоослох
      setPhone("");
      setPassword("");
      setOrgName("");
      setOrgAddress("");
      setEmail("");
      fetchOrganizations(); // Шинэ жагсаалт авах
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Алдаа гарлаа");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Байгууллага CRUD</h1>

      {message && <div className="bg-green-100 text-green-800 p-2 mb-4">{message}</div>}
      {error && <div className="bg-red-100 text-red-800 p-2 mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow mb-6">
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Утасны дугаар</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border p-2 rounded"
            placeholder="Жишээ: 99001122"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-semibold">Нууц үг</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-2 rounded"
            placeholder="Нууц үг"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-semibold">Байгууллагын нэр</label>
          <input
            type="text"
            value={orgName}
            onChange={(e) => setOrgName(e.target.value)}
            className="w-full border p-2 rounded"
            placeholder="Жишээ: My Beauty Salon"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-semibold">Хаяг</label>
          <input
            type="text"
            value={orgAddress}
            onChange={(e) => setOrgAddress(e.target.value)}
            className="w-full border p-2 rounded"
            placeholder="Жишээ: Ulaanbaatar, Mongolia"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-semibold">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-2 rounded"
            placeholder="Жишээ: beauty@example.com"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Байгууллага нэмэх
        </button>
      </form>

      <h2 className="text-2xl font-semibold mb-4">Байгууллагын жагсаалт</h2>
      <ul className="space-y-2">
        {organizations.map((org) => (
          <li key={org.org_id} className="border p-2 rounded">
            <p><strong>Нэр:</strong> {org.org_name}</p>
            <p><strong>Хаяг:</strong> {org.org_address}</p>
            <p><strong>Email:</strong> {org.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrgCrudPage;
