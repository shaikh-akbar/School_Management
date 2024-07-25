import React, { useEffect, useState } from 'react';
import { getAllClasses, addClass, updateClass, deleteClass, getClassById } from '../api/api';
import DynamicForm from '../components/DynamicForm';
import TableComponent from '../components/TableComponent';
import Modal from '../components/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ClassPage = () => {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [formMode, setFormMode] = useState('add');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await getAllClasses();
      setClasses(response.data || []);
    } catch (error) {
      console.error('Error fetching classes:', error);
      toast.error('Failed to fetch classes.');
    }
  };

  const handleSubmit = async (classData) => {
    try {
      if (formMode === 'add') {
        await addClass(classData);
        toast.success('Class added successfully!');
      } else {
        await updateClass(selectedClass._id, classData);
        toast.success('Class updated successfully!');
      }
      fetchClasses();
      setSelectedClass(null);
      setFormMode('add');
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to add or update class.');
    }
  };
  

  const handleEdit = async (id) => {
    try {
      const response = await getClassById(id);
      setSelectedClass(response.data);
      setFormMode('edit');
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error fetching class:', error.response ? error.response.data : error.message);
      toast.error('Failed to fetch class details.');
    }
  };
  

  const handleDelete = async (id) => {
    try {
      await deleteClass(id);
      toast.success('Class deleted successfully!');
      fetchClasses();
    } catch (error) {
      console.error('Error deleting class:', error);
      toast.error('Failed to delete class.');
    }
  };

  return (
    <div>
      <div className='flex items-center justify-between px-[15px] py-[15px]'>
        <h1 className='text-3xl font-bold'>Classes</h1>
        <button
          className='bg-blue-500 text-white px-4 py-2 rounded'
          onClick={() => setIsModalOpen(true)}
        >
          Add Class
        </button>
      </div>
      
      <TableComponent
        columns={[
          { field: 'className', header: 'Class Name' },
          { field: 'year', header: 'Year' },
          { field: 'teacher.name', header: 'Teacher' }, // Assuming teacher has a name field
          { field: 'studentFees', header: 'Student Fees' },
          { field: 'maxStudents', header: 'Max Students' },
          { field: 'students.length', header: 'Enrolled Students' }
        ]}
        data={classes}
        onEdit={(id) => handleEdit(id)}
        onDelete={(id) => handleDelete(id)}
      />
      
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <DynamicForm
            fields={[
              { name: 'className', label: 'Class Name', type: 'text' },
              { name: 'year', label: 'Year', type: 'number' },
              { name: 'teacher', label: 'Teacher', type: 'text' }, // Assuming teacher is a reference ID
              { name: 'studentFees', label: 'Student Fees', type: 'number' },
              { name: 'maxStudents', label: 'Max Students', type: 'number' }
            ]}
            onSubmit={handleSubmit}
            initialValues={selectedClass || {}}
          />
        </Modal>
      )}
      <ToastContainer />
    </div>
  );
};

export default ClassPage;
