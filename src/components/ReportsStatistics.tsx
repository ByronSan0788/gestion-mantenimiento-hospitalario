import { useState } from 'react';
import { BarChart3, TrendingUp, Download, Calendar, FileText, PieChart, Activity, AlertCircle } from 'lucide-react';

type PeriodoReporte = 'semana' | 'mes' | 'trimestre' | 'año';

// Estructura para las tarjetas principales de estadísticas
interface EstadisticaCard {
  titulo: string;
  valor: string | number;
  cambio: string;
  tendencia: 'subida' | 'bajada' | 'neutral';
  icon: any;
  color: string;
}

export default function ReportsStatistics() {
  // Estado para controlar el período seleccionado en el reporte
  const [periodoSeleccionado, setPeriodoSeleccionado] = useState<PeriodoReporte>('mes');

  // Tarjetas principales con indicadores del sistema
  const estadisticasPrincipales: EstadisticaCard[] = [
    {
      titulo: 'Órdenes Completadas',
      valor: 342,
      cambio: '+12% vs mes anterior',
      tendencia: 'subida',
      icon: FileText,
      color: 'text-[#39A935]'
    },
    {
      titulo: 'Tiempo Promedio Resolución',
      valor: '4.2 hrs',
      cambio: '-8% vs mes anterior',
      tendencia: 'subida',
      icon: Activity,
      color: 'text-blue-600'
    },
    {
      titulo: 'Equipos en Mantenimiento',
      valor: 23,
      cambio: '+3 vs mes anterior',
      tendencia: 'neutral',
      icon: AlertCircle,
      color: 'text-yellow-600'
    },
    {
      titulo: 'Tasa de Cumplimiento',
      valor: '94.5%',
      cambio: '+2.3% vs mes anterior',
      tendencia: 'subida',
      icon: TrendingUp,
      color: 'text-[#FF6B00]'
    }
  ];

  // Datos para el gráfico de órdenes por tipo
  const ordenesporTipo = [
    { tipo: 'Correctivo', cantidad: 145, porcentaje: 42, color: 'bg-red-500' },
    { tipo: 'Preventivo', cantidad: 98, porcentaje: 29, color: 'bg-[#39A935]' },
    { tipo: 'Calibración', cantidad: 56, porcentaje: 16, color: 'bg-blue-500' },
    { tipo: 'Instalación', cantidad: 43, porcentaje: 13, color: 'bg-[#FF6B00]' }
  ];

  // Datos resumidos de equipos por categoría
  const equiposPorCategoria = [
    { categoria: 'Diagnóstico', cantidad: 45, estado: 'operativo' },
    { categoria: 'Terapia', cantidad: 32, estado: 'operativo' },
    { categoria: 'Soporte', cantidad: 18, estado: 'operativo' },
    { categoria: 'Laboratorio', cantidad: 23, estado: 'operativo' }
  ];

  // Datos de rendimiento del personal técnico
  const rendimientoPersonal = [
    { nombre: 'Carlos Ramírez', ordenes: 45, completadas: 43, porcentaje: 95.6 },
    { nombre: 'Ana Martínez', ordenes: 38, completadas: 36, porcentaje: 94.7 },
    { nombre: 'Luis Gómez', ordenes: 52, completadas: 48, porcentaje: 92.3 },
    { nombre: 'María López', ordenes: 29, completadas: 28, porcentaje: 96.6 },
    { nombre: 'Pedro Sánchez', ordenes: 34, completadas: 31, porcentaje: 91.2 }
  ];

  // Datos de actividad mensual para gráfico de barras horizontal
  const actividadMensual = [
    { mes: 'Ene', ordenes: 285 },
    { mes: 'Feb', ordenes: 342 },
    { mes: 'Mar', ordenes: 298 },
    { mes: 'Abr', ordenes: 376 },
    { mes: 'May', ordenes: 412 },
    { mes: 'Jun', ordenes: 389 }
  ];

  // Lista de reportes disponibles para exportación
  const reportesDisponibles = [
    {
      nombre: 'Reporte Mensual de Mantenimiento',
      descripcion: 'Resumen completo de actividades del mes',
      tipo: 'PDF',
      icono: FileText
    },
    {
      nombre: 'Análisis de Equipos Biomédicos',
      descripcion: 'Estado y rendimiento del inventario',
      tipo: 'Excel',
      icono: BarChart3
    },
    {
      nombre: 'Estadísticas de Personal',
      descripcion: 'Productividad y asignaciones del equipo',
      tipo: 'PDF',
      icono: PieChart
    },
    {
      nombre: 'Indicadores de Gestión',
      descripcion: 'KPIs y métricas de desempeño',
      tipo: 'Excel',
      icono: TrendingUp
    }
  ];

  // Valor máximo usado para escalar visualmente las barras del gráfico mensual
  const maxOrdenes = Math.max(...actividadMensual.map(m => m.ordenes));

  return (
    <div className="space-y-6">
      {/* Encabezado principal del módulo */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-gray-900">Reportes y Estadísticas</h2>
          <p className="text-gray-600">Análisis y métricas del sistema de mantenimiento</p>
        </div>

        {/* Controles para filtrar el período y exportar información */}
        <div className="flex items-center space-x-3">
          <select
            value={periodoSeleccionado}
            onChange={(e) => setPeriodoSeleccionado(e.target.value as PeriodoReporte)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent outline-none"
          >
            <option value="semana">Última Semana</option>
            <option value="mes">Último Mes</option>
            <option value="trimestre">Último Trimestre</option>
            <option value="año">Último Año</option>
          </select>
          <button className="flex items-center space-x-2 px-6 py-2 bg-[#FF6B00] hover:bg-[#E56100] text-white rounded-lg transition-all shadow-lg">
            <Download className="w-5 h-5" />
            <span>Exportar</span>
          </button>
        </div>
      </div>

      {/* Tarjetas principales de indicadores */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {estadisticasPrincipales.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <div className={`p-3 rounded-lg ${stat.color === 'text-[#39A935]' ? 'bg-[#39A935]/10' : stat.color === 'text-[#FF6B00]' ? 'bg-[#FF6B00]/10' : stat.color === 'text-blue-600' ? 'bg-blue-100' : 'bg-yellow-100'}`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
              <h3 className="text-sm text-gray-600 mb-1">{stat.titulo}</h3>
              <p className={`text-2xl ${stat.color} mb-2`}>{stat.valor}</p>
              <div className="flex items-center space-x-1">
                {stat.tendencia === 'subida' && (
                  <TrendingUp className="w-4 h-4 text-green-500" />
                )}
                <p className="text-xs text-gray-600">{stat.cambio}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Sección de gráficos visuales */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Actividad mensual del sistema */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-gray-900">Actividad Mensual</h3>
            <BarChart3 className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {actividadMensual.map((data, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">{data.mes}</span>
                  <span className="text-gray-900">{data.ordenes}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-[#FF6B00] h-2 rounded-full transition-all"
                    style={{ width: `${(data.ordenes / maxOrdenes) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Distribución de órdenes por tipo */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-gray-900">Órdenes por Tipo</h3>
            <PieChart className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {ordenesporTipo.map((tipo, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${tipo.color}`} />
                    <span className="text-gray-700">{tipo.tipo}</span>
                  </div>
                  <span className="text-gray-900">{tipo.cantidad} ({tipo.porcentaje}%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`${tipo.color} h-2 rounded-full transition-all`}
                    style={{ width: `${tipo.porcentaje}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabla de rendimiento del personal */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-gray-900 mb-6">Rendimiento del Personal</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">Técnico</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">Asignadas</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">Completadas</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">Efectividad</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">Progreso</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {rendimientoPersonal.map((personal, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-900">{personal.nombre}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{personal.ordenes}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{personal.completadas}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`${personal.porcentaje >= 95 ? 'text-[#39A935]' : personal.porcentaje >= 90 ? 'text-blue-600' : 'text-yellow-600'}`}>
                      {personal.porcentaje}%
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${personal.porcentaje >= 95 ? 'bg-[#39A935]' : personal.porcentaje >= 90 ? 'bg-blue-500' : 'bg-yellow-500'}`}
                        style={{ width: `${personal.porcentaje}%` }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Resumen de equipos por categoría */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-gray-900 mb-6">Equipos por Categoría</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {equiposPorCategoria.map((cat, index) => (
            <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-2xl text-gray-900 mb-1">{cat.cantidad}</p>
              <p className="text-sm text-gray-600 mb-2">{cat.categoria}</p>
              <span className="inline-flex px-2 py-1 bg-[#39A935]/10 text-[#39A935] text-xs rounded-full">
                Operativo
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Lista de reportes disponibles para consulta o descarga */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-gray-900">Reportes Disponibles</h3>
          <Calendar className="w-5 h-5 text-gray-400" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reportesDisponibles.map((reporte, index) => {
            const Icon = reporte.icono;
            return (
              <div key={index} className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg hover:border-[#FF6B00] transition-colors cursor-pointer">
                <div className="p-3 bg-gray-100 rounded-lg">
                  <Icon className="w-6 h-6 text-gray-600" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm text-gray-900 mb-1">{reporte.nombre}</h4>
                  <p className="text-xs text-gray-600 mb-2">{reporte.descripcion}</p>
                  <span className="inline-flex px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                    {reporte.tipo}
                  </span>
                </div>
                <Download className="w-5 h-5 text-gray-400 hover:text-[#FF6B00] transition-colors" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}