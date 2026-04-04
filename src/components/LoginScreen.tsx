import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Lock, User, HelpCircle, UserPlus, Activity } from 'lucide-react';

export default function LoginScreen() {
  // Hook para redirigir al usuario a otra ruta después del inicio de sesión
  const navigate = useNavigate();

  // Estado para almacenar los datos digitados en el formulario
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  // Estado para almacenar los mensajes de error de validación
  const [errors, setErrors] = useState({
    username: '',
    password: ''
  });

  // Función que valida los campos del formulario antes de permitir el ingreso
  const validateForm = () => {
    const newErrors = { username: '', password: '' };
    let isValid = true;

    // Validar que el campo usuario no esté vacío
    if (!formData.username.trim()) {
      newErrors.username = 'El usuario es requerido';
      isValid = false;
    }

    // Validar que la contraseña exista y tenga una longitud mínima
    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
      isValid = false;
    }

    // Guardar los errores encontrados en el estado
    setErrors(newErrors);
    return isValid;
  };

  // Función que se ejecuta al enviar el formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Si la validación es correcta, se simula el acceso al sistema
    if (validateForm()) {
      navigate('/dashboard');
    }
  };

  // Función para actualizar los valores del formulario en tiempo real
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Limpiar el error del campo mientras el usuario escribe
    setErrors(prev => ({
      ...prev,
      [name]: ''
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 flex items-center justify-center p-4 md:p-6 lg:p-8">
      <div className="w-full max-w-7xl grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center">

        {/* Panel izquierdo con la identidad visual del sistema */}
        <div className="hidden lg:flex flex-col justify-center space-y-10 p-12 animate-fadeIn">
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-br from-[#FF6B00] to-[#E56100] p-5 rounded-2xl shadow-strong transform hover:scale-105 transition-transform duration-300">
                <Activity className="w-14 h-14 text-white" />
              </div>
              <div>
                <h1 className="text-gray-900 leading-tight">Gestión de</h1>
                <h1 className="text-gray-900 leading-tight">Mantenimiento</h1>
              </div>
            </div>

            <div className="h-1.5 w-32 bg-gradient-to-r from-[#FF6B00] via-[#FF8533] to-[#39A935] rounded-full shadow-md"></div>

            <p className="text-xl text-gray-600 leading-relaxed max-w-md">
              Sistema integral para la gestión y control de mantenimiento de equipos biomédicos
            </p>
          </div>

          {/* Tarjetas informativas del sistema */}
          <div className="space-y-5">
            <div className="flex items-start space-x-4 bg-white/60 backdrop-blur-sm p-5 rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 transform hover:-translate-y-1">
              <div className="bg-[#39A935] p-3 rounded-xl shadow-md">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="text-gray-900 mb-1">Control Total</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Gestión completa de órdenes de trabajo y equipamiento
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 bg-white/60 backdrop-blur-sm p-5 rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 transform hover:-translate-y-1">
              <div className="bg-[#FF6B00] p-3 rounded-xl shadow-md">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="text-gray-900 mb-1">Reportes Avanzados</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Estadísticas y análisis en tiempo real
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Panel derecho con el formulario de inicio de sesión */}
        <div className="bg-white rounded-2xl md:rounded-3xl shadow-strong p-6 sm:p-8 md:p-10 lg:p-12 animate-slideInUp w-full max-w-md lg:max-w-none mx-auto">
          <div className="mb-8 md:mb-10">
            {/* Logo visible en dispositivos pequeños */}
            <div className="lg:hidden flex items-center justify-center mb-6">
              <div className="bg-gradient-to-br from-[#FF6B00] to-[#E56100] p-4 rounded-2xl shadow-strong">
                <Activity className="w-10 h-10 text-white" />
              </div>
            </div>

            {/* Icono de acceso para versión escritorio */}
            <div className="hidden lg:flex items-center justify-center mb-6">
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 p-4 rounded-2xl shadow-medium">
                <Lock className="w-10 h-10 text-gray-700" />
              </div>
            </div>

            <h2 className="text-center text-gray-900 mb-2 md:mb-3 text-xl md:text-2xl">
              Iniciar Sesión
            </h2>
            <p className="text-center text-gray-600 text-xs sm:text-sm px-2 md:px-4 leading-relaxed">
              CLÍNICA NUEVA RAFAEL URIBE URIBE S.A.S.
            </p>
          </div>

          {/* Formulario principal de acceso */}
          <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
            {/* Campo de usuario */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                Usuario
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 md:pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className={`w-full pl-10 md:pl-12 pr-3 md:pr-4 py-3 md:py-3.5 text-sm md:text-base border-2 ${
                    errors.username ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-gray-50'
                  } rounded-xl focus:ring-2 focus:ring-[#FF6B00] focus:border-[#FF6B00] focus:bg-white outline-none transition-all`}
                  placeholder="Ingrese su usuario"
                />
              </div>
              {errors.username && (
                <p className="mt-2 text-xs md:text-sm text-red-600 flex items-center">
                  <span className="mr-1">⚠</span> {errors.username}
                </p>
              )}
            </div>

            {/* Campo de contraseña */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Contraseña
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 md:pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full pl-10 md:pl-12 pr-3 md:pr-4 py-3 md:py-3.5 text-sm md:text-base border-2 ${
                    errors.password ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-gray-50'
                  } rounded-xl focus:ring-2 focus:ring-[#FF6B00] focus:border-[#FF6B00] focus:bg-white outline-none transition-all`}
                  placeholder="Ingrese su contraseña"
                />
              </div>
              {errors.password && (
                <p className="mt-2 text-xs md:text-sm text-red-600 flex items-center">
                  <span className="mr-1">⚠</span> {errors.password}
                </p>
              )}
            </div>

            {/* Botón principal para ingresar al sistema */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#FF6B00] to-[#E56100] hover:from-[#E56100] hover:to-[#CC5500] text-white py-3.5 md:py-4 rounded-xl text-sm md:text-base font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 active:shadow-lg"
            >
              Ingresar al Sistema
            </button>
          </form>

          {/* Botones secundarios de apoyo al usuario */}
          <div className="mt-6 md:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            <button className="flex items-center justify-center space-x-2 py-3 md:py-3.5 border-2 border-gray-300 hover:border-[#39A935] hover:bg-[#39A935]/5 text-gray-700 hover:text-[#39A935] rounded-xl transition-all duration-300 shadow-sm hover:shadow-md active:scale-95">
              <HelpCircle className="w-4 h-4 md:w-5 md:h-5" />
              <span className="text-xs md:text-sm font-medium">Mesa de Ayuda</span>
            </button>
            <button className="flex items-center justify-center space-x-2 py-3 md:py-3.5 border-2 border-gray-300 hover:border-[#FF6B00] hover:bg-[#FF6B00]/5 text-gray-700 hover:text-[#FF6B00] rounded-xl transition-all duration-300 shadow-sm hover:shadow-md active:scale-95">
              <UserPlus className="w-4 h-4 md:w-5 md:h-5" />
              <span className="text-xs md:text-sm font-medium">Solicitar Acceso</span>
            </button>
          </div>

          {/* Pie de página del formulario */}
          <div className="mt-8 md:mt-10 pt-5 md:pt-6 border-t border-gray-200 text-center space-y-1">
            <p className="text-xs text-gray-500">
              © 2026 Clínica Nueva Rafael Uribe Uribe S.A.S.
            </p>
            <p className="text-xs text-gray-500">
              Sistema de Gestión de Mantenimiento Hospitalario v1.0
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}