/* eslint-disable no-unused-vars */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { loginStart, loginSuccess, loginFailure } from '../redux/slices/authSlice';
import { register as registerService, login as loginService } from '../services/authService';
import ReusableInput from '../components/ReusableInput';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import IletisimImg from '../assets/İl.svg';

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('Ad zorunlu'),
      lastName: Yup.string().required('Soyad zorunlu'),
      email: Yup.string().email('Geçersiz e-posta').required('E-posta zorunlu'),
      phoneNumber: Yup.string().required('Telefon numarası zorunlu'),
      password: Yup.string().min(6, 'En az 6 karakter').required('Şifre zorunlu'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Şifreler eşleşmiyor')
        .required('Şifre tekrarı zorunlu'),
    }),
    onSubmit: async (values) => {
      dispatch(loginStart());
      try {
        await registerService(values.firstName, values.lastName, values.email, values.password, values.phoneNumber);
        const data = await loginService(values.email, values.password);
        dispatch(loginSuccess({ token: data.token, user: { email: values.email } }));
        toast.success('Kayıt başarılı!');
        navigate('/');
      } catch (err) {
        dispatch(loginFailure('Kayıt başarısız!'));
        toast.error('Kayıt başarısız!');
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-2xl border border-blue-100">
        <img src={IletisimImg} alt="İl" className="mx-auto mb-2 w-72 h-32 object-contain" />
        <h2 className="text-3xl font-extrabold mb-8 text-center text-blue-900 tracking-tight">Kayıt Ol</h2>
        <form onSubmit={formik.handleSubmit}>
          <ReusableInput label="Ad" name="firstName" formik={formik} />
          <ReusableInput label="Soyad" name="lastName" formik={formik} />
          <ReusableInput label="E-posta" name="email" type="email" formik={formik} />
          <ReusableInput label="Telefon Numarası" name="phoneNumber" formik={formik} />
          <ReusableInput label="Şifre" name="password" type="password" formik={formik} />
          <ReusableInput label="Şifre Tekrarı" name="confirmPassword" type="password" formik={formik} />
          {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition mb-2 mt-2 shadow"
            disabled={loading}
          >
            {loading ? 'Kayıt Olunuyor...' : 'Kayıt Ol'}
          </button>
        </form>
        <div className="text-center mt-4 text-sm text-gray-600">
          Zaten hesabınız var mı?{' '}
          <Link to="/login" className="text-blue-700 font-semibold hover:underline">Giriş Yap</Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage; 