import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/login/login";
import OrgTable from "./pages/superadmin/organization/orgTable";
import ServiceCategoryPage from "./pages/superadmin/service/serviceCategoryPage";
import SuperAdminLayout from "./pages/superadmin/components/superAdminLayout";
import PositionCategoryPage from "./pages/superadmin/position/positionCategoryPage";
import StatusCategoryPage from "./pages/superadmin/status/statusCategoryPage";
import PaymentMethodPage from "./pages/superadmin/payment/paymentMethodPage";
import CustomerPage from "./pages/users/customer/customerPage";
import ProtectedRoute from "./components/protectedRoute";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/home"
          element={
            <ProtectedRoute role="customer">
              <CustomerPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/superadmin/*"
          element={
            <ProtectedRoute role="superadmin">
              <SuperAdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="organization" element={<OrgTable />} />
          <Route path="service-category" element={<ServiceCategoryPage />} />
          <Route path="position" element={<PositionCategoryPage />} />
          <Route path="appointment-status" element={<StatusCategoryPage />} />
          <Route path="payment-method" element={<PaymentMethodPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
