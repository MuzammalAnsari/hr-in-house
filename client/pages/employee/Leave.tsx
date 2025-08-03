import { useState } from "react";
import {
  Calendar,
  Plus,
  Eye,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Plane,
  Heart,
  Coffee,
  Briefcase,
  FileText,
  Download,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data for employee's leave requests
const myLeaveRequests = [
  {
    id: 1,
    leaveType: "Annual Leave",
    startDate: "2024-02-15",
    endDate: "2024-02-19",
    days: 5,
    reason: "Family vacation to Hawaii",
    status: "Pending",
    appliedDate: "2024-01-20",
    approvedBy: null,
    comments: null,
  },
  {
    id: 2,
    leaveType: "Sick Leave",
    startDate: "2024-01-22",
    endDate: "2024-01-22",
    days: 1,
    reason: "Doctor appointment",
    status: "Approved",
    appliedDate: "2024-01-20",
    approvedBy: "Emily Davis",
    comments: "Get well soon!",
  },
  {
    id: 3,
    leaveType: "Casual Leave",
    startDate: "2024-02-01",
    endDate: "2024-02-02",
    days: 2,
    reason: "Personal matters",
    status: "Rejected",
    appliedDate: "2024-01-25",
    approvedBy: "Emily Davis",
    comments: "Please reschedule as we have important project deadline.",
  },
];

// Mock leave balance data
const leaveBalance = [
  {
    type: "Annual Leave",
    total: 21,
    used: 8,
    remaining: 13,
    pending: 2,
    icon: Plane,
    color: "blue",
  },
  {
    type: "Sick Leave",
    total: 10,
    used: 3,
    remaining: 7,
    pending: 0,
    icon: Heart,
    color: "red",
  },
  {
    type: "Casual Leave",
    total: 12,
    used: 5,
    remaining: 7,
    pending: 1,
    icon: Coffee,
    color: "green",
  },
  {
    type: "Unpaid Leave",
    total: 0,
    used: 0,
    remaining: 0,
    pending: 0,
    icon: Briefcase,
    color: "gray",
  },
];

// Leave types for application
const leaveTypes = [
  {
    id: 1,
    name: "Annual Leave",
    code: "AL",
    description: "Yearly vacation leave",
  },
  {
    id: 2,
    name: "Sick Leave",
    code: "SL",
    description: "Medical leave for illness",
  },
  {
    id: 3,
    name: "Casual Leave",
    code: "CL",
    description: "Short-term personal leave",
  },
  { id: 4, name: "Unpaid Leave", code: "UL", description: "Leave without pay" },
];

export default function EmployeeLeave() {
  const [selectedTab, setSelectedTab] = useState("balance");
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const tabs = [
    { id: "balance", name: "Leave Balance", count: null },
    { id: "requests", name: "My Requests", count: myLeaveRequests.length },
    { id: "calendar", name: "Leave Calendar", count: null },
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
                My Leaves
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Manage your leave requests and view balance
              </p>
            </div>
            <button
              onClick={() => setShowApplyForm(true)}
              className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              <Plus className="h-4 w-4 mr-2" />
              Apply for Leave
            </button>
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

        {/* Leave Balance Tab */}
        {selectedTab === "balance" && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            {leaveBalance.map((balance, index) => {
              const Icon = balance.icon;
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
                    <div className="flex items-center mb-4">
                      <div
                        className={`flex-shrink-0 p-2 rounded-lg bg-${balance.color}-100`}
                      >
                        <Icon className={`h-6 w-6 text-${balance.color}-600`} />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-gray-900">
                          {balance.type}
                        </h3>
                        <p className="text-xs text-gray-500">
                          {balance.total > 0
                            ? `${balance.total} days allocated`
                            : "Unlimited"}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold text-gray-900">
                          {balance.remaining}
                        </span>
                        <span className="text-sm text-gray-500">
                          days remaining
                        </span>
                      </div>

                      {balance.total > 0 && (
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`bg-${balance.color}-600 h-2 rounded-full transition-all duration-300`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      )}

                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="text-center p-2 bg-gray-50 rounded">
                          <div className="font-medium text-gray-900">
                            {balance.used}
                          </div>
                          <div className="text-gray-500">Used</div>
                        </div>
                        <div className="text-center p-2 bg-yellow-50 rounded">
                          <div className="font-medium text-yellow-800">
                            {balance.pending}
                          </div>
                          <div className="text-yellow-600">Pending</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* My Requests Tab */}
        {selectedTab === "requests" && (
          <div className="bg-white shadow border border-gray-200 rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  My Leave Requests ({myLeaveRequests.length})
                </h3>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
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
                    {myLeaveRequests.map((request) => (
                      <tr key={request.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {request.leaveType}
                          </div>
                          <div className="text-sm text-gray-500">
                            {request.reason}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {new Date(request.startDate).toLocaleDateString()} -{" "}
                            {new Date(request.endDate).toLocaleDateString()}
                          </div>
                          <div className="text-sm text-gray-500">
                            {request.days} days
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(request.appliedDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {getStatusIcon(request.status)}
                            <span
                              className={cn(
                                "ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full",
                                getStatusColor(request.status),
                              )}
                            >
                              {request.status}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {request.approvedBy || "Pending"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => setSelectedRequest(request)}
                            className="text-blue-600 hover:text-blue-900"
                            title="View Details"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Calendar Tab */}
        {selectedTab === "calendar" && (
          <div className="bg-white shadow border border-gray-200 rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-6">
                My Leave Calendar
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-3">
                  <div className="bg-gray-50 rounded-lg p-8 text-center">
                    <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h4 className="text-lg font-medium text-gray-900 mb-2">
                      Personal Leave Calendar
                    </h4>
                    <p className="text-gray-600">
                      Your personal leave calendar showing approved and pending
                      leaves would be displayed here.
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="text-md font-medium text-gray-900 mb-4">
                    My Leave Status
                  </h4>
                  <div className="space-y-3">
                    {leaveTypes.map((type, index) => (
                      <div
                        key={type.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {type.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {type.code}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-gray-900">
                            {leaveBalance[index]?.remaining || 0}
                          </div>
                          <div className="text-xs text-gray-500">remaining</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Apply Leave Modal */}
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
                          Duration Type
                        </label>
                        <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                          <option value="full">Full Day</option>
                          <option value="first-half">First Half</option>
                          <option value="second-half">Second Half</option>
                        </select>
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
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Reason for Leave *
                      </label>
                      <textarea
                        rows={4}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Please provide a detailed reason for your leave request..."
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

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex">
                        <AlertCircle className="h-5 w-5 text-blue-400 mt-0.5 mr-3" />
                        <div>
                          <h4 className="text-sm font-medium text-blue-800">
                            Leave Balance Check
                          </h4>
                          <p className="mt-1 text-sm text-blue-700">
                            Annual Leave: 13 days remaining | This request will
                            be deducted from your balance
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-3">
                      <button
                        type="button"
                        onClick={() => setShowApplyForm(false)}
                        className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-blue-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700"
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

              <div className="relative bg-white rounded-lg shadow-xl max-w-lg w-full">
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
                  <div className="space-y-4">
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
                        {new Date(selectedRequest.endDate).toLocaleDateString()}{" "}
                        ({selectedRequest.days} days)
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Reason
                      </label>
                      <p className="mt-1 text-sm text-gray-900">
                        {selectedRequest.reason}
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Status
                      </label>
                      <div className="mt-1 flex items-center">
                        {getStatusIcon(selectedRequest.status)}
                        <span
                          className={cn(
                            "ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full",
                            getStatusColor(selectedRequest.status),
                          )}
                        >
                          {selectedRequest.status}
                        </span>
                      </div>
                    </div>

                    {selectedRequest.comments && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Comments
                        </label>
                        <p className="mt-1 text-sm text-gray-900">
                          {selectedRequest.comments}
                        </p>
                      </div>
                    )}
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
