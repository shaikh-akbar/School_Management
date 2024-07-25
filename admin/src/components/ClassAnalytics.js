import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const ClassAnalytics = () => {
  const { id } = useParams();
  const [classData, setClassData] = useState(null);
  const [genderCounts, setGenderCounts] = useState({ male: 0, female: 0 });

  useEffect(() => {
    const fetchData = async () => {
      const API_URL = 'http://localhost:7000/api/admin';
      const classRes = await fetch(`${API_URL}/api/admin/getASingleClass/${id}`);
      const classData = await classRes.json();
      setClassData(classData);

      const genderRes = await fetch(`/api/students/genderCount/${id}`);
      const genderData = await genderRes.json();
      setGenderCounts(genderData);
    };

    fetchData();
  }, [id]);

  return (
    <div>
      {classData && (
        <>
          <h1>{classData.className}</h1>
          <p>Year: {classData.year}</p>
          <p>Teacher: {classData.teacher.name}</p>
          <ul>
            {classData.students.map(student => (
              <li key={student._id}>{student.name}</li>
            ))}
          </ul>
          <BarChart width={500} height={300} data={[
            { gender: 'Male', count: genderCounts.male },
            { gender: 'Female', count: genderCounts.female }
          ]}>
            <XAxis dataKey="gender" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </>
      )}
    </div>
  );
};

export default ClassAnalytics;
