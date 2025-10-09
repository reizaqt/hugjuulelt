import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/login/login";
import OrgTable from "./pages/superadmin/organization/orgTable";
import ServiceCategoryPage from "./pages/superadmin/service/serviceCategoryPage";
import SuperAdminLayout from "./pages/superadmin/components/superAdminLayout";
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

        <Route path="/superadmin" element={<SuperAdminLayout />}>
        <Route path="organization" element={<OrgTable />} />
        <Route path="service-category" element={<ServiceCategoryPage />} />
      </Route>
      </Routes>
    </Router>
  );
};

export default App;
