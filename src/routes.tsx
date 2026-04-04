import { createBrowserRouter } from 'react-router';
import LoginScreen from './components/LoginScreen';
import Dashboard, { DashboardHome } from './components/Dashboard';
import WorkOrders from './components/WorkOrders';
import PreventiveMaintenance from './components/PreventiveMaintenance';
import BiomedicalInventory from './components/BiomedicalInventory';
import TechnicalPersonnel from './components/TechnicalPersonnel';
import ReportsStatistics from './components/ReportsStatistics';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginScreen />
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
    children: [
      {
        index: true,
        element: <DashboardHome />
      },
      {
        path: 'ordenes-trabajo',
        element: <WorkOrders />
      },
      {
        path: 'mantenimiento-preventivo',
        element: <PreventiveMaintenance />
      },
      {
        path: 'inventario-equipos',
        element: <BiomedicalInventory />
      },
      {
        path: 'personal-tecnico',
        element: <TechnicalPersonnel />
      },
      {
        path: 'reportes',
        element: <ReportsStatistics />
      }
    ]
  }
]);