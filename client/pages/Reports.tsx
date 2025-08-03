import { useState } from "react";
import {
  BarChart3,
  PieChart,
  TrendingUp,
  TrendingDown,
  Download,
  Filter,
  Calendar,
  Users,
  Clock,
  DollarSign,
  FileText,
  Eye,
  Settings,
  Search,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight,
  AlertTriangle,
  CheckCircle,
  Building,
  UserCheck,
  UserX,
  CalendarDays,
  Timer,
  Target,
  Award,
  Activity,
  Database,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data for HR KPIs
const hrKPIs = {
  totalEmployees: 247,
  activeEmployees: 231,
  newHires: 12,
  attrition: 8,
  attendanceRate: 93.5,
  averageWorkingHours: 8.2,
  leaveUtilization: 68.4,
  performanceScore: 4.2,
};

// Mock data for monthly trends
const monthlyTrends = [
  { month: "Jan 2024", employees: 235, attendance: 94.2, attrition: 2.1, newHires: 8 },
  { month: "Dec 2023", employees: 229, attendance: 92.8, attrition: 2.8, newHires: 6 },
  { month: "Nov 2023", employees: 225, attendance: 95.1, attrition: 1.9, newHires: 10 },
  { month: "Oct 2023", employees: 217, attendance: 93.6, attrition: 2.5, newHires: 12 },
  { month: "Sep 2023", employees: 208, attendance: 91.4, attrition: 3.2, newHires: 15 },
  { month: "Aug 2023", employees: 196, attendance: 92.9, attrition: 2.7, newHires: 9 },
];

// Mock data for department analytics
const departmentData = [
  { department: "Engineering", employees: 85, attendance: 94.8, avgSalary: 95000, turnover: 5.2 },
  { department: "Design", employees: 32, attendance: 92.1, avgSalary: 78000, turnover: 8.1 },
  { department: "Marketing", employees: 28, attendance: 91.5, avgSalary: 65000, turnover: 12.5 },
  { department: "Sales", employees: 45, attendance: 89.3, avgSalary: 72000, turnover: 15.2 },
  { department: "HR", employees: 12, attendance: 96.2, avgSalary: 68000, turnover: 3.8 },
  { department: "Finance", employees: 18, attendance: 95.7, avgSalary: 82000, turnover: 4.2 },
  { department: "Operations", employees: 27, attendance: 93.1, avgSalary: 58000, turnover: 9.8 },
];

// Mock data for recent reports
const recentReports = [
  {
    id: 1,
    name: "Monthly Attendance Report - January 2024",
    type: "Attendance",
    generatedBy: "HR Admin",
    generatedDate: "2024-02-01",
    status: "Completed",
    size: "2.4 MB",
  },
  {
    id: 2,
    name: "Payroll Summary - Q4 2023",
    type: "Payroll",
    generatedBy: "Finance Manager",
    generatedDate: "2024-01-15",
    status: "Completed",
    size: "5.8 MB",
  },
  {
    id: 3,
    name: "Employee Performance Review",
    type: "Performance",
    generatedBy: "HR Manager",
    generatedDate: "2024-01-10",
    status: "Completed",
    size: "1.2 MB",
  },
  {
    id: 4,
    name: "Leave Utilization Analysis",
    type: "Leave",
    generatedBy: "HR Admin",
    generatedDate: "2024-01-05",
    status: "Processing",
    size: "—",
  },
];

// Mock audit logs
const auditLogs = [
  {
    id: 1,
    action: "Generated Payroll Report",
    user: "HR Admin",
    timestamp: "2024-02-01 10:30:00",
    details: "Monthly payroll report for January 2024",
    status: "Success",
  },
  {
    id: 2,
    action: "Updated Employee Salary",
    user: "HR Manager",
    timestamp: "2024-02-01 09:15:00",
    details: "Updated salary for EMP001 - Sarah Johnson",
    status: "Success",
  },
  {
    id: 3,
    action: "Approved Leave Request",
    user: "Engineering Manager",
    timestamp: "2024-02-01 08:45:00",
    details: "Approved 5-day annual leave for EMP002",
    status: "Success",
  },
  {
    id: 4,
    action: "Failed Login Attempt",
    user: "Unknown",
    timestamp: "2024-02-01 07:30:00",
    details: "Multiple failed login attempts from IP 192.168.1.100",
    status: "Warning",
  },
];

const reportTypes = [
  {
    id: "attendance",
    name: "Attendance Reports",
    description: "Daily, weekly, and monthly attendance analytics",
    icon: Clock,
    color: "blue",
    metrics: ["Present/Absent", "Late Arrivals", "Working Hours", "Overtime"],
  },
  {
    id: "payroll",
    name: "Payroll Reports",
    description: "Salary, deductions, and payment analytics",
    icon: DollarSign,
    color: "green",
    metrics: ["Salary Distribution", "Tax Calculations", "Payment Status", "Cost Analysis"],
  },
  {
    id: "employee",
    name: "Employee Reports",
    description: "Workforce analytics and demographics",
    icon: Users,
    color: "purple",
    metrics: ["Headcount", "Demographics", "Turnover", "Hiring Trends"],
  },
  {
    id: "performance",
    name: "Performance Reports",
    description: "Employee performance and review analytics",
    icon: Target,
    color: "orange",
    metrics: ["Performance Scores", "Goal Achievement", "Review Status", "Growth Tracking"],
  },
  {
    id: "leave",
    name: "Leave Reports",
    description: "Leave balance and utilization analytics",
    icon: CalendarDays,
    color: "indigo",
    metrics: ["Leave Balance", "Utilization Rate", "Approval Status", "Patterns"],
  },
  {
    id: "compliance",
    name: "Compliance Reports",
    description: "Regulatory and audit compliance reports",
    icon: FileText,
    color: "red",
    metrics: ["Audit Logs", "Policy Compliance", "Document Status", "Risk Assessment"],
  },
];

export default function Reports() {
  const [selectedTab, setSelectedTab] = useState("dashboard");
  const [selectedReportType, setSelectedReportType] = useState("attendance");
  const [dateRange, setDateRange] = useState("last-month");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [showReportBuilder, setShowReportBuilder] = useState(false);

  const tabs = [
    { id: "dashboard", name: "Analytics Dashboard", count: null },
    { id: "reports", name: "Generate Reports", count: null },
    { id: "custom", name: "Custom Reports", count: null },
    { id: "audit", name: "Audit Logs", count: auditLogs.length },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
      case "Success":
        return "bg-green-100 text-green-800";
      case "Processing":
        return "bg-yellow-100 text-yellow-800";
      case "Failed":
      case "Warning":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Completed":
      case "Success":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "Processing":
        return <RefreshCw className="h-4 w-4 text-yellow-500" />;
      case "Failed":
      case "Warning":
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const calculatePercentageChange = (current, previous) => {
    if (previous === 0) return 0;
    return ((current - previous) / previous) * 100;
  };

  return (
    <div className="py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                Reports & Analytics
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Comprehensive HR analytics, custom reports, and data insights
              </p>
            </div>
            <div className="flex space-x-3">
              <button className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh Data
              </button>
              <button
                onClick={() => setShowReportBuilder(true)}
                className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                Create Report
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

        {/* Analytics Dashboard Tab */}
        {selectedTab === "dashboard" && (
          <>
            {/* HR KPIs */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Key Performance Indicators</h3>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <div className="bg-white overflow-hidden shadow border border-gray-200 rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <Users className="h-8 w-8 text-blue-600" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">Total Employees</dt>
                          <dd className="flex items-baseline">
                            <div className="text-2xl font-semibold text-gray-900">
                              {hrKPIs.totalEmployees}
                            </div>
                            <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                              <ArrowUpRight className="h-4 w-4 mr-1" />
                              +4.8%
                            </div>
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
                        <UserCheck className="h-8 w-8 text-green-600" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">Attendance Rate</dt>
                          <dd className="flex items-baseline">
                            <div className="text-2xl font-semibold text-gray-900">
                              {hrKPIs.attendanceRate}%
                            </div>
                            <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                              <ArrowUpRight className="h-4 w-4 mr-1" />
                              +1.2%
                            </div>
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
                        <UserX className="h-8 w-8 text-orange-600" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">Attrition Rate</dt>
                          <dd className="flex items-baseline">
                            <div className="text-2xl font-semibold text-gray-900">
                              {((hrKPIs.attrition / hrKPIs.totalEmployees) * 100).toFixed(1)}%
                            </div>
                            <div className="ml-2 flex items-baseline text-sm font-semibold text-red-600">
                              <ArrowDownRight className="h-4 w-4 mr-1" />
                              -0.8%
                            </div>
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
                        <Award className="h-8 w-8 text-purple-600" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">Performance Score</dt>
                          <dd className="flex items-baseline">
                            <div className="text-2xl font-semibold text-gray-900">
                              {hrKPIs.performanceScore}/5
                            </div>
                            <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                              <ArrowUpRight className="h-4 w-4 mr-1" />
                              +0.3
                            </div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Department Analytics */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Department Analytics</h3>
              <div className="bg-white shadow border border-gray-200 rounded-lg overflow-hidden">
                <div className="px-4 py-5 sm:p-6">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Department
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Employees
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Attendance Rate
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Avg Salary
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Turnover Rate
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {departmentData.map((dept, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <Building className="h-5 w-5 text-gray-400 mr-3" />
                                <div className="text-sm font-medium text-gray-900">{dept.department}</div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {dept.employees}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="text-sm text-gray-900">{dept.attendance}%</div>
                                <div className="ml-2 w-16 bg-gray-200 rounded-full h-2">
                                  <div
                                    className="bg-green-600 h-2 rounded-full"
                                    style={{ width: `${dept.attendance}%` }}
                                  />
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              ${dept.avgSalary.toLocaleString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={cn(
                                "inline-flex px-2 py-1 text-xs font-semibold rounded-full",
                                dept.turnover < 5
                                  ? "bg-green-100 text-green-800"
                                  : dept.turnover < 10
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                              )}>
                                {dept.turnover}%
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* Trends Chart */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Monthly Trends</h3>
              <div className="bg-white shadow border border-gray-200 rounded-lg overflow-hidden">
                <div className="px-4 py-5 sm:p-6">
                  <div className="mb-4">
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-blue-500 rounded-full mr-2" />
                        <span>Employees</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-2" />
                        <span>Attendance %</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-red-500 rounded-full mr-2" />
                        <span>Attrition %</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-purple-500 rounded-full mr-2" />
                        <span>New Hires</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">Interactive chart showing monthly trends would be displayed here</p>
                      <p className="text-sm text-gray-500 mt-2">
                        Data: {monthlyTrends.length} months of HR metrics
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Insights */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white shadow border border-gray-200 rounded-lg overflow-hidden">
                <div className="px-4 py-5 sm:p-6">
                  <h4 className="text-md font-medium text-gray-900 mb-4">Key Insights</h4>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <TrendingUp className="h-5 w-5 text-green-500 mt-0.5 mr-3" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">Attendance Improvement</div>
                        <div className="text-sm text-gray-600">
                          Overall attendance has improved by 1.2% this month compared to last month
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5 mr-3" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">High Turnover Alert</div>
                        <div className="text-sm text-gray-600">
                          Sales department shows 15.2% turnover rate, requiring attention
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 mr-3" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">Hiring Success</div>
                        <div className="text-sm text-gray-600">
                          12 new hires this month, 8% above target for Q1 growth
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white shadow border border-gray-200 rounded-lg overflow-hidden">
                <div className="px-4 py-5 sm:p-6">
                  <h4 className="text-md font-medium text-gray-900 mb-4">Performance Metrics</h4>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">Average Working Hours</span>
                        <span className="text-sm text-gray-900">{hrKPIs.averageWorkingHours}h/day</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: "82%" }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">Leave Utilization</span>
                        <span className="text-sm text-gray-900">{hrKPIs.leaveUtilization}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: "68%" }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">Performance Score</span>
                        <span className="text-sm text-gray-900">{hrKPIs.performanceScore}/5</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-600 h-2 rounded-full" style={{ width: "84%" }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Generate Reports Tab */}
        {selectedTab === "reports" && (
          <>
            <div className="mb-6 bg-white rounded-lg border border-gray-200 p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                  <select
                    className="block w-full rounded-md border-gray-300 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                  >
                    <option value="last-week">Last Week</option>
                    <option value="last-month">Last Month</option>
                    <option value="last-quarter">Last Quarter</option>
                    <option value="last-year">Last Year</option>
                    <option value="custom">Custom Range</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                  <select
                    className="block w-full rounded-md border-gray-300 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                  >
                    <option value="all">All Departments</option>
                    <option value="engineering">Engineering</option>
                    <option value="design">Design</option>
                    <option value="marketing">Marketing</option>
                    <option value="sales">Sales</option>
                    <option value="hr">HR</option>
                    <option value="finance">Finance</option>
                  </select>
                </div>

                <div className="flex items-end">
                  <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
                    <Filter className="h-4 w-4 mr-2 inline" />
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {reportTypes.map((reportType) => {
                const Icon = reportType.icon;
                return (
                  <div
                    key={reportType.id}
                    className="bg-white border border-gray-200 rounded-lg p-6 hover:border-blue-300 transition-colors cursor-pointer"
                    onClick={() => setSelectedReportType(reportType.id)}
                  >
                    <div className="flex items-center mb-4">
                      <div className={`p-2 rounded-lg bg-${reportType.color}-100 mr-3`}>
                        <Icon className={`h-6 w-6 text-${reportType.color}-600`} />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900">{reportType.name}</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">{reportType.description}</p>
                    <div className="space-y-2">
                      {reportType.metrics.map((metric, index) => (
                        <div key={index} className="flex items-center text-sm text-gray-700">
                          <div className={`w-2 h-2 rounded-full bg-${reportType.color}-500 mr-2`} />
                          {metric}
                        </div>
                      ))}
                    </div>
                    <button className={`mt-4 w-full bg-${reportType.color}-50 text-${reportType.color}-700 px-3 py-2 rounded-md text-sm font-medium hover:bg-${reportType.color}-100`}>
                      Generate Report
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="bg-white shadow border border-gray-200 rounded-lg overflow-hidden">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Reports</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Report Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Generated By
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Size
                        </th>
                        <th className="relative px-6 py-3">
                          <span className="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {recentReports.map((report) => (
                        <tr key={report.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <FileText className="h-5 w-5 text-gray-400 mr-3" />
                              <div className="text-sm font-medium text-gray-900">{report.name}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {report.type}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {report.generatedBy}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {new Date(report.generatedDate).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              {getStatusIcon(report.status)}
                              <span className={cn(
                                "ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full",
                                getStatusColor(report.status)
                              )}>
                                {report.status}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {report.size}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex items-center space-x-2">
                              <button
                                className="text-blue-600 hover:text-blue-900"
                                title="View Report"
                              >
                                <Eye className="h-4 w-4" />
                              </button>
                              <button
                                className="text-green-600 hover:text-green-900"
                                title="Download Report"
                              >
                                <Download className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Custom Reports Tab */}
        {selectedTab === "custom" && (
          <div className="space-y-6">
            <div className="bg-white shadow border border-gray-200 rounded-lg overflow-hidden">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-6">Custom Report Builder</h3>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-md font-medium text-gray-900 mb-4">Data Sources</h4>
                        <div className="grid grid-cols-2 gap-4">
                          {["Employees", "Attendance", "Leave", "Payroll", "Performance", "Departments"].map((source) => (
                            <label key={source} className="flex items-center">
                              <input
                                type="checkbox"
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                              />
                              <span className="ml-2 text-sm text-gray-700">{source}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-md font-medium text-gray-900 mb-4">Filters</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Date Range</label>
                            <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                              <option>Last 30 days</option>
                              <option>Last 90 days</option>
                              <option>Last 6 months</option>
                              <option>Last year</option>
                              <option>Custom range</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700">Department</label>
                            <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                              <option>All Departments</option>
                              <option>Engineering</option>
                              <option>Design</option>
                              <option>Marketing</option>
                              <option>Sales</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700">Employee Status</label>
                            <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                              <option>All Employees</option>
                              <option>Active</option>
                              <option>Inactive</option>
                              <option>On Probation</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700">Grouping</label>
                            <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                              <option>None</option>
                              <option>By Department</option>
                              <option>By Month</option>
                              <option>By Employee</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-md font-medium text-gray-900 mb-4">Metrics</h4>
                        <div className="space-y-3">
                          {[
                            "Employee count",
                            "Attendance percentage",
                            "Average salary",
                            "Leave utilization",
                            "Performance scores",
                            "Turnover rate",
                            "Working hours",
                            "Cost per employee"
                          ].map((metric, index) => (
                            <label key={index} className="flex items-center">
                              <input
                                type="checkbox"
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                              />
                              <span className="ml-2 text-sm text-gray-700">{metric}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <h5 className="text-sm font-medium text-gray-900 mb-4">Report Preview</h5>
                      <div className="space-y-3">
                        <div className="bg-white p-3 rounded border">
                          <div className="text-xs text-gray-500 mb-1">Data Sources</div>
                          <div className="text-sm text-gray-900">Employees, Attendance</div>
                        </div>
                        <div className="bg-white p-3 rounded border">
                          <div className="text-xs text-gray-500 mb-1">Date Range</div>
                          <div className="text-sm text-gray-900">Last 30 days</div>
                        </div>
                        <div className="bg-white p-3 rounded border">
                          <div className="text-xs text-gray-500 mb-1">Metrics</div>
                          <div className="text-sm text-gray-900">3 selected</div>
                        </div>
                      </div>

                      <div className="mt-6 space-y-3">
                        <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
                          Generate Report
                        </button>
                        <button className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200">
                          Save Template
                        </button>
                        <button className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200">
                          Schedule Report
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Audit Logs Tab */}
        {selectedTab === "audit" && (
          <>
            <div className="mb-6 bg-white rounded-lg border border-gray-200 p-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search audit logs..."
                    className="block w-full rounded-md border-gray-300 pl-10 pr-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <select className="block w-full rounded-md border-gray-300 py-2 text-sm focus:border-blue-500 focus:ring-blue-500">
                  <option>All Actions</option>
                  <option>Login/Logout</option>
                  <option>Employee Changes</option>
                  <option>Salary Updates</option>
                  <option>Report Generation</option>
                  <option>System Settings</option>
                </select>

                <select className="block w-full rounded-md border-gray-300 py-2 text-sm focus:border-blue-500 focus:ring-blue-500">
                  <option>All Users</option>
                  <option>HR Admin</option>
                  <option>HR Manager</option>
                  <option>Department Managers</option>
                </select>

                <input
                  type="date"
                  className="block w-full rounded-md border-gray-300 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="bg-white shadow border border-gray-200 rounded-lg overflow-hidden">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Audit Logs ({auditLogs.length})
                  </h3>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
                    <Download className="h-4 w-4 mr-2 inline" />
                    Export Logs
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Action
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          User
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Timestamp
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Details
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {auditLogs.map((log) => (
                        <tr key={log.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <Activity className="h-5 w-5 text-gray-400 mr-3" />
                              <div className="text-sm font-medium text-gray-900">{log.action}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {log.user}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {new Date(log.timestamp).toLocaleString()}
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900 max-w-xs truncate">
                              {log.details}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              {getStatusIcon(log.status)}
                              <span className={cn(
                                "ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full",
                                getStatusColor(log.status)
                              )}>
                                {log.status}
                              </span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Report Builder Modal */}
        {showReportBuilder && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-screen items-center justify-center p-4">
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                   onClick={() => setShowReportBuilder(false)} />
              
              <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900">
                      Quick Report Builder
                    </h3>
                    <button
                      onClick={() => setShowReportBuilder(false)}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <span className="sr-only">Close</span>
                      ×
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {reportTypes.slice(0, 6).map((reportType) => {
                      const Icon = reportType.icon;
                      return (
                        <div
                          key={reportType.id}
                          className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors cursor-pointer"
                        >
                          <div className="flex items-center mb-3">
                            <Icon className={`h-6 w-6 text-${reportType.color}-600 mr-3`} />
                            <h4 className="text-md font-medium text-gray-900">{reportType.name}</h4>
                          </div>
                          <p className="text-sm text-gray-600 mb-4">{reportType.description}</p>
                          <button className={`w-full bg-${reportType.color}-50 text-${reportType.color}-700 px-3 py-2 rounded-md text-sm font-medium hover:bg-${reportType.color}-100`}>
                            Generate Now
                          </button>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      onClick={() => setShowReportBuilder(false)}
                      className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button className="bg-blue-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700">
                      Advanced Builder
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
