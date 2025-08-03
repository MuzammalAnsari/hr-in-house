import { useState } from "react";
import {
  FileText,
  Download,
  Eye,
  Calendar,
  DollarSign,
  TrendingUp,
  Search,
  Filter,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock payslip data for employee
const payslips = [
  {
    id: 1,
    period: "January 2024",
    payDate: "2024-01-31",
    grossSalary: 123000,
    deductions: 26400,
    netSalary: 96600,
    status: "Paid",
    downloadUrl: "#",
  },
  {
    id: 2,
    period: "December 2023",
    payDate: "2023-12-31",
    grossSalary: 118000,
    deductions: 24400,
    netSalary: 93600,
    status: "Paid",
    downloadUrl: "#",
  },
  {
    id: 3,
    period: "November 2023",
    payDate: "2023-11-30",
    grossSalary: 123000,
    deductions: 26400,
    netSalary: 96600,
    status: "Paid",
    downloadUrl: "#",
  },
  {
    id: 4,
    period: "October 2023",
    payDate: "2023-10-31",
    grossSalary: 123000,
    deductions: 26400,
    netSalary: 96600,
    status: "Paid",
    downloadUrl: "#",
  },
];

// Mock salary breakdown for latest payslip
const latestPayslip = {
  period: "January 2024",
  employee: {
    name: "Sarah Johnson",
    employeeId: "EMP001",
    department: "Engineering",
    designation: "Senior Developer",
  },
  earnings: {
    basicSalary: 95000,
    housingAllowance: 15000,
    transportAllowance: 5000,
    medicalAllowance: 3000,
    performanceBonus: 5000,
  },
  deductions: {
    incomeTax: 19000,
    socialSecurity: 5700,
    insurance: 1700,
  },
  summary: {
    totalEarnings: 123000,
    totalDeductions: 26400,
    netSalary: 96600,
  },
  payDate: "2024-01-31",
};

export default function EmployeePayslips() {
  const [selectedTab, setSelectedTab] = useState("payslips");
  const [selectedPeriod, setSelectedPeriod] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showPayslipDetail, setShowPayslipDetail] = useState(false);

  const tabs = [
    { id: "payslips", name: "My Payslips", count: payslips.length },
    { id: "summary", name: "Salary Summary", count: null },
  ];

  const filteredPayslips = payslips.filter((payslip) => {
    const matchesSearch = payslip.period.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPeriod = selectedPeriod === "all" || 
      payslip.period.includes(selectedPeriod);
    
    return matchesSearch && matchesPeriod;
  });

  const totalEarningsThisYear = payslips.reduce((sum, payslip) => sum + payslip.grossSalary, 0);
  const totalDeductionsThisYear = payslips.reduce((sum, payslip) => sum + payslip.deductions, 0);
  const totalNetThisYear = payslips.reduce((sum, payslip) => sum + payslip.netSalary, 0);

  return (
    <div className="py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            My Payslips
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            View and download your salary payslips
          </p>
        </div>

        {/* Quick Stats */}
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
                      <dt className="text-sm font-medium text-gray-500 truncate">Latest Net Salary</dt>
                      <dd className="text-lg font-medium text-gray-900">
                        ${payslips[0]?.netSalary.toLocaleString()}
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
                    <TrendingUp className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">YTD Earnings</dt>
                      <dd className="text-lg font-medium text-gray-900">
                        ${totalEarningsThisYear.toLocaleString()}
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
                    <FileText className="h-8 w-8 text-purple-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Total Payslips</dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {payslips.length}
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
                    <Calendar className="h-8 w-8 text-orange-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Last Paid</dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {new Date(payslips[0]?.payDate).toLocaleDateString()}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
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

        {/* Payslips Tab */}
        {selectedTab === "payslips" && (
          <>
            {/* Filters */}
            <div className="mb-6 bg-white rounded-lg border border-gray-200 p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by period..."
                    className="block w-full rounded-md border-gray-300 pl-10 pr-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <select
                  className="block w-full rounded-md border-gray-300 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                >
                  <option value="all">All Periods</option>
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                </select>

                <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  <Filter className="h-4 w-4 mr-2" />
                  More Filters
                </button>
              </div>
            </div>

            {/* Payslips Table */}
            <div className="bg-white shadow border border-gray-200 rounded-lg overflow-hidden">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Payslip History ({filteredPayslips.length})
                </h3>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Pay Period
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Pay Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Gross Salary
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Deductions
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Net Salary
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="relative px-6 py-3">
                          <span className="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredPayslips.map((payslip) => (
                        <tr key={payslip.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                              <div className="text-sm font-medium text-gray-900">
                                {payslip.period}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {new Date(payslip.payDate).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            ${payslip.grossSalary.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">
                            -${payslip.deductions.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                            ${payslip.netSalary.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                              {payslip.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => setShowPayslipDetail(true)}
                                className="text-blue-600 hover:text-blue-900"
                                title="View Details"
                              >
                                <Eye className="h-4 w-4" />
                              </button>
                              <a
                                href={payslip.downloadUrl}
                                className="text-green-600 hover:text-green-900"
                                title="Download Payslip"
                              >
                                <Download className="h-4 w-4" />
                              </a>
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

        {/* Summary Tab */}
        {selectedTab === "summary" && (
          <div className="space-y-6">
            {/* Yearly Summary */}
            <div className="bg-white shadow border border-gray-200 rounded-lg overflow-hidden">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-6">2024 Salary Summary</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-green-50 rounded-lg">
                    <div className="text-3xl font-bold text-green-600">
                      ${totalEarningsThisYear.toLocaleString()}
                    </div>
                    <div className="text-sm text-green-800 mt-1">Total Earnings</div>
                  </div>
                  
                  <div className="text-center p-6 bg-red-50 rounded-lg">
                    <div className="text-3xl font-bold text-red-600">
                      ${totalDeductionsThisYear.toLocaleString()}
                    </div>
                    <div className="text-sm text-red-800 mt-1">Total Deductions</div>
                  </div>
                  
                  <div className="text-center p-6 bg-blue-50 rounded-lg">
                    <div className="text-3xl font-bold text-blue-600">
                      ${totalNetThisYear.toLocaleString()}
                    </div>
                    <div className="text-sm text-blue-800 mt-1">Net Salary</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Monthly Breakdown */}
            <div className="bg-white shadow border border-gray-200 rounded-lg overflow-hidden">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Monthly Breakdown</h3>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Month
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Gross
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Deductions
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Net
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Tax Paid
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {payslips.map((payslip) => (
                        <tr key={payslip.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {payslip.period}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            ${payslip.grossSalary.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">
                            ${payslip.deductions.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                            ${payslip.netSalary.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            ${Math.round(payslip.deductions * 0.7).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Payslip Detail Modal */}
        {showPayslipDetail && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-screen items-center justify-center p-4">
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                   onClick={() => setShowPayslipDetail(false)} />
              
              <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900">
                      Payslip Details - {latestPayslip.period}
                    </h3>
                    <div className="flex items-center space-x-3">
                      <button className="inline-flex items-center px-3 py-1 border border-gray-300 rounded text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </button>
                      <button
                        onClick={() => setShowPayslipDetail(false)}
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <span className="sr-only">Close</span>
                        ×
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  {/* Employee Info */}
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm font-medium text-gray-700">Employee Name</div>
                        <div className="text-sm text-gray-900">{latestPayslip.employee.name}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-700">Employee ID</div>
                        <div className="text-sm text-gray-900">{latestPayslip.employee.employeeId}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-700">Department</div>
                        <div className="text-sm text-gray-900">{latestPayslip.employee.department}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-700">Pay Date</div>
                        <div className="text-sm text-gray-900">
                          {new Date(latestPayslip.payDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Earnings */}
                    <div>
                      <h4 className="text-md font-medium text-gray-900 mb-4">Earnings</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Basic Salary</span>
                          <span className="text-sm font-medium text-gray-900">
                            ${latestPayslip.earnings.basicSalary.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Housing Allowance</span>
                          <span className="text-sm font-medium text-gray-900">
                            ${latestPayslip.earnings.housingAllowance.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Transport Allowance</span>
                          <span className="text-sm font-medium text-gray-900">
                            ${latestPayslip.earnings.transportAllowance.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Medical Allowance</span>
                          <span className="text-sm font-medium text-gray-900">
                            ${latestPayslip.earnings.medicalAllowance.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Performance Bonus</span>
                          <span className="text-sm font-medium text-gray-900">
                            ${latestPayslip.earnings.performanceBonus.toLocaleString()}
                          </span>
                        </div>
                        <div className="border-t pt-3">
                          <div className="flex justify-between font-medium">
                            <span className="text-sm text-gray-900">Total Earnings</span>
                            <span className="text-sm text-green-600">
                              ${latestPayslip.summary.totalEarnings.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Deductions */}
                    <div>
                      <h4 className="text-md font-medium text-gray-900 mb-4">Deductions</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Income Tax</span>
                          <span className="text-sm font-medium text-gray-900">
                            ${latestPayslip.deductions.incomeTax.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Social Security</span>
                          <span className="text-sm font-medium text-gray-900">
                            ${latestPayslip.deductions.socialSecurity.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Insurance</span>
                          <span className="text-sm font-medium text-gray-900">
                            ${latestPayslip.deductions.insurance.toLocaleString()}
                          </span>
                        </div>
                        <div className="border-t pt-3">
                          <div className="flex justify-between font-medium">
                            <span className="text-sm text-gray-900">Total Deductions</span>
                            <span className="text-sm text-red-600">
                              ${latestPayslip.summary.totalDeductions.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Net Salary */}
                  <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-medium text-green-800">Net Salary</span>
                      <span className="text-2xl font-bold text-green-600">
                        ${latestPayslip.summary.netSalary.toLocaleString()}
                      </span>
                    </div>
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
