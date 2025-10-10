import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from "../../../Components/Common/Layout";
import { Plus, Upload, QrCode, Video, FileText, Save, Info, Download } from 'lucide-react';
import QRCode from 'qrcode';

interface Button {
  name: string;
  images: File | null;
}

interface PartDescription {
  key: string;
  value: string;
}

interface Parts {
  id: string;
  description: PartDescription[];
  video: File | null;
  image: File | null;
  datasheetUrl: string;
  buttons: Button[];
}

interface EquipmentFormData {
  name: string;
  reference: string;
  location: string;
  image: File | null;
  qrCode: File | null;
  qrCodeName: string;
  videoUrl: File | null;
  datasheet: File | null;
  description: PartDescription[];
  parts: Parts[];
}

const CreateEquipment: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<EquipmentFormData>({
    name: '',
    reference: '',
    location: '',
    image: null,
    qrCode: null,
    qrCodeName: '',
    videoUrl: null,
    datasheet: null,
    description: [{ key: '', value: '' }],
    parts: [{
      id: '',
      description: [{ key: '', value: '' }],
      video: null,
      image: null,
      datasheetUrl: '',
      buttons: [{ name: '', images: null }]
    }]
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [buttonImagePreview, setButtonImagePreview] = useState<string | null>(null);
  const [qrCodePreview, setQrCodePreview] = useState<string | null>(null);
  const [generatedQrCode, setGeneratedQrCode] = useState<string | null>(null);
  const [partImagePreviews, setPartImagePreviews] = useState<{ [key: number]: string | null }>({});
  const [partVideoPreviews, setPartVideoPreviews] = useState<{ [key: number]: string | null }>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Part button handlers
  const handlePartButtonChange = (partIndex: number, buttonIndex: number, field: keyof Button, value: string) => {
    setFormData(prev => ({
      ...prev,
      parts: prev.parts.map((part, i) =>
        i === partIndex ? {
          ...part,
          buttons: part.buttons.map((button, j) =>
            j === buttonIndex ? { ...button, [field]: value } : button
          )
        } : part
      )
    }));
  };

  const handlePartButtonImageChange = (partIndex: number, buttonIndex: number, file: File | null) => {
    setFormData(prev => ({
      ...prev,
      parts: prev.parts.map((part, i) =>
        i === partIndex ? {
          ...part,
          buttons: part.buttons.map((button, j) =>
            j === buttonIndex ? { ...button, images: file } : button
          )
        } : part
      )
    }));
  };

  const addPartButton = (partIndex: number) => {
    setFormData(prev => ({
      ...prev,
      parts: prev.parts.map((part, i) =>
        i === partIndex ? {
          ...part,
          buttons: [...part.buttons, { name: '', images: null }]
        } : part
      )
    }));
  };

  const removePartButton = (partIndex: number, buttonIndex: number) => {
    setFormData(prev => ({
      ...prev,
      parts: prev.parts.map((part, i) =>
        i === partIndex ? {
          ...part,
          buttons: part.buttons.filter((_, j) => j !== buttonIndex)
        } : part
      )
    }));
  };

  // QR Code generation functions
  const generateQRCode = async () => {
    try {
      if (!formData.name || !formData.reference) {
        alert('Veuillez remplir le nom et la référence de l\'équipement avant de générer le QR code.');
        return;
      }

      // Create QR code data with equipment info
      const qrData = JSON.stringify({
        name: formData.name,
        reference: formData.reference,
        id: `EQ-${formData.reference}`,
        timestamp: new Date().toISOString()
      });

      // Generate QR code using the QRCode library
      const qrCodeDataURL = await QRCode.toDataURL(qrData, {
        width: 200,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });
      
      setGeneratedQrCode(qrCodeDataURL);
      
      // Convert to file and save to form
      const qrCodeFile = await dataURLToFile(qrCodeDataURL, `QR_${formData.reference}.png`);
      setFormData(prev => ({
        ...prev,
        qrCode: qrCodeFile,
        qrCodeName: `QR_${formData.reference}.png`
      }));
      
      setQrCodePreview(qrCodeDataURL);
    } catch (error) {
      console.error('Error generating QR code:', error);
      alert('Erreur lors de la génération du QR code');
    }
  };


  const dataURLToFile = async (dataURL: string, filename: string): Promise<File> => {
    const response = await fetch(dataURL);
    const blob = await response.blob();
    return new File([blob], filename, { type: 'image/png' });
  };

  const downloadQRCode = () => {
    if (generatedQrCode) {
      const link = document.createElement('a');
      link.download = formData.qrCodeName || 'qr-code.png';
      link.href = generatedQrCode;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // Part file upload handlers
  const handlePartFileChange = (e: React.ChangeEvent<HTMLInputElement>, partIndex: number, fileType: 'image' | 'video') => {
    const file = e.target.files?.[0] || null;
    
    // Update form data
    setFormData(prev => ({
      ...prev,
      parts: prev.parts.map((part, i) =>
        i === partIndex ? { ...part, [fileType]: file } : part
      )
    }));

    // Create preview
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        
        if (fileType === 'image') {
          setPartImagePreviews(prev => ({
            ...prev,
            [partIndex]: result
          }));
        } else if (fileType === 'video') {
          setPartVideoPreviews(prev => ({
            ...prev,
            [partIndex]: result
          }));
        }
      };
      reader.readAsDataURL(file);
    } else {
      // Clear preview if no file
      if (fileType === 'image') {
        setPartImagePreviews(prev => ({
          ...prev,
          [partIndex]: null
        }));
      } else if (fileType === 'video') {
        setPartVideoPreviews(prev => ({
          ...prev,
          [partIndex]: null
        }));
      }
    }
  };

  const handleDescriptionChange = (index: number, field: keyof PartDescription, value: string) => {
    setFormData(prev => ({
      ...prev,
      description: prev.description.map((desc, i) =>
        i === index ? { ...desc, [field]: value } : desc
      )
    }));
  };

  const addDescription = () => {
    setFormData(prev => ({
      ...prev,
      description: [...prev.description, { key: '', value: '' }]
    }));
  };

  const removeDescription = (index: number) => {
    setFormData(prev => ({
      ...prev,
      description: prev.description.filter((_, i) => i !== index)
    }));
  };

  const handlePartChange = (partIndex: number, field: keyof Parts, value: string) => {
    setFormData(prev => ({
      ...prev,
      parts: prev.parts.map((part, i) =>
        i === partIndex ? { ...part, [field]: value } : part
      )
    }));
  };

  const handlePartDescriptionChange = (partIndex: number, descIndex: number, field: keyof PartDescription, value: string) => {
    setFormData(prev => ({
      ...prev,
      parts: prev.parts.map((part, i) =>
        i === partIndex ? {
          ...part,
          description: part.description.map((desc, j) =>
            j === descIndex ? { ...desc, [field]: value } : desc
          )
        } : part
      )
    }));
  };

  const addPartDescription = (partIndex: number) => {
    setFormData(prev => ({
      ...prev,
      parts: prev.parts.map((part, i) =>
        i === partIndex ? {
          ...part,
          description: [...part.description, { key: '', value: '' }]
        } : part
      )
    }));
  };

  const removePartDescription = (partIndex: number, descIndex: number) => {
    setFormData(prev => ({
      ...prev,
      parts: prev.parts.map((part, i) =>
        i === partIndex ? {
          ...part,
          description: part.description.filter((_, j) => j !== descIndex)
        } : part
      )
    }));
  };

  const addPart = () => {
    setFormData(prev => ({
      ...prev,
      parts: [...prev.parts, {
        id: `PART-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
        description: [{ key: '', value: '' }],
        video: null,
        image: null,
        datasheetUrl: '',
        buttons: [{ name: '', images: null }]
      }]
    }));
  };

  const removePart = (partIndex: number) => {
    setFormData(prev => ({
      ...prev,
      parts: prev.parts.filter((_, i) => i !== partIndex)
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
      } else if (fieldName === 'qrCode' && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const result = event.target?.result as string;
          setQrCodePreview(result);
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
      } else if (fieldName === 'qrCode') {
        setQrCodePreview(null);
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
        qrCode: null,
        qrCodeName: '',
        videoUrl: null,
        datasheet: null,
        description: [{ key: '', value: '' }],
        parts: [{
          id: '',
          description: [{ key: '', value: '' }],
          video: null,
          image: null,
          datasheetUrl: '',
          buttons: [{ name: '', images: null }]
        }]
      });

      // Clear previews
      setImagePreview(null);
      setVideoPreview(null);
      setButtonImagePreview(null);
      setQrCodePreview(null);
      setGeneratedQrCode(null);
      setPartImagePreviews({});
      setPartVideoPreviews({});

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

        {/* Introduction Hero Section */}
        <div className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Info className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Création d'équipement pour l'application AR
              </h2>
              <p className="text-gray-700 mb-4">
                Ce formulaire permet à l'administrateur d'ajouter, modifier et gérer toutes
                les informations affichées dans l'<span className="font-semibold text-blue-600">application de Réalité Augmentée</span>.
                Les données saisies ici seront automatiquement synchronisées avec l'application AR,
                garantissant que chaque modèle 3D affiche les visuels et les détails techniques les plus récents.
              </p>

              <div className="mb-4">
                <h3 className="text-md font-medium text-gray-900 mb-3">Comment cela fonctionne</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-blue-600 text-white flex items-center justify-center rounded-full text-sm font-bold mt-0.5">1</span>
                    <p>Dans l’application AR, lorsque l’utilisateur appuie sur les boutons
                      <span className="font-medium"> “Information”</span>, <span className="font-medium">“Vidéo”</span> ou <span className="font-medium">“Fiche technique”</span>,
                      les contenus que vous avez ajoutés ici s’affichent instantanément à l’écran.</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-blue-600 text-white flex items-center justify-center rounded-full text-sm font-bold mt-0.5">2</span>
                    <p>Chaque partie du modèle (par exemple : positionneur, capteur, moteur, etc.) peut avoir ses propres
                      <span className="font-medium"> images, vidéos, descriptions techniques</span> et <span className="font-medium">boutons interactifs</span> configurés ici.</p>
                  </li>
                </ul>
              </div>

              
            </div>
          </div>
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
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* General Information Section */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200">
                Informations Générales de l'équipement
              </h2>
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      QR Code Image
                      <span className="text-xs text-gray-500 ml-2">(Image cible pour la détection AR)</span>
                    </label>
                    
                    {/* QR Code Generation Button */}
                    <div className="mb-3">
                      <button
                        type="button"
                        onClick={generateQRCode}
                        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                      >
                        <QrCode className="w-4 h-4" />
                        Générer un QR Code automatiquement
                      </button>
                      <p className="text-xs text-gray-500 mt-1 text-center">
                        Le QR code sera généré avec le nom et la référence de l'équipement
                      </p>
                    </div>

                    {/* QR Code Preview */}
                    {qrCodePreview && (
                      <div className="mb-3">
                        <div className="bg-gray-50 rounded-lg p-4 border">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-700">QR Code généré</span>
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={generateQRCode}
                                className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors"
                              >
                                <QrCode className="w-3 h-3" />
                                Régénérer
                              </button>
                              <button
                                type="button"
                                onClick={downloadQRCode}
                                className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700 transition-colors"
                              >
                                <Download className="w-3 h-3" />
                                Télécharger
                              </button>
                            </div>
                          </div>
                          <div className="flex justify-center">
                            <img
                              src={qrCodePreview}
                              alt="Generated QR Code"
                              className="w-32 h-32 border border-gray-200 rounded"
                            />
                          </div>
                          <p className="text-xs text-gray-500 text-center mt-2">
                            Nom du fichier: {formData.qrCodeName}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Manual Upload Option */}
                    <div className="relative">
                      <input
                        type="file"
                        id="qrCode"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, 'qrCode')}
                        className="hidden"
                      />

                      <div
                        onClick={() => document.getElementById('qrCode')?.click()}
                        className="w-full h-24 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors relative"
                      >
                        <div className="flex items-center justify-center h-full">
                          <div className="text-center">
                            <Upload className="w-6 h-6 text-gray-400 mx-auto mb-1" />
                            <p className="text-xs text-gray-500">Ou télécharger une image existante</p>
                          </div>
                        </div>
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
                </div>
              </div>
            </div>

            {/* AR Application Section */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200">
                Informations spécifiques de l'application réalité augmentée
              </h2>


              {/* Parts Section */}
              <div className="mt-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Parties d'équipement</h3>
                  <button
                    type="button"
                    onClick={addPart}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    + Ajouter partie
                  </button>
                </div>

                <div className="space-y-6">
                  {formData.parts.map((part, partIndex) => (
                    <div key={partIndex} className="bg-gray-50 rounded-lg p-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-gray-900">Partie {partIndex + 1}</h4>
                        {formData.parts.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removePart(partIndex)}
                            className="text-red-600 hover:text-red-700 text-sm font-medium"
                          >
                            Supprimer partie
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Nom de la partie
                          </label>
                          <input
                            type="text"
                            value={part.id}
                            onChange={(e) => handlePartChange(partIndex, 'id', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="ex: Positionneur electropneumatique"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            URL de la fiche technique
                          </label>
                          <input
                            type="url"
                            value={part.datasheetUrl}
                            onChange={(e) => handlePartChange(partIndex, 'datasheetUrl', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="https://drive.google.com/file/d/..."
                          />
                        </div>
                      </div>

                      {/* Image and Video Upload Section */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Image Upload */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Image de la partie
                          </label>
                          <div className="relative">
                            <input
                              type="file"
                              id={`partImage-${partIndex}`}
                              accept="image/*"
                              onChange={(e) => handlePartFileChange(e, partIndex, 'image')}
                              className="hidden"
                            />

                            <div
                              onClick={() => document.getElementById(`partImage-${partIndex}`)?.click()}
                              className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors relative"
                            >
                              {partImagePreviews[partIndex] ? (
                                <div className="relative w-full h-full">
                                  <img
                                    src={partImagePreviews[partIndex]!}
                                    alt="Part Image Preview"
                                    className="w-full h-full object-cover rounded-lg"
                                  />
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handlePartFileChange({ target: { files: null } } as any, partIndex, 'image');
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

                        {/* Video Upload */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Vidéo de la partie
                          </label>
                          <div className="relative">
                            <input
                              type="file"
                              id={`partVideo-${partIndex}`}
                              accept="video/*"
                              onChange={(e) => handlePartFileChange(e, partIndex, 'video')}
                              className="hidden"
                            />

                            <div
                              onClick={() => document.getElementById(`partVideo-${partIndex}`)?.click()}
                              className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors relative"
                            >
                              {partVideoPreviews[partIndex] ? (
                                <div className="relative w-full h-full">
                                  <video
                                    src={partVideoPreviews[partIndex]!}
                                    className="w-full h-full object-cover rounded-lg"
                                    controls
                                  />
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handlePartFileChange({ target: { files: null } } as any, partIndex, 'video');
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
                      </div>

                      {/* Part Descriptions */}
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <label className="block text-sm font-medium text-gray-700">
                            Descriptions de la partie
                          </label>
                          <button
                            type="button"
                            onClick={() => addPartDescription(partIndex)}
                            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                          >
                            + Ajouter description
                          </button>
                        </div>
                        <div className="space-y-3">
                          {part.description.map((desc, descIndex) => (
                            <div key={descIndex} className="flex gap-3 items-center">
                              <input
                                type="text"
                                value={desc.key}
                                onChange={(e) => handlePartDescriptionChange(partIndex, descIndex, 'key', e.target.value)}
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Clé (ex: marque)"
                              />
                              <input
                                type="text"
                                value={desc.value}
                                onChange={(e) => handlePartDescriptionChange(partIndex, descIndex, 'value', e.target.value)}
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Valeur (ex: SAMSON)"
                              />
                              {part.description.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => removePartDescription(partIndex, descIndex)}
                                  className="text-red-600 hover:text-red-700 px-2 py-1"
                                >
                                  ×
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Part Buttons */}
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <label className="block text-sm font-medium text-gray-700">
                              Boutons AR de la partie
                            </label>
                            <div className="group relative">
                              <Info className="w-4 h-4 text-gray-400 cursor-help" />
                              <div className="absolute left-0 top-6 w-80 p-3 bg-gray-800 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                                <p className="font-medium mb-2">Boutons AR de cette partie</p>
                                <p>Ces boutons apparaissent quand cette partie est sélectionnée dans l'AR. Ils affichent les images associées pour expliquer le fonctionnement ou la maintenance de cette partie spécifique.</p>
                              </div>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => addPartButton(partIndex)}
                            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                          >
                            + Ajouter bouton
                          </button>
                        </div>
                        <div className="space-y-4">
                          {part.buttons.map((button, buttonIndex) => (
                            <div key={buttonIndex} className="bg-gray-50 rounded-lg p-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Nom du bouton
                                  </label>
                                  <input
                                    type="text"
                                    value={button.name}
                                    onChange={(e) => handlePartButtonChange(partIndex, buttonIndex, 'name', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="ex: maintenance, schéma, fonctionnement"
                                  />
                                </div>
                                <div className="flex items-end">
                                  {part.buttons.length > 1 && (
                                    <button
                                      type="button"
                                      onClick={() => removePartButton(partIndex, buttonIndex)}
                                      className="text-red-600 hover:text-red-700 px-3 py-2 text-sm font-medium"
                                    >
                                      Supprimer bouton
                                    </button>
                                  )}
                                </div>
                              </div>

                              {/* Button Image Upload */}
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Image du bouton
                                </label>
                                <div className="relative">
                                  <input
                                    type="file"
                                    id={`partButton-${partIndex}-${buttonIndex}`}
                                    accept="image/*"
                                    onChange={(e) => handlePartButtonImageChange(partIndex, buttonIndex, e.target.files?.[0] || null)}
                                    className="hidden"
                                  />

                                  <div
                                    onClick={() => document.getElementById(`partButton-${partIndex}-${buttonIndex}`)?.click()}
                                    className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors relative"
                                  >
                                    <div className="flex items-center justify-center h-full">
                                      <div className="text-center">
                                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                        <p className="text-sm text-gray-500">Télécharger une image</p>
                                        <p className="text-xs text-gray-400 mt-1">Cliquez pour sélectionner</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
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