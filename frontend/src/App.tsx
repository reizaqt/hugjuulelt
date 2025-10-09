import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/login/login";
import OrgTable from "./pages/superadmin/organization/orgTable";
const Home: React.FC = () => {
  return (
    <div>
      <h2>amjilttaiiii!</h2>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/superadmin-orgcrud" element={<OrgTable />} />
      </Routes>
    </Router>
  );
};

export default App;
