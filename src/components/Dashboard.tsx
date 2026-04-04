import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router';
import {
  Activity,
  ClipboardList,
  Calendar,
  Package,
  Users,
  BarChart3,
  LogOut,
  Menu,
  X,
  Bell,
  Settings
} from 'lucide-react';

export default function Dashboard() {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuItems = [
    {
      path: '/dashboard',
      icon: Activity,
      label: 'Panel Principal',
      color: 'text-[#FF6B00]'
    },
    {
      path: '/dashboard/ordenes-trabajo',
      icon: ClipboardList,
      label: 'Órdenes de Trabajo',
      color: 'text-blue-600'
    },
    {
      path: '/dashboard/mantenimiento-preventivo',
      icon: Calendar,
      label: 'Mantenimiento Preventivo',
      color: 'text-[#39A935]'
    },
    {
      path: '/dashboard/inventario-equipos',
      icon: Package,
      label: 'Inventario de Equipos',
      color: 'text-purple-600'
    },
    {
      path: '/dashboard/personal-tecnico',
      icon: Users,
      label: 'Personal Técnico',
      color: 'text-indigo-600'
    },
    {
      path: '/dashboard/reportes',
      icon: BarChart3,
      label: 'Reportes y Estadísticas',
      color: 'text-orange-600'
    }
  ];

  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo y Título */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {isSidebarOpen ? (
                  <X className="w-6 h-6 text-gray-700" />
                ) : (
                  <Menu className="w-6 h-6 text-gray-700" />
                )}
              </button>
              
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-br from-[#FF6B00] to-[#E56100] p-2 rounded-xl">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <div className="hidden md:block">
                  <h3 className="text-gray-900">Gestión de Mantenimiento</h3>
                  <p className="text-xs text-gray-600">Clínica Nueva Rafael Uribe Uribe</p>
                </div>
              </div>
            </div>

            {/* Acciones del Header */}
            <div className="flex items-center space-x-2">
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative">
                <Bell className="w-5 h-5 text-gray-700" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#FF6B00] rounded-full"></span>
              </button>
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <Settings className="w-5 h-5 text-gray-700" />
              </button>
              <Link
                to="/"
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <LogOut className="w-5 h-5 text-gray-700" />
                <span className="hidden sm:inline text-sm text-gray-700">Salir</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`
            fixed lg:static inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 
            transform transition-transform duration-300 ease-in-out lg:translate-x-0
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            mt-16 lg:mt-0
          `}
        >
          <nav className="p-4 space-y-2 h-full overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`
                    flex items-center space-x-3 px-4 py-3 rounded-xl transition-all
                    ${active
                      ? 'bg-gradient-to-r from-gray-100 to-gray-50 border-l-4 border-[#FF6B00]'
                      : 'hover:bg-gray-50'
                    }
                  `}
                >
                  <Icon className={`w-5 h-5 ${active ? item.color : 'text-gray-500'}`} />
                  <span className={`text-sm ${active ? 'text-gray-900' : 'text-gray-700'}`}>
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Overlay para móvil */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden mt-16"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Contenido Principal */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

// Componente de inicio del dashboard
export function DashboardHome() {
  const stats = [
    {
      label: 'Órdenes Activas',
      value: '24',
      icon: ClipboardList,
      color: 'bg-blue-500',
      change: '+12%'
    },
    {
      label: 'Mantenimientos Programados',
      value: '18',
      icon: Calendar,
      color: 'bg-[#39A935]',
      change: '+8%'
    },
    {
      label: 'Equipos en Inventario',
      value: '156',
      icon: Package,
      color: 'bg-purple-500',
      change: '+3%'
    },
    {
      label: 'Técnicos Activos',
      value: '12',
      icon: Users,
      color: 'bg-indigo-500',
      change: '0%'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Bienvenida */}
      <div className="bg-gradient-to-r from-[#FF6B00] to-[#E56100] rounded-2xl p-8 text-white">
        <h2 className="text-white mb-2">Bienvenido al Sistema de Gestión</h2>
        <p className="text-white/90">
          Clínica Nueva Rafael Uribe Uribe S.A.S. - Sistema de Mantenimiento Hospitalario
        </p>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className={`text-sm ${stat.change.startsWith('+') ? 'text-[#39A935]' : 'text-gray-500'}`}>
                  {stat.change}
                </span>
              </div>
              <h3 className="text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Accesos Rápidos */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-gray-900 mb-4">Accesos Rápidos</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link
            to="/dashboard/ordenes-trabajo"
            className="flex items-center space-x-3 p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <ClipboardList className="w-5 h-5 text-blue-600" />
            <span className="text-gray-700">Nueva Orden de Trabajo</span>
          </Link>
          <Link
            to="/dashboard/mantenimiento-preventivo"
            className="flex items-center space-x-3 p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <Calendar className="w-5 h-5 text-[#39A935]" />
            <span className="text-gray-700">Programar Mantenimiento</span>
          </Link>
          <Link
            to="/dashboard/reportes"
            className="flex items-center space-x-3 p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <BarChart3 className="w-5 h-5 text-orange-600" />
            <span className="text-gray-700">Ver Reportes</span>
          </Link>
        </div>
      </div>
    </div>
  );
}