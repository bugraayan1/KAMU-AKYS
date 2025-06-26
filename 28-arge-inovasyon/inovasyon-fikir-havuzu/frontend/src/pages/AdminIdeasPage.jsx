import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AdminIdeasPage = () => {
  const { isAuthenticated, token, user } = useSelector((state) => state.auth);
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  // Basit admin kontrolü (gerçek projede rol kontrolü backend'den alınmalı)
  const isAdmin = user && (user.role === 'Admin' || user.role === 'SuperAdmin');

  useEffect(() => {
    if (!isAuthenticated) return;
    const fetchPendingIdeas = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('http://localhost:5000/api/ideas/by-status/Pending', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIdeas(response.data);
      } catch {
        setError('Fikirler yüklenemedi!');
      }
      setLoading(false);
    };
    fetchPendingIdeas();
  }, [isAuthenticated, token]);

  const handleAction = async (id, action) => {
    setActionLoading(true);
    try {
      if (action === 'approve') {
        await axios.put(`http://localhost:5000/api/ideas/${id}/approve`, null, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else if (action === 'reject') {
        await axios.put(`http://localhost:5000/api/ideas/${id}/reject`, null, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else if (action === 'delete') {
        await axios.delete(`http://localhost:5000/api/ideas/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      // Listeyi güncelle
      setIdeas((prev) => prev.filter((idea) => idea.id !== id));
    } catch {
      alert('İşlem başarısız!');
    }
    setActionLoading(false);
  };

  if (!isAuthenticated || !isAdmin) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow text-center">
            <p>Bu sayfaya erişim yetkiniz yok.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 max-w-3xl mx-auto w-full py-8">
        <h2 className="text-2xl font-bold mb-6 text-blue-800 text-center">Onay Bekleyen Fikirler</h2>
        {loading && <div>Yükleniyor...</div>}
        {error && <div className="text-red-500">{error}</div>}
        {!loading && !error && ideas.length === 0 && <div>Onay bekleyen fikir yok.</div>}
        <div className="flex flex-col gap-4">
          {ideas.map((idea) => (
            <div key={idea.id} className="bg-white rounded shadow p-4 flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-blue-800">{idea.title}</h3>
              <p className="text-gray-700 text-sm line-clamp-2">{idea.description}</p>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => handleAction(idea.id, 'approve')}
                  className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm"
                  disabled={actionLoading}
                >Onayla</button>
                <button
                  onClick={() => handleAction(idea.id, 'reject')}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 text-sm"
                  disabled={actionLoading}
                >Reddet</button>
                <button
                  onClick={() => handleAction(idea.id, 'delete')}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
                  disabled={actionLoading}
                >Sil</button>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminIdeasPage; 