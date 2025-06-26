/* eslint-disable no-unused-vars */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { loginStart, loginSuccess, loginFailure } from '../redux/slices/authSlice';
import { login as loginService } from '../services/authService';
import ReusableInput from '../components/ReusableInput';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import IletisimImg from '../assets/İl.svg';

const LoginPage = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().required('Email'),
      password: Yup.string().required('Şifre zorunlu'),
    }),
    onSubmit: async (values) => {
      dispatch(loginStart());
      try {
        const data = await loginService(values.email, values.password);
        dispatch(loginSuccess({ token: data.token, user: { email: values.email } }));
        toast.success('Giriş başarılı!');
      } catch (err) {
        dispatch(loginFailure('Giriş başarısız!'));
        toast.error('Giriş başarısız!');
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-2xl border border-blue-100">
        <img src={IletisimImg} alt="İl" className="mx-auto mb-2 w-72 h-32 object-contain" />
        <h2 className="text-3xl font-extrabold mb-8 text-center text-blue-900 tracking-tight">Giriş Yap</h2>
        <form onSubmit={formik.handleSubmit}>
          <ReusableInput label="Email" name="email" formik={formik} />
          <ReusableInput label="Şifre" name="password" type="password" formik={formik} />
          {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition mb-2 mt-2 shadow"
            disabled={loading}
          >
            {loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
          </button>
        </form>
        <div className="text-center mt-4 text-sm text-gray-600">
          Hesabınız yok mu?{' '}
          <Link to="/register" className="text-blue-700 font-semibold hover:underline">Kayıt Ol</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 