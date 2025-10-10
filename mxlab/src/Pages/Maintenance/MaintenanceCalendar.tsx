import React from 'react';
import Layout from "../../Components/Common/Layout";
import { Settings} from 'lucide-react';

const MaintenanceCalendar: React.FC = () => {
  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mb-8">
            <Settings className="w-24 h-24 text-gray-400 mx-auto mb-4 animate-spin" style={{ animationDuration: '3s' }} />
          </div>
          
          <h1 className="text-6xl font-bold text-gray-800 mb-4">
            BIENTÔT DISPONIBLE
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
            La page Calendrier est en cours de développement. Elle sera disponible très prochainement.
          </p>
          
          
        </div>
      </div>
    </Layout>
  );
};

export default MaintenanceCalendar;
