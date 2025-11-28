import { Route } from "react-router-dom";
import MainLayout from "./components/mainLayout";

import SchedulePage from "./pages/management/schedule/schedulePage";

export const organizationRoutes = (
  <Route path="/organization" element={<MainLayout />}>
    {/* <Route index element={<DashboardPage />} /> */}
    <Route path="schedule" element={<SchedulePage />} />
    {/* <Route path="employee" element={<EmployeePage />} /> */}
  </Route>
);
