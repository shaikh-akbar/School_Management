// TeacherDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTeacherById } from '../api/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../components/Loader';

const TeacherDetails = () => {
  const { id } = useParams();
  const [teacher, setTeacher] = useState(null);

  useEffect(() => {
    fetchTeacherDetails(id);
  }, [id]);

  const fetchTeacherDetails = async (id) => {
    try {
      const response = await getTeacherById(id);
      setTeacher(response.data);
    } catch (error) {
      toast.error('Failed to fetch teacher details.');
    }
  };

  if (!teacher) return <div className="bg-[#F8F9FC] md:px-10 px-2 py-6"><Loader /></div>;

  return (
    <div className="bg-[#F8F9FC] md:px-10 px-2 py-6">
      <h1 className="text-3xl font-semibold text-gray-800">Teacher Details</h1>
      <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
        <p className="text-lg pb-2 border-b border-gray-200"><strong>Name:</strong> {teacher.name}</p>
        <p className="text-lg pb-2 border-b border-gray-200 mt-2"><strong>Gender:</strong> {teacher.gender}</p>
        <p className="text-lg pb-2 border-b border-gray-200 mt-2"><strong>Date of Birth:</strong> {new Date(teacher.dob).toLocaleDateString()}</p>
        <p className="text-lg pb-2 border-b border-gray-200 mt-2"><strong>Contact Details:</strong> {teacher.contactDetails}</p>
        <p className="text-lg pb-2 border-b border-gray-200 mt-2"><strong>Salary:</strong> {teacher.salary}</p>
        <p className="text-lg pb-2 border-b border-gray-200 mt-2"><strong>Assigned Class:</strong> {teacher.assignedClass}</p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default TeacherDetails;
