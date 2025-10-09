import React, { ReactNode } from "react";
import { Link, Outlet } from "react-router-dom";

interface Props {
  children?: ReactNode;
}

const SuperAdminLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-4 text-2xl font-bold border-b border-gray-700">
        Superadmin Panel
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link
            to="/superadmin/organization"
            className="block px-3 py-2 rounded hover:bg-gray-700"
          >
            Байгууллага
          </Link>
          <Link
            to="/superadmin/service-category"
            className="block px-3 py-2 rounded hover:bg-gray-700"
          >
            Үйлчилгээний ангилал лавлах
          </Link>
          <Link
            to="/superadmin/position"
            className="block px-3 py-2 rounded hover:bg-gray-700"
          >
            Ажилтан албан тушаал лавлах
          </Link>
          <Link
            to="/superadmin/appointment-status"
            className="block px-3 py-2 rounded hover:bg-gray-700"
          >
            Захиалгын статус
          </Link>
          <Link
            to="/superadmin/payment-method"
            className="block px-3 py-2 rounded hover:bg-gray-700"
          >
            Төлбөрийн хэлбэр лавлах
          </Link>
        </nav>
      </aside>

      <div className="flex-1 bg-gray-100">
        {/* Header */}
        <header className="bg-white shadow-md p-4 border-b border-gray-300 flex justify-between items-center">
          <h1 className="text-xl font-semibold"></h1>
          <div className="text-gray-600">Тавтай морилно уу, SuperAdmin</div>
        </header>


        {/* Page content */}
        <main className="p-4">{children || <Outlet />}</main>
      </div>
    </div>
  );
};

export default SuperAdminLayout;
