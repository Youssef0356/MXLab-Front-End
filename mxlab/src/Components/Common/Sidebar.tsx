import React, { useState } from 'react';
import logo from '../../assets/logo.png';
import {
  LayoutDashboard,
  ClipboardList,
  Users,
  Map,
  Package,
  Wrench,
  Settings,
  ChevronUp
} from 'lucide-react';

const Sidebar:React.FC = () => {
  const [activeItem, setActiveItem] = useState('dashboard');
  const [expandedItems, setExpandedItems] = useState<Record<string,boolean>>({});

  const toggleExpanded = (itemId : string) => {
    setExpandedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const menuItems = [
    {
      id: 'Dashboard',
      label: 'Tableau de bord',
      icon: LayoutDashboard,
      subItems: [
        { id: 'visualisations', label: 'Visualisations' }
      ]
    },
    {
      id: 'orders',
      label: "Ordre d'Intervention",
      icon: ClipboardList,
      subItems: [
        { id: 'create-order', label: "Créer order d'intervention" },
        { id: 'orders-list', label: "Liste des ordres d'interventions" },
        { id: 'intervention-requests', label: "Les demandes d'interventions" }
      ]
    },
    {
      id: 'users',
      label: 'Utilisateurs',
      icon: Users
    },
    {
      id: 'surveillance',
      label: 'Surveillance des sites',
      icon: Map
    },
    {
      id: 'equipment',
      label: 'Équipement',
      icon: Package
    },
    {
      id: 'maintenance',
      label: 'Maintenance',
      icon: Wrench
    },
    {
      id: 'settings',
      label: 'Paramètres',
      icon: Settings
    }
  ];

  return (
    <div className="w-70 h-screen bg-gradient-to-b from-slate-50 to-gray-100 shadow-xl flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-blue-200 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-white to-blue-50 rounded-full flex items-center justify-center shadow-lg ring-2 ring-white/20">
            <span><img src={logo} alt="logo" className="w-6 h-6" /></span>
          </div>
          <div>
            <h1 className="font-bold text-white text-sm drop-shadow-sm">Application MX Lab</h1>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2 list-none"> 
          {menuItems.map((item) => (
            <li key={item.id} className="list-none"> 
              <button
                onClick={() => {
                  setActiveItem(item.id);
                  if (item.subItems) {
                    toggleExpanded(item.id);
                  }
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-md text-left transition-all duration-300 ${activeItem === item.id
                    ? 'bg-gray-500 text-white shadow-lg shadow-gray-200  ring-1 ring-gray-300'
                    : 'text-slate-700 hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-200 hover:text-gray-700 hover:shadow-md hover:shadow-gray-200 '
                  }`}
              >
                <item.icon
                  className={`w-5 h-5 transition-all duration-300 ${activeItem === item.id
                      ? 'text-white drop-shadow-sm'
                      : 'text-slate-500 group-hover:text-gray-600'
                    }`}
                />
                <div className="flex-1 ">{item.label}</div>
                {item.subItems && (
                  <ChevronUp
                    className={`w-4 h-4 transition-all duration-300 ${expandedItems[item.id] ? 'rotate-180' : ''
                      } ${activeItem === item.id ? 'text-white' : 'text-slate-400'}`}
                  />
                )}
              </button>

              {/* Sub Items */}
              {item.subItems && expandedItems[item.id] && (
                <div className="bg-gradient-to-br from-slate-100 via-gray-100 to-slate-200 rounded-md p-3 shadow-inner"> {/* removed border */}
                  <ul className="space-y-1 list-none">
                    {item.subItems.map((subItem) => (
                      <li key={subItem.id} className="list-none">
                        <button
                          onClick={() => setActiveItem(subItem.id)}
                          className={`w-full text-left px-3 py-2.5 rounded-md text-sm transition-all duration-300 ${activeItem === subItem.id
                              ? 'text-black   bg-transparent'
                              : 'text-slate-600 hover:bg-gradient-to-r hover:from-gray-200 hover:to-gray-300 hover:text-gray-700 hover:shadow-md hover:shadow-gray-200 '
                            }`}
                        >
                          <span className="block">{subItem.label}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      </nav>

    </div>
  );
}

export default Sidebar;