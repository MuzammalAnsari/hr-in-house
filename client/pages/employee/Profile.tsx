import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Building,
  Calendar,
  Award,
  FileText,
  Edit,
  Download,
  Upload,
  Camera,
  Shield,
  Key,
} from "lucide-react";

// Mock employee profile data
const profileData = {
  personal: {
    name: "Sarah Johnson",
    employeeId: "EMP001",
    email: "sarah.johnson@company.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main Street, New York, NY 10001",
    dateOfBirth: "1992-08-15",
    emergencyContact: {
      name: "John Johnson",
      relationship: "Husband",
      phone: "+1 (555) 987-6543",
    },
  },
  professional: {
    department: "Engineering",
    designation: "Senior Developer",
    joiningDate: "2023-01-15",
    employeeType: "Full-time",
    workLocation: "New York Office",
    manager: "David Wilson",
    probationStatus: "Confirmed",
    salary: {
      basic: 95000,
      currency: "USD",
      frequency: "Annual",
    },
  },
  documents: [
    { id: 1, name: "CNIC Copy", type: "pdf", uploadDate: "2023-01-15", status: "Verified" },
    { id: 2, name: "Employment Contract", type: "pdf", uploadDate: "2023-01-15", status: "Verified" },
    { id: 3, name: "Offer Letter", type: "pdf", uploadDate: "2023-01-10", status: "Verified" },
    { id: 4, name: "Academic Certificates", type: "pdf", uploadDate: "2023-01-12", status: "Pending" },
  ],
  skills: [
    "React", "JavaScript", "Node.js", "Python", "AWS", "Docker", "Git", "MongoDB"
  ],
  certifications: [
    { name: "AWS Certified Developer", issuer: "Amazon Web Services", date: "2023-06-15", expiry: "2026-06-15" },
    { name: "React Professional Certificate", issuer: "Meta", date: "2023-03-20", expiry: null },
  ],
};

export default function EmployeeProfile() {
  const [selectedTab, setSelectedTab] = useState("personal");
  const [editMode, setEditMode] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const tabs = [
    { id: "personal", name: "Personal Info", icon: User },
    { id: "professional", name: "Professional", icon: Building },
    { id: "documents", name: "Documents", icon: FileText },
    { id: "security", name: "Security", icon: Shield },
  ];

  return (
    <div className="py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="bg-white shadow border border-gray-200 rounded-lg overflow-hidden">
            <div className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="relative">
                    <div className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-2xl font-bold text-blue-600">
                        {profileData.personal.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <button className="absolute bottom-0 right-0 bg-blue-600 rounded-full p-1 text-white hover:bg-blue-700">
                      <Camera className="h-3 w-3" />
                    </button>
                  </div>
                  <div className="ml-6">
                    <h1 className="text-2xl font-bold text-gray-900">{profileData.personal.name}</h1>
                    <p className="text-sm text-gray-600">{profileData.professional.designation}</p>
                    <p className="text-sm text-gray-500">
                      {profileData.personal.employeeId} • {profileData.professional.department}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setEditMode(!editMode)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  {editMode ? "Cancel" : "Edit Profile"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedTab(tab.id)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center ${
                      selectedTab === tab.id
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {tab.name}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Personal Info Tab */}
        {selectedTab === "personal" && (
          <div className="bg-white shadow border border-gray-200 rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Personal Information</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Full Name</label>
                  {editMode ? (
                    <input
                      type="text"
                      defaultValue={profileData.personal.name}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="mt-1 text-sm text-gray-900">{profileData.personal.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Employee ID</label>
                  <p className="mt-1 text-sm text-gray-900">{profileData.personal.employeeId}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Email Address</label>
                  <div className="mt-1 flex items-center">
                    <Mail className="h-4 w-4 text-gray-400 mr-2" />
                    {editMode ? (
                      <input
                        type="email"
                        defaultValue={profileData.personal.email}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    ) : (
                      <span className="text-sm text-gray-900">{profileData.personal.email}</span>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                  <div className="mt-1 flex items-center">
                    <Phone className="h-4 w-4 text-gray-400 mr-2" />
                    {editMode ? (
                      <input
                        type="tel"
                        defaultValue={profileData.personal.phone}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    ) : (
                      <span className="text-sm text-gray-900">{profileData.personal.phone}</span>
                    )}
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Address</label>
                  <div className="mt-1 flex items-start">
                    <MapPin className="h-4 w-4 text-gray-400 mr-2 mt-0.5" />
                    {editMode ? (
                      <textarea
                        rows={2}
                        defaultValue={profileData.personal.address}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    ) : (
                      <span className="text-sm text-gray-900">{profileData.personal.address}</span>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                  {editMode ? (
                    <input
                      type="date"
                      defaultValue={profileData.personal.dateOfBirth}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="mt-1 text-sm text-gray-900">
                      {new Date(profileData.personal.dateOfBirth).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-8">
                <h4 className="text-md font-medium text-gray-900 mb-4">Emergency Contact</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    {editMode ? (
                      <input
                        type="text"
                        defaultValue={profileData.personal.emergencyContact.name}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="mt-1 text-sm text-gray-900">{profileData.personal.emergencyContact.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Relationship</label>
                    {editMode ? (
                      <input
                        type="text"
                        defaultValue={profileData.personal.emergencyContact.relationship}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="mt-1 text-sm text-gray-900">{profileData.personal.emergencyContact.relationship}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    {editMode ? (
                      <input
                        type="tel"
                        defaultValue={profileData.personal.emergencyContact.phone}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="mt-1 text-sm text-gray-900">{profileData.personal.emergencyContact.phone}</p>
                    )}
                  </div>
                </div>
              </div>

              {editMode && (
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    onClick={() => setEditMode(false)}
                    className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button className="bg-blue-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700">
                    Save Changes
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Professional Tab */}
        {selectedTab === "professional" && (
          <div className="space-y-6">
            {/* Work Information */}
            <div className="bg-white shadow border border-gray-200 rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Work Information</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Department</label>
                    <div className="mt-1 flex items-center">
                      <Building className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">{profileData.professional.department}</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Designation</label>
                    <p className="mt-1 text-sm text-gray-900">{profileData.professional.designation}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Joining Date</label>
                    <div className="mt-1 flex items-center">
                      <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">
                        {new Date(profileData.professional.joiningDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Employee Type</label>
                    <p className="mt-1 text-sm text-gray-900">{profileData.professional.employeeType}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Work Location</label>
                    <div className="mt-1 flex items-center">
                      <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">{profileData.professional.workLocation}</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Reporting Manager</label>
                    <div className="mt-1 flex items-center">
                      <User className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">{profileData.professional.manager}</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Probation Status</label>
                    <span className="mt-1 inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      {profileData.professional.probationStatus}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Skills & Certifications */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white shadow border border-gray-200 rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Skills</h3>
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-2">
                    {profileData.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white shadow border border-gray-200 rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Certifications</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {profileData.certifications.map((cert, index) => (
                      <div key={index} className="border-l-4 border-green-400 bg-green-50 p-3 rounded-r-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-green-900">{cert.name}</p>
                            <p className="text-xs text-green-700">{cert.issuer}</p>
                          </div>
                          <Award className="h-5 w-5 text-green-600" />
                        </div>
                        <p className="text-xs text-green-600 mt-1">
                          Issued: {new Date(cert.date).toLocaleDateString()}
                          {cert.expiry && ` • Expires: ${new Date(cert.expiry).toLocaleDateString()}`}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Documents Tab */}
        {selectedTab === "documents" && (
          <div className="bg-white shadow border border-gray-200 rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">My Documents</h3>
                <button className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Document
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Document
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Upload Date
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
                    {profileData.documents.map((doc) => (
                      <tr key={doc.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <FileText className="h-5 w-5 text-gray-400 mr-3" />
                            <div>
                              <div className="text-sm font-medium text-gray-900">{doc.name}</div>
                              <div className="text-sm text-gray-500">{doc.type.toUpperCase()}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(doc.uploadDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            doc.status === "Verified"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}>
                            {doc.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-blue-600 hover:text-blue-900">
                            <Download className="h-4 w-4" />
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

        {/* Security Tab */}
        {selectedTab === "security" && (
          <div className="space-y-6">
            <div className="bg-white shadow border border-gray-200 rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Security Settings</h3>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center">
                      <Key className="h-5 w-5 text-gray-400 mr-3" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">Password</div>
                        <div className="text-sm text-gray-500">Last changed 30 days ago</div>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowPasswordForm(true)}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      Change Password
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center">
                      <Shield className="h-5 w-5 text-gray-400 mr-3" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">Two-Factor Authentication</div>
                        <div className="text-sm text-gray-500">Add an extra layer of security</div>
                      </div>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      Enable 2FA
                    </button>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex">
                      <Shield className="h-5 w-5 text-yellow-400 mt-0.5 mr-3" />
                      <div>
                        <h4 className="text-sm font-medium text-yellow-800">Security Recommendations</h4>
                        <ul className="mt-2 text-sm text-yellow-700 space-y-1">
                          <li>• Use a strong password with at least 8 characters</li>
                          <li>• Enable two-factor authentication for better security</li>
                          <li>• Never share your login credentials with anyone</li>
                          <li>• Log out when using shared computers</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Change Password Modal */}
        {showPasswordForm && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-screen items-center justify-center p-4">
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                   onClick={() => setShowPasswordForm(false)} />
              
              <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full">
                <div className="px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900">
                      Change Password
                    </h3>
                    <button
                      onClick={() => setShowPasswordForm(false)}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <span className="sr-only">Close</span>
                      ×
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Current Password
                      </label>
                      <input
                        type="password"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        New Password
                      </label>
                      <input
                        type="password"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>

                    <div className="flex justify-end space-x-3 pt-4">
                      <button
                        type="button"
                        onClick={() => setShowPasswordForm(false)}
                        className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-blue-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700"
                      >
                        Update Password
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
