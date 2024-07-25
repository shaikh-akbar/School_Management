import React, { useEffect, useState } from 'react';
import { getAllClasses, addClass, updateClass, deleteClass, getClassById } from '../api/api';
import DynamicForm from '../components/DynamicForm';
import TableComponent from '../components/TableComponent';
import Modal from '../components/Modal';
import Loader from '../components/Loader'; // Import the Loader component
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


const ClassPage = () => {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [formMode, setFormMode] = useState('add');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    setLoading(true);
    try {
      const response = await getAllClasses();
      setClasses(response.data || []);
    } catch (error) {
      console.error('Error fetching classes:', error);
      toast.error('Failed to fetch classes.');
    } finally {
      setLoading(false); // End loading
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
    setLoading(true); 
    try {
      const response = await getClassById(id);
      setSelectedClass(response.data);
      setFormMode('edit');
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error fetching class:', error.response ? error.response.data : error.message);
      toast.error('Failed to fetch class details.');
    } finally {
      setLoading(false); 
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



  const handleClassView = async (id) =>{
    navigate(`/ClassAnalytics/${id}`);
  }
  

  return (
    <div>
      {loading && <Loader />}
      {!loading && (
        <>
          <div className='flex items-center justify-between px-4 py-4'>
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
              { field: 'teacher.name', header: 'Teacher' }, 
              { field: 'studentFees', header: 'Student Fees' },
              { field: 'maxStudents', header: 'Max Students' },
              { field: 'students.length', header: 'Enrolled Students' }
            ]}
            data={classes}
            onEdit={(id) => handleEdit(id)}
            onDelete={(id) => handleDelete(id)}
            onView={(id) => handleClassView(id)}
          />
          
          {isModalOpen && (
            <Modal onClose={() => setIsModalOpen(false)}>
              <DynamicForm
                fields={[
                  { name: 'className', label: 'Class Name', type: 'text' },
                  { name: 'year', label: 'Year', type: 'number' },
                  { name: 'teacher', label: 'Teacher Id', type: 'text' }, 
                  { name: 'studentFees', label: 'Student Fees', type: 'number' },
                  { name: 'maxStudents', label: 'Max Students', type: 'number' }
                ]}
                onSubmit={handleSubmit}
                initialValues={selectedClass || {}}
              />
            </Modal>
          )}
          <ToastContainer />
        </>
      )}
    </div>
  );
};

export default ClassPage;
