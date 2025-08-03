import { Construction, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PlaceholderPageProps {
  title: string;
  description?: string;
}

export default function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <div className="py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
          <div className="rounded-full bg-orange-100 p-3 mb-4">
            <Construction className="h-12 w-12 text-orange-600" />
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{title}</h1>
          
          <p className="text-gray-600 mb-6 max-w-md">
            {description || "This section is currently under development. Continue prompting to help build out this page's functionality."}
          </p>
          
          <div className="space-y-3">
            <p className="text-sm text-gray-500">
              💡 Ask me to build specific features for this page, such as:
            </p>
            <ul className="text-sm text-gray-500 space-y-1">
              <li>• Employee management tables and forms</li>
              <li>• Attendance tracking interfaces</li>
              <li>• Leave request workflows</li>
              <li>• Reporting dashboards</li>
            </ul>
          </div>
          
          <Link 
            to="/" 
            className="mt-8 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
