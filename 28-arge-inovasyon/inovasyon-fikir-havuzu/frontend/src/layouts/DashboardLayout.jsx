import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import { UserIcon, LightBulbIcon, PlusCircleIcon, ClockIcon, CheckCircleIcon, XCircleIcon, ArrowLeftOnRectangleIcon, Bars3Icon, Cog6ToothIcon } from '@heroicons/react/24/outline';
import CIBLogo from '../assets/cib.png';

const menuItems = [
  { label: 'Fikirler', path: '/ideas', icon: <LightBulbIcon className="h-5 w-5 mr-2" /> },
  { label: 'Fikirlerim', path: '/my-ideas', icon: <UserIcon className="h-5 w-5 mr-2" /> },
  { label: 'Yeni Fikir Oluştur', path: '/ideas/create', icon: <PlusCircleIcon className="h-5 w-5 mr-2" /> },
  { label: 'Geçmiş Fikirler', path: '/ideas/history', icon: <ClockIcon className="h-5 w-5 mr-2" /> },
  { label: 'Onaylanan Fikirler', path: '/ideas/approved', icon: <CheckCircleIcon className="h-5 w-5 mr-2" /> },
  { label: 'Onaylanmayan Fikirler', path: '/ideas/rejected', icon: <XCircleIcon className="h-5 w-5 mr-2" /> },
];

const bottomMenuItems = [
  { label: 'Profilim', path: '/profile', icon: <UserIcon className="h-5 w-5 mr-2" /> },
  { label: 'Ayarlar', path: '/settings', icon: <Cog6ToothIcon className="h-5 w-5 mr-2" /> },
];

const DashboardLayout = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    setShowLogoutModal(false);
    dispatch(logout());
    navigate('/login');
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

  return (
    <div className="min-h-screen">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-64 bg-gradient-to-t from-blue-100 via-white to-white border-r border-blue-100 flex flex-col py-6 px-3 z-50">
        <div className="mb-8 flex flex-col items-center justify-center">
          <img src={CIBLogo} alt="CİB" className="h-16 w-16 object-contain mb-2" />
        </div>
        <nav className="flex flex-col gap-1">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center px-3 py-2 rounded-lg font-medium text-base transition mb-1
                ${isActive ? 'bg-blue-50 text-blue-700 font-semibold' : 'hover:bg-blue-100 hover:text-blue-700 text-blue-900'}`
              }
              onClick={() => setSidebarOpen(false)}
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex flex-col gap-1 border-t border-blue-100 pt-4 mt-4">
          {bottomMenuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center px-3 py-2 rounded-lg font-medium text-base transition mb-1
                ${isActive ? 'bg-blue-50 text-blue-700 font-semibold' : 'hover:bg-blue-100 hover:text-blue-700 text-blue-900'}`
              }
              onClick={() => setSidebarOpen(false)}
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </div>
        <div className="flex-1" />
        <button
          onClick={handleLogout}
          className="flex items-center w-full justify-center px-3 py-2 rounded-full bg-red-100 hover:bg-red-200 text-red-600 font-medium text-sm shadow-none border border-red-200 transition mb-2"
          style={{ minHeight: 44 }}
        >
          <ArrowLeftOnRectangleIcon className="h-4 w-4 mr-1" /> Çıkış
        </button>
      </aside>
      {/* Sağ taraf */}
      <div className="ml-64 flex flex-col min-h-screen">
        <header className="bg-white border-b border-blue-100 flex items-center justify-between px-4 py-3 sticky top-0 z-30">
          <button className="md:hidden p-2 rounded hover:bg-blue-50" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <Bars3Icon className="h-6 w-6 text-blue-700" />
          </button>
          <div className="text-base md:text-lg font-medium text-blue-900 ml-2">{user?.email}</div>
          <div className="flex items-center gap-4">
            {/* Profil resmi veya ikon */}
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-700 font-bold shadow-sm text-base">
              {user?.email?.[0]?.toUpperCase()}
            </div>
          </div>
        </header>
        <main className="flex-1 p-2 md:p-6 overflow-y-auto bg-gray-50">
          {children}
        </main>
      </div>

      {/* Çıkış Onay Modalı */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500/75">
          <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md mx-auto p-6">
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mb-4">
                <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Çıkış Yapılsın mı?</h3>
              <p className="text-sm text-gray-500 mb-4">Oturumunuz kapatılacak. Devam etmek istiyor musunuz?</p>
              <div className="flex gap-2">
                <button
                  onClick={confirmLogout}
                  className="inline-flex justify-center rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500"
                >
                  Evet, Çıkış Yap
                </button>
                <button
                  onClick={cancelLogout}
                  className="inline-flex justify-center rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
                >
                  İptal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout; 