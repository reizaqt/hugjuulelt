// src/pages/Login.tsx
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
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError("Сервер алдаа");
      }
    }
  };

  return (
    <div className="login-container">
      <h2>Нэвтрэх</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label>Утас:</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Утасны дугаар"
            required
          />
        </div>
        <div className="form-group">
          <label>Нууц үг:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Нууц үг"
            required
          />
        </div>
        <button type="submit" className="login-button">
          Нэвтрэх
        </button>
      </form>
    </div>
  );
};

export default Login;
