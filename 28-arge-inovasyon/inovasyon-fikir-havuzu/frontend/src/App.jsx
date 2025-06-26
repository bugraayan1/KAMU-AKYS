import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import IdeasListPage from './pages/IdeasListPage';
import IdeaDetailPage from './pages/IdeaDetailPage';
import IdeaCreatePage from './pages/IdeaCreatePage';
import MyIdeasPage from './pages/MyIdeasPage';
import MyFavoritesPage from './pages/MyFavoritesPage';
import MyFollowsPage from './pages/MyFollowsPage';
import AdminIdeasPage from './pages/AdminIdeasPage';
import IdeaHistoryPage from './pages/IdeaHistoryPage';
import ApprovedIdeasPage from './pages/ApprovedIdeasPage';
import RejectedIdeasPage from './pages/RejectedIdeasPage';
import ProfilePage from './pages/ProfilePage';
import Hakkimizda from './pages/Hakkimizda';
import NotFoundPage from './pages/NotFoundPage';
import JuryDashboardPage from './pages/JuryDashboardPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => (
  <Provider store={store}>
    <Router>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/ideas" element={<IdeasListPage />} />
        <Route path="/ideas/create" element={<IdeaCreatePage />} />
        <Route path="/ideas/:id(\\d+)" element={<IdeaDetailPage />} />
        <Route path="/my-ideas" element={<MyIdeasPage />} />
        <Route path="/my-favorites" element={<MyFavoritesPage />} />
        <Route path="/my-follows" element={<MyFollowsPage />} />
        <Route path="/admin/ideas" element={<AdminIdeasPage />} />
        <Route path="/ideas/history" element={<IdeaHistoryPage />} />
        <Route path="/ideas/approved" element={<ApprovedIdeasPage />} />
        <Route path="/ideas/rejected" element={<RejectedIdeasPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/hakkimizda" element={<Hakkimizda />} />
        <Route path="/jury/dashboard" element={<JuryDashboardPage />} />
        {/* Diğer sayfalar buraya eklenecek */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  </Provider>
);

export default App;
