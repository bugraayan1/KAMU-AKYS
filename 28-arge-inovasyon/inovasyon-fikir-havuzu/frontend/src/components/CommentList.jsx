import React from 'react';

const CommentList = ({ comments }) => (
  <div className="mt-4">
    <h4 className="font-semibold mb-2">Yorumlar</h4>
    {comments.length === 0 ? (
      <div className="text-gray-500 text-sm">Henüz yorum yok.</div>
    ) : (
      <ul className="space-y-2">
        {comments.map((comment) => (
          <li key={comment.id} className="bg-gray-100 rounded p-2">
            <div className="text-sm font-medium text-blue-800">{comment.userName}</div>
            <div className="text-gray-700 text-sm">{comment.text}</div>
            <div className="text-xs text-gray-500">{new Date(comment.createdAt).toLocaleString('tr-TR')}</div>
          </li>
        ))}
      </ul>
    )}
  </div>
);

export default CommentList; 