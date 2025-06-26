/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createIdea } from '../services/ideaService';
import DashboardLayout from '../layouts/DashboardLayout';
import ReusableInput from '../components/ReusableInput';
import { toast } from 'react-toastify';

const IdeaCreatePage = () => {
  const { isAuthenticated, token, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const formik = useFormik({
    initialValues: {
      title: '',
      purpose: '',
      benefit: '',
      description: '',
      file: null,
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Fikir adı zorunlu'),
      purpose: Yup.string().required('Fikirin amacı zorunlu'),
      benefit: Yup.string().required('Fayda alanı zorunlu'),
      description: Yup.string().required('Açıklama zorunlu'),
      file: Yup.mixed().nullable(),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const formData = new FormData();
        formData.append('title', values.title);
        formData.append('purpose', values.purpose);
        formData.append('benefit', values.benefit);
        formData.append('description', values.description);
        if (values.file) formData.append('file', values.file);
        formData.append('createdBy', user.userName);
        await createIdea(formData, token);
        resetForm();
        toast.success('Fikir başarıyla eklendi!');
        navigate('/ideas');
      } catch (err) {
        toast.error('Fikir eklenemedi!');
      }
    },
  });

  if (!isAuthenticated) {
    return null;
  }

  return (
    <DashboardLayout>
      <div className="w-full max-w-2xl mx-auto">
        <form
          onSubmit={formik.handleSubmit}
          className="bg-white p-8 rounded shadow w-full"
          encType="multipart/form-data"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Yeni Fikir Ekle</h2>
          <ReusableInput label="Fikir Adı" name="title" formik={formik} />
          <ReusableInput label="Fikirin Amacı" name="purpose" formik={formik} />
          <ReusableInput label="Fayda Sağlamak İstediği" name="benefit" formik={formik} />
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium mb-1">Açıklama</label>
            <textarea
              id="description"
              name="description"
              rows={4}
              className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${formik.touched.description && formik.errors.description ? 'border-red-500' : 'border-gray-300'}`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
            />
            {formik.touched.description && formik.errors.description && (
              <div className="text-red-500 text-xs mt-1">{formik.errors.description}</div>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="file" className="block text-sm font-medium mb-1">Dosya Yükle (pdf, word, resim, video)</label>
            <input
              id="file"
              name="file"
              type="file"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.mp4,.avi,.mov"
              className="w-full border rounded px-3 py-2"
              onChange={event => formik.setFieldValue('file', event.currentTarget.files[0])}
            />
            {formik.touched.file && formik.errors.file && (
              <div className="text-red-500 text-xs mt-1">{formik.errors.file}</div>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? 'Ekleniyor...' : 'Fikir Ekle'}
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default IdeaCreatePage; 