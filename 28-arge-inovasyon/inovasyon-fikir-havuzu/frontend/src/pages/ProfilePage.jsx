import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import DashboardLayout from '../layouts/DashboardLayout';
import { toast } from 'react-toastify';
import { UserIcon, XMarkIcon } from '@heroicons/react/24/solid';

const ProfilePage = () => {
  const { user } = useSelector((state) => state.auth);
  const [profile, setProfile] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || '',
  });
  const [editForm, setEditForm] = useState(profile);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Modal aç/kapat
  const openEditModal = () => {
    setEditForm(profile);
    setShowEditModal(true);
  };
  const closeEditModal = () => {
    setShowEditModal(false);
  };

  const openPasswordModal = () => {
    setShowPasswordModal(true);
  };
  const closePasswordModal = () => {
    setShowPasswordModal(false);
  };

  // Modal içi input değişimi
  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  // Modal kaydet
  const handleEditSubmit = (e) => {
    e.preventDefault();
    setProfile(editForm);
    setShowEditModal(false);
    toast.success('Profil bilgileri güncellendi!');
  };

  // Şifre değiştir
  const handlePasswordChange = (e) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
  };
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error('Yeni şifreler eşleşmiyor!');
      return;
    }
    toast.success('Şifre başarıyla değiştirildi!');
    setPasswordForm({ oldPassword: '', newPassword: '', confirmPassword: '' });
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto w-full py-10 px-2">
        {/* Profil Kartı */}
        <div className="bg-white rounded-xl shadow p-8 flex flex-col items-center mb-8">
          <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center mb-4">
            <UserIcon className="w-16 h-16 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-blue-800 mb-1">{profile.firstName} {profile.lastName}</h2>
          <p className="text-gray-500 mb-4">{profile.email}</p>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <span className="block text-sm text-gray-500 mb-1">Ad</span>
              <span className="block text-lg font-medium text-gray-900">{profile.firstName}</span>
            </div>
            <div>
              <span className="block text-sm text-gray-500 mb-1">Soyad</span>
              <span className="block text-lg font-medium text-gray-900">{profile.lastName}</span>
            </div>
            <div className="md:col-span-2">
              <span className="block text-sm text-gray-500 mb-1">E-posta</span>
              <span className="block text-lg font-medium text-gray-900">{profile.email}</span>
            </div>
            <div className="md:col-span-2">
              <span className="block text-sm text-gray-500 mb-1">Telefon</span>
              <span className="block text-lg font-medium text-gray-900">{profile.phoneNumber || '-'} </span>
            </div>
            <div className="md:col-span-2 flex flex-col md:flex-row gap-2 mt-2">
              <button
                type="button"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition font-semibold"
                onClick={openEditModal}
              >
                Bilgileri Güncelle
              </button>
              <button
                type="button"
                className="w-full bg-gray-600 text-white py-2 rounded hover:bg-gray-700 transition font-semibold"
                onClick={openPasswordModal}
              >
                Şifreyi Değiştir
              </button>
            </div>
          </div>
        </div>
        {/* Şifre Değiştir Modalı */}
        {showPasswordModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500/60">
            <div className="relative bg-white rounded-xl shadow-xl w-full max-w-lg mx-auto p-8 animate-fade-in">
              <button
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
                onClick={closePasswordModal}
                aria-label="Kapat"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
              <h3 className="text-xl font-bold text-blue-800 mb-6 text-center">Şifreyi Değiştir</h3>
              <form onSubmit={(e) => { handlePasswordSubmit(e); closePasswordModal(); }} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Mevcut Şifre</label>
                  <input
                    type="password"
                    name="oldPassword"
                    value={passwordForm.oldPassword}
                    onChange={handlePasswordChange}
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Yeni Şifre</label>
                  <input
                    type="password"
                    name="newPassword"
                    value={passwordForm.newPassword}
                    onChange={handlePasswordChange}
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Yeni Şifre (Tekrar)</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={passwordForm.confirmPassword}
                    onChange={handlePasswordChange}
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="flex gap-2 justify-end pt-2">
                  <button
                    type="button"
                    className="px-4 py-2 rounded bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200"
                    onClick={closePasswordModal}
                  >
                    İptal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700"
                  >
                    Kaydet
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        {/* Profil Bilgileri Güncelleme Modalı */}
        {showEditModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500/60">
            <div className="relative bg-white rounded-xl shadow-xl w-full max-w-lg mx-auto p-8 animate-fade-in">
              <button
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
                onClick={closeEditModal}
                aria-label="Kapat"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
              <h3 className="text-xl font-bold text-blue-800 mb-6 text-center">Profil Bilgilerini Güncelle</h3>
              <form onSubmit={handleEditSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Ad</label>
                  <input
                    type="text"
                    name="firstName"
                    value={editForm.firstName}
                    onChange={handleEditChange}
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Soyad</label>
                  <input
                    type="text"
                    name="lastName"
                    value={editForm.lastName}
                    onChange={handleEditChange}
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">E-posta</label>
                  <input
                    type="email"
                    name="email"
                    value={editForm.email}
                    onChange={handleEditChange}
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    disabled
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Telefon</label>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={editForm.phoneNumber}
                    onChange={handleEditChange}
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex gap-2 justify-end pt-2">
                  <button
                    type="button"
                    className="px-4 py-2 rounded bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200"
                    onClick={closeEditModal}
                  >
                    İptal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700"
                  >
                    Kaydet
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ProfilePage; 