import Sidebar from './sidebar';
import Header from './header';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';

const MainLayout: React.FC = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen">

      {/* LEFT SIDEBAR */}
      <aside
        className={`h-screen bg-customBlue text-white transition-all duration-300 
          ${isSidebarCollapsed ? 'w-16' : 'w-64'}`}
      >
        <Sidebar onCollapseToggle={setIsSidebarCollapsed} />
      </aside>

      {/* RIGHT CONTENT */}
      <div className="flex-1 flex flex-col">

        <Header />

        <main className="flex-1 bg-gray-50 p-4 overflow-auto">
          {/* ROUTE CHILDREN ХАРАГДАХ ГОЛ ГАЗАР */}
          <Outlet />
        </main>
      </div>

    </div>
  );
};

export default MainLayout;
