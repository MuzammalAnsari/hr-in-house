import { useState } from "react";
import {
  Calendar,
  Plus,
  Search,
  Filter,
  Eye,
  Check,
  X,
  Clock,
  AlertCircle,
  CheckCircle,
  XCircle,
  FileText,
  Download,
  Upload,
  Bell,
  User,
  Users,
  TrendingUp,
  CalendarDays,
  Briefcase,
  Heart,
  Plane,
  Coffee,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data for leave types
const leaveTypes = [
  {
    id: 1,
    name: "Annual Leave",
    code: "AL",
    color: "blue",
    icon: Plane,
    totalDays: 21,
    description: "Yearly vacation leave",
  },
  {
    id: 2,
    name: "Sick Leave",
    code: "SL",
    color: "red",
    icon: Heart,
    totalDays: 10,
    description: "Medical leave for illness",
  },
  {
    id: 3,
    name: "Casual Leave",
    code: "CL",
    color: "green",
    icon: Coffee,
    totalDays: 12,
    description: "Short-term personal leave",
  },
  {
    id: 4,
    name: "Unpaid Leave",
    code: "UL",
    color: "gray",
    icon: Briefcase,
    totalDays: 0,
    description: "Leave without pay",
  },
];

// Mock data for leave balances
const leaveBalances = [
  { type: "Annual Leave", total: 21, used: 8, remaining: 13, pending: 2 },
  { type: "Sick Leave", total: 10, used: 3, remaining: 7, pending: 0 },
  { type: "Casual Leave", total: 12, used: 5, remaining: 7, pending: 1 },
  { type: "Unpaid Leave", total: 0, used: 0, remaining: 0, pending: 0 },
];

// Mock data for leave requests
const leaveRequests = [
  {
    id: 1,
    employeeId: "EMP001",
    employeeName: "Sarah Johnson",
    department: "Engineering",
    leaveType: "Annual Leave",
    startDate: "2024-02-15",
    endDate: "2024-02-19",
    days: 5,
    reason: "Family vacation to Hawaii",
    status: "Pending",
    appliedDate: "2024-01-20",
    manager: "David Wilson",
    approvedBy: null,
    approvedDate: null,
    comments: null,
  },
  {
    id: 2,
    employeeId: "EMP002",
    employeeName: "Michael Chen",
    department: "Design",
    leaveType: "Sick Leave",
    startDate: "2024-01-22",
    endDate: "2024-01-22",
    days: 1,
    reason: "Doctor appointment",
    status: "Approved",
    appliedDate: "2024-01-20",
    manager: "Emily Davis",
    approvedBy: "Emily Davis",
    approvedDate: "2024-01-21",
    comments: "Get well soon!",
  },
  {
    id: 3,
    employeeId: "EMP003",
    employeeName: "Emily Davis",
    department: "Design",
    leaveType: "Casual Leave",
    startDate: "2024-02-01",
    endDate: "2024-02-02",
    days: 2,
    reason: "Personal matters",
    status: "Rejected",
    appliedDate: "2024-01-25",
    manager: "David Wilson",
    approvedBy: "David Wilson",
    approvedDate: "2024-01-26",
    comments: "Please reschedule as we have important project deadline.",
  },
  {
    id: 4,
    employeeId: "EMP004",
    employeeName: "David Wilson",
    department: "Engineering",
    leaveType: "Annual Leave",
    startDate: "2024-03-01",
    endDate: "2024-03-07",
    days: 7,
    reason: "Spring break vacation",
    status: "Approved",
    appliedDate: "2024-01-15",
    manager: "HR Admin",
    approvedBy: "HR Admin",
    approvedDate: "2024-01-16",
    comments: "Approved. Have a great vacation!",
  },
];

// Mock upcoming leaves
const upcomingLeaves = [
  {
    employee: "David Wilson",
    type: "Annual Leave",
    startDate: "2024-03-01",
    days: 7,
  },
  {
    employee: "Sarah Johnson",
    type: "Annual Leave",
    startDate: "2024-02-15",
    days: 5,
  },
  {
    employee: "Lisa Rodriguez",
    type: "Casual Leave",
    startDate: "2024-02-05",
    days: 1,
  },
];

export default function Leave() {
  const [selectedTab, setSelectedTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedLeaveType, setSelectedLeaveType] = useState("All");
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const filteredRequests = leaveRequests.filter((request) => {
    const matchesSearch =
      request.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment =
      selectedDepartment === "All" || request.department === selectedDepartment;
    const matchesStatus =
      selectedStatus === "All" || request.status === selectedStatus;
    const matchesType =
      selectedLeaveType === "All" || request.leaveType === selectedLeaveType;

    return matchesSearch && matchesDepartment && matchesStatus && matchesType;
  });

  const tabs = [
    { id: "overview", name: "Overview", count: null },
    { id: "requests", name: "Leave Requests", count: leaveRequests.length },
    { id: "calendar", name: "Leave Calendar", count: null },
    { id: "policies", name: "Leave Policies", count: null },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case "Approved":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "Rejected":
        return <XCircle className="h-4 w-4 text-red-500" />;
      case "Pending":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
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
                Leave Management
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Manage leave requests, approvals, and track leave balances
              </p>
            </div>
            <div className="flex space-x-3">
              <button className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </button>
              <button
                onClick={() => setShowApplyForm(true)}
                className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                <Plus className="h-4 w-4 mr-2" />
                Apply for Leave
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
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
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
            {/* Leave Balance Cards */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Your Leave Balance
              </h3>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {leaveBalances.map((balance, index) => {
                  const leaveType = leaveTypes.find(
                    (t) => t.name === balance.type,
                  );
                  const Icon = leaveType?.icon || Calendar;
                  const percentage =
                    balance.total > 0
                      ? Math.round((balance.remaining / balance.total) * 100)
                      : 0;

                  return (
                    <div
                      key={index}
                      className="bg-white overflow-hidden shadow border border-gray-200 rounded-lg"
                    >
                      <div className="p-5">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <Icon
                              className={`h-8 w-8 text-${leaveType?.color || "gray"}-600`}
                            />
                          </div>
                          <div className="ml-5 w-0 flex-1">
                            <dl>
                              <dt className="text-sm font-medium text-gray-500 truncate">
                                {balance.type}
                              </dt>
                              <dd className="flex items-baseline">
                                <div className="text-2xl font-semibold text-gray-900">
                                  {balance.remaining}
                                </div>
                                <div className="ml-2 text-sm text-gray-500">
                                  / {balance.total} days
                                </div>
                              </dd>
                            </dl>
                          </div>
                        </div>
                        <div className="mt-4">
                          <div className="flex justify-between text-sm text-gray-600 mb-1">
                            <span>Used: {balance.used}</span>
                            <span>Pending: {balance.pending}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`bg-${leaveType?.color || "gray"}-600 h-2 rounded-full`}
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="mb-8">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                <div className="bg-white overflow-hidden shadow border border-gray-200 rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <Clock className="h-8 w-8 text-yellow-600" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">
                            Pending Requests
                          </dt>
                          <dd className="text-lg font-medium text-gray-900">
                            {
                              leaveRequests.filter(
                                (r) => r.status === "Pending",
                              ).length
                            }
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
                        <CheckCircle className="h-8 w-8 text-green-600" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">
                            Approved This Month
                          </dt>
                          <dd className="text-lg font-medium text-gray-900">
                            {
                              leaveRequests.filter(
                                (r) => r.status === "Approved",
                              ).length
                            }
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
                        <Users className="h-8 w-8 text-blue-600" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">
                            People on Leave
                          </dt>
                          <dd className="text-lg font-medium text-gray-900">
                            {upcomingLeaves.length}
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Upcoming Leaves */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white shadow border border-gray-200 rounded-lg overflow-hidden">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Upcoming Leaves
                  </h3>
                  <div className="space-y-3">
                    {upcomingLeaves.map((leave, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200"
                      >
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                            <User className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-blue-800">
                              {leave.employee}
                            </div>
                            <div className="text-xs text-blue-600">
                              {leave.type} • {leave.days} days
                            </div>
                          </div>
                        </div>
                        <div className="text-xs text-blue-600">
                          {new Date(leave.startDate).toLocaleDateString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white shadow border border-gray-200 rounded-lg overflow-hidden">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Recent Activity
                  </h3>
                  <div className="space-y-3">
                    {leaveRequests.slice(0, 4).map((request) => (
                      <div
                        key={request.id}
                        className="flex items-center space-x-3"
                      >
                        {getStatusIcon(request.status)}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-900">
                            <span className="font-medium">
                              {request.employeeName}
                            </span>{" "}
                            applied for{" "}
                            <span className="font-medium">
                              {request.leaveType}
                            </span>
                          </p>
                          <p className="text-xs text-gray-500">
                            {new Date(request.appliedDate).toLocaleDateString()}
                          </p>
                        </div>
                        <span
                          className={cn(
                            "inline-flex px-2 py-1 text-xs font-semibold rounded-full",
                            getStatusColor(request.status),
                          )}
                        >
                          {request.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Requests Tab */}
        {selectedTab === "requests" && (
          <>
            {/* Filters */}
            <div className="mb-6 bg-white rounded-lg border border-gray-200 p-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                  value={selectedLeaveType}
                  onChange={(e) => setSelectedLeaveType(e.target.value)}
                >
                  <option value="All">All Leave Types</option>
                  <option value="Annual Leave">Annual Leave</option>
                  <option value="Sick Leave">Sick Leave</option>
                  <option value="Casual Leave">Casual Leave</option>
                  <option value="Unpaid Leave">Unpaid Leave</option>
                </select>

                <select
                  className="block w-full rounded-md border-gray-300 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option value="All">All Status</option>
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
            </div>

            {/* Leave Requests Table */}
            <div className="bg-white shadow border border-gray-200 rounded-lg overflow-hidden">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Leave Requests ({filteredRequests.length})
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
                          Leave Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Duration
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Applied Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Approver
                        </th>
                        <th className="relative px-6 py-3">
                          <span className="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredRequests.map((request) => (
                        <tr key={request.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-10 w-10 flex-shrink-0">
                                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                  <span className="text-sm font-medium text-blue-600">
                                    {request.employeeName
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </span>
                                </div>
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {request.employeeName}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {request.employeeId} • {request.department}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {request.leaveType}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {new Date(request.startDate).toLocaleDateString()}{" "}
                              - {new Date(request.endDate).toLocaleDateString()}
                            </div>
                            <div className="text-sm text-gray-500">
                              {request.days} days
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {new Date(request.appliedDate).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={cn(
                                "inline-flex px-2 py-1 text-xs font-semibold rounded-full",
                                getStatusColor(request.status),
                              )}
                            >
                              {request.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {request.approvedBy || request.manager}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => setSelectedRequest(request)}
                                className="text-blue-600 hover:text-blue-900"
                                title="View Details"
                              >
                                <Eye className="h-4 w-4" />
                              </button>
                              {request.status === "Pending" && (
                                <>
                                  <button
                                    className="text-green-600 hover:text-green-900"
                                    title="Approve"
                                  >
                                    <Check className="h-4 w-4" />
                                  </button>
                                  <button
                                    className="text-red-600 hover:text-red-900"
                                    title="Reject"
                                  >
                                    <X className="h-4 w-4" />
                                  </button>
                                </>
                              )}
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

        {/* Calendar Tab */}
        {selectedTab === "calendar" && (
          <div className="bg-white shadow border border-gray-200 rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-6">
                Leave Calendar
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-3">
                  <div className="bg-gray-50 rounded-lg p-8 text-center">
                    <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h4 className="text-lg font-medium text-gray-900 mb-2">
                      Calendar View
                    </h4>
                    <p className="text-gray-600">
                      Interactive calendar showing all employee leaves would be
                      displayed here.
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="text-md font-medium text-gray-900 mb-4">
                    Legend
                  </h4>
                  <div className="space-y-3">
                    {leaveTypes.map((type) => {
                      const Icon = type.icon;
                      return (
                        <div key={type.id} className="flex items-center">
                          <div
                            className={`w-4 h-4 rounded bg-${type.color}-500 mr-3`}
                          />
                          <Icon
                            className={`h-4 w-4 text-${type.color}-600 mr-2`}
                          />
                          <span className="text-sm text-gray-900">
                            {type.name}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-6">
                    <h5 className="text-sm font-medium text-gray-900 mb-3">
                      Quick Filters
                    </h5>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-2"
                        />
                        <span className="text-sm text-gray-700">
                          Show all leaves
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-2"
                        />
                        <span className="text-sm text-gray-700">
                          My team only
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-2"
                        />
                        <span className="text-sm text-gray-700">
                          Pending approvals
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Policies Tab */}
        {selectedTab === "policies" && (
          <div className="space-y-6">
            <div className="bg-white shadow border border-gray-200 rounded-lg overflow-hidden">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-6">
                  Leave Policies
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {leaveTypes.map((type) => {
                    const Icon = type.icon;
                    return (
                      <div
                        key={type.id}
                        className="border border-gray-200 rounded-lg p-4"
                      >
                        <div className="flex items-center mb-3">
                          <Icon
                            className={`h-6 w-6 text-${type.color}-600 mr-3`}
                          />
                          <div>
                            <h4 className="text-md font-medium text-gray-900">
                              {type.name}
                            </h4>
                            <p className="text-sm text-gray-500">
                              {type.description}
                            </p>
                          </div>
                        </div>

                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">
                              Annual Allocation:
                            </span>
                            <span className="font-medium">
                              {type.totalDays > 0
                                ? `${type.totalDays} days`
                                : "Unlimited"}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">
                              Carry Forward:
                            </span>
                            <span className="font-medium">
                              {type.name === "Annual Leave"
                                ? "5 days max"
                                : "Not allowed"}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">
                              Notice Period:
                            </span>
                            <span className="font-medium">
                              {type.name === "Annual Leave"
                                ? "2 weeks"
                                : type.name === "Sick Leave"
                                  ? "Same day"
                                  : "3 days"}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">
                              Documentation:
                            </span>
                            <span className="font-medium">
                              {type.name === "Sick Leave"
                                ? "Medical certificate for 3+ days"
                                : "Not required"}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex">
                    <AlertCircle className="h-5 w-5 text-blue-400 mt-0.5 mr-3" />
                    <div>
                      <h4 className="text-sm font-medium text-blue-800">
                        Important Notes
                      </h4>
                      <ul className="mt-2 text-sm text-blue-700 space-y-1">
                        <li>
                          • Leave requests must be submitted through this system
                        </li>
                        <li>
                          • Manager approval is required for all leave types
                        </li>
                        <li>
                          • HR approval required for leaves exceeding 5
                          consecutive days
                        </li>
                        <li>
                          • Emergency leave can be applied retroactively within
                          48 hours
                        </li>
                        <li>• Leave balance resets on January 1st each year</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Apply for Leave Modal */}
        {showApplyForm && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-screen items-center justify-center p-4">
              <div
                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                onClick={() => setShowApplyForm(false)}
              />

              <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900">
                      Apply for Leave
                    </h3>
                    <button
                      onClick={() => setShowApplyForm(false)}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <span className="sr-only">Close</span>×
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Leave Type *
                        </label>
                        <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                          <option value="">Select Leave Type</option>
                          {leaveTypes.map((type) => (
                            <option key={type.id} value={type.name}>
                              {type.name} ({type.code})
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Employee
                        </label>
                        <input
                          type="text"
                          value="Sarah Johnson (EMP001)"
                          disabled
                          className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm text-gray-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Start Date *
                        </label>
                        <input
                          type="date"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          End Date *
                        </label>
                        <input
                          type="date"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Total Days
                        </label>
                        <input
                          type="number"
                          placeholder="Auto-calculated"
                          disabled
                          className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm text-gray-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Half Day Option
                        </label>
                        <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                          <option value="full">Full Day</option>
                          <option value="first-half">First Half</option>
                          <option value="second-half">Second Half</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Reason for Leave *
                      </label>
                      <textarea
                        rows={4}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Please provide a reason for your leave request..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Contact Information During Leave
                      </label>
                      <input
                        type="text"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Emergency contact number or email"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Supporting Documents
                      </label>
                      <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                          <Upload className="mx-auto h-12 w-12 text-gray-400" />
                          <div className="flex text-sm text-gray-600">
                            <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                              <span>Upload files</span>
                              <input
                                type="file"
                                className="sr-only"
                                multiple
                                accept=".pdf,.doc,.docx,.jpg,.png"
                              />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500">
                            Medical certificates, travel documents, etc.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <div className="flex">
                        <AlertCircle className="h-5 w-5 text-yellow-400 mt-0.5 mr-3" />
                        <div>
                          <h4 className="text-sm font-medium text-yellow-800">
                            Leave Balance Check
                          </h4>
                          <p className="mt-1 text-sm text-yellow-700">
                            Annual Leave: 13 days remaining | This request will
                            use 5 days
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-3">
                      <button
                        type="button"
                        onClick={() => setShowApplyForm(false)}
                        className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-blue-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Submit Request
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Request Details Modal */}
        {selectedRequest && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-screen items-center justify-center p-4">
              <div
                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                onClick={() => setSelectedRequest(null)}
              />

              <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900">
                      Leave Request Details
                    </h3>
                    <button
                      onClick={() => setSelectedRequest(null)}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <span className="sr-only">Close</span>×
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Employee
                        </label>
                        <p className="mt-1 text-sm text-gray-900">
                          {selectedRequest.employeeName}
                        </p>
                        <p className="text-xs text-gray-500">
                          {selectedRequest.employeeId} •{" "}
                          {selectedRequest.department}
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Leave Type
                        </label>
                        <p className="mt-1 text-sm text-gray-900">
                          {selectedRequest.leaveType}
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Duration
                        </label>
                        <p className="mt-1 text-sm text-gray-900">
                          {new Date(
                            selectedRequest.startDate,
                          ).toLocaleDateString()}{" "}
                          to{" "}
                          {new Date(
                            selectedRequest.endDate,
                          ).toLocaleDateString()}
                        </p>
                        <p className="text-xs text-gray-500">
                          {selectedRequest.days} days
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Status
                        </label>
                        <span
                          className={cn(
                            "mt-1 inline-flex px-2 py-1 text-xs font-semibold rounded-full",
                            getStatusColor(selectedRequest.status),
                          )}
                        >
                          {selectedRequest.status}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Applied Date
                        </label>
                        <p className="mt-1 text-sm text-gray-900">
                          {new Date(
                            selectedRequest.appliedDate,
                          ).toLocaleDateString()}
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Manager
                        </label>
                        <p className="mt-1 text-sm text-gray-900">
                          {selectedRequest.manager}
                        </p>
                      </div>

                      {selectedRequest.approvedBy && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Approved By
                          </label>
                          <p className="mt-1 text-sm text-gray-900">
                            {selectedRequest.approvedBy}
                          </p>
                          <p className="text-xs text-gray-500">
                            {selectedRequest.approvedDate &&
                              new Date(
                                selectedRequest.approvedDate,
                              ).toLocaleDateString()}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700">
                      Reason
                    </label>
                    <p className="mt-1 text-sm text-gray-900">
                      {selectedRequest.reason}
                    </p>
                  </div>

                  {selectedRequest.comments && (
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Comments
                      </label>
                      <p className="mt-1 text-sm text-gray-900">
                        {selectedRequest.comments}
                      </p>
                    </div>
                  )}

                  {selectedRequest.status === "Pending" && (
                    <div className="mt-6 flex justify-end space-x-3">
                      <button className="bg-red-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-red-700">
                        Reject
                      </button>
                      <button className="bg-green-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-green-700">
                        Approve
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
