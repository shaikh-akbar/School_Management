import React, { useState } from 'react';

function DynamicForm({ fields = [], onSubmit, initialValues = {} }) {
  const [formValues, setFormValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (e, fieldName) => {
    const { type, value } = e.target;
    setFormValues(prevValues => ({
      ...prevValues,
      [fieldName]: type === 'date' ? new Date(value).toISOString().split('T')[0] : value
    }));
  };

  const validate = () => {
    const newErrors = {};
    
    fields.forEach(field => {
      const value = formValues[field.name];
      
      if (field.required && (value === undefined || value === null || value === '')) {
        newErrors[field.name] = `${field.label} is required`;
      }
      
      if (field.type === 'text') {
        if (value && value.length < 2) {
          newErrors[field.name] = `${field.label} must be at least 2 characters long`;
        }
      }
  
      if (field.type === 'number') {
        if (value === undefined || value === null || value === '') {
          newErrors[field.name] = `${field.label} is required`;
        } else if (isNaN(value)) {
          newErrors[field.name] = `${field.label} must be a number`;
        } else if (Number(value) < 0) {
          newErrors[field.name] = `${field.label} must be a non-negative number`;
        }
      }
      if (field.type === 'text') {
        if (value === undefined || value === null || value === '') {
          newErrors[field.name] = `${field.label} is required`;
        } 
      }
      if (field.type === 'date') {
        if (value === undefined || value === null || value === '') {
          newErrors[field.name] = `${field.label} is required`;
        } 
      }
      
      if (field.type === 'date') {
        if (value && isNaN(new Date(value).getTime())) {
          newErrors[field.name] = 'Invalid Date';
        }
      }
      
      if (field.name === 'contactDetails') {
        if (value && !/^[0-9]{10}$/.test(value)) {
          newErrors[field.name] = 'Contact Details must be a 10-digit number';
        }
      }
      
      if (field.name === 'assignedClass') {
        if (value && value.length < 1) {
          newErrors[field.name] = 'Assigned Class is required';
        }
      }
      
      if (field.name === 'className') {
        if (value && value.length < 2) {
          newErrors[field.name] = 'Class Name must be at least 2 characters long';
        }
      }
    });
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  
  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formValues);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((field) => (
        <div key={field.name} className='mb-4'>
          <label className='block text-sm font-medium text-gray-700'>{field.label}</label>
          <input
            type={field.type}
            value={field.type === 'date' && formValues[field.name] ? new Date(formValues[field.name]).toISOString().split('T')[0] : formValues[field.name] || ''}
            onChange={(e) => handleChange(e, field.name)}
            className="mt-1 block w-full h-8 shadow-sm sm:text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {errors[field.name] && <p className="text-red-500 text-xs italic">{errors[field.name]}</p>}
        </div>
      ))}
      <div className='flex items-center justify-center'>
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default DynamicForm;
