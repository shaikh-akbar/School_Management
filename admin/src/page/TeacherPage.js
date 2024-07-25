import React, { useEffect, useState } from 'react';
import { getAllTeachers, addTeacher, updateTeacher, deleteTeacher } from '../api/api';
import DynamicForm from '../components/DynamicForm';
import TableComponent from '../components/TableComponent';
import Modal from '../components/Modal';
import Loader from '../components/Loader'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


const TeacherPage = () => {
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [formMode, setFormMode] = useState('add');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    setLoading(true);
    try {
      const response = await getAllTeachers();
      console.log('Fetched teachers:', response.data.data);
      setTeachers(response.data.data || []);
    } catch (error) {
      console.error('Error fetching teachers:', error);
      setTeachers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (teacher) => {
    try {
      if (formMode === 'add') {
        await addTeacher(teacher);
        toast.success('Teacher added successfully! Please refresh.');
      } else {
        await updateTeacher(selectedTeacher._id, teacher);
        toast.success('Teacher updated successfully! Please refresh.');
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
      toast.success('Teacher deleted successfully! Please refresh.');
      fetchTeachers();
    } catch (error) {
      console.error('Error deleting teacher:', error);
      toast.error('Failed to delete teacher.');
    }
  };

  const handleView = (id) => {
    navigate(`/teachersDetail/${id}`);
  };

  return (
    <div>
      {loading && <Loader />}
      {!loading && (
        <>
          <div className='flex items-center justify-between px-4 py-4'>
            <h1 className='text-3xl font-bold'>Teachers</h1>
            <button
              className='bg-blue-500 text-white px-4 py-2 rounded'
              onClick={() => {
                console.log('Opening modal'); 
                setIsModalOpen(true);
              }}
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
            onView={(id) => handleView(id)}
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
        </>
      )}
    </div>
  );
};

export default TeacherPage;
