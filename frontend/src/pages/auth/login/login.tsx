// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { login } from '../../../services/auth';

// const Login: React.FC = () => {
//   const [phone, setPhone] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');
//     try {
//       const data = await login(phone, password);
//       console.log('Амжилттай нэвтэрлээ:', data);

//       // Role-ийн дагуу redirect хийх
//       if (data.role === 'superadmin') {
//         navigate('/superadmin/organization'); // superadmin dashboard
//       } else if (data.role === 'organization') {
//         navigate('/organization/home'); // байгууллагын dashboard
//       } else if (data.role === 'customer') {
//         navigate('/home'); // хэрэглэгчийн хэсэг
//       } else {
//         setError('Тодорхойгүй хэрэглэгчийн роль.');
//       }
//     } catch (err: any) {
//       setError(err.response?.data?.error || 'Сервер алдаа гарлаа. Дахин оролдоно уу.');
//     }
//   };

//   return (
//     <div className="flex h-screen">
//       <div className="w-1/2 flex items-center justify-center bg-gray-50">
//         <form
//           onSubmit={handleSubmit}
//           className="bg-white p-10 rounded shadow-md w-full max-w-md"
//         >
//           <h2 className="text-2xl font-bold mb-6 text-center text-slate-700">
//             Нэвтрэх хэсэг
//           </h2>

//           <label className="block mb-2 font-medium text-gray-700">
//             Утасны дугаар
//           </label>
//           <input
//             type="tel"
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//             placeholder="Утасны дугаар"
//             maxLength={8}
//             inputMode="numeric"
//             required
//             className="w-full border border-gray-300 rounded px-4 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-slate-700"
//           />

//           <label className="block mb-2 font-medium text-gray-700">
//             Нууц үг
//           </label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="Нууц үг"
//             required
//             className="w-full border border-gray-300 rounded px-4 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-slate-700"
//           />

//           {error && (
//             <div className="flex items-start gap-2 mb-3 border-l-4 border-red-500 bg-red-50 text-red-600 px-3 py-2 rounded-r">
//               <span className="text-sm">{error}</span>
//             </div>
//           )}

//           <button
//             type="submit"
//             className="w-full bg-primary text-white py-2 rounded hover:bg-slate-800 transition"
//           >
//             Нэвтрэх
//           </button>
//         </form>
//       </div>

//       <div className="w-1/2 bg-primary flex flex-col justify-center items-center text-white p-8">
//         <h1 className="text-4xl font-bold mb-4">Тавтай морил!</h1>
//         <p className="text-lg text-center max-w-sm opacity-90">
//           Та системд хандахын тулд утасны дугаар болон нууц үгээ ашиглана уу.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;




import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../../services/auth";

const Login: React.FC = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const data = await login(phone, password);

      if (data.role === "superadmin") navigate("/superadmin/organization");
      else if (data.role === "organization") navigate("/organization/home");
      else if (data.role === "customer") navigate("/home");
      else setError("User role is underfined");
    } catch (err: any) {
      setError(err.response?.data?.error || "Сервер алдаа гарлаа.");
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-[#eef3fc]">

      {/*circles */}
      <div className="absolute top-10 right-32 w-64 h-64 border-4 border-blue-400 rounded-full opacity-60"></div>
      <div className="absolute top-48 right-20 w-20 h-20 border-2 border-blue-300 rounded-full opacity-40"></div>
      <div className="absolute bottom-20 left-60 w-28 h-28 border-4 border-blue-300 rounded-full opacity-40"></div>
      <div className="absolute bottom-32 left-52 w-14 h-14 border-2 border-blue-300 rounded-full opacity-40"></div>

      <div className="flex bg-white shadow-xl rounded-xl overflow-hidden w-[900px]">

        <div className="w-1/2 bg-gradient-to-b from-blue-500 to-blue-700 text-white px-10 py-16 flex flex-col justify-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-8 text-center text-gradient-to-r from-purple-500 via-pink-500 to-red-500 drop-shadow-lg">
            Velora
            </h1>


          <p className="text-center text-sm opacity-90 leading-relaxed mb-10">
            Та системд хандахын тулд утасны дугаар болон нууц үгээ ашиглана уу.
          </p>

          <div className="text-xs opacity-90 text-center">
            <p className="mb-1 font-semibold">Та бидэнтэй холбогдохыг хүсвэл</p>
            <p>Имэйл хаяг: manaisystemgs@gmail.com</p>
            <a href="#" className="underline mt-3 inline-block">Үйлчилгээний нөхцөлтэй танилцах</a>
          </div>
        </div>

        <div className="w-1/2 px-10 py-14">
          <h2 className="text-2xl font-bold text-slate-700 mb-8 text-center">
            Нэвтрэх хэсэг
          </h2>

          <form onSubmit={handleSubmit}>
            <label className="block mb-2 font-medium text-gray-600">Утасны дугаар</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-2 mb-5 focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Утасны дугаар"
            />

            <label className="block mb-2 font-medium text-gray-600">Нууц үг</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Нууц үг"
            />

            {error && (
              <div className="bg-red-100 text-red-600 border-l-4 border-red-500 px-3 py-2 rounded mb-3 text-sm">
                {error}
              </div>
            )}

            <div className="flex justify-between items-center text-sm mb-6">
              <label className="flex items-center gap-2">
                <input type="checkbox" />
                Сануулах
              </label>
              <button type="button" className="text-blue-500 hover:underline">
                Нууц үг солих
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
            >
              Нэвтрэх
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
