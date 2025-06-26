import React from 'react';

const ReusableInput = ({ label, name, type = 'text', formik, ...rest }) => (
  <div className="mb-4">
    <label htmlFor={name} className="block text-sm font-medium mb-1">
      {label}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${formik.touched[name] && formik.errors[name] ? 'border-red-500' : 'border-gray-300'}`}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values[name]}
      {...rest}
    />
    {formik.touched[name] && formik.errors[name] && (
      <div className="text-red-500 text-xs mt-1">{formik.errors[name]}</div>
    )}
  </div>
);

export default ReusableInput; 