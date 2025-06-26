/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getIdeaById } from '../services/ideaService';
import { getCommentsByIdea, addComment } from '../services/commentService';
import { getAverageRating, rateIdea } from '../services/ratingService';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RatingStars from '../components/RatingStars';
import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';

const IdeaDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, token, user } = useSelector((state) => state.auth);
  const [idea, setIdea] = useState(null);
  const [comments, setComments] = useState([]);
  const [average, setAverage] = useState({ average: 0, count: 0 });
  const [myRating, setMyRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const [commentLoading, setCommentLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      // Reset states for navigation
      setLoading(true);
      setError(null);
      setIdea(null);

      try {
        const ideaData = await getIdeaById(id);
        if (!ideaData) {
          throw new Error('Idea not found');
        }
        setIdea(ideaData);
        const commentsData = await getCommentsByIdea(id);
        setComments(commentsData);
        const avg = await getAverageRating(id);
        setAverage(avg);
        // Kullanıcının kendi oyunu bul
        if (isAuthenticated) {
          const my = commentsData.find(
            (c) => c.userName === user?.userName && c.ratingValue
          );
          setMyRating(my ? my.ratingValue : 0);
        }
      } catch (e) {
        console.error(e);
        setError('Bu fikir bulunamadı veya yüklenirken bir sorun oluştu.');
        if (e.message === 'Idea not found') {
            navigate('/404');
            return;
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, isAuthenticated, user, navigate]);

  const handleRate = async (value) => {
    if (!isAuthenticated) return;
    await rateIdea(Number(id), value, token);
    const avg = await getAverageRating(id);
    setAverage(avg);
    setMyRating(value);
  };

  const handleAddComment = async (text) => {
    setCommentLoading(true);
    await addComment(Number(id), text, token);
    const commentsData = await getCommentsByIdea(id);
    setComments(commentsData);
    setCommentLoading(false);
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">Yükleniyor...</div>
  );

  if (error && !idea) {
     // Yönlendirme zaten yapıldı, bu kısım bir fallback olarak kalabilir veya boş olabilir
    return null;
  }
  
  if (!idea) {
    // Bu duruma normalde gelinmemeli, ama bir güvenlik önlemi
    return null; 
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 max-w-2xl mx-auto w-full py-8">
        <h2 className="text-2xl font-bold mb-4 text-blue-800">{idea.title}</h2>
        <div className="mb-4 text-gray-700">{idea.description}</div>
        <div className="mb-2 text-sm text-gray-500">Kategori: {idea.categoryName || '-'}</div>
        <div className="mb-4 flex items-center gap-2">
          <span className="text-sm">Ortalama Oy:</span>
          <RatingStars value={average.average} disabled />
          <span className="text-sm">({average.count})</span>
        </div>
        {isAuthenticated && (
          <div className="mb-4">
            <span className="text-sm">Senin Oyun:</span>
            <RatingStars value={myRating} onRate={handleRate} disabled={false} />
          </div>
        )}
        <CommentList comments={comments} />
        {isAuthenticated && (
          <CommentForm onSubmit={handleAddComment} loading={commentLoading} />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default IdeaDetailPage; 