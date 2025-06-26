/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchIdeasStart, fetchIdeasSuccess, fetchIdeasFailure } from '../redux/slices/ideaSlice';
import { getIdeas } from '../services/ideaService';
import IdeaCard from '../components/IdeaCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const IdeasListPage = () => {
  const dispatch = useDispatch();
  const { ideas, loading, error } = useSelector((state) => state.ideas);
  const [inputValue, setInputValue] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest'); // 'newest', 'votes'

  useEffect(() => {
    const fetchIdeas = async () => {
      dispatch(fetchIdeasStart());
      try {
        const data = await getIdeas();
        dispatch(fetchIdeasSuccess(data));
      } catch (err) {
        dispatch(fetchIdeasFailure('Fikirler yüklenirken bir hata oluştu.'));
      }
    };
    fetchIdeas();
  }, [dispatch]);

  const handleSearch = () => {
    setSearchTerm(inputValue);
  };

  const filteredAndSortedIdeas = useMemo(() => {
    let filtered = ideas.filter(idea =>
      idea.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      idea.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortBy === 'newest') {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === 'votes') {
      filtered.sort((a, b) => b.votes - a.votes);
    }

    return filtered;
  }, [ideas, searchTerm, sortBy]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 max-w-6xl mx-auto w-full py-8 px-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-blue-900">İnovasyonları Keşfet</h1>
          <p className="text-lg text-gray-600 mt-2">Topluluğun fikirlerini inceleyin, oyunuzla destek olun ve ilham alın.</p>
        </div>

        {/* Filtreleme ve Sıralama */}
        <div className="mb-8 p-4 bg-white rounded-xl shadow-lg border border-gray-100 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex-grow w-full sm:w-auto flex items-center gap-2">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Fikir, proje veya anahtar kelime ara..."
                className="w-full pl-10 pr-4 py-2 border-gray-300 rounded-full shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(); }}
              />
            </div>
            <button
              onClick={handleSearch}
              className="px-6 py-2 text-sm font-semibold rounded-full text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-md transform hover:scale-105"
            >
              Ara
            </button>
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="sort" className="text-sm font-medium text-gray-700">Sırala:</label>
            <select
              id="sort"
              className="border-gray-300 rounded-full shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm py-2 pl-3 pr-8"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">En Yeni</option>
              <option value="votes">En Popüler</option>
            </select>
          </div>
        </div>

        {/* Fikir Listesi */}
        {loading && (
          <div className="text-center py-10">
            <p className="text-lg text-gray-600">Fikirler yükleniyor...</p>
          </div>
        )}
        {error && (
          <div className="text-center py-10 bg-red-50 text-red-700 p-4 rounded-lg">
            <p className="font-semibold">{error}</p>
            <p>Lütfen daha sonra tekrar deneyin.</p>
          </div>
        )}
        {!loading && !error && (
          <>
            {filteredAndSortedIdeas.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAndSortedIdeas.map((idea) => (
                  <IdeaCard key={idea.id} idea={idea} />
                ))}
              </div>
            ) : (
              <div className="text-center py-10 bg-gray-100 p-4 rounded-lg">
                <p className="text-lg text-gray-700">Gösterilecek fikir bulunamadı.</p>
                <p className="text-sm text-gray-500 mt-1">Farklı bir arama yapmayı veya filtreleri temizlemeyi deneyin.</p>
              </div>
            )}
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default IdeasListPage; 