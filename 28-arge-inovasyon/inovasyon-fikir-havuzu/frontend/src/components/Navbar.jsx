import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import CIBLogo from '../assets/İl.svg';

const Navbar = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <nav className="bg-white shadow sticky top-0 z-50 px-4 py-2 flex items-center justify-between border-b border-blue-100">
      <Link to="/" className="flex items-center gap-3 transition-transform duration-200 hover:scale-105">
        <img src={CIBLogo} alt="Cumhurbaşkanlığı İletişim Başkanlığı - Anasayfa" className="h-16 w-72 object-contain" />
      </Link>
      <div className="flex items-center gap-2 text-blue-900 font-medium">
        <Link to="/" className="hover:bg-blue-50 px-4 py-2 rounded-md transition-colors">Anasayfa</Link>
        <Link to="/ideas" className="hover:bg-blue-50 px-4 py-2 rounded-md transition-colors">İnovasyon</Link>
        <Link to="/hakkimizda" className="hover:bg-blue-50 px-4 py-2 rounded-md transition-colors">Hakkımızda</Link>
        {isAuthenticated ? (
          <>
            <Link to="/my-ideas" className="hover:bg-blue-50 px-4 py-2 rounded-md transition-colors">Fikirlerim</Link>
            <button
              onClick={() => dispatch(logout())}
              className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm text-white ml-2"
            >Çıkış</button>
          </>
        ) : (
          <>
            <Link to="/login" className="font-medium text-blue-700 hover:bg-blue-50 px-4 py-2 rounded-md transition">Giriş</Link>
            <Link 
              to="/register" 
              className="font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-2 rounded-lg transition-all duration-300 ease-in-out shadow-md hover:shadow-lg transform hover:-translate-y-px"
            >
              Kayıt Ol
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 