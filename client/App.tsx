import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { EmployeeLayout } from "./components/EmployeeLayout";
import Index from "./pages/Index";
import Employees from "./pages/Employees";
import Attendance from "./pages/Attendance";
import Leave from "./pages/Leave";
import Payroll from "./pages/Payroll";
import Reports from "./pages/Reports";
import NotFound from "./pages/NotFound";

// Employee pages
import EmployeeDashboard from "./pages/employee/Dashboard";
import EmployeeAttendance from "./pages/employee/Attendance";
import EmployeeLeave from "./pages/employee/Leave";
import EmployeeProfile from "./pages/employee/Profile";
import EmployeePayslips from "./pages/employee/Payslips";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Admin/HR Routes */}
        <Route
          path="/"
          element={
            <Layout>
              <Index />
            </Layout>
          }
        />
        <Route
          path="/employees"
          element={
            <Layout>
              <Employees />
            </Layout>
          }
        />
        <Route
          path="/attendance"
          element={
            <Layout>
              <Attendance />
            </Layout>
          }
        />
        <Route
          path="/leave"
          element={
            <Layout>
              <Leave />
            </Layout>
          }
        />
        <Route
          path="/payroll"
          element={
            <Layout>
              <Payroll />
            </Layout>
          }
        />
        <Route
          path="/reports"
          element={
            <Layout>
              <Reports />
            </Layout>
          }
        />

        {/* Employee Routes */}
        <Route
          path="/employee"
          element={
            <EmployeeLayout>
              <EmployeeDashboard />
            </EmployeeLayout>
          }
        />
        <Route
          path="/employee/attendance"
          element={
            <EmployeeLayout>
              <EmployeeAttendance />
            </EmployeeLayout>
          }
        />
        <Route
          path="/employee/leave"
          element={
            <EmployeeLayout>
              <EmployeeLeave />
            </EmployeeLayout>
          }
        />
        <Route
          path="/employee/profile"
          element={
            <EmployeeLayout>
              <EmployeeProfile />
            </EmployeeLayout>
          }
        />
        <Route
          path="/employee/payslips"
          element={
            <EmployeeLayout>
              <EmployeePayslips />
            </EmployeeLayout>
          }
        />

        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
