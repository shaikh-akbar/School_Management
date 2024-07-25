import React, { useEffect, useState } from 'react';
import { getAllTeachers, addTeacher, updateTeacher, deleteTeacher } from '../api/api';
import DynamicForm from '../components/DynamicForm';
import TableComponent from '../components/TableComponent';
import Modal from '../components/Modal';
import '../components/Modal.css'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const TeacherPage = () => {
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [formMode, setFormMode] = useState('add');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const parseDate = (dateString) => {
    // Parse the date string to remove the time portion
    const [year, month, day] = dateString.split('-');
    return new Date(year, month - 1, day); // Month is zero-based
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await getAllTeachers();
      console.log('Fetched teachers:', response.data.data); 
      setTeachers(response.data.data || []);  
    } catch (error) {
      console.error('Error fetching teachers:', error);
      setTeachers([]);  

    }
  };
  
  

  const handleSubmit = async (teacher) => {
    try {
        // teacher.dob = parseDate(teacher.dob);
      if (formMode === 'add') {
        await addTeacher(teacher);
        toast.success('Teacher added successfully plzz refresh !');

      } else {
        await updateTeacher(selectedTeacher._id, teacher);
        toast.success('Teacher updated successfully plzz refresh!');
      }
      fetchTeachers();
      setSelectedTeacher(null);
      setFormMode('add');
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to add or update teacher.');

    }
  };

  const handleEdit = (id) => {
    if (!id) {
      console.error('No ID provided for editing');
      return;
    }
  
    const teacher = teachers.find(t => t._id === id);
    if (teacher) {
      setSelectedTeacher(teacher);
      setFormMode('edit');
      setIsModalOpen(true);
    } else {
      console.error('Teacher not found with ID:', id);
    }
  };
  
  


  const handleDelete = async (id) => {
    try {
      await deleteTeacher(id);
      toast.success('Teacher deleted successfully plzz refresh!');
      fetchTeachers();
    } catch (error) {
      console.error('Error deleting teacher:', error);
      toast.error('Failed to delete teacher.');
    }
  };

  return (
    <div>
      <div className='flex items-center justify-between px-[15px] py-[15px]'>
        <h1 className='text-3xl font-bold'>Teachers</h1>
        <button
          className='bg-blue-500 text-white px-4 py-2 rounded'
          onClick={() => setIsModalOpen(true)}
        >
          Add Teacher
        </button>
      </div>
      
      <TableComponent
        columns={[
          { field: 'name', header: 'Name' },
          { field: 'gender', header: 'Gender' },
          { field: 'dob', header: 'Date of Birth' },
          { field: 'contactDetails', header: 'Contact Details' },
          { field: 'salary', header: 'Salary' }
        ]}
        data={teachers}
        onEdit={(id) => handleEdit(id)} 
        onDelete={(id) => handleDelete(id)}
      />
      
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <DynamicForm
            fields={[
              { name: 'name', label: 'Name', type: 'text' },
              { name: 'gender', label: 'Gender', type: 'text' },
              { name: 'dob', label: 'Date of Birth', type: 'date' },
              { name: 'contactDetails', label: 'Contact Details', type: 'text' },
              { name: 'salary', label: 'Salary', type: 'number' },
              { name: 'assignedClass', label: 'Assign Class', type: 'text' }
            ]}
            onSubmit={handleSubmit}
            initialValues={selectedTeacher || {}}
          />
        </Modal>
      )}
      <ToastContainer /> 
    </div>
  );
};

export default TeacherPage;
