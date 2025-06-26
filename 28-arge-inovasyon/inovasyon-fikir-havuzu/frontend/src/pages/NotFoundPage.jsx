import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const NotFoundPage = () => (
  <div className="min-h-screen flex flex-col bg-gray-50">
    <Navbar />
    <main className="flex-grow flex items-center justify-center">
      <div className="text-center p-8">
        <p className="text-2xl font-semibold text-blue-600">404</p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Sayfa Bulunamadı</h1>
        <p className="mt-6 text-lg leading-7 text-gray-600 max-w-md mx-auto">
          Görünüşe göre yanlış bir yola saptınız. Endişelenmeyin, en iyi kaşifler bile bazen rotadan çıkar. Sizi güvenli sulara geri götürelim.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            to="/"
            className="rounded-md bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Anasayfa'ya Dön
          </Link>
          <Link to="/hakkimizda" className="text-sm font-semibold text-gray-900">
            Yardım Al <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default NotFoundPage; 