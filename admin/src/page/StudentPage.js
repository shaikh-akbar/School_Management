import React, { useEffect, useState } from 'react';
import { getAllStudents, addStudent, updateStudent, deleteStudent, getStudentById } from '../api/api';
import DynamicForm from '../components/DynamicForm';
import TableComponent from '../components/TableComponent';
import Modal from '../components/Modal';
import Loader from '../components/Loader'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const StudentPage = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [formMode, setFormMode] = useState('add');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    setLoading(true); // Start loading
    try {
      const response = await getAllStudents();
      setStudents(response.data || []);
    } catch (error) {
      console.error('Error fetching students:', error);
      toast.error('Failed to fetch students.');
    } finally {
      setLoading(false); 
    }
  };

  const handleSubmit = async (student) => {
    try {
      if (formMode === 'add') {
        await addStudent(student);
        toast.success('Student added successfully!');
      } else {
        await updateStudent(selectedStudent._id, student);
        toast.success('Student updated successfully!');
      }
      fetchStudents();
      setSelectedStudent(null);
      setFormMode('add');
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to add or update student.');
    }
  };

  const handleEdit = async (id) => {
    setLoading(true);
    try {
      const response = await getStudentById(id);
      setSelectedStudent(response.data);
      setFormMode('edit');
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error fetching student:', error);
      toast.error('Failed to fetch student details.');
    } finally {
      setLoading(false); // End loading
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteStudent(id);
      toast.success('Student deleted successfully!');
      fetchStudents();
    } catch (error) {
      console.error('Error deleting student:', error);
      toast.error('Failed to delete student.');
    }
  };

  const handleView = (id) => {
    navigate(`/studentsDetail/${id}`);
  };

  return (
    <div>
      {loading && <Loader />} {/* Show loader when loading */}
      {!loading && (
        <>
          <div className='flex items-center justify-between px-4 py-4'>
            <h1 className='text-3xl font-bold'>Students</h1>
            <button
              className='bg-blue-500 text-white px-4 py-2 rounded'
              onClick={() => setIsModalOpen(true)}
            >
              Add Student
            </button>
          </div>
          
          <TableComponent
            columns={[
              { field: 'name', header: 'Name' },
              { field: 'gender', header: 'Gender' },
              { field: 'dob', header: 'Date of Birth' },
              { field: 'contactDetails', header: 'Contact Details' },
              { field: 'feesPaid', header: 'Fees Paid' },
              { field: 'className', header: 'Class' } 
            ]}
            data={students}
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
                  { name: 'feesPaid', label: 'Fees Paid', type: 'number' },
                  { name: 'className', label: 'Class', type: 'text' } 
                ]}
                onSubmit={handleSubmit}
                initialValues={selectedStudent || {}}
              />
            </Modal>
          )}
          <ToastContainer />
        </>
      )}
    </div>
  );
};

export default StudentPage;
