import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/login", {
        phone,
        password,
      });

      // JWT token-г localStorage-д хадгалах
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      // Амжилттай login бол home руу чиглүүлэх
      navigate("/");
    } catch (err: any) {
      if (err.response) {
        setError(err.response.data.error);
      } else {
        setError("Сервер алдаа");
      }
    }
  };

  return (
    <div className="login-container">
      <h2>Нэвтрэх</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Утас:</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Нууц үг:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Нэвтрэх</button>
      </form>
    </div>
  );
};

export default Login;
