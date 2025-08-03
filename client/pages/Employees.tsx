import { useState } from "react";
import {
  Search,
  Plus,
  MoreHorizontal,
  Edit,
  Eye,
  Trash2,
  Upload,
  Download,
  Filter,
  UserPlus,
  Building,
  MapPin,
  Calendar,
  Phone,
  Mail,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data for employees
const employees = [
  {
    id: 1,
    employeeId: "EMP001",
    name: "Sarah Johnson",
    email: "sarah.johnson@company.com",
    phone: "+1 (555) 123-4567",
    department: "Engineering",
    designation: "Senior Developer",
    manager: "John Smith",
    joiningDate: "2023-01-15",
    status: "Active",
    probationStatus: "Confirmed",
    location: "New York",
    avatar: null,
  },
  {
    id: 2,
    employeeId: "EMP002",
    name: "Michael Chen",
    email: "michael.chen@company.com",
    phone: "+1 (555) 234-5678",
    department: "Design",
    designation: "UI/UX Designer",
    manager: "Emily Davis",
    joiningDate: "2023-03-22",
    status: "Active",
    probationStatus: "On Probation",
    location: "San Francisco",
    avatar: null,
  },
  {
    id: 3,
    employeeId: "EMP003",
    name: "Emily Davis",
    email: "emily.davis@company.com",
    phone: "+1 (555) 345-6789",
    department: "Design",
    designation: "Design Manager",
    manager: "David Wilson",
    joiningDate: "2022-06-10",
    status: "Active",
    probationStatus: "Confirmed",
    location: "San Francisco",
    avatar: null,
  },
  {
    id: 4,
    employeeId: "EMP004",
    name: "David Wilson",
    email: "david.wilson@company.com",
    phone: "+1 (555) 456-7890",
    department: "Engineering",
    designation: "Engineering Director",
    manager: null,
    joiningDate: "2021-11-05",
    status: "Active",
    probationStatus: "Confirmed",
    location: "New York",
    avatar: null,
  },
  {
    id: 5,
    employeeId: "EMP005",
    name: "Lisa Rodriguez",
    email: "lisa.rodriguez@company.com",
    phone: "+1 (555) 567-8901",
    department: "Marketing",
    designation: "Marketing Specialist",
    manager: "Robert Kim",
    joiningDate: "2023-09-01",
    status: "Active",
    probationStatus: "On Probation",
    location: "Austin",
    avatar: null,
  },
];

const departments = ["All", "Engineering", "Design", "Marketing", "HR", "Sales"];
const statuses = ["All", "Active", "Inactive", "On Leave"];
const probationStatuses = ["All", "On Probation", "Confirmed"];

export default function Employees() {
  const [selectedTab, setSelectedTab] = useState("list");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedProbation, setSelectedProbation] = useState("All");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === "All" || employee.department === selectedDepartment;
    const matchesStatus = selectedStatus === "All" || employee.status === selectedStatus;
    const matchesProbation = selectedProbation === "All" || employee.probationStatus === selectedProbation;
    
    return matchesSearch && matchesDepartment && matchesStatus && matchesProbation;
  });

  const tabs = [
    { id: "list", name: "Employee List", count: employees.length },
    { id: "add", name: "Add Employee", count: null },
  ];

  return (
    <div className="py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                Employee Management
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Manage employee profiles, documents, and organizational structure
              </p>
            </div>
            <div className="flex space-x-3">
              <button className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                <Download className="h-4 w-4 mr-2" />
                Export
              </button>
              <button
                onClick={() => setShowAddForm(true)}
                className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Employee
              </button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 bg-white rounded-lg border border-gray-200 p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
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

            {/* Department Filter */}
            <select
              className="block w-full rounded-md border-gray-300 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
            >
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept === "All" ? "All Departments" : dept}
                </option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              className="block w-full rounded-md border-gray-300 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status === "All" ? "All Statuses" : status}
                </option>
              ))}
            </select>

            {/* Probation Filter */}
            <select
              className="block w-full rounded-md border-gray-300 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
              value={selectedProbation}
              onChange={(e) => setSelectedProbation(e.target.value)}
            >
              {probationStatuses.map((status) => (
                <option key={status} value={status}>
                  {status === "All" ? "All Probation Status" : status}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Employee Table */}
        <div className="bg-white shadow border border-gray-200 rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Employees ({filteredEmployees.length})
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
                      Department
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Designation
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Manager
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Joining Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Probation
                    </th>
                    <th className="relative px-6 py-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredEmployees.map((employee) => (
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
                              {employee.employeeId} • {employee.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Building className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-900">{employee.department}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {employee.designation}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {employee.manager || "—"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-900">{employee.joiningDate}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={cn(
                          "inline-flex px-2 py-1 text-xs font-semibold rounded-full",
                          employee.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : employee.status === "Inactive"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        )}>
                          {employee.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={cn(
                          "inline-flex px-2 py-1 text-xs font-semibold rounded-full",
                          employee.probationStatus === "Confirmed"
                            ? "bg-green-100 text-green-800"
                            : "bg-orange-100 text-orange-800"
                        )}>
                          {employee.probationStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => setSelectedEmployee(employee)}
                            className="text-blue-600 hover:text-blue-900"
                            title="View Employee"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            className="text-green-600 hover:text-green-900"
                            title="Edit Employee"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            className="text-red-600 hover:text-red-900"
                            title="Deactivate Employee"
                          >
                            <Trash2 className="h-4 w-4" />
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

        {/* Employee Detail Modal */}
        {selectedEmployee && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-screen items-center justify-center p-4">
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                   onClick={() => setSelectedEmployee(null)} />
              
              <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900">
                      Employee Profile - {selectedEmployee.name}
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
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Profile Info */}
                    <div className="lg:col-span-2">
                      <div className="bg-gray-50 rounded-lg p-4 mb-6">
                        <div className="flex items-center">
                          <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="text-xl font-medium text-blue-600">
                              {selectedEmployee.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div className="ml-4">
                            <h4 className="text-xl font-bold text-gray-900">{selectedEmployee.name}</h4>
                            <p className="text-sm text-gray-500">{selectedEmployee.designation}</p>
                            <p className="text-sm text-gray-500">{selectedEmployee.department}</p>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Employee ID</label>
                            <p className="mt-1 text-sm text-gray-900">{selectedEmployee.employeeId}</p>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <div className="mt-1 flex items-center">
                              <Mail className="h-4 w-4 text-gray-400 mr-2" />
                              <p className="text-sm text-gray-900">{selectedEmployee.email}</p>
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Phone</label>
                            <div className="mt-1 flex items-center">
                              <Phone className="h-4 w-4 text-gray-400 mr-2" />
                              <p className="text-sm text-gray-900">{selectedEmployee.phone}</p>
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Location</label>
                            <div className="mt-1 flex items-center">
                              <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                              <p className="text-sm text-gray-900">{selectedEmployee.location}</p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Manager</label>
                            <p className="mt-1 text-sm text-gray-900">{selectedEmployee.manager || "—"}</p>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Joining Date</label>
                            <p className="mt-1 text-sm text-gray-900">{selectedEmployee.joiningDate}</p>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Status</label>
                            <span className={cn(
                              "mt-1 inline-flex px-2 py-1 text-xs font-semibold rounded-full",
                              selectedEmployee.status === "Active"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            )}>
                              {selectedEmployee.status}
                            </span>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Probation Status</label>
                            <span className={cn(
                              "mt-1 inline-flex px-2 py-1 text-xs font-semibold rounded-full",
                              selectedEmployee.probationStatus === "Confirmed"
                                ? "bg-green-100 text-green-800"
                                : "bg-orange-100 text-orange-800"
                            )}>
                              {selectedEmployee.probationStatus}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Documents & Actions */}
                    <div>
                      <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <h5 className="text-sm font-medium text-gray-900 mb-4">Documents</h5>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                            <div className="flex items-center">
                              <FileText className="h-4 w-4 text-gray-400 mr-2" />
                              <span className="text-sm text-gray-900">CNIC Copy</span>
                            </div>
                            <button className="text-blue-600 hover:text-blue-700 text-sm">
                              View
                            </button>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                            <div className="flex items-center">
                              <FileText className="h-4 w-4 text-gray-400 mr-2" />
                              <span className="text-sm text-gray-900">Contract</span>
                            </div>
                            <button className="text-blue-600 hover:text-blue-700 text-sm">
                              View
                            </button>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                            <div className="flex items-center">
                              <FileText className="h-4 w-4 text-gray-400 mr-2" />
                              <span className="text-sm text-gray-900">Offer Letter</span>
                            </div>
                            <button className="text-blue-600 hover:text-blue-700 text-sm">
                              View
                            </button>
                          </div>
                          <button className="w-full flex items-center justify-center p-3 border-2 border-dashed border-gray-300 rounded-md text-sm text-gray-600 hover:border-gray-400">
                            <Upload className="h-4 w-4 mr-2" />
                            Upload Document
                          </button>
                        </div>

                        <div className="mt-6 space-y-2">
                          <button className="w-full bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
                            Edit Employee
                          </button>
                          <button className="w-full bg-gray-100 text-gray-700 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-200">
                            View Attendance
                          </button>
                          <button className="w-full bg-gray-100 text-gray-700 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-200">
                            Performance Review
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Add Employee Modal */}
        {showAddForm && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-screen items-center justify-center p-4">
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                   onClick={() => setShowAddForm(false)} />
              
              <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900">
                      Add New Employee
                    </h3>
                    <button
                      onClick={() => setShowAddForm(false)}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <span className="sr-only">Close</span>
                      ×
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          placeholder="Enter full name"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Employee ID *
                        </label>
                        <input
                          type="text"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          placeholder="EMP001"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          placeholder="employee@company.com"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Department *
                        </label>
                        <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                          <option value="">Select Department</option>
                          <option value="Engineering">Engineering</option>
                          <option value="Design">Design</option>
                          <option value="Marketing">Marketing</option>
                          <option value="HR">HR</option>
                          <option value="Sales">Sales</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Designation *
                        </label>
                        <input
                          type="text"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          placeholder="Job title"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Manager
                        </label>
                        <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                          <option value="">Select Manager</option>
                          <option value="John Smith">John Smith</option>
                          <option value="Emily Davis">Emily Davis</option>
                          <option value="David Wilson">David Wilson</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Joining Date *
                        </label>
                        <input
                          type="date"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Location
                        </label>
                        <input
                          type="text"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          placeholder="Office location"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Salary
                        </label>
                        <input
                          type="number"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          placeholder="Annual salary"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Upload Documents
                      </label>
                      <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                          <Upload className="mx-auto h-12 w-12 text-gray-400" />
                          <div className="flex text-sm text-gray-600">
                            <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                              <span>Upload files</span>
                              <input type="file" className="sr-only" multiple accept=".pdf,.doc,.docx,.jpg,.png" />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500">PDF, DOC, JPG, PNG up to 10MB</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-3">
                      <button
                        type="button"
                        onClick={() => setShowAddForm(false)}
                        className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-blue-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Add Employee
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
