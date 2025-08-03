import {
  Clock,
  Calendar,
  CheckCircle,
  AlertCircle,
  FileText,
  TrendingUp,
  MapPin,
  Phone,
  Mail,
  Building,
  Award,
  Target,
} from "lucide-react";

// Mock employee data
const employeeData = {
  name: "Sarah Johnson",
  employeeId: "EMP001",
  department: "Engineering",
  designation: "Senior Developer",
  email: "sarah.johnson@company.com",
  phone: "+1 (555) 123-4567",
  joiningDate: "2023-01-15",
  location: "New York Office",
  manager: "David Wilson",
};

const todayStats = {
  checkIn: "09:15 AM",
  checkOut: null,
  workingHours: "6h 45m",
  status: "Present",
  isLate: true,
};

const leaveBalance = {
  annual: { total: 21, used: 8, remaining: 13 },
  sick: { total: 10, used: 3, remaining: 7 },
  casual: { total: 12, used: 5, remaining: 7 },
};

const recentActivity = [
  {
    id: 1,
    type: "attendance",
    title: "Checked in late",
    description: "Arrived at 9:15 AM (15 minutes late)",
    time: "Today 9:15 AM",
    status: "warning",
  },
  {
    id: 2,
    type: "leave",
    title: "Leave request approved",
    description: "Annual leave for March 15-19 approved by manager",
    time: "Yesterday 2:30 PM",
    status: "success",
  },
  {
    id: 3,
    type: "payslip",
    title: "January payslip available",
    description: "Monthly payslip ready for download",
    time: "2 days ago",
    status: "info",
  },
];

const upcomingEvents = [
  {
    id: 1,
    title: "Team Building Workshop",
    date: "March 15, 2024",
    time: "10:00 AM",
    type: "Company Event",
  },
  {
    id: 2,
    title: "Performance Review",
    date: "March 20, 2024",
    time: "2:00 PM",
    type: "Meeting",
  },
  {
    id: 3,
    title: "Scheduled Leave",
    date: "March 25, 2024",
    time: "All Day",
    type: "Leave",
  },
];

export default function EmployeeDashboard() {
  return (
    <div className="py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg px-6 py-8 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">
                  Good morning, {employeeData.name}! 👋
                </h1>
                <p className="mt-2 text-blue-100">
                  Welcome back to your employee portal
                </p>
              </div>
              <div className="text-right">
                <div className="text-sm text-blue-100">Employee ID</div>
                <div className="text-xl font-bold">{employeeData.employeeId}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Today's Status */}
        <div className="mb-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Today's Status</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white overflow-hidden shadow border border-gray-200 rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Clock className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Check In</dt>
                      <dd className="flex items-baseline">
                        <div className={`text-lg font-medium ${todayStats.isLate ? 'text-red-600' : 'text-gray-900'}`}>
                          {todayStats.checkIn}
                        </div>
                        {todayStats.isLate && (
                          <span className="ml-2 text-xs text-red-500 font-medium">Late</span>
                        )}
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
                    <Clock className="h-8 w-8 text-green-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Working Hours</dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {todayStats.workingHours}
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
                      <dt className="text-sm font-medium text-gray-500 truncate">Status</dt>
                      <dd className="text-lg font-medium text-green-600">
                        {todayStats.status}
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
                    <Calendar className="h-8 w-8 text-purple-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Leaves Remaining</dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {leaveBalance.annual.remaining} days
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Leave Balance & Profile */}
          <div className="lg:col-span-2 space-y-6">
            {/* Leave Balance */}
            <div className="bg-white shadow border border-gray-200 rounded-lg overflow-hidden">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">My Leave Balance</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 text-blue-600 mr-3" />
                      <div>
                        <div className="text-sm font-medium text-blue-900">Annual Leave</div>
                        <div className="text-xs text-blue-700">Used: {leaveBalance.annual.used} days</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-blue-900">
                        {leaveBalance.annual.remaining}
                      </div>
                      <div className="text-xs text-blue-700">remaining</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 text-red-600 mr-3" />
                      <div>
                        <div className="text-sm font-medium text-red-900">Sick Leave</div>
                        <div className="text-xs text-red-700">Used: {leaveBalance.sick.used} days</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-red-900">
                        {leaveBalance.sick.remaining}
                      </div>
                      <div className="text-xs text-red-700">remaining</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 text-green-600 mr-3" />
                      <div>
                        <div className="text-sm font-medium text-green-900">Casual Leave</div>
                        <div className="text-xs text-green-700">Used: {leaveBalance.casual.used} days</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-900">
                        {leaveBalance.casual.remaining}
                      </div>
                      <div className="text-xs text-green-700">remaining</div>
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
                  <button className="flex flex-col items-center p-4 border-2 border-dashed border-blue-300 rounded-lg hover:border-blue-400 transition-colors text-blue-600 hover:text-blue-700">
                    <Calendar className="h-8 w-8 mb-2" />
                    <span className="text-sm font-medium">Apply for Leave</span>
                  </button>
                  
                  <button className="flex flex-col items-center p-4 border-2 border-dashed border-green-300 rounded-lg hover:border-green-400 transition-colors text-green-600 hover:text-green-700">
                    <Clock className="h-8 w-8 mb-2" />
                    <span className="text-sm font-medium">Mark Attendance</span>
                  </button>
                  
                  <button className="flex flex-col items-center p-4 border-2 border-dashed border-purple-300 rounded-lg hover:border-purple-400 transition-colors text-purple-600 hover:text-purple-700">
                    <FileText className="h-8 w-8 mb-2" />
                    <span className="text-sm font-medium">Download Payslip</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Activities & Events */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <div className="bg-white shadow border border-gray-200 rounded-lg overflow-hidden">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3">
                      <div className={`flex-shrink-0 w-2 h-2 rounded-full mt-2 ${
                        activity.status === 'success' ? 'bg-green-500' :
                        activity.status === 'warning' ? 'bg-yellow-500' :
                        activity.status === 'info' ? 'bg-blue-500' : 'bg-gray-500'
                      }`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                        <p className="text-sm text-gray-500">{activity.description}</p>
                        <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-white shadow border border-gray-200 rounded-lg overflow-hidden">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Upcoming Events</h3>
                <div className="space-y-3">
                  {upcomingEvents.map((event) => (
                    <div key={event.id} className="border-l-4 border-blue-400 bg-blue-50 p-3 rounded-r-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-blue-900">{event.title}</p>
                          <p className="text-xs text-blue-700">{event.type}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-blue-700">{event.date}</p>
                          <p className="text-xs text-blue-600">{event.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* My Profile Summary */}
            <div className="bg-white shadow border border-gray-200 rounded-lg overflow-hidden">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">My Profile</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Building className="h-4 w-4 text-gray-400 mr-3" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">{employeeData.designation}</div>
                      <div className="text-xs text-gray-500">{employeeData.department}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 text-gray-400 mr-3" />
                    <div className="text-sm text-gray-900">{employeeData.email}</div>
                  </div>
                  
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 text-gray-400 mr-3" />
                    <div className="text-sm text-gray-900">{employeeData.location}</div>
                  </div>
                  
                  <div className="flex items-center">
                    <Award className="h-4 w-4 text-gray-400 mr-3" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">Manager</div>
                      <div className="text-xs text-gray-500">{employeeData.manager}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
