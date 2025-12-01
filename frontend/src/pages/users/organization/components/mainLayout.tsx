import React, { ReactNode, useState } from "react";
import Sidebar from "./sidebar";
import Header from "./header";

interface MainLayoutProps {
  children?: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen">
      
      <aside className={`transition-all duration-300 ${isSidebarCollapsed ? "w-16" : "w-64"}`}>
        <Sidebar onCollapseToggle={(value) => setIsSidebarCollapsed(value)} />
      </aside>

      <div className="flex-1 flex flex-col transition-all duration-300">
        <Header />

        <main className="flex-1 bg-gray-50 p-4 overflow-auto">
          {children}
        </main>
      </div>
      
    </div>
  );
};

export default MainLayout;
