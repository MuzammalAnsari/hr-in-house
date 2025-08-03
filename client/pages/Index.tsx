import { Users, Clock, Calendar, TrendingUp, UserCheck, UserX, CheckCircle, XCircle } from 'lucide-react';

const stats = [
  {
    id: 1,
    name: 'Total Employees',
    value: '247',
    change: '+4.75%',
    changeType: 'positive',
    icon: Users,
  },
  {
    id: 2,
    name: 'Present Today',
    value: '231',
    change: '93.5%',
    changeType: 'positive',
    icon: UserCheck,
  },
  {
    id: 3,
    name: 'On Leave',
    value: '12',
    change: '+2',
    changeType: 'neutral',
    icon: Calendar,
  },
  {
    id: 4,
    name: 'Pending Approvals',
    value: '8',
    change: '-3',
    changeType: 'positive',
    icon: Clock,
  },
];

const recentActivities = [
  {
    id: 1,
    type: 'leave_request',
    user: 'Sarah Johnson',
    action: 'submitted a leave request',
    time: '2 hours ago',
    status: 'pending',
  },
  {
    id: 2,
    type: 'employee_joined',
    user: 'Michael Chen',
    action: 'joined the Development team',
    time: '1 day ago',
    status: 'completed',
  },
  {
    id: 3,
    type: 'leave_approved',
    user: 'Emily Davis',
    action: 'leave request approved',
    time: '2 days ago',
    status: 'approved',
  },
  {
    id: 4,
    type: 'attendance',
    user: 'David Wilson',
    action: 'marked late arrival',
    time: '3 days ago',
    status: 'noted',
  },
];

const upcomingEvents = [
  {
    id: 1,
    title: 'Team Building Workshop',
    date: 'March 15, 2024',
    time: '10:00 AM',
    participants: 45,
  },
  {
    id: 2,
    title: 'Performance Review Deadline',
    date: 'March 20, 2024',
    time: '5:00 PM',
    participants: 12,
  },
  {
    id: 3,
    title: 'New Employee Orientation',
    date: 'March 22, 2024',
    time: '9:00 AM',
    participants: 6,
  },
];

export default function Index() {
  return (
    <div className="py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            HR Dashboard
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Welcome back! Here's what's happening in your organization today.
          </p>
        </div>

        {/* Stats */}
        <div className="mb-8">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  className="relative overflow-hidden rounded-lg bg-white px-4 py-5 shadow border border-gray-200 sm:px-6"
                >
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Icon className="h-8 w-8 text-blue-600" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="truncate text-sm font-medium text-gray-500">
                          {item.name}
                        </dt>
                        <dd className="flex items-baseline">
                          <div className="text-2xl font-semibold text-gray-900">
                            {item.value}
                          </div>
                          <div
                            className={`ml-2 flex items-baseline text-sm font-semibold ${
                              item.changeType === 'positive'
                                ? 'text-green-600'
                                : item.changeType === 'negative'
                                ? 'text-red-600'
                                : 'text-gray-500'
                            }`}
                          >
                            {item.change}
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Recent Activities */}
          <div className="lg:col-span-2">
            <div className="rounded-lg bg-white shadow border border-gray-200">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                  Recent Activities
                </h3>
                <div className="flow-root">
                  <ul className="-mb-8">
                    {recentActivities.map((activity, activityIdx) => (
                      <li key={activity.id}>
                        <div className="relative pb-8">
                          {activityIdx !== recentActivities.length - 1 && (
                            <span
                              className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                              aria-hidden="true"
                            />
                          )}
                          <div className="relative flex space-x-3">
                            <div>
                              <span
                                className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${
                                  activity.status === 'completed' || activity.status === 'approved'
                                    ? 'bg-green-500'
                                    : activity.status === 'pending'
                                    ? 'bg-yellow-500'
                                    : 'bg-gray-500'
                                }`}
                              >
                                {activity.status === 'completed' || activity.status === 'approved' ? (
                                  <CheckCircle className="h-5 w-5 text-white" />
                                ) : activity.status === 'pending' ? (
                                  <Clock className="h-5 w-5 text-white" />
                                ) : (
                                  <XCircle className="h-5 w-5 text-white" />
                                )}
                              </span>
                            </div>
                            <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                              <div>
                                <p className="text-sm text-gray-500">
                                  <span className="font-medium text-gray-900">
                                    {activity.user}
                                  </span>{' '}
                                  {activity.action}
                                </p>
                              </div>
                              <div className="whitespace-nowrap text-right text-sm text-gray-500">
                                {activity.time}
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Events */}
          <div>
            <div className="rounded-lg bg-white shadow border border-gray-200">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                  Upcoming Events
                </h3>
                <div className="space-y-4">
                  {upcomingEvents.map((event) => (
                    <div
                      key={event.id}
                      className="border-l-4 border-blue-400 bg-blue-50 p-4"
                    >
                      <div className="flex">
                        <div className="ml-3">
                          <p className="text-sm font-medium text-blue-800">
                            {event.title}
                          </p>
                          <p className="mt-1 text-sm text-blue-700">
                            {event.date} at {event.time}
                          </p>
                          <p className="mt-1 text-xs text-blue-600">
                            {event.participants} participants
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-6 rounded-lg bg-white shadow border border-gray-200">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <button className="w-full rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                    Add New Employee
                  </button>
                  <button className="w-full rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                    Generate Report
                  </button>
                  <button className="w-full rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                    Send Announcement
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
