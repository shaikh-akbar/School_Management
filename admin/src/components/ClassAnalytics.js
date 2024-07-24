import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const ClassAnalytics = () => {
  const { id } = useParams();
  const [classDetails, setClassDetails] = useState(null);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchClassDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:7000/api/admin/getASingleClass/${id}`);
        setClassDetails(response.data.classDetails);
        setStudents(response.data.students);
      } catch (error) {
        console.error(error);
      }
    };

    fetchClassDetails();
  }, [id]);

  if (!classDetails) return <div>Loading...</div>;

  // Count male and female students
  const genderCounts = students.reduce((acc, student) => {
    acc[student.gender] = (acc[student.gender] || 0) + 1;
    return acc;
  }, {});

  // Prepare data for Recharts
  const chartData = [
    { gender: 'Male', count: genderCounts['Male'] || 0 },
    { gender: 'Female', count: genderCounts['Female'] || 0 },
  ];

  return (
    <div>
      <h1>Class Analytics</h1>
      <h2>{classDetails.className}</h2>
      <p>Year: {classDetails.year}</p>
      <p>Teacher: {classDetails.teacher.name}</p>
      <h3>Students:</h3>
      <ul>
        {students.map(student => (
          <li key={student._id}>{student.name} ({student.gender})</li>
        ))}
      </ul>
      <BarChart width={600} height={300} data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="gender" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default ClassAnalytics;
