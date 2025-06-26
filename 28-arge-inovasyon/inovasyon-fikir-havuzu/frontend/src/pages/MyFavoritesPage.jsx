import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import IdeaCard from '../components/IdeaCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MyFavoritesPage = () => {
  const { isAuthenticated, token } = useSelector((state) => state.auth);
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) return;
    const fetchFavorites = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('http://localhost:5000/api/ideas/my-favorites', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIdeas(response.data);
      } catch {
        setError('Favori fikirler yüklenemedi!');
      }
      setLoading(false);
    };
    fetchFavorites();
  }, [isAuthenticated, token]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow text-center">
            <p>Favori fikirlerinizi görmek için giriş yapmalısınız.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 max-w-2xl mx-auto w-full py-8">
        <h2 className="text-2xl font-bold mb-6 text-blue-800 text-center">Favori Fikirlerim</h2>
        {loading && <div>Yükleniyor...</div>}
        {error && <div className="text-red-500">{error}</div>}
        {!loading && !error && ideas.length === 0 && <div>Henüz favori fikriniz yok.</div>}
        <div className="flex flex-col gap-4">
          {ideas.map((idea) => (
            <IdeaCard key={idea.id} idea={idea} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MyFavoritesPage; 