import React from 'react';

const EmployeePage: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Ажилтан</h2>
      <p className="text-gray-500 mb-4">Ажилтан нэмэх, засах, устгах боломжтой хэсэг.</p>

      {/* Жишээ table */}
      <table className="w-full border rounded bg-white">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">Нэр</th>
            <th className="border p-2">Утас</th>
            <th className="border p-2">Электрон шуудан</th>
            <th className="border p-2">Үйлдэл</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border p-2">John Doe</td>
            <td className="border p-2">99001234</td>
            <td className="border p-2">john@example.com</td>
            <td className="border p-2">
              <button className="text-blue-500 mr-2">Засах</button>
              <button className="text-red-500">Устгах</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default EmployeePage;
