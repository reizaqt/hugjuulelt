// import React from "react";
// import { Navigate } from "react-router-dom";
// import { getToken } from "../services/auth";

// interface ProtectedRouteProps {
//   children: JSX.Element;
//   role?: string;
// }

// const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, role }) => {
//   const token = getToken();
//   const userRole = localStorage.getItem("role");

//   if (!token) return <Navigate to="/" />;
//   if (role && userRole !== role) return <Navigate to="/" />;

//   return children;
// };

// export default ProtectedRoute;


// import React from "react";
// import { Navigate } from "react-router-dom";
// import { getToken } from "../services/auth";

// interface ProtectedRouteProps {
//   children: React.ReactElement; // <--- JSX.Element → React.ReactElement болгож өөрчилнө
//   role?: string;
// }

// const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, role }) => {
//   const token = getToken();
//   const userRole = localStorage.getItem("role");

//   if (!token) return <Navigate to="/" />;
//   if (role && userRole !== role) return <Navigate to="/" />;

//   return children;
// };

// export default ProtectedRoute;


// nevtersen baih shaardlagataigaar uildel nevtersen useryn uildel hiigddeg baisnyg tur boliulav
import React from "react";

interface ProtectedRouteProps {
  children: React.ReactElement;
  role?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {   
  return children;
};

export default ProtectedRoute;
