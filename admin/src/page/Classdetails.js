import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAllStudents, getAllTeachers, getClassById } from '../api/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const ClassDetails = () => {
    const { id } = useParams();
    const [className, setClassName] = useState([]);
    const [students, setStudents] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [filteredTeachers, setFilteredTeachers] = useState([]);

    useEffect(() => {
        getAClassDetails(id);
        fetchStudents();
        fetchTeachers();
    }, [id]);

    const getAClassDetails = async (id) => {
        try {
            const response = await getClassById(id);
            console.log(response.data, "Ek Class Ka Data");
            setClassName(response.data);
        } catch (error) {
            toast.error('Failed to fetch class details.');
        }
    };

    const fetchStudents = async () => {
        try {
            const response = await getAllStudents();
            setStudents(response.data || []);
            console.log(response, "All Student Data");
        } catch (error) {
            console.error('Error fetching students:', error);
            toast.error('Failed to fetch students.');
        }
    };

    const fetchTeachers = async () => {
        try {
            const response = await getAllTeachers();
            setTeachers(response.data.data || []);
            console.log(response, "All Teacher Data");
        } catch (error) {
            console.error('Error fetching teachers:', error);
            toast.error('Failed to fetch teachers.');
        }
    };



    const data = [
        { name: 'Male', value: 17 },
        { name: 'Female', value: 11 },
    ];

    const COLORS = ['#0088FE', '#FF8042'];

    return (
        <div className='bg-[#F8F9FC] md:px-10 px-2 py-6'>
            <p>&nbsp;</p>

            <h1 className='text-2xl font-medium text-gray-400'>Class Details</h1>
            <p>&nbsp;</p>

            <div className='flex justify-between'>
                <div className='px-3 py-2  rounded bg-[#ffffff]'>Class Name : <span className='font-bold text-indigo-500'>{className?.className}</span></div>
                <div className='px-3 py-2  rounded bg-[#ffffff]'>Class Name : <span className='font-bold text-indigo-500'>{className?.year}</span></div>
                <div className='px-3 py-2  rounded bg-[#ffffff]'>Total Teachers : <span className='font-bold text-indigo-500'>{teachers?.length}</span></div>
                <div className='px-3 py-2  rounded bg-[#ffffff]'>Total Students : <span className='font-bold text-indigo-500'>{students?.length}</span></div>
            </div>
            <p>&nbsp;</p>
            <div className='flex justify-between md:gap-10 gap-4'>
                <div className='w-2/5'>
                    <div className='w-full border text-xl  font-semibold bg-[#eeeaea] rounded-sm px-2 py-2'>Total List {students?.length}</div>
                    <ul>
                        {students?.map(student => (
                            <li className='border px-1 py-2 bg-[#ffffff] mt-2' key={student?._id}>{student?.name}</li>
                        ))}
                    </ul>
                </div>
                <div className='w-2/5'>
                    <div className='w-full bg-[#eeeaea] text-xl font-semibold border rounded-sm px-2 py-2'>Teachers List </div>
                    <ul>
                        {teachers.map(teacher => (
                            <li className='border px-1 py-2 mt-2 bg-[#ffffff]' key={teacher._id}>{teacher?.name}</li>
                        ))}
                    </ul>
                </div>
            </div>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <h2>Student Gender Distribution</h2>
            <PieChart width={400} height={400}>
                <Pie
                    data={data}
                    cx={200}
                    cy={200}
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={150}
                    fill="#8884d8"
                    dataKey="value"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
            <ToastContainer />
        </div>
    );
};

export default ClassDetails;
