import { useState } from "react";
import {
  Clock,
  Calendar,
  CheckCircle,
  XCircle,
  Timer,
  MapPin,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Play,
  Square,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock attendance data for current employee
const myAttendanceStats = {
  thisMonth: {
    present: 18,
    absent: 2,
    late: 3,
    workingDays: 22,
    averageHours: 8.2,
    overtimeHours: 12,
  },
  today: {
    checkIn: "09:15 AM",
    checkOut: null,
    workingHours: "6h 45m",
    status: "Present",
    isLate: true,
    location: "Office",
    break: false,
  },
};

// Mock monthly attendance history
const monthlyHistory = [
  {
    date: "2024-01-15",
    checkIn: "09:15 AM",
    checkOut: "06:30 PM",
    hours: "9h 15m",
    status: "Present",
    isLate: true,
  },
  {
    date: "2024-01-14",
    checkIn: "08:45 AM",
    checkOut: "05:45 PM",
    hours: "9h 00m",
    status: "Present",
    isLate: false,
  },
  {
    date: "2024-01-13",
    checkIn: "09:00 AM",
    checkOut: "06:00 PM",
    hours: "9h 00m",
    status: "Present",
    isLate: false,
  },
  {
    date: "2024-01-12",
    checkIn: "—",
    checkOut: "—",
    hours: "—",
    status: "Absent",
    isLate: false,
  },
  {
    date: "2024-01-11",
    checkIn: "09:30 AM",
    checkOut: "06:15 PM",
    hours: "8h 45m",
    status: "Present",
    isLate: true,
  },
  {
    date: "2024-01-10",
    checkIn: "08:30 AM",
    checkOut: "05:30 PM",
    hours: "9h 00m",
    status: "Present",
    isLate: false,
  },
];

// Mock weekly trend data
const weeklyTrend = [
  { day: "Mon", hours: 8.5, status: "On Time" },
  { day: "Tue", hours: 9.2, status: "Late" },
  { day: "Wed", hours: 8.8, status: "On Time" },
  { day: "Thu", hours: 8.0, status: "On Time" },
  { day: "Fri", hours: 7.5, status: "Early Leave" },
];

export default function EmployeeAttendance() {
  const [selectedTab, setSelectedTab] = useState("today");
  const [isOnBreak, setIsOnBreak] = useState(false);

  const tabs = [
    { id: "today", name: "Today", count: null },
    { id: "history", name: "My History", count: null },
    { id: "summary", name: "Monthly Summary", count: null },
  ];

  const attendanceRate = Math.round(
    (myAttendanceStats.thisMonth.present /
      myAttendanceStats.thisMonth.workingDays) *
      100,
  );

  const handleCheckOut = () => {
    // Mock check-out functionality
    console.log("Check out clicked");
  };

  const handleBreakToggle = () => {
    setIsOnBreak(!isOnBreak);
  };

  return (
    <div className="py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            My Attendance
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Track your daily attendance and working hours
          </p>
        </div>

        {/* Today's Status Cards */}
        <div className="mb-8">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white overflow-hidden shadow border border-gray-200 rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Clock
                      className={`h-8 w-8 ${myAttendanceStats.today.isLate ? "text-red-600" : "text-green-600"}`}
                    />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Check In Time
                      </dt>
                      <dd className="flex items-baseline">
                        <div
                          className={`text-lg font-medium ${myAttendanceStats.today.isLate ? "text-red-600" : "text-gray-900"}`}
                        >
                          {myAttendanceStats.today.checkIn}
                        </div>
                        {myAttendanceStats.today.isLate && (
                          <span className="ml-2 text-xs text-red-500 font-medium">
                            Late
                          </span>
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
                    <Timer className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Working Hours
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {myAttendanceStats.today.workingHours}
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
                        Status
                      </dt>
                      <dd className="text-lg font-medium text-green-600">
                        {myAttendanceStats.today.status}
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
                    <MapPin className="h-8 w-8 text-purple-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Location
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {myAttendanceStats.today.location}
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

        {/* Today Tab */}
        {selectedTab === "today" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Actions */}
            <div className="lg:col-span-2 space-y-6">
              {/* Quick Actions */}
              <div className="bg-white shadow border border-gray-200 rounded-lg overflow-hidden">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-6">
                    Quick Actions
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {!myAttendanceStats.today.checkOut && (
                      <button
                        onClick={handleCheckOut}
                        className="flex items-center justify-center p-6 border-2 border-red-300 rounded-lg hover:border-red-400 transition-colors text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100"
                      >
                        <Square className="h-8 w-8 mr-3" />
                        <div className="text-center">
                          <div className="text-lg font-medium">Check Out</div>
                          <div className="text-sm opacity-75">
                            End your work day
                          </div>
                        </div>
                      </button>
                    )}

                    <button
                      onClick={handleBreakToggle}
                      className={cn(
                        "flex items-center justify-center p-6 border-2 rounded-lg transition-colors",
                        isOnBreak
                          ? "border-green-300 hover:border-green-400 text-green-600 hover:text-green-700 bg-green-50 hover:bg-green-100"
                          : "border-yellow-300 hover:border-yellow-400 text-yellow-600 hover:text-yellow-700 bg-yellow-50 hover:bg-yellow-100",
                      )}
                    >
                      <Play className="h-8 w-8 mr-3" />
                      <div className="text-center">
                        <div className="text-lg font-medium">
                          {isOnBreak ? "End Break" : "Start Break"}
                        </div>
                        <div className="text-sm opacity-75">
                          {isOnBreak ? "Resume work" : "Take a break"}
                        </div>
                      </div>
                    </button>
                  </div>

                  {isOnBreak && (
                    <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-center">
                        <Timer className="h-5 w-5 text-yellow-600 mr-2" />
                        <span className="text-sm font-medium text-yellow-800">
                          Currently on break
                        </span>
                        <span className="ml-auto text-sm text-yellow-600">
                          Started 15 minutes ago
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Today's Details */}
              <div className="bg-white shadow border border-gray-200 rounded-lg overflow-hidden">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Today's Details
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 text-blue-600 mr-3" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            Check In Time
                          </div>
                          <div className="text-xs text-gray-500">
                            Office location detected
                          </div>
                        </div>
                      </div>
                      <div
                        className={`text-sm font-medium ${myAttendanceStats.today.isLate ? "text-red-600" : "text-gray-900"}`}
                      >
                        {myAttendanceStats.today.checkIn}
                        {myAttendanceStats.today.isLate && (
                          <span className="block text-xs text-red-500">
                            15 min late
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <Timer className="h-5 w-5 text-green-600 mr-3" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            Working Hours
                          </div>
                          <div className="text-xs text-gray-500">
                            Target: 8 hours
                          </div>
                        </div>
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                        {myAttendanceStats.today.workingHours}
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-center">
                        <MapPin className="h-5 w-5 text-blue-600 mr-3" />
                        <div>
                          <div className="text-sm font-medium text-blue-900">
                            Work Location
                          </div>
                          <div className="text-xs text-blue-700">
                            GPS verified
                          </div>
                        </div>
                      </div>
                      <div className="text-sm font-medium text-blue-900">
                        {myAttendanceStats.today.location}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Summary */}
            <div className="space-y-6">
              {/* This Month Summary */}
              <div className="bg-white shadow border border-gray-200 rounded-lg overflow-hidden">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    This Month
                  </h3>

                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600">
                        {attendanceRate}%
                      </div>
                      <div className="text-sm text-gray-500">
                        Attendance Rate
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="p-3 bg-green-50 rounded-lg">
                        <div className="text-lg font-bold text-green-800">
                          {myAttendanceStats.thisMonth.present}
                        </div>
                        <div className="text-xs text-green-600">Present</div>
                      </div>
                      <div className="p-3 bg-red-50 rounded-lg">
                        <div className="text-lg font-bold text-red-800">
                          {myAttendanceStats.thisMonth.absent}
                        </div>
                        <div className="text-xs text-red-600">Absent</div>
                      </div>
                      <div className="p-3 bg-yellow-50 rounded-lg">
                        <div className="text-lg font-bold text-yellow-800">
                          {myAttendanceStats.thisMonth.late}
                        </div>
                        <div className="text-xs text-yellow-600">Late</div>
                      </div>
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <div className="text-lg font-bold text-blue-800">
                          {myAttendanceStats.thisMonth.averageHours}
                        </div>
                        <div className="text-xs text-blue-600">Avg Hours</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Weekly Trend */}
              <div className="bg-white shadow border border-gray-200 rounded-lg overflow-hidden">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    This Week
                  </h3>

                  <div className="space-y-3">
                    {weeklyTrend.map((day, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center">
                          <div className="w-8 text-sm font-medium text-gray-700">
                            {day.day}
                          </div>
                          <div className="ml-3">
                            <div className="text-sm text-gray-900">
                              {day.hours}h
                            </div>
                            <div
                              className={cn(
                                "text-xs",
                                day.status === "On Time"
                                  ? "text-green-600"
                                  : day.status === "Late"
                                    ? "text-red-600"
                                    : "text-yellow-600",
                              )}
                            >
                              {day.status}
                            </div>
                          </div>
                        </div>
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div
                            className={cn(
                              "h-2 rounded-full",
                              day.status === "On Time"
                                ? "bg-green-500"
                                : day.status === "Late"
                                  ? "bg-red-500"
                                  : "bg-yellow-500",
                            )}
                            style={{ width: `${(day.hours / 10) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* History Tab */}
        {selectedTab === "history" && (
          <div className="bg-white shadow border border-gray-200 rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                My Attendance History
              </h3>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Check In
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Check Out
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Working Hours
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {monthlyHistory.map((record, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(record.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div
                            className={`text-sm ${record.isLate ? "text-red-600" : "text-gray-900"}`}
                          >
                            {record.checkIn}
                            {record.isLate && (
                              <span className="block text-xs text-red-500">
                                Late
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {record.checkOut}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {record.hours}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={cn(
                              "inline-flex px-2 py-1 text-xs font-semibold rounded-full",
                              record.status === "Present"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800",
                            )}
                          >
                            {record.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Summary Tab */}
        {selectedTab === "summary" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white shadow border border-gray-200 rounded-lg overflow-hidden">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Monthly Statistics
                </h3>

                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        Attendance Rate
                      </span>
                      <span className="text-sm text-gray-900">
                        {attendanceRate}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full"
                        style={{ width: `${attendanceRate}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        Average Working Hours
                      </span>
                      <span className="text-sm text-gray-900">
                        {myAttendanceStats.thisMonth.averageHours}h/day
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: "82%" }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        Overtime Hours
                      </span>
                      <span className="text-sm text-gray-900">
                        {myAttendanceStats.thisMonth.overtimeHours}h
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-purple-600 h-2 rounded-full"
                        style={{ width: "60%" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white shadow border border-gray-200 rounded-lg overflow-hidden">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Performance Insights
                </h3>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <TrendingUp className="h-5 w-5 text-green-500 mt-0.5 mr-3" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        Good Attendance
                      </div>
                      <div className="text-sm text-gray-600">
                        Your attendance rate is above company average (85%)
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-yellow-500 mt-0.5 mr-3" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        Punctuality Alert
                      </div>
                      <div className="text-sm text-gray-600">
                        3 late arrivals this month. Try to arrive on time.
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 mr-3" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        Consistent Schedule
                      </div>
                      <div className="text-sm text-gray-600">
                        You maintain consistent working hours throughout the
                        month
                      </div>
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
