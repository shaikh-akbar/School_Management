import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getStudentById } from '../api/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../components/Loader'
const StudentDetails = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    fetchStudentDetails(id);
  }, [id]);

  const fetchStudentDetails = async (id) => {
    try {
      const response = await getStudentById(id);
      setStudent(response.data);
    } catch (error) {
      toast.error('Failed to fetch student details.');
    }
  };

  if (!student) return <div className="bg-[#F8F9FC] md:px-10 px-2 py-6"><Loader /></div>;

  return (
    <div className="bg-[#F8F9FC] md:px-10 px-2 py-6">
      <h1 className="text-3xl font-semibold text-gray-800">Student Details</h1>
      <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
        <p className="text-lg pb-2 border-b border-gray-200"><strong>Name:</strong> {student.name}</p>
        <p className="text-lg pb-2 border-b border-gray-200 mt-2"><strong>Gender:</strong> {student.gender}</p>
        <p className="text-lg pb-2 border-b border-gray-200 mt-2"><strong>Date of Birth:</strong> {new Date(student.dob).toLocaleDateString()}</p>
        <p className="text-lg pb-2 border-b border-gray-200 mt-2"><strong>Contact Details:</strong> {student.contactDetails}</p>
        <p className="text-lg pb-2 border-b border-gray-200 mt-2"><strong>Fees Paid:</strong> {student.feesPaid}</p>
        <p className="text-lg pb-2 border-b border-gray-200 mt-2"><strong>Class:</strong> {student.className}</p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default StudentDetails;
