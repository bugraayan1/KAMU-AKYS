import React from 'react';
import { Link } from 'react-router-dom';

const IdeaCard = ({ idea }) => (
  <div className="bg-white rounded shadow p-4 mb-4 flex flex-col gap-2">
    <h3 className="text-xl font-semibold text-blue-800">{idea.title}</h3>
    <p className="text-gray-700 text-sm line-clamp-2">{idea.description}</p>
    <div className="flex items-center justify-between mt-2">
      <span className="text-xs text-gray-500">Kategori: {idea.categoryName || '-'}</span>
      <span className="text-xs text-gray-500">Oy: {idea.averageRating?.toFixed(1) ?? '-'}</span>
    </div>
    <Link to={`/ideas/${idea.id}`} className="text-blue-600 hover:underline text-sm mt-2">Detay</Link>
  </div>
);

export default IdeaCard; 