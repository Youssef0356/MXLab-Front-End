import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from "../../../Components/Common/Layout";
import { Plus, Upload, QrCode, Video, FileText, Save } from 'lucide-react';

interface EquipmentFormData {
  name: string;
  reference: string;
  location: string;
  image: File | null;
  qrCode: string;
  videoUrl: File | null;
  datasheet: File | null;
  description: string;
}

const CreateEquipment: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<EquipmentFormData>({
    name: '',
    reference: '',
    location: '',
    image: null,
    qrCode: '',
    videoUrl: null,
    datasheet: null,
    description: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({
      ...prev,
      [fieldName]: file
    }));

    // Create preview for images and videos
    if (file) {
      if (fieldName === 'image' && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const result = event.target?.result as string;
          console.log('Image preview created:', result.substring(0, 50) + '...');
          setImagePreview(result);
        };
        reader.onerror = (error) => {
          console.error('Error reading image file:', error);
        };
        reader.readAsDataURL(file);
      } else if (fieldName === 'videoUrl' && file.type.startsWith('video/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const result = event.target?.result as string;
          setVideoPreview(result);
        };
        reader.readAsDataURL(file);
      }
    } else {
      // Clear previews if no file selected
      if (fieldName === 'image') {
        setImagePreview(null);
      } else if (fieldName === 'videoUrl') {
        setVideoPreview(null);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create new equipment object
      const newEquipment = {
        id: `EQ-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
        ...formData,
        status: 'active',
        dateCreated: new Date().toLocaleDateString('fr-FR').replace(/\//g, '/')
      };

      // In a real app, you would send this to an API
      console.log('New equipment created:', newEquipment);
      
      // Show success message
      setShowSuccess(true);
      
      // Reset form
      setFormData({
        name: '',
        reference: '',
        location: '',
        image: null,
        qrCode: '',
        videoUrl: null,
        datasheet: null,
        description: ''
      });
      
      // Clear previews
      setImagePreview(null);
      setVideoPreview(null);

      // Hide success message after 3 seconds
      setTimeout(() => setShowSuccess(false), 3000);

    } catch (error) {
      console.error('Error creating equipment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };


  const handleCancel = () => {
    navigate('/equipmentsView');
  };

  return (
    <Layout>
      <div className="p-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
            <Plus className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            Ajouter du nouveau équipement
          </h1>
        </div>

          {/* Success Message */}
          {showSuccess && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2 text-green-800">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
                <span className="font-medium">Équipement créé avec succès!</span>
              </div>
            </div>
          )}

        {/* Form Container */}
        <div className="bg-white rounded-lg border border-gray-200 p-8 shadow-sm">
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Equipment Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Nom d'équipement
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ajouter le nom d'équipement ici..."
                  />
                </div>

                {/* Reference */}
                <div>
                  <label htmlFor="reference" className="block text-sm font-medium text-gray-700 mb-2">
                    Référence
                  </label>
                  <input
                    type="text"
                    id="reference"
                    name="reference"
                    value={formData.reference}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ajouter la référence ici..."
                  />
                </div>

                {/* QR Code */}
                <div>
                  <label htmlFor="qrCode" className="block text-sm font-medium text-gray-700 mb-2">
                    QR Code
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="qrCode"
                      name="qrCode"
                      value={formData.qrCode}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Insérer le QR code relative"
                    />
                    <QrCode className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                </div>

                {/* Video */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Vidéo relative d'équipement
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      id="videoUrl"
                      accept="video/*"
                      onChange={(e) => handleFileChange(e, 'videoUrl')}
                      className="hidden"
                    />
                    
                    {/* Clickable Preview/Upload Area */}
                    <div
                      onClick={() => document.getElementById('videoUrl')?.click()}
                      className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors relative"
                    >
                      {videoPreview ? (
                        <div className="relative w-full h-full">
                          <video
                            src={videoPreview}
                            controls
                            className="w-full h-full object-cover rounded-lg"
                            onClick={(e) => e.stopPropagation()}
                          />
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setVideoPreview(null);
                              setFormData(prev => ({ ...prev, videoUrl: null }));
                            }}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 z-10"
                          >
                            ×
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <div className="text-center">
                            <Video className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-500">Télécharger une vidéo</p>
                            <p className="text-xs text-gray-400 mt-1">Cliquez pour sélectionner</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Datasheet */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Datasheet d'équipement
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      id="datasheet"
                      accept=".pdf,.doc,.docx,.txt"
                      onChange={(e) => handleFileChange(e, 'datasheet')}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => document.getElementById('datasheet')?.click()}
                      className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-left text-gray-500 hover:bg-gray-50 transition-colors"
                    >
                      {formData.datasheet ? formData.datasheet.name : "Insérer le datasheet relative"}
                    </button>
                    <FileText className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Location */}
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                    Localisation
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ajouter la localisation ici..."
                  />
                </div>

                {/* Image */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      id="image"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, 'image')}
                      className="hidden"
                    />
                    
                    {/* Clickable Preview/Upload Area */}
                    <div
                      onClick={() => document.getElementById('image')?.click()}
                      className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors relative"
                    >
                      {imagePreview ? (
                        <div className="relative w-full h-full">
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-full h-full object-cover rounded-lg"
                            onLoad={() => console.log('Image loaded successfully')}
                            onError={(e) => console.error('Image failed to load:', e)}
                          />
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setImagePreview(null);
                              setFormData(prev => ({ ...prev, image: null }));
                            }}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 z-10"
                          >
                            ×
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <div className="text-center">
                            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-500">Télécharger une image</p>
                            <p className="text-xs text-gray-400 mt-1">Cliquez pour sélectionner</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Equipment Information */}
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                    Information de l'équipement
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={8}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Ajouter la description de l'équipement"
                  />
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200 justify-end">
              <button
                type="button"
                onClick={handleCancel}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
              >
                Cancel
              </button>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Save className="w-4 h-4" />
                {isSubmitting ? 'Création en cours...' : 'Ajouter équipement'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default CreateEquipment;