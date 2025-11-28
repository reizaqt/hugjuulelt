import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import UserIcon from './icons/userIcon';
import LogoutIcon from './icons/logoutIcon';

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <header className="flex justify-between items-center h-16 px-8 shadow-md bg-neutral-100 border-b-2 border-sky-400 text-black">
      <div className="text-xl font-bold">Org_name</div>

      <div className="relative" ref={dropdownRef}>
        <button
          className="p-2 rounded hover:bg-orange-600"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <UserIcon className="text-sky-600 w-5 h-5" />
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-64 bg-white text-black rounded shadow-md">
            <div
              className="flex items-center gap-3 px-4 py-3 border-b hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                navigate("/profile");
                setDropdownOpen(false);
              }}
            >
              <div className="bg-gray-300 rounded-full w-10 h-10 flex items-center justify-center">
                <UserIcon className="text-gray-700 w-5 h-5" />
              </div>

              <div>
                <div className="font-bold">Velora</div>
                <div className="text-sm text-gray-600">velora@example.com</div>
              </div>
            </div>

            <div
              className="flex items-center gap-2 px-4 py-3 hover:bg-gray-100 cursor-pointer"
              onClick={() => navigate("/")}
            >
              <LogoutIcon className="w-5 h-5" />
              <span>Гарах</span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
