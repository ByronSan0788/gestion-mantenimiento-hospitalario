import { useState } from 'react';
import { Search, Plus, Filter, Edit, Package, AlertCircle, CheckCircle, Download } from 'lucide-react';

type EquipoEstado = 'operativo' | 'mantenimiento' | 'fuera-servicio' | 'baja';
type EquipoCategoria = 'diagnostico' | 'terapia' | 'soporte' | 'laboratorio';

interface Equipo {
  id: string;
  codigo: string;
  nombre: string;
  marca: string;
  modelo: string;
  serie: string;
  categoria: EquipoCategoria;
  ubicacion: string;
  estado: EquipoEstado;
  fechaAdquisicion: string;
  ultimoMantenimiento: string;
  responsable: string;
}

export default function BiomedicalInventory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterEstado, setFilterEstado] = useState<EquipoEstado | 'todos'>('todos');
  const [filterCategoria, setFilterCategoria] = useState<EquipoCategoria | 'todas'>('todas');

  const [equipos] = useState<Equipo[]>([
    {
      id: '1',
      codigo: 'BM-001',
      nombre: 'Electrocardiógrafo',
      marca: 'GE Healthcare',
      modelo: 'MAC 2000',
      serie: 'GE2000-2024-001',
      categoria: 'diagnostico',
      ubicacion: 'Cardiología - Piso 3',
      estado: 'operativo',
      fechaAdquisicion: '2024-01-15',
      ultimoMantenimiento: '2026-02-15',
      responsable: 'Carlos Ramírez'
    },
    {
      id: '2',
      codigo: 'BM-002',
      nombre: 'Monitor de Signos Vitales',
      marca: 'Mindray',
      modelo: 'BeneView T5',
      serie: 'MR-T5-2023-045',
      categoria: 'diagnostico',
      ubicacion: 'UCI - Piso 4',
      estado: 'operativo',
      fechaAdquisicion: '2023-06-20',
      ultimoMantenimiento: '2026-01-10',
      responsable: 'Ana Martínez'
    },
    {
      id: '3',
      codigo: 'BM-003',
      nombre: 'Desfibrilador',
      marca: 'Philips',
      modelo: 'HeartStart XL',
      serie: 'PH-HS-2024-012',
      categoria: 'terapia',
      ubicacion: 'Urgencias - Piso 1',
      estado: 'mantenimiento',
      fechaAdquisicion: '2024-03-10',
      ultimoMantenimiento: '2026-02-28',
      responsable: 'Luis Gómez'
    },
    {
      id: '4',
      codigo: 'BM-004',
      nombre: 'Bomba de Infusión',
      marca: 'Baxter',
      modelo: 'Colleague CXE',
      serie: 'BX-CXE-2023-089',
      categoria: 'terapia',
      ubicacion: 'Hospitalización - Piso 2',
      estado: 'operativo',
      fechaAdquisicion: '2023-11-05',
      ultimoMantenimiento: '2026-01-20',
      responsable: 'María López'
    },
    {
      id: '5',
      codigo: 'BM-005',
      nombre: 'Ventilador Mecánico',
      marca: 'Dräger',
      modelo: 'Evita V500',
      serie: 'DR-V500-2024-003',
      categoria: 'soporte',
      ubicacion: 'UCI - Piso 4',
      estado: 'operativo',
      fechaAdquisicion: '2024-02-15',
      ultimoMantenimiento: '2026-02-10',
      responsable: 'Pedro Sánchez'
    },
    {
      id: '6',
      codigo: 'BM-006',
      nombre: 'Ecógrafo',
      marca: 'Siemens',
      modelo: 'Acuson X300',
      serie: 'SM-X300-2022-021',
      categoria: 'diagnostico',
      ubicacion: 'Imagenología - Piso 1',
      estado: 'operativo',
      fechaAdquisicion: '2022-08-10',
      ultimoMantenimiento: '2025-12-15',
      responsable: 'Carlos Ramírez'
    },
    {
      id: '7',
      codigo: 'BM-007',
      nombre: 'Analizador Hematológico',
      marca: 'Sysmex',
      modelo: 'XN-1000',
      serie: 'SX-XN-2023-034',
      categoria: 'laboratorio',
      ubicacion: 'Laboratorio Clínico - Piso 2',
      estado: 'operativo',
      fechaAdquisicion: '2023-05-20',
      ultimoMantenimiento: '2026-01-25',
      responsable: 'Ana Martínez'
    },
    {
      id: '8',
      codigo: 'BM-008',
      nombre: 'Oxímetro de Pulso',
      marca: 'Masimo',
      modelo: 'Radical-7',
      serie: 'MS-R7-2024-056',
      categoria: 'diagnostico',
      ubicacion: 'Urgencias - Piso 1',
      estado: 'fuera-servicio',
      fechaAdquisicion: '2024-04-12',
      ultimoMantenimiento: '2026-02-01',
      responsable: 'Luis Gómez'
    }
  ]);

  const getEstadoConfig = (estado: EquipoEstado) => {
    const configs = {
      operativo: {
        color: 'bg-[#39A935]/10 text-[#39A935]',
        icon: CheckCircle,
        label: 'Operativo'
      },
      mantenimiento: {
        color: 'bg-yellow-100 text-yellow-700',
        icon: AlertCircle,
        label: 'En Mantenimiento'
      },
      'fuera-servicio': {
        color: 'bg-red-100 text-red-700',
        icon: AlertCircle,
        label: 'Fuera de Servicio'
      },
      baja: {
        color: 'bg-gray-100 text-gray-700',
        icon: Package,
        label: 'Dado de Baja'
      }
    };
    return configs[estado];
  };

  const getCategoriaColor = (categoria: EquipoCategoria) => {
    const colors = {
      diagnostico: 'bg-blue-100 text-blue-700',
      terapia: 'bg-purple-100 text-purple-700',
      soporte: 'bg-orange-100 text-orange-700',
      laboratorio: 'bg-green-100 text-green-700'
    };
    return colors[categoria];
  };

  const filteredEquipos = equipos.filter(equipo => {
    const matchesSearch = equipo.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         equipo.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         equipo.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         equipo.modelo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesEstado = filterEstado === 'todos' || equipo.estado === filterEstado;
    const matchesCategoria = filterCategoria === 'todas' || equipo.categoria === filterCategoria;
    return matchesSearch && matchesEstado && matchesCategoria;
  });

  const stats = [
    { 
      label: 'Total Equipos', 
      value: equipos.length, 
      color: 'text-gray-700',
      bgColor: 'bg-gray-100'
    },
    { 
      label: 'Operativos', 
      value: equipos.filter(e => e.estado === 'operativo').length, 
      color: 'text-[#39A935]',
      bgColor: 'bg-[#39A935]/10'
    },
    { 
      label: 'En Mantenimiento', 
      value: equipos.filter(e => e.estado === 'mantenimiento').length, 
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    },
    { 
      label: 'Fuera de Servicio', 
      value: equipos.filter(e => e.estado === 'fuera-servicio').length, 
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-gray-900">Inventario de Equipos Biomédicos</h2>
          <p className="text-gray-600">Gestión y control del inventario de equipamiento médico</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center justify-center space-x-2 px-4 py-3 border-2 border-[#FF6B00] text-[#FF6B00] hover:bg-[#FF6B00] hover:text-white rounded-xl transition-all">
            <Download className="w-5 h-5" />
            <span>Exportar</span>
          </button>
          <button className="flex items-center justify-center space-x-2 px-6 py-3 bg-[#FF6B00] hover:bg-[#E56100] text-white rounded-xl transition-all shadow-lg">
            <Plus className="w-5 h-5" />
            <span>Nuevo Equipo</span>
          </button>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
            <div className={`inline-flex px-3 py-1 rounded-full ${stat.bgColor} ${stat.color} text-xs mb-2`}>
              {stat.label}
            </div>
            <p className={`text-2xl ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por código, nombre, marca o modelo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent outline-none"
            />
          </div>

          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={filterCategoria}
              onChange={(e) => setFilterCategoria(e.target.value as EquipoCategoria | 'todas')}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent outline-none appearance-none"
            >
              <option value="todas">Todas las categorías</option>
              <option value="diagnostico">Diagnóstico</option>
              <option value="terapia">Terapia</option>
              <option value="soporte">Soporte</option>
              <option value="laboratorio">Laboratorio</option>
            </select>
          </div>

          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={filterEstado}
              onChange={(e) => setFilterEstado(e.target.value as EquipoEstado | 'todos')}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent outline-none appearance-none"
            >
              <option value="todos">Todos los estados</option>
              <option value="operativo">Operativo</option>
              <option value="mantenimiento">En Mantenimiento</option>
              <option value="fuera-servicio">Fuera de Servicio</option>
              <option value="baja">Dado de Baja</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tabla de Equipos */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">Código</th>
                <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">Equipo</th>
                <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">Marca/Modelo</th>
                <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">Serie</th>
                <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">Categoría</th>
                <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">Ubicación</th>
                <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredEquipos.map((equipo) => {
                const estadoConfig = getEstadoConfig(equipo.estado);
                const EstadoIcon = estadoConfig.icon;
                
                return (
                  <tr key={equipo.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {equipo.codigo}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {equipo.nombre}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      <div>{equipo.marca}</div>
                      <div className="text-xs text-gray-500">{equipo.modelo}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 font-mono">
                      {equipo.serie}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs ${getCategoriaColor(equipo.categoria)}`}>
                        {equipo.categoria.charAt(0).toUpperCase() + equipo.categoria.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {equipo.ubicacion}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs ${estadoConfig.color}`}>
                        <EstadoIcon className="w-3 h-3" />
                        <span>{estadoConfig.label}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center space-x-2">
                        <button className="p-2 hover:bg-blue-50 rounded-lg transition-colors group">
                          <Package className="w-4 h-4 text-gray-500 group-hover:text-blue-600" />
                        </button>
                        <button className="p-2 hover:bg-orange-50 rounded-lg transition-colors group">
                          <Edit className="w-4 h-4 text-gray-500 group-hover:text-[#FF6B00]" />
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
    </div>
  );
}