import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';

const menuItems = [
  { label: 'Fikirler', path: '/ideas' },
  { label: 'Fikirlerim', path: '/my-ideas' },
  { label: 'Yeni Fikir Oluştur', path: '/ideas/create' },
  { label: 'Geçmiş Fikirler', path: '/ideas/history' },
  { label: 'Onaylanan Fikirler', path: '/ideas/approved' },
  { label: 'Onaylanmayan Fikirler', path: '/ideas/rejected' },
];

const IdeasMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className="flex flex-col md:flex-row gap-2 md:gap-4 items-start md:items-center bg-white p-4 rounded shadow mb-6">
      {menuItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            `px-4 py-2 rounded text-base font-medium transition ${isActive ? 'bg-blue-600 text-white' : 'text-blue-900 hover:bg-blue-100'}`
          }
        >
          {item.label}
        </NavLink>
      ))}
      <button
        onClick={handleLogout}
        className="ml-auto bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-base text-white font-semibold"
      >
        Çıkış
      </button>
    </nav>
  );
};

export default IdeasMenu; 