import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const CommentForm = ({ onSubmit, loading }) => {
  const formik = useFormik({
    initialValues: { text: '' },
    validationSchema: Yup.object({
      text: Yup.string().required('Yorum boş olamaz'),
    }),
    onSubmit: (values, { resetForm }) => {
      onSubmit(values.text);
      resetForm();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="mt-4 flex flex-col gap-2">
      <textarea
        name="text"
        rows={3}
        className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${formik.touched.text && formik.errors.text ? 'border-red-500' : 'border-gray-300'}`}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.text}
        placeholder="Yorumunuzu yazın..."
      />
      {formik.touched.text && formik.errors.text && (
        <div className="text-red-500 text-xs">{formik.errors.text}</div>
      )}
      <button
        type="submit"
        className="self-end bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition"
        disabled={loading}
      >
        {loading ? 'Gönderiliyor...' : 'Yorum Yap'}
      </button>
    </form>
  );
};

export default CommentForm; 