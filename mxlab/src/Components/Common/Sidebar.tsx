import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
  const navigate = useNavigate();
  const location = useLocation();
  
  // Initialize state from localStorage or defaults
  const [activeItem, setActiveItem] = useState(() => {
    return localStorage.getItem('sidebar-active-item') || 'Dashboard';
  });
  
  const [expandedItems, setExpandedItems] = useState<Record<string,boolean>>(() => {
    const saved = localStorage.getItem('sidebar-expanded-items');
    return saved ? JSON.parse(saved) : {};
  });

  const toggleExpanded = (itemId : string) => {
    setExpandedItems(prev => {
      const newState = {
        ...prev,
        [itemId]: !prev[itemId]
      };
      // Persist expanded state to localStorage
      localStorage.setItem('sidebar-expanded-items', JSON.stringify(newState));
      return newState;
    });
  };

  // Map routes back to menu item IDs
  const getItemIdForRoute = (pathname: string): string => {
    const routeToItemMap: Record<string, string> = {
      '/dashboard': 'Dashboard',
      '/intervention-view': 'InterventionView',
      '/intervention-create': 'InterventionCreate',
      '/intervention-total-view': 'Intervention-TotalView',
      '/user-view': 'UserView',
      '/user-create': 'UserCreate',
      '/site-view': 'SiteView',
      '/site-create': 'SiteCreate',
      '/site-cart': 'SiteCart',
      '/equipments-view': 'EquipementsView',
      '/equipments-create': 'EquipementsCreate',
      '/equipments-iot': 'EquipementsIOT',
      '/maintenance-view': 'MaintainanceView',
      '/maintenance-type': 'MaintainanceType',
      '/calendar': 'Calendar',
      '/settings': 'settings'
    };
    return routeToItemMap[pathname] || 'Dashboard';
  };

  // Update active item based on current route
  useEffect(() => {
    const currentItemId = getItemIdForRoute(location.pathname);
    setActiveItem(currentItemId);
    localStorage.setItem('sidebar-active-item', currentItemId);

    // Auto-expand parent menu if we're on a sub-item
    const menuItems = [
      {
        id: 'Dashboard',
        subItems: ['visualisations']
      },
      {
        id: 'orders',
        subItems: ['InterventionView', 'InterventionCreate', 'Intervention-TotalView']
      },
      {
        id: 'users',
        subItems: ['UserView', 'UserCreate']
      },
      {
        id: 'surveillance',
        subItems: ['SiteView', 'SiteCreate', 'SiteCart']
      },
      {
        id: 'equipment',
        subItems: ['EquipementsView', 'EquipementsCreate', 'EquipementsIOT']
      },
      {
        id: 'maintenance',
        subItems: ['MaintainanceView', 'MaintainanceType', 'Calendar']
      }
    ];

    // Find parent menu and expand it if current item is a sub-item
    const parentMenu = menuItems.find(menu => 
      menu.subItems && menu.subItems.includes(currentItemId)
    );

    if (parentMenu && !expandedItems[parentMenu.id]) {
      setExpandedItems(prev => {
        const newState = {
          ...prev,
          [parentMenu.id]: true
        };
        localStorage.setItem('sidebar-expanded-items', JSON.stringify(newState));
        return newState;
      });
    }
  }, [location.pathname, expandedItems]);

  // Map menu item IDs to routes
  const getRouteForItem = (itemId: string): string => {
    const routeMap: Record<string, string> = {
      'Dashboard': '/dashboard',
      'visualisations': '/dashboard',
      'InterventionRequests': '/InterventionRequests',
      'InterventionCreate': '/InterventionCreate',
      'InterventionList': '/InterventionList',
      'UserView': '/user-view',
      'UserCreate': '/user-create',
      'SiteView': '/site-view',
      'SiteCreate': '/site-create',
      'SiteCart': '/site-cart',
      'EquipementsView': '/equipments-view',
      'EquipementsCreate': '/equipments-create',
      'EquipementsIOT': '/equipments-iot',
      'MaintainanceView': '/maintenance-view',
      'MaintainanceType': '/maintenance-type',
      'Calendar': '/calendar',
      'settings': '/settings'
    };
    return routeMap[itemId] || '/dashboard';
  };

  const handleItemClick = (itemId: string, hasSubItems: boolean) => {
    setActiveItem(itemId);
    localStorage.setItem('sidebar-active-item', itemId);
    
    if (hasSubItems) {
      toggleExpanded(itemId);
    } else {
      // Navigate to the route if it's a leaf item
      const route = getRouteForItem(itemId);
      navigate(route);
    }
  };

  const handleSubItemClick = (subItemId: string) => {
    setActiveItem(subItemId);
    localStorage.setItem('sidebar-active-item', subItemId);
    const route = getRouteForItem(subItemId);
    navigate(route);
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
        { id: 'InterventionRequests', label: "Les demandes d'interventions" },
        { id: 'InterventionCreate', label: "Créer order d'intervention" },
        { id: 'InterventionList', label: "Liste des ordres d'interventions" }
      ]
    },
    {
      id: 'users',
      label: 'Utilisateurs',
      icon: Users,
      subItems: [
        { id: 'UserView', label: "Créer order d'intervention" },
        { id: 'UserCreate', label: "Liste des ordres d'interventions" },
      ]
    },
    {
      id: 'surveillance',
      label: 'Surveillance des sites',
      icon: Map,
      subItems: [
        { id: 'SiteView', label: "Liste des sites" },
        { id: 'SiteCreate', label: "Ajouter nouveau site" },
        { id: 'SiteCart', label: "Carte Globale (geolocalisation des sites) " }
      ]
    },
    {
      id: 'equipment',
      label: 'Équipement',
      icon: Package,
      subItems: [
        { id: 'EquipementsView', label: "Liste des equipements" },
        { id: 'EquipementsCreate', label: "Ajouter nouveau equipement" },
        { id: 'EquipementsIOT', label: "IOT" }
      ]
    },
    {
      id: 'maintenance',
      label: 'Maintenance',
      icon: Wrench,
      subItems: [
        { id: 'MaintainanceView', label: "Preventive" },
        { id: 'MaintainanceType', label: "Historique maintenance" },
        { id: 'Calendar', label: "Calendrier" }
      ]
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
                onClick={() => handleItemClick(item.id, !!item.subItems)}
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
                          onClick={() => handleSubItemClick(subItem.id)}
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