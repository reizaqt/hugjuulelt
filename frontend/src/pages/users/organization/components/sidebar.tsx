import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import UsersIcon from "./icons/usersIcon";
import BarsIcon from "./icons/barsIcon";
import ChevronLeftIcon from "./icons/chevronLeftIcon";
import ChartBarIcon from "./icons/chartBarIcon";

interface SidebarProps {
  onCollapseToggle: (value: boolean) => void;
}

const Sidebar = ({ onCollapseToggle }: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isOrgOpen, setIsOrgOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    onCollapseToggle(isCollapsed);
  }, [isCollapsed, onCollapseToggle]);

  const buttonClass = `
    flex items-center gap-2 w-full px-3 py-2 hover:bg-orange-600 rounded transition
    ${isCollapsed ? "justify-center" : "justify-start"}
  `;

  return (
    <div
      className={`relative ${
        isCollapsed ? "w-16" : "w-64"
      } min-h-screen bg-gradient-to-b from-sky-500 to-blue-900 text-white transition-all duration-300 text-sm overflow-hidden`}
    >

      <div className="absolute top-10 right-[-2rem] w-64 h-64 border-4 border-sky-200 rounded-full opacity-30"></div>
      <div className="absolute top-48 right-[-1rem] w-20 h-20 border-2 border-sky-300 rounded-full opacity-20"></div>
      <div className="absolute bottom-20 left-[-1rem] w-28 h-28 border-4 border-sky-200 rounded-full opacity-20"></div>
      <div className="absolute bottom-32 left-[-0.5rem] w-14 h-14 border-2 border-sky-300 rounded-full opacity-20"></div>
      <div className="absolute top-1/2 left-1/4 w-32 h-32 border-4 border-sky-200 rounded-full opacity-25 transform -translate-y-1/2"></div>
      <div className="absolute top-1/2 right-1/4 w-16 h-16 border-2 border-sky-300 rounded-full opacity-25 transform -translate-y-1/2"></div>
      
      <div
        className="flex items-center justify-between h-16 px-4 border-b border-white/20 relative z-10"
      >
        
        <img
          src="/logo.png"
          alt="Logo"
          className={`${isCollapsed ? "w-8 h-8" : "w-10 h-10"}`}
        />

        {/* Collapse Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-white bg-sky-600 p-1 rounded hover:bg-orange-600 transition"
        >
          <BarsIcon
            className={`w-3 h-3 transition-transform ${
              isCollapsed ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      <div className="flex flex-col gap-2 mt-4 relative z-10">

        <button onClick={() => navigate("/")} className={buttonClass}>
          <ChartBarIcon className="w-5 h-5" />
          {!isCollapsed && "Дашбоард"}
        </button>

        <button
          onClick={() => setIsOrgOpen(!isOrgOpen)}
          className={`${buttonClass} ${!isCollapsed && "justify-between"}`}
        >
          <span className="flex items-center gap-2">
            <UsersIcon className="w-5 h-5" />
            {!isCollapsed && "Бүртгэл"}
          </span>

          {!isCollapsed && (
            <ChevronLeftIcon
              className={`w-3 h-3 transition-transform ${
                isOrgOpen ? "-rotate-90" : ""
              }`}
            />
          )}
        </button>

        {!isCollapsed && isOrgOpen && (
          <ul className="ml-6 mt-1 space-y-1">
            <button
              onClick={() => navigate("/organization/schedule")}
              className={buttonClass}
            >
              <ChartBarIcon className="w-5 h-5" />
              Хуваарь
            </button>

            <button
              onClick={() => navigate("/organization/employee")}
              className={buttonClass}
            >
              <UsersIcon className="w-5 h-5" />
              Ажилтан
            </button>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
