import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import DashboardLayout from '../layouts/DashboardLayout';

const JuryDashboardPage = () => {
  const { isAuthenticated, token, user } = useSelector((state) => state.auth);
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(null); // ID of the idea being processed

  const isJury = user && user.role === 'Jury';

  useEffect(() => {
    if (!isAuthenticated || !isJury) return;
    const fetchPendingIdeas = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('http://localhost:5000/api/ideas/by-status/Pending', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIdeas(response.data);
      } catch {
        setError('Onay bekleyen fikirler yüklenemedi!');
      }
      setLoading(false);
    };
    fetchPendingIdeas();
  }, [isAuthenticated, token, isJury]);

  const handleAction = async (id, action) => {
    setActionLoading(id);
    try {
      if (action === 'approve') {
        await axios.put(`http://localhost:5000/api/ideas/${id}/approve`, null, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else if (action === 'reject') {
        await axios.put(`http://localhost:5000/api/ideas/${id}/reject`, null, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      setIdeas((prev) => prev.filter((idea) => idea.id !== id));
    } catch {
      alert('İşlem başarısız!');
    }
    setActionLoading(null);
  };

  if (!isAuthenticated || !isJury) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="bg-white p-6 rounded shadow text-center">
            <p>Bu sayfaya erişim yetkiniz yok.</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="w-full max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-blue-900">Jüri Değerlendirme Paneli</h2>
        {loading && <div className="text-center">Yükleniyor...</div>}
        {error && <div className="text-red-500 text-center bg-red-50 p-3 rounded">{error}</div>}
        {!loading && !error && ideas.length === 0 && (
          <div className="text-center text-gray-500 bg-gray-50 p-4 rounded">Onay bekleyen fikir bulunmuyor.</div>
        )}
        <div className="space-y-4">
          {ideas.map((idea) => (
            <div key={idea.id} className="bg-white rounded-lg shadow-md border border-gray-100 p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex-grow">
                <h3 className="text-xl font-semibold text-blue-800">{idea.title}</h3>
                <p className="text-gray-600 text-sm mt-1 line-clamp-2">{idea.description}</p>
                <span className="text-xs text-gray-400 mt-2 block">Başvuran: {idea.createdBy}</span>
              </div>
              <div className="flex-shrink-0 flex gap-3 mt-3 sm:mt-0">
                <button
                  onClick={() => handleAction(idea.id, 'approve')}
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors disabled:bg-gray-400"
                  disabled={actionLoading === idea.id}
                >
                  {actionLoading === idea.id ? '...' : 'Onayla'}
                </button>
                <button
                  onClick={() => handleAction(idea.id, 'reject')}
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors disabled:bg-gray-400"
                  disabled={actionLoading === idea.id}
                >
                  {actionLoading === idea.id ? '...' : 'Reddet'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default JuryDashboardPage; 