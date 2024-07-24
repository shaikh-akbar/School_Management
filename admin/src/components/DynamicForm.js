import React from 'react';

function DynamicForm({ fields = [], onSubmit, initialValues = {} }) {
  const [formValues, setFormValues] = React.useState(initialValues);

  const handleChange = (e, fieldName) => {
    if (e.target.type === 'date') {
      setFormValues({ ...formValues, [fieldName]: e.target.value });
    } else {
      setFormValues({ ...formValues, [fieldName]: e.target.value });
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    
    onSubmit(formValues);
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
        </div>
      ))}
      <div className='flex items-center justify-center'>
      <button
        type="submit"
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 "
      >
        Submit
      </button>
      </div>
      
    </form>
  );
}

export default DynamicForm;
