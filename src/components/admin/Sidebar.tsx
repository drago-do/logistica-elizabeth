import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  PieChart, 
  Map as MapIcon, 
  LogOut,
  LayoutDashboard,
  RefreshCw
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
  onRefresh: () => void;
  isRefreshing: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  activeTab, 
  onTabChange, 
  onLogout,
  onRefresh,
  isRefreshing
}) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'visitas', label: 'Visitas y Actividad', icon: BarChart3 },
    { id: 'ventas', label: 'Ventas y Citas', icon: TrendingUp },
    { id: 'marketing', label: 'Marketing y Redes', icon: PieChart },
    { id: 'shipping', label: 'Mapa de Envíos', icon: MapIcon },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col h-screen sticky top-0" id="sidebar">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
            <BarChart3 className="text-white w-5 h-5" />
          </div>
          <span className="text-xl font-bold text-white tracking-tight">Enterprise BI</span>
        </div>

        <nav className="space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                activeTab === item.id 
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20" 
                  : "hover:bg-slate-800 hover:text-white"
              )}
              id={`nav-${item.id}`}
            >
              <item.icon className={cn(
                "w-5 h-5",
                activeTab === item.id ? "text-white" : "text-slate-400 group-hover:text-white"
              )} />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-6 space-y-4">
        <button
          onClick={onRefresh}
          disabled={isRefreshing}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 transition-all text-slate-400 hover:text-white disabled:opacity-50"
          id="refresh-button"
        >
          <RefreshCw className={cn("w-5 h-5", isRefreshing && "animate-spin")} />
          <span className="font-medium">Refrescar Datos</span>
        </button>

        <div className="pt-4 border-t border-slate-800">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/10 hover:text-red-400 transition-all text-slate-400"
            id="logout-button"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Cerrar Sesión</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
