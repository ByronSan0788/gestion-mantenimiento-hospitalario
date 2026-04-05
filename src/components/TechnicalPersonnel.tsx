import { useState } from 'react';
import { Search, Plus, Filter, UserCheck, Clock, Briefcase, Award, Mail, Phone, Calendar } from 'lucide-react';

type PersonalEstado = 'activo' | 'vacaciones' | 'incapacidad' | 'inactivo';
type PersonalEspecialidad = 'electronica' | 'mecanica' | 'refrigeracion' | 'sistemas' | 'general';

// Estructura de datos para representar al personal técnico
interface Personal {
  id: string;
  codigo: string;
  nombre: string;
  cargo: string;
  especialidad: PersonalEspecialidad;
  certificaciones: string[];
  telefono: string;
  email: string;
  estado: PersonalEstado;
  fechaIngreso: string;
  ordenesAsignadas: number;
  ordenesCompletadas: number;
  disponibilidad: string;
}

export default function TechnicalPersonnel() {
  // Estado para almacenar el texto de búsqueda
  const [searchTerm, setSearchTerm] = useState('');

  // Estado para filtrar por estado del personal
  const [filterEstado, setFilterEstado] = useState<PersonalEstado | 'todos'>('todos');

  // Estado para filtrar por especialidad técnica
  const [filterEspecialidad, setFilterEspecialidad] = useState<PersonalEspecialidad | 'todas'>('todas');

  // Datos simulados del personal técnico del sistema
  const [personal] = useState<Personal[]>([
    {
      id: '1',
      codigo: 'TEC-001',
      nombre: 'Carlos Ramírez González',
      cargo: 'Ingeniero Biomédico Senior',
      especialidad: 'electronica',
      certificaciones: ['ISO 13485', 'Equipos de Diagnóstico', 'Calibración'],
      telefono: '+57 310 555 0101',
      email: 'carlos.ramirez@clinica.com',
      estado: 'activo',
      fechaIngreso: '2020-03-15',
      ordenesAsignadas: 8,
      ordenesCompletadas: 156,
      disponibilidad: 'Disponible'
    },
    {
      id: '2',
      codigo: 'TEC-002',
      nombre: 'Ana María Martínez',
      cargo: 'Técnica en Mantenimiento',
      especialidad: 'mecanica',
      certificaciones: ['Mantenimiento Preventivo', 'Equipos Mecánicos'],
      telefono: '+57 320 555 0202',
      email: 'ana.martinez@clinica.com',
      estado: 'activo',
      fechaIngreso: '2021-06-20',
      ordenesAsignadas: 5,
      ordenesCompletadas: 98,
      disponibilidad: 'En campo'
    },
    {
      id: '3',
      codigo: 'TEC-003',
      nombre: 'Luis Alberto Gómez',
      cargo: 'Especialista en Equipos Críticos',
      especialidad: 'sistemas',
      certificaciones: ['UCI Equipment', 'Ventiladores Mecánicos', 'BLS'],
      telefono: '+57 315 555 0303',
      email: 'luis.gomez@clinica.com',
      estado: 'activo',
      fechaIngreso: '2019-01-10',
      ordenesAsignadas: 12,
      ordenesCompletadas: 234,
      disponibilidad: 'Disponible'
    },
    {
      id: '4',
      codigo: 'TEC-004',
      nombre: 'María Paula López',
      cargo: 'Ingeniera de Soporte',
      especialidad: 'electronica',
      certificaciones: ['Imagenología', 'Equipos de Laboratorio'],
      telefono: '+57 318 555 0404',
      email: 'maria.lopez@clinica.com',
      estado: 'vacaciones',
      fechaIngreso: '2021-11-05',
      ordenesAsignadas: 0,
      ordenesCompletadas: 67,
      disponibilidad: 'Vacaciones hasta 10/03'
    },
    {
      id: '5',
      codigo: 'TEC-005',
      nombre: 'Pedro José Sánchez',
      cargo: 'Técnico en Refrigeración',
      especialidad: 'refrigeracion',
      certificaciones: ['Sistemas HVAC', 'Refrigeración Médica', 'EPA 608'],
      telefono: '+57 312 555 0505',
      email: 'pedro.sanchez@clinica.com',
      estado: 'activo',
      fechaIngreso: '2022-02-15',
      ordenesAsignadas: 6,
      ordenesCompletadas: 45,
      disponibilidad: 'En campo'
    },
    {
      id: '6',
      codigo: 'TEC-006',
      nombre: 'Diana Carolina Ruiz',
      cargo: 'Coordinadora de Mantenimiento',
      especialidad: 'general',
      certificaciones: ['Gestión de Mantenimiento', 'ISO 9001', 'Auditor Interno'],
      telefono: '+57 311 555 0606',
      email: 'diana.ruiz@clinica.com',
      estado: 'activo',
      fechaIngreso: '2018-08-20',
      ordenesAsignadas: 3,
      ordenesCompletadas: 289,
      disponibilidad: 'Oficina'
    },
    {
      id: '7',
      codigo: 'TEC-007',
      nombre: 'Jorge Andrés Torres',
      cargo: 'Técnico de Mantenimiento',
      especialidad: 'mecanica',
      certificaciones: ['Mantenimiento Correctivo', 'Equipos Hospitalarios'],
      telefono: '+57 314 555 0707',
      email: 'jorge.torres@clinica.com',
      estado: 'incapacidad',
      fechaIngreso: '2023-04-10',
      ordenesAsignadas: 0,
      ordenesCompletadas: 23,
      disponibilidad: 'Incapacidad hasta 05/03'
    },
    {
      id: '8',
      codigo: 'TEC-008',
      nombre: 'Sandra Milena Castro',
      cargo: 'Ingeniera Biomédica',
      especialidad: 'electronica',
      certificaciones: ['Equipos de Terapia', 'Seguridad Eléctrica'],
      telefono: '+57 316 555 0808',
      email: 'sandra.castro@clinica.com',
      estado: 'activo',
      fechaIngreso: '2020-09-12',
      ordenesAsignadas: 7,
      ordenesCompletadas: 142,
      disponibilidad: 'Disponible'
    }
  ]);

  // Configuración visual según el estado del personal
  const getEstadoConfig = (estado: PersonalEstado) => {
    const configs = {
      activo: {
        color: 'bg-[#39A935]/10 text-[#39A935]',
        icon: UserCheck,
        label: 'Activo'
      },
      vacaciones: {
        color: 'bg-blue-100 text-blue-700',
        icon: Calendar,
        label: 'Vacaciones'
      },
      incapacidad: {
        color: 'bg-yellow-100 text-yellow-700',
        icon: Clock,
        label: 'Incapacidad'
      },
      inactivo: {
        color: 'bg-gray-100 text-gray-700',
        icon: UserCheck,
        label: 'Inactivo'
      }
    };
    return configs[estado];
  };

  // Configuración visual según la especialidad del técnico
  const getEspecialidadColor = (especialidad: PersonalEspecialidad) => {
    const colors = {
      electronica: 'bg-purple-100 text-purple-700',
      mecanica: 'bg-orange-100 text-orange-700',
      refrigeracion: 'bg-cyan-100 text-cyan-700',
      sistemas: 'bg-indigo-100 text-indigo-700',
      general: 'bg-gray-100 text-gray-700'
    };
    return colors[especialidad];
  };

  // Filtro dinámico por texto, estado y especialidad
  const filteredPersonal = personal.filter(p => {
    const matchesSearch =
      p.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.cargo.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesEstado = filterEstado === 'todos' || p.estado === filterEstado;
    const matchesEspecialidad = filterEspecialidad === 'todas' || p.especialidad === filterEspecialidad;

    return matchesSearch && matchesEstado && matchesEspecialidad;
  });

  // Tarjetas de resumen para mostrar el estado general del personal
  const stats = [
    {
      label: 'Total Personal',
      value: personal.length,
      color: 'text-gray-700',
      icon: Briefcase
    },
    {
      label: 'Personal Activo',
      value: personal.filter(p => p.estado === 'activo').length,
      color: 'text-[#39A935]',
      icon: UserCheck
    },
    {
      label: 'Órdenes Asignadas',
      value: personal.reduce((sum, p) => sum + p.ordenesAsignadas, 0),
      color: 'text-blue-600',
      icon: Clock
    },
    {
      label: 'Órdenes Completadas',
      value: personal.reduce((sum, p) => sum + p.ordenesCompletadas, 0),
      color: 'text-[#FF6B00]',
      icon: Award
    }
  ];

  return (
    <div className="space-y-6">
      {/* Encabezado principal del módulo */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-gray-900">Personal Técnico</h2>
          <p className="text-gray-600">Gestión del equipo de mantenimiento biomédico</p>
        </div>
        <button className="flex items-center justify-center space-x-2 px-6 py-3 bg-[#FF6B00] hover:bg-[#E56100] text-white rounded-xl transition-all shadow-lg">
          <Plus className="w-5 h-5" />
          <span>Nuevo Personal</span>
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

      {/* Sección de búsqueda y filtros */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por código, nombre o cargo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent outline-none"
            />
          </div>

          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={filterEspecialidad}
              onChange={(e) => setFilterEspecialidad(e.target.value as PersonalEspecialidad | 'todas')}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent outline-none appearance-none"
            >
              <option value="todas">Todas las especialidades</option>
              <option value="electronica">Electrónica</option>
              <option value="mecanica">Mecánica</option>
              <option value="refrigeracion">Refrigeración</option>
              <option value="sistemas">Sistemas</option>
              <option value="general">General</option>
            </select>
          </div>

          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={filterEstado}
              onChange={(e) => setFilterEstado(e.target.value as PersonalEstado | 'todos')}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent outline-none appearance-none"
            >
              <option value="todos">Todos los estados</option>
              <option value="activo">Activo</option>
              <option value="vacaciones">Vacaciones</option>
              <option value="incapacidad">Incapacidad</option>
              <option value="inactivo">Inactivo</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tarjetas individuales del personal técnico */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPersonal.map((p) => {
          const estadoConfig = getEstadoConfig(p.estado);
          const EstadoIcon = estadoConfig.icon;

          return (
            <div key={p.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              {/* Encabezado de la tarjeta del técnico */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="text-gray-900">{p.nombre}</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{p.cargo}</p>
                  <p className="text-xs text-gray-500 font-mono">{p.codigo}</p>
                </div>
                <div className={`p-2 rounded-lg ${estadoConfig.color}`}>
                  <EstadoIcon className="w-5 h-5" />
                </div>
              </div>

              {/* Especialidad principal */}
              <div className="mb-4">
                <span className={`inline-flex px-3 py-1 rounded-full text-xs ${getEspecialidadColor(p.especialidad)}`}>
                  {p.especialidad.charAt(0).toUpperCase() + p.especialidad.slice(1)}
                </span>
              </div>

              {/* Información de contacto */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span>{p.telefono}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="truncate">{p.email}</span>
                </div>
              </div>

              {/* Certificaciones del técnico */}
              <div className="mb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Award className="w-4 h-4 text-gray-400" />
                  <span className="text-xs text-gray-600">Certificaciones</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {p.certificaciones.slice(0, 2).map((cert, idx) => (
                    <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      {cert}
                    </span>
                  ))}
                  {p.certificaciones.length > 2 && (
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      +{p.certificaciones.length - 2}
                    </span>
                  )}
                </div>
              </div>

              {/* Resumen de órdenes asignadas y completadas */}
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-200">
                <div>
                  <p className="text-xs text-gray-600 mb-1">Asignadas</p>
                  <p className="text-lg text-blue-600">{p.ordenesAsignadas}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Completadas</p>
                  <p className="text-lg text-[#39A935]">{p.ordenesCompletadas}</p>
                </div>
              </div>

              {/* Estado de disponibilidad del técnico */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">Disponibilidad</span>
                  <span className="text-xs text-gray-900">{p.disponibilidad}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}