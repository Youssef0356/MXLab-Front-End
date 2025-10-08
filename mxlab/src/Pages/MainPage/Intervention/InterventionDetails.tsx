import React, { useState, useEffect } from 'react';
import Layout from '../../../Components/Common/Layout';
import { ArrowLeft, Printer, CheckCircle, XCircle, FileText, Video, Image } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import interventionRequestsData from '../../../api/json-simulations/interventionRequests.json';
import usersData from '../../../api/json-simulations/users.json';

// Types for intervention data
type InterventionStatus = 'En Attente' | 'Approuvé' | 'Rejeté';

type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  dateCreation: string;
  privilege: string;
  location: string;
  isActive: boolean;
};

type MediaFile = {
  name: string;
  size: string;
  type: 'video' | 'image';
  uploadedAt: string;
};

type InterventionRequest = {
  id: string;
  title: string;
  description: string;
  userId: string;
  Equipement: string;
  location: string;
  employee: {
    name: string;
    id: string;
    email: string;
    phone: string;
  };
  status: InterventionStatus;
  priority: string;
  submittedDate: string;
  mediaFiles: MediaFile[];
};

const InterventionDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [intervention, setIntervention] = useState<InterventionRequest | null>(null);

  useEffect(() => {
    // Simulate API call to fetch intervention details
    const found = interventionRequestsData.find(item => item.id === id);
    if (found) {
      // Get user data
      const user = usersData.find((u: any) => u.id === found.userId);
      const interventionWithUserData = {
        ...found,
        employee: user ? {
          name: user.name,
          id: user.id,
          email: user.email,
          phone: user.phone
        } : {
          name: 'Unknown User',
          id: found.userId,
          email: '',
          phone: ''
        }
      };
      setIntervention(interventionWithUserData as InterventionRequest);
    } else {
      setIntervention(null);
    }
  }, [id]);

  const getStatusBadge = (status: InterventionStatus) => {
    switch (status) {
      case 'En Attente':
        return 'bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium';
      case 'Approuvé':
        return 'bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium';
      case 'Rejeté':
        return 'bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium';
      default:
        return 'bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium';
    }
  };

  const getAttachmentIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="w-5 h-5 text-blue-500" />;
      case 'pdf':
        return <FileText className="w-5 h-5 text-red-500" />;
      case 'image':
        return <Image className="w-5 h-5 text-green-500" />;
      default:
        return <FileText className="w-5 h-5 text-gray-500" />;
    }
  };

  const handleApprove = () => {
    // TODO: Implement approve functionality
    console.log('Approving intervention:', id);
  };

  const handleReject = () => {
    // TODO: Implement reject functionality
    console.log('Rejecting intervention:', id);
  };

  const handlePrint = () => {
    // TODO: Implement print functionality
    console.log('Printing intervention:', id);
  };

  if (!intervention) {
    return (
      <Layout>
        <div className="p-6 max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">Intervention non trouvée</h2>
            <p className="text-gray-600 mt-2">L'intervention demandée n'existe pas.</p>
            <button
              onClick={() => navigate('/interventionRequests')}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Retour aux demandes
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/interventionRequests')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Demande #{intervention.id}
              </h1>
              <p className="text-gray-600">{intervention.title}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Printer className="w-4 h-4" />
              Imprimer
            </button>
            <button
              onClick={handleApprove}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <CheckCircle className="w-4 h-4" />
              Approuver
            </button>
            <button
              onClick={handleReject}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <XCircle className="w-4 h-4" />
              Rejeter
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Problem Description */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">{intervention.title}</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Description</h3>
                  <p className="text-gray-600 leading-relaxed">{intervention.description}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Location</h3>
                  <p className="text-gray-600">{intervention.location}</p>
                </div>
              </div>
            </div>

            {/* Attachments */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Attachement ({intervention.mediaFiles.length})
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {intervention.mediaFiles.map((attachment: MediaFile, index: number) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    {getAttachmentIcon(attachment.type)}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {attachment.name}
                      </p>
                      <p className="text-xs text-gray-500">{attachment.size}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Employee Information */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Information d'employé</h3>
              
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-700">{intervention.employee.name}</p>
                  <p className="text-sm text-gray-600">ID: {intervention.employee.id}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-1">Contact</h4>
                  <p className="text-sm text-gray-600">{intervention.employee.phone}</p>
                  <p className="text-sm text-gray-600">{intervention.employee.email}</p>
                </div>
              </div>
            </div>

            {/* Request Status */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">État de demande</h3>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">État courante</p>
                  <span className={getStatusBadge(intervention.status)}>
                    {intervention.status}
                  </span>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Soumis</p>
                  <p className="text-sm text-gray-600">{intervention.submittedDate}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default InterventionDetails;
