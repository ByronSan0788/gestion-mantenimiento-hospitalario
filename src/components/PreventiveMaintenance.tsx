import { useState } from 'react';
import { Calendar, Plus, Filter, CheckCircle, Clock, AlertTriangle } from 'lucide-react';

type MantenimientoEstado = 'programado' | 'vencido' | 'completado';

// Estructura de datos para representar un mantenimiento preventivo
interface Mantenimiento {
  id: string;
  equipo: string;
  tipo: string;
  frecuencia: string;
  ultimaFecha: string;
  proximaFecha: string;
  responsable: string;
  estado: MantenimientoEstado;
  observaciones: string;
}

export default function PreventiveMaintenance() {
  // Estado para almacenar el texto de búsqueda
  const [searchTerm, setSearchTerm] = useState('');

  // Estado para controlar el filtro por estado del mantenimiento
  const [filterEstado, setFilterEstado] = useState<MantenimientoEstado | 'todos'>('todos');

  // Datos simulados para mostrar el funcionamiento del módulo
  const [mantenimientos] = useState<Mantenimiento[]>([
    {
      id: '1',
      equipo: 'Electrocardiógrafo GE MAC 2000',
      tipo: 'Calibración',
      frecuencia: 'Trimestral',
      ultimaFecha: '2025-12-01',
      proximaFecha: '2026-03-01',
      responsable: 'Carlos Ramírez',
      estado: 'completado',
      observaciones: 'Calibración completada sin novedades'
    },
    {
      id: '2',
      equipo: 'Monitor de Signos Vitales Mindray',
      tipo: 'Inspección General',
      frecuencia: 'Mensual',
      ultimaFecha: '2026-02-01',
      proximaFecha: '2026-03-01',
      responsable: 'Ana Martínez',
      estado: 'programado',
      observaciones: 'Programado para inicio de mes'
    },
    {
      id: '3',
      equipo: 'Desfibrilador Philips HeartStart',
      tipo: 'Verificación de Batería',
      frecuencia: 'Bimestral',
      ultimaFecha: '2025-12-15',
      proximaFecha: '2026-02-15',
      responsable: 'Luis Gómez',
      estado: 'vencido',
      observaciones: 'Requiere atención inmediata'
    },
    {
      id: '4',
      equipo: 'Bomba de Infusión Baxter',
      tipo: 'Mantenimiento Preventivo',
      frecuencia: 'Semestral',
      ultimaFecha: '2025-09-01',
      proximaFecha: '2026-03-01',
      responsable: 'María López',
      estado: 'programado',
      observaciones: 'Incluye cambio de filtros'
    },
    {
      id: '5',
      equipo: 'Ventilador Mecánico Dräger',
      tipo: 'Calibración Completa',
      frecuencia: 'Anual',
      ultimaFecha: '2025-03-15',
      proximaFecha: '2026-03-15',
      responsable: 'Pedro Sánchez',
      estado: 'programado',
      observaciones: 'Mantenimiento mayor programado'
    },
    {
      id: '6',
      equipo: 'Ecógrafo Siemens Acuson',
      tipo: 'Limpieza y Verificación',
      frecuencia: 'Trimestral',
      ultimaFecha: '2025-11-20',
      proximaFecha: '2026-02-20',
      responsable: 'Carlos Ramírez',
      estado: 'vencido',
      observaciones: 'Pendiente de programación'
    }
  ]);

  // Configuración visual de cada estado del mantenimiento
  const getEstadoConfig = (estado: MantenimientoEstado) => {
    const configs = {
      programado: {
        color: 'bg-blue-100 text-blue-700',
        icon: Calendar,
        label: 'Programado'
      },
      vencido: {
        color: 'bg-red-100 text-red-700',
        icon: AlertTriangle,
        label: 'Vencido'
      },
      completado: {
        color: 'bg-[#39A935]/10 text-[#39A935]',
        icon: CheckCircle,
        label: 'Completado'
      }
    };
    return configs[estado];
  };

  // Filtro dinámico por texto y estado
  const filteredMantenimientos = mantenimientos.filter(mant => {
    const matchesSearch =
      mant.equipo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mant.tipo.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesEstado = filterEstado === 'todos' || mant.estado === filterEstado;

    return matchesSearch && matchesEstado;
  });

  // Tarjetas de resumen para mostrar el estado general del módulo
  const stats = [
    {
      label: 'Total Programados',
      value: mantenimientos.length,
      color: 'text-gray-700',
      icon: Calendar
    },
    {
      label: 'Próximos 7 días',
      value: mantenimientos.filter(m => {
        const diff = new Date(m.proximaFecha).getTime() - new Date().getTime();
        return diff > 0 && diff <= 7 * 24 * 60 * 60 * 1000;
      }).length,
      color: 'text-blue-600',
      icon: Clock
    },
    {
      label: 'Vencidos',
      value: mantenimientos.filter(m => m.estado === 'vencido').length,
      color: 'text-red-600',
      icon: AlertTriangle
    },
    {
      label: 'Completados',
      value: mantenimientos.filter(m => m.estado === 'completado').length,
      color: 'text-[#39A935]',
      icon: CheckCircle
    }
  ];

  return (
    <div className="space-y-6">
      {/* Encabezado principal del módulo */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-gray-900">Mantenimiento Preventivo</h2>
          <p className="text-gray-600">Programación y control de mantenimientos preventivos</p>
        </div>
        <button className="flex items-center justify-center space-x-2 px-6 py-3 bg-[#39A935] hover:bg-[#2E8B2A] text-white rounded-xl transition-all shadow-lg">
          <Plus className="w-5 h-5" />
          <span>Nuevo Mantenimiento</span>
        </button>
      </div>

      {/* Tarjetas de resumen */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <Icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <p className={`text-2xl ${stat.color} mb-1`}>{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Sección de búsqueda y filtro */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar por equipo o tipo de mantenimiento..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#39A935] focus:border-transparent outline-none"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={filterEstado}
              onChange={(e) => setFilterEstado(e.target.value as MantenimientoEstado | 'todos')}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#39A935] focus:border-transparent outline-none appearance-none"
            >
              <option value="todos">Todos los estados</option>
              <option value="programado">Programado</option>
              <option value="vencido">Vencido</option>
              <option value="completado">Completado</option>
            </select>
          </div>
        </div>
      </div>

      {/* Lista visual de próximos mantenimientos */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-gray-900 mb-4">Próximos Mantenimientos</h3>
        <div className="space-y-3">
          {filteredMantenimientos
            .filter(m => m.estado !== 'completado')
            .sort((a, b) => new Date(a.proximaFecha).getTime() - new Date(b.proximaFecha).getTime())
            .slice(0, 5)
            .map((mant) => {
              const estadoConfig = getEstadoConfig(mant.estado);
              const EstadoIcon = estadoConfig.icon;

              // Cálculo de días restantes para la próxima fecha
              const diasRestantes = Math.ceil(
                (new Date(mant.proximaFecha).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
              );

              return (
                <div key={mant.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-4 flex-1">
                    <div className={`p-2 rounded-lg ${estadoConfig.color}`}>
                      <EstadoIcon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-gray-900">{mant.equipo}</h4>
                      <p className="text-sm text-gray-600">{mant.tipo} - {mant.frecuencia}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-900">
                      {new Date(mant.proximaFecha).toLocaleDateString('es-ES')}
                    </p>
                    <p className={`text-xs ${diasRestantes < 0 ? 'text-red-600' : diasRestantes <= 7 ? 'text-orange-600' : 'text-gray-600'}`}>
                      {diasRestantes < 0
                        ? `Vencido hace ${Math.abs(diasRestantes)} días`
                        : diasRestantes === 0
                        ? 'Hoy'
                        : `En ${diasRestantes} días`
                      }
                    </p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* Tabla principal de mantenimientos */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">Equipo</th>
                <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">Tipo</th>
                <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">Frecuencia</th>
                <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">Última Fecha</th>
                <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">Próxima Fecha</th>
                <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">Responsable</th>
                <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredMantenimientos.map((mant) => {
                const estadoConfig = getEstadoConfig(mant.estado);
                const EstadoIcon = estadoConfig.icon;

                return (
                  <tr key={mant.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {mant.equipo}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {mant.tipo}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {mant.frecuencia}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {new Date(mant.ultimaFecha).toLocaleDateString('es-ES')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {new Date(mant.proximaFecha).toLocaleDateString('es-ES')}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {mant.responsable}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs ${estadoConfig.color}`}>
                        <EstadoIcon className="w-3 h-3" />
                        <span>{estadoConfig.label}</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}