import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../../services/auth';

const Login: React.FC = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const data = await login(phone, password);
      console.log('Амжилттай нэвтэрлээ:', data);
      navigate('/home');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Сервер алдаа гарлаа. Дахин оролдоно уу.');
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 flex items-center justify-center bg-gray-50">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-10 rounded shadow-md w-full max-w-md"
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-slate-700">
            Нэвтрэх хэсэг
          </h2>

          <label className="block mb-2 font-medium text-gray-700">
            Утасны дугаар
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Утасны дугаар"
            maxLength={8}
            inputMode="numeric"
            required
            className="w-full border border-gray-300 rounded px-4 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-slate-700"
          />

          <label className="block mb-2 font-medium text-gray-700">
            Нууц үг
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Нууц үг"
            required
            className="w-full border border-gray-300 rounded px-4 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-slate-700"
          />

          {error && (
            <div className="flex items-start gap-2 mb-3 border-l-4 border-red-500 bg-red-50 text-red-600 px-3 py-2 rounded-r">
              <span className="text-sm">{error}</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded hover:bg-slate-800 transition"
          >
            Нэвтрэх
          </button>

          {/* res password */}
          <div className="mt-2 flex items-center justify-end text-primary hover:underline cursor-pointer">
            <span>Нууц үг сэргээх</span>
          </div>
        </form>
      </div>

      <div className="w-1/2 bg-primary flex flex-col justify-center items-center text-white p-8">
        <h1 className="text-4xl font-bold mb-4">Тавтай морил!</h1>
        <p className="text-lg text-center max-w-sm opacity-90">
          Та системд хандахын тулд утасны дугаар болон нууц үгээ ашиглана уу.
        </p>
      </div>
    </div>
  );
};

export default Login;
