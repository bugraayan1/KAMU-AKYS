import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getIdeas } from '../services/ideaService';
import IdeaCard from '../components/IdeaCard';
import DashboardLayout from '../layouts/DashboardLayout';

const ApprovedIdeasPage = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) return;
    const fetchIdeas = async () => {
      setLoading(true);
      setError(null);
      try {
        const allIdeas = await getIdeas();
        const approvedIdeas = allIdeas.filter((idea) => idea.createdBy === user.userName && idea.status === 'Approved');
        setIdeas(approvedIdeas);
      } catch {
        setError('Fikirler yüklenemedi!');
      }
      setLoading(false);
    };
    fetchIdeas();
  }, [isAuthenticated, user]);

  return (
    <DashboardLayout>
      <div className="flex flex-col items-center w-full max-w-2xl mx-auto py-10">
        <h2 className="text-2xl font-bold mb-6 text-blue-800 text-center w-full">Onaylanan Fikirlerim</h2>
        {loading && <div>Yükleniyor...</div>}
        {error && <div className="text-red-500">{error}</div>}
        {!loading && !error && ideas.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="bg-blue-50 rounded-full p-4 mb-4">
              <svg className="w-10 h-10 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 20h.01M12 4a8 8 0 018 8c0 3.866-3.134 7-7 7s-7-3.134-7-7a8 8 0 018-8zm0 0v4m0 0l2 2m-2-2l-2 2" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-blue-800 mb-2">Onaylanan fikriniz yok</h3>
            <p className="text-gray-600 mb-6 text-center max-w-xs">Henüz hiç onaylanan fikriniz yok. Hemen yeni bir proje veya fikir oluşturmak ister misiniz?</p>
            <button
              onClick={() => window.location.href = '/ideas/create'}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-semibold shadow transition"
            >
              + Yeni Fikir Oluştur
            </button>
          </div>
        )}
        <div className="flex flex-col gap-4 w-full">
          {ideas.map((idea) => (
            <IdeaCard key={idea.id} idea={idea} />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ApprovedIdeasPage; 