import { useState } from "react";
import {
  DollarSign,
  FileText,
  Download,
  Search,
  Filter,
  Eye,
  Edit,
  Plus,
  Calculator,
  Calendar,
  Building,
  User,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  Clock,
  AlertTriangle,
  Printer,
  Mail,
  Upload,
  Settings,
  CreditCard,
  PieChart,
  BarChart3,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data for payroll
const payrollStats = {
  totalSalaryBudget: 2847500,
  totalEmployees: 247,
  averageSalary: 115384,
  totalDeductions: 341700,
  totalTaxes: 569500,
  totalBonuses: 85000,
  pendingPayments: 12,
  completedPayments: 235,
};

const employees = [
  {
    id: 1,
    employeeId: "EMP001",
    name: "Sarah Johnson",
    department: "Engineering",
    designation: "Senior Developer",
    baseSalary: 95000,
    allowances: {
      housing: 15000,
      transport: 5000,
      medical: 3000,
    },
    deductions: {
      tax: 19000,
      socialSecurity: 5700,
      insurance: 2400,
    },
    bonuses: 5000,
    netSalary: 96900,
    paymentStatus: "Paid",
    paymentDate: "2024-01-31",
    bankAccount: "****1234",
  },
  {
    id: 2,
    employeeId: "EMP002",
    name: "Michael Chen",
    department: "Design",
    designation: "UI/UX Designer",
    baseSalary: 75000,
    allowances: {
      housing: 12000,
      transport: 4000,
      medical: 2500,
    },
    deductions: {
      tax: 14250,
      socialSecurity: 4500,
      insurance: 1800,
    },
    bonuses: 3000,
    netSalary: 75950,
    paymentStatus: "Pending",
    paymentDate: null,
    bankAccount: "****5678",
  },
  {
    id: 3,
    employeeId: "EMP003",
    name: "Emily Davis",
    department: "Design",
    designation: "Design Manager",
    baseSalary: 105000,
    allowances: {
      housing: 16000,
      transport: 6000,
      medical: 3500,
    },
    deductions: {
      tax: 21000,
      socialSecurity: 6300,
      insurance: 2600,
    },
    bonuses: 8000,
    netSalary: 108600,
    paymentStatus: "Paid",
    paymentDate: "2024-01-31",
    bankAccount: "****9012",
  },
];

const payrollPeriods = [
  { period: "January 2024", status: "Completed", employees: 247, totalAmount: 2847500 },
  { period: "December 2023", status: "Completed", employees: 245, totalAmount: 2789300 },
  { period: "November 2023", status: "Completed", employees: 243, totalAmount: 2751200 },
];

const salaryComponents = [
  { component: "Base Salary", amount: 2100000, percentage: 73.7 },
  { component: "Allowances", amount: 578500, percentage: 20.3 },
  { component: "Bonuses", amount: 169000, percentage: 5.9 },
];

export default function Payroll() {
  const [selectedTab, setSelectedTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showSalaryForm, setShowSalaryForm] = useState(false);
  const [showPayslipModal, setShowPayslipModal] = useState(false);

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === "All" || employee.department === selectedDepartment;
    const matchesStatus = selectedStatus === "All" || employee.paymentStatus === selectedStatus;
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const tabs = [
    { id: "overview", name: "Overview", count: null },
    { id: "salaries", name: "Employee Salaries", count: employees.length },
    { id: "payslips", name: "Payslips", count: null },
    { id: "reports", name: "Reports", count: null },
    { id: "settings", name: "Settings", count: null },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Paid":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Paid":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "Pending":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "Failed":
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                Payroll Management
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Manage salaries, generate payslips, and track payments
              </p>
            </div>
            <div className="flex space-x-3">
              <button className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </button>
              <button className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                <Calculator className="h-4 w-4 mr-2" />
                Run Payroll
              </button>
              <button
                onClick={() => setShowSalaryForm(true)}
                className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Salary
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={cn(
                    "py-2 px-1 border-b-2 font-medium text-sm",
                    selectedTab === tab.id
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  )}
                >
                  {tab.name}
                  {tab.count && (
                    <span className="ml-2 bg-gray-100 text-gray-900 py-0.5 px-2.5 rounded-full text-xs">
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Overview Tab */}
        {selectedTab === "overview" && (
          <>
            {/* Payroll Stats */}
            <div className="mb-8">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <div className="bg-white overflow-hidden shadow border border-gray-200 rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <DollarSign className="h-8 w-8 text-green-600" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">Total Salary Budget</dt>
                          <dd className="text-lg font-medium text-gray-900">
                            ${payrollStats.totalSalaryBudget.toLocaleString()}
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white overflow-hidden shadow border border-gray-200 rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <User className="h-8 w-8 text-blue-600" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">Total Employees</dt>
                          <dd className="text-lg font-medium text-gray-900">
                            {payrollStats.totalEmployees}
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white overflow-hidden shadow border border-gray-200 rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <TrendingUp className="h-8 w-8 text-purple-600" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">Average Salary</dt>
                          <dd className="text-lg font-medium text-gray-900">
                            ${payrollStats.averageSalary.toLocaleString()}
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white overflow-hidden shadow border border-gray-200 rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <Clock className="h-8 w-8 text-yellow-600" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">Pending Payments</dt>
                          <dd className="text-lg font-medium text-gray-900">
                            {payrollStats.pendingPayments}
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Payroll Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-2 bg-white shadow border border-gray-200 rounded-lg overflow-hidden">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Payroll Periods</h3>
                  <div className="space-y-4">
                    {payrollPeriods.map((period, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">{period.period}</div>
                            <div className="text-xs text-gray-500">{period.employees} employees</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-gray-900">
                            ${period.totalAmount.toLocaleString()}
                          </div>
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                            {period.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white shadow border border-gray-200 rounded-lg overflow-hidden">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Salary Breakdown</h3>
                  <div className="space-y-4">
                    {salaryComponents.map((component, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{component.component}</div>
                          <div className="text-xs text-gray-500">{component.percentage}%</div>
                        </div>
                        <div className="text-sm font-medium text-gray-900">
                          ${component.amount.toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6">
                    <div className="text-sm font-medium text-gray-700 mb-3">Distribution</div>
                    <div className="space-y-2">
                      {salaryComponents.map((component, index) => (
                        <div key={index} className="flex items-center">
                          <div className={`w-3 h-3 rounded-full mr-2 ${
                            index === 0 ? 'bg-blue-500' : index === 1 ? 'bg-green-500' : 'bg-yellow-500'
                          }`} />
                          <span className="text-xs text-gray-600">{component.component}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white shadow border border-gray-200 rounded-lg overflow-hidden">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors">
                    <div className="text-center">
                      <Calculator className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <div className="text-sm font-medium text-gray-900">Process Payroll</div>
                      <div className="text-xs text-gray-500">Run monthly payroll</div>
                    </div>
                  </button>
                  
                  <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors">
                    <div className="text-center">
                      <FileText className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <div className="text-sm font-medium text-gray-900">Generate Payslips</div>
                      <div className="text-xs text-gray-500">Bulk payslip generation</div>
                    </div>
                  </button>
                  
                  <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors">
                    <div className="text-center">
                      <BarChart3 className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <div className="text-sm font-medium text-gray-900">Payroll Reports</div>
                      <div className="text-xs text-gray-500">Generate detailed reports</div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Salaries Tab */}
        {selectedTab === "salaries" && (
          <>
            {/* Filters */}
            <div className="mb-6 bg-white rounded-lg border border-gray-200 p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search employees..."
                    className="block w-full rounded-md border-gray-300 pl-10 pr-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <select
                  className="block w-full rounded-md border-gray-300 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                >
                  <option value="All">All Departments</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Design">Design</option>
                  <option value="Marketing">Marketing</option>
                  <option value="HR">HR</option>
                  <option value="Sales">Sales</option>
                </select>

                <select
                  className="block w-full rounded-md border-gray-300 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option value="All">All Payment Status</option>
                  <option value="Paid">Paid</option>
                  <option value="Pending">Pending</option>
                  <option value="Failed">Failed</option>
                </select>
              </div>
            </div>

            {/* Salary Table */}
            <div className="bg-white shadow border border-gray-200 rounded-lg overflow-hidden">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Employee Salaries ({filteredEmployees.length})
                  </h3>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Employee
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Base Salary
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Allowances
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Deductions
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Net Salary
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Payment Status
                        </th>
                        <th className="relative px-6 py-3">
                          <span className="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredEmployees.map((employee) => {
                        const totalAllowances = Object.values(employee.allowances).reduce((sum, val) => sum + val, 0);
                        const totalDeductions = Object.values(employee.deductions).reduce((sum, val) => sum + val, 0);
                        
                        return (
                          <tr key={employee.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="h-10 w-10 flex-shrink-0">
                                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                    <span className="text-sm font-medium text-blue-600">
                                      {employee.name.split(' ').map(n => n[0]).join('')}
                                    </span>
                                  </div>
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">
                                    {employee.name}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {employee.employeeId} • {employee.designation}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">
                                ${employee.baseSalary.toLocaleString()}
                              </div>
                              <div className="text-sm text-gray-500">{employee.department}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">
                                ${totalAllowances.toLocaleString()}
                              </div>
                              <div className="text-xs text-gray-500">
                                Housing, Transport, Medical
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">
                                ${totalDeductions.toLocaleString()}
                              </div>
                              <div className="text-xs text-gray-500">
                                Tax, SS, Insurance
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-green-600">
                                ${employee.netSalary.toLocaleString()}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                {getStatusIcon(employee.paymentStatus)}
                                <span className={cn(
                                  "ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full",
                                  getStatusColor(employee.paymentStatus)
                                )}>
                                  {employee.paymentStatus}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => setSelectedEmployee(employee)}
                                  className="text-blue-600 hover:text-blue-900"
                                  title="View Details"
                                >
                                  <Eye className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => setShowPayslipModal(employee)}
                                  className="text-green-600 hover:text-green-900"
                                  title="Generate Payslip"
                                >
                                  <FileText className="h-4 w-4" />
                                </button>
                                <button
                                  className="text-purple-600 hover:text-purple-900"
                                  title="Edit Salary"
                                >
                                  <Edit className="h-4 w-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Payslips Tab */}
        {selectedTab === "payslips" && (
          <div className="space-y-6">
            <div className="bg-white shadow border border-gray-200 rounded-lg overflow-hidden">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-medium text-gray-900">Payslip Generation</h3>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
                    <FileText className="h-4 w-4 mr-2 inline" />
                    Generate All Payslips
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-md font-medium text-gray-900 mb-4">Bulk Generation</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Pay Period</label>
                        <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                          <option>January 2024</option>
                          <option>December 2023</option>
                          <option>November 2023</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Department</label>
                        <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                          <option>All Departments</option>
                          <option>Engineering</option>
                          <option>Design</option>
                          <option>Marketing</option>
                        </select>
                      </div>

                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="email-payslips"
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="email-payslips" className="ml-2 block text-sm text-gray-900">
                          Email payslips to employees
                        </label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-md font-medium text-gray-900 mb-4">Payslip Template</h4>
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <div className="text-center mb-4">
                        <FileText className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                        <div className="text-sm font-medium text-gray-900">Standard Payslip Template</div>
                        <div className="text-xs text-gray-500">Company logo, salary breakdown, deductions</div>
                      </div>
                      <div className="space-y-2">
                        <button className="w-full text-left text-sm text-blue-600 hover:text-blue-700">
                          • Preview Template
                        </button>
                        <button className="w-full text-left text-sm text-blue-600 hover:text-blue-700">
                          • Customize Template
                        </button>
                        <button className="w-full text-left text-sm text-blue-600 hover:text-blue-700">
                          • Upload Company Logo
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Reports Tab */}
        {selectedTab === "reports" && (
          <div className="space-y-6">
            <div className="bg-white shadow border border-gray-200 rounded-lg overflow-hidden">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-6">Payroll Reports</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors cursor-pointer">
                    <div className="flex items-center mb-3">
                      <BarChart3 className="h-6 w-6 text-blue-600 mr-3" />
                      <h4 className="text-md font-medium text-gray-900">Monthly Payroll Report</h4>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      Comprehensive monthly payroll summary with department breakdown
                    </p>
                    <button className="w-full bg-blue-50 text-blue-700 px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-100">
                      Generate Report
                    </button>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors cursor-pointer">
                    <div className="flex items-center mb-3">
                      <PieChart className="h-6 w-6 text-green-600 mr-3" />
                      <h4 className="text-md font-medium text-gray-900">Tax Summary Report</h4>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      Tax deductions, social security contributions, and compliance data
                    </p>
                    <button className="w-full bg-green-50 text-green-700 px-3 py-2 rounded-md text-sm font-medium hover:bg-green-100">
                      Generate Report
                    </button>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors cursor-pointer">
                    <div className="flex items-center mb-3">
                      <TrendingUp className="h-6 w-6 text-purple-600 mr-3" />
                      <h4 className="text-md font-medium text-gray-900">Salary Analysis</h4>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      Department-wise salary analysis and cost center breakdown
                    </p>
                    <button className="w-full bg-purple-50 text-purple-700 px-3 py-2 rounded-md text-sm font-medium hover:bg-purple-100">
                      Generate Report
                    </button>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors cursor-pointer">
                    <div className="flex items-center mb-3">
                      <CreditCard className="h-6 w-6 text-indigo-600 mr-3" />
                      <h4 className="text-md font-medium text-gray-900">Payment Status Report</h4>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      Payment tracking, bank transfer status, and failed payments
                    </p>
                    <button className="w-full bg-indigo-50 text-indigo-700 px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-100">
                      Generate Report
                    </button>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors cursor-pointer">
                    <div className="flex items-center mb-3">
                      <Calendar className="h-6 w-6 text-orange-600 mr-3" />
                      <h4 className="text-md font-medium text-gray-900">Year-End Report</h4>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      Annual payroll summary for tax filing and compliance
                    </p>
                    <button className="w-full bg-orange-50 text-orange-700 px-3 py-2 rounded-md text-sm font-medium hover:bg-orange-100">
                      Generate Report
                    </button>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors cursor-pointer">
                    <div className="flex items-center mb-3">
                      <Building className="h-6 w-6 text-gray-600 mr-3" />
                      <h4 className="text-md font-medium text-gray-900">Cost Center Report</h4>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      Budget allocation and department-wise cost analysis
                    </p>
                    <button className="w-full bg-gray-50 text-gray-700 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100">
                      Generate Report
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {selectedTab === "settings" && (
          <div className="space-y-6">
            <div className="bg-white shadow border border-gray-200 rounded-lg overflow-hidden">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-6">Payroll Settings</h3>

                <div className="space-y-8">
                  <div>
                    <h4 className="text-md font-medium text-gray-900 mb-4">Payment Configuration</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Pay Frequency</label>
                        <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                          <option>Monthly</option>
                          <option>Bi-weekly</option>
                          <option>Weekly</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Payment Date</label>
                        <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                          <option>Last working day</option>
                          <option>1st of month</option>
                          <option>15th of month</option>
                          <option>Custom date</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-md font-medium text-gray-900 mb-4">Tax Settings</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Income Tax Rate (%)</label>
                        <input
                          type="number"
                          defaultValue="20"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Social Security (%)</label>
                        <input
                          type="number"
                          defaultValue="6"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">Insurance Deduction (%)</label>
                        <input
                          type="number"
                          defaultValue="2.5"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-md font-medium text-gray-900 mb-4">Bank Integration</h4>
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900">Bank API Connection</div>
                          <div className="text-xs text-gray-500">Connect to bank for automatic salary transfers</div>
                        </div>
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                          Not Connected
                        </span>
                      </div>
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
                        Configure Bank Integration
                      </button>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-md font-medium text-gray-900 mb-4">Third-party Integration</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center">
                          <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                            <Settings className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">QuickBooks Integration</div>
                            <div className="text-xs text-gray-500">Sync payroll data with accounting software</div>
                          </div>
                        </div>
                        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                          Configure
                        </button>
                      </div>

                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center">
                          <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                            <CreditCard className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">Wise/Payoneer Integration</div>
                            <div className="text-xs text-gray-500">International payment processing</div>
                          </div>
                        </div>
                        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                          Configure
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Employee Salary Details Modal */}
        {selectedEmployee && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-screen items-center justify-center p-4">
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                   onClick={() => setSelectedEmployee(null)} />
              
              <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900">
                      Salary Details - {selectedEmployee.name}
                    </h3>
                    <button
                      onClick={() => setSelectedEmployee(null)}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <span className="sr-only">Close</span>
                      ×
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-md font-medium text-gray-900 mb-3">Basic Information</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Employee ID:</span>
                            <span className="text-sm font-medium">{selectedEmployee.employeeId}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Department:</span>
                            <span className="text-sm font-medium">{selectedEmployee.department}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Designation:</span>
                            <span className="text-sm font-medium">{selectedEmployee.designation}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Bank Account:</span>
                            <span className="text-sm font-medium">{selectedEmployee.bankAccount}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-md font-medium text-gray-900 mb-3">Allowances</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Housing Allowance:</span>
                            <span className="text-sm font-medium">${selectedEmployee.allowances.housing.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Transport Allowance:</span>
                            <span className="text-sm font-medium">${selectedEmployee.allowances.transport.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Medical Allowance:</span>
                            <span className="text-sm font-medium">${selectedEmployee.allowances.medical.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="text-md font-medium text-gray-900 mb-3">Salary Breakdown</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Base Salary:</span>
                            <span className="text-sm font-medium">${selectedEmployee.baseSalary.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Total Allowances:</span>
                            <span className="text-sm font-medium text-green-600">
                              +${Object.values(selectedEmployee.allowances).reduce((sum, val) => sum + val, 0).toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Bonuses:</span>
                            <span className="text-sm font-medium text-green-600">+${selectedEmployee.bonuses.toLocaleString()}</span>
                          </div>
                          <div className="border-t pt-2">
                            <div className="flex justify-between font-medium">
                              <span className="text-sm text-gray-900">Gross Salary:</span>
                              <span className="text-sm">
                                ${(selectedEmployee.baseSalary + Object.values(selectedEmployee.allowances).reduce((sum, val) => sum + val, 0) + selectedEmployee.bonuses).toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-md font-medium text-gray-900 mb-3">Deductions</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Income Tax:</span>
                            <span className="text-sm font-medium text-red-600">-${selectedEmployee.deductions.tax.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Social Security:</span>
                            <span className="text-sm font-medium text-red-600">-${selectedEmployee.deductions.socialSecurity.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Insurance:</span>
                            <span className="text-sm font-medium text-red-600">-${selectedEmployee.deductions.insurance.toLocaleString()}</span>
                          </div>
                          <div className="border-t pt-2">
                            <div className="flex justify-between font-medium">
                              <span className="text-sm text-gray-900">Total Deductions:</span>
                              <span className="text-sm text-red-600">
                                -${Object.values(selectedEmployee.deductions).reduce((sum, val) => sum + val, 0).toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-medium text-green-800">Net Salary:</span>
                          <span className="text-xl font-bold text-green-600">
                            ${selectedEmployee.netSalary.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end space-x-3">
                    <button className="bg-blue-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700">
                      <FileText className="h-4 w-4 mr-2 inline" />
                      Generate Payslip
                    </button>
                    <button className="bg-green-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-green-700">
                      <Mail className="h-4 w-4 mr-2 inline" />
                      Email Payslip
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Add Salary Modal */}
        {showSalaryForm && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-screen items-center justify-center p-4">
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                   onClick={() => setShowSalaryForm(false)} />
              
              <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900">
                      Add/Edit Salary Structure
                    </h3>
                    <button
                      onClick={() => setShowSalaryForm(false)}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <span className="sr-only">Close</span>
                      ×
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  <form className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Employee
                      </label>
                      <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                        <option value="">Select Employee</option>
                        <option value="EMP001">EMP001 - Sarah Johnson</option>
                        <option value="EMP002">EMP002 - Michael Chen</option>
                        <option value="EMP003">EMP003 - Emily Davis</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-md font-medium text-gray-900 mb-3">Basic Salary</h4>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Base Salary (Annual)
                          </label>
                          <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <DollarSign className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                              type="number"
                              className="block w-full pl-10 pr-12 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                              placeholder="95000"
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-md font-medium text-gray-900 mb-3">Bank Details</h4>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Bank Account Number
                          </label>
                          <input
                            type="text"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            placeholder="1234567890"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-md font-medium text-gray-900 mb-3">Allowances</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Housing Allowance</label>
                          <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <DollarSign className="h-4 w-4 text-gray-400" />
                            </div>
                            <input
                              type="number"
                              className="block w-full pl-8 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                              placeholder="15000"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700">Transport Allowance</label>
                          <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <DollarSign className="h-4 w-4 text-gray-400" />
                            </div>
                            <input
                              type="number"
                              className="block w-full pl-8 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                              placeholder="5000"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700">Medical Allowance</label>
                          <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <DollarSign className="h-4 w-4 text-gray-400" />
                            </div>
                            <input
                              type="number"
                              className="block w-full pl-8 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                              placeholder="3000"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-md font-medium text-gray-900 mb-3">Deductions</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Tax Rate (%)</label>
                          <input
                            type="number"
                            step="0.1"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            placeholder="20"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700">Social Security (%)</label>
                          <input
                            type="number"
                            step="0.1"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            placeholder="6"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700">Insurance (%)</label>
                          <input
                            type="number"
                            step="0.1"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            placeholder="2.5"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-3">
                      <button
                        type="button"
                        onClick={() => setShowSalaryForm(false)}
                        className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-blue-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700"
                      >
                        Save Salary Structure
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
