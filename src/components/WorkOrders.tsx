import { useState } from 'react';
import { Search, Plus, Filter, Edit, Trash2, Eye, CheckCircle, Clock, AlertCircle } from 'lucide-react';

type OrdenEstado = 'pendiente' | 'en-proceso' | 'completada' | 'cancelada';
type OrdenPrioridad = 'baja' | 'media' | 'alta' | 'critica';

interface Orden {
  id: string;
  codigo: string;
  equipo: string;
  descripcion: string;
  prioridad: OrdenPrioridad;
  estado: OrdenEstado;
  tecnico: string;
  fechaCreacion: string;
  fechaEstimada: string;
}

export default function WorkOrders() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterEstado, setFilterEstado] = useState<OrdenEstado | 'todas'>('todas');
  const [showModal, setShowModal] = useState(false);

  const [ordenes] = useState<Orden[]>([
    {
      id: '1',
      codigo: 'OT-2026-001',
      equipo: 'Electrocardiógrafo GE MAC 2000',
      descripcion: 'Calibración preventiva trimestral',
      prioridad: 'media',
      estado: 'en-proceso',
      tecnico: 'Carlos Ramírez',
      fechaCreacion: '2026-02-15',
      fechaEstimada: '2026-03-05'
    },
    {
      id: '2',
      codigo: 'OT-2026-002',
      equipo: 'Desfibrilador Philips HeartStart',
      descripcion: 'Falla en sistema de carga de batería',
      prioridad: 'critica',
      estado: 'pendiente',
      tecnico: 'Ana Martínez',
      fechaCreacion: '2026-02-28',
      fechaEstimada: '2026-03-02'
    },
    {
      id: '3',
      codigo: 'OT-2026-003',
      equipo: 'Monitor de Signos Vitales Mindray',
      descripcion: 'Reemplazo de sensores',
      prioridad: 'alta',
      estado: 'completada',
      tecnico: 'Luis Gómez',
      fechaCreacion: '2026-02-10',
      fechaEstimada: '2026-02-20'
    },
    {
      id: '4',
      codigo: 'OT-2026-004',
      equipo: 'Bomba de Infusión Baxter',
      descripcion: 'Mantenimiento preventivo anual',
      prioridad: 'media',
      estado: 'en-proceso',
      tecnico: 'María López',
      fechaCreacion: '2026-02-20',
      fechaEstimada: '2026-03-10'
    },
    {
      id: '5',
      codigo: 'OT-2026-005',
      equipo: 'Ventilador Mecánico Dräger',
      descripcion: 'Verificación de parámetros respiratorios',
      prioridad: 'baja',
      estado: 'pendiente',
      tecnico: 'Pedro Sánchez',
      fechaCreacion: '2026-02-25',
      fechaEstimada: '2026-03-15'
    }
  ]);

  const getPrioridadColor = (prioridad: OrdenPrioridad) => {
    const colors = {
      baja: 'bg-gray-100 text-gray-700',
      media: 'bg-blue-100 text-blue-700',
      alta: 'bg-orange-100 text-orange-700',
      critica: 'bg-red-100 text-red-700'
    };
    return colors[prioridad];
  };

  const getEstadoConfig = (estado: OrdenEstado) => {
    const configs = {
      pendiente: {
        color: 'bg-yellow-100 text-yellow-700',
        icon: Clock,
        label: 'Pendiente'
      },
      'en-proceso': {
        color: 'bg-blue-100 text-blue-700',
        icon: AlertCircle,
        label: 'En Proceso'
      },
      completada: {
        color: 'bg-[#39A935]/10 text-[#39A935]',
        icon: CheckCircle,
        label: 'Completada'
      },
      cancelada: {
        color: 'bg-red-100 text-red-700',
        icon: Trash2,
        label: 'Cancelada'
      }
    };
    return configs[estado];
  };

  const filteredOrdenes = ordenes.filter(orden => {
    const matchesSearch = orden.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         orden.equipo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         orden.descripcion.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesEstado = filterEstado === 'todas' || orden.estado === filterEstado;
    return matchesSearch && matchesEstado;
  });

  const stats = [
    { label: 'Total', value: ordenes.length, color: 'text-gray-700' },
    { label: 'Pendientes', value: ordenes.filter(o => o.estado === 'pendiente').length, color: 'text-yellow-600' },
    { label: 'En Proceso', value: ordenes.filter(o => o.estado === 'en-proceso').length, color: 'text-blue-600' },
    { label: 'Completadas', value: ordenes.filter(o => o.estado === 'completada').length, color: 'text-[#39A935]' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-gray-900">Órdenes de Trabajo</h2>
          <p className="text-gray-600">Gestión y seguimiento de órdenes de mantenimiento</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center justify-center space-x-2 px-6 py-3 bg-[#FF6B00] hover:bg-[#E56100] text-white rounded-xl transition-all shadow-lg"
        >
          <Plus className="w-5 h-5" />
          <span>Nueva Orden</span>
        </button>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
            <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
            <p className={`text-2xl ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Filtros y Búsqueda */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por código, equipo o descripción..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent outline-none"
            />
          </div>

          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={filterEstado}
              onChange={(e) => setFilterEstado(e.target.value as OrdenEstado | 'todas')}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent outline-none appearance-none"
            >
              <option value="todas">Todos los estados</option>
              <option value="pendiente">Pendiente</option>
              <option value="en-proceso">En Proceso</option>
              <option value="completada">Completada</option>
              <option value="cancelada">Cancelada</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tabla de Órdenes */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">Código</th>
                <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">Equipo</th>
                <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">Descripción</th>
                <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">Prioridad</th>
                <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">Técnico</th>
                <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">Fecha Estimada</th>
                <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredOrdenes.map((orden) => {
                const estadoConfig = getEstadoConfig(orden.estado);
                const EstadoIcon = estadoConfig.icon;
                
                return (
                  <tr key={orden.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {orden.codigo}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {orden.equipo}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 max-w-xs truncate">
                      {orden.descripcion}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs ${getPrioridadColor(orden.prioridad)}`}>
                        {orden.prioridad.charAt(0).toUpperCase() + orden.prioridad.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs ${estadoConfig.color}`}>
                        <EstadoIcon className="w-3 h-3" />
                        <span>{estadoConfig.label}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {orden.tecnico}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {new Date(orden.fechaEstimada).toLocaleDateString('es-ES')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center space-x-2">
                        <button className="p-2 hover:bg-blue-50 rounded-lg transition-colors group">
                          <Eye className="w-4 h-4 text-gray-500 group-hover:text-blue-600" />
                        </button>
                        <button className="p-2 hover:bg-orange-50 rounded-lg transition-colors group">
                          <Edit className="w-4 h-4 text-gray-500 group-hover:text-[#FF6B00]" />
                        </button>
                        <button className="p-2 hover:bg-red-50 rounded-lg transition-colors group">
                          <Trash2 className="w-4 h-4 text-gray-500 group-hover:text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de Nueva Orden */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-gray-900">Nueva Orden de Trabajo</h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Equipo</label>
                  <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B00] outline-none" />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Prioridad</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B00] outline-none">
                    <option value="baja">Baja</option>
                    <option value="media">Media</option>
                    <option value="alta">Alta</option>
                    <option value="critica">Crítica</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Descripción</label>
                <textarea rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B00] outline-none"></textarea>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-2 bg-[#FF6B00] hover:bg-[#E56100] text-white rounded-lg transition-colors"
              >
                Crear Orden
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}