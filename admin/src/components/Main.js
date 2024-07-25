import React, { useState, useEffect } from 'react';
import { GiTeacher } from 'react-icons/gi';
import { MdClass } from 'react-icons/md';
import { PiStudentDuotone } from 'react-icons/pi';
import { FaEllipsisV } from 'react-icons/fa';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import PieComponent from './PieComponent';
import { getAllClasses, getAllStudents, getAllTeachers } from '../api/api'; 
const data = [
  { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
  { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
];

function Main() {
  const [studentCount, setStudentCount] = useState(0);
  const [teacherCount, setTeacherCount] = useState(0);
  const [classCount, setClassCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const studentRes = await getAllStudents();
        const teacherRes = await getAllTeachers();
        const classRes = await getAllClasses();
        
        setStudentCount(studentRes.data.length); 
        setTeacherCount(teacherRes.data.total); 
        setClassCount(classRes.data.length); 
      } catch (error) {
        console.error("Failed to fetch counts", error);
      }
    };
    
    fetchCounts();
  }, []);
  
  const pieData = [
    { name: 'Students', value: studentCount },
    { name: 'Teachers', value: teacherCount },
    { name: 'Classes', value: classCount }
  ];

  return (
    <div className='pt-6 px-6 bg-[#F8F9FC]'>
      <div className='flex flex-col md:flex-row items-center justify-between'>
        <h1 className='text-[#5a5c69] text-2xl leading-7 font-normal cursor-pointer'>Dashboard</h1>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 pb-4'>
        <div className='h-24 rounded-lg bg-white border-l-4 border-[#4E73DF] flex items-center justify-between px-6 cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-in-out'>
          <div>
            <h2 className='text-[#4E73DF] text-xs leading-4 font-bold'>Total (Students)</h2>
            <h1 className='text-xl leading-6 font-bold text-[#4E73DF] mt-1'>{studentCount}</h1>
          </div>
          <PiStudentDuotone fontSize={28} color='' />
        </div>
        <div className='h-24 rounded-lg bg-white border-l-4 border-[#1cc88a] flex items-center justify-between px-6 cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-in-out'>
          <div>
            <h2 className='text-[#1cc88a] text-xs leading-4 font-bold'>Total (Teachers)</h2>
            <h1 className='text-xl leading-6 font-bold text-[#1cc88a] mt-1'>{teacherCount}</h1>
          </div>
          <GiTeacher fontSize={28} color='' />
        </div>
        <div className='h-24 rounded-lg bg-white border-l-4 border-[#FF6347] flex items-center justify-between px-6 cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-in-out'>
          <div>
            <h2 className='text-[#FF6347] text-xs leading-4 font-bold'>Total (Classes)</h2>
            <h1 className='text-xl leading-6 font-bold text-[#FF6347] mt-1'>{classCount}</h1>
          </div>
          <MdClass fontSize={28} color='' />
        </div>
      </div>
      <div className='flex flex-col lg:flex-row mt-6 w-full gap-6'>
        <div className='lg:basis-2/3 border bg-white shadow-md cursor-pointer rounded-md'>
          <div className='bg-[#F8F9FC] flex items-center justify-between py-4 px-5 border-b border-[#EDEDED] mb-5'>
            <h2>Overview</h2>
            <FaEllipsisV color='gray' className='cursor-pointer' />
          </div>
          <div className='px-4'>
            <LineChart width={500} height={350} data={data} className='mx-auto'>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='name' padding={{ left: 30, right: 30 }} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type='monotone' dataKey='pv' stroke='#8884d8' activeDot={{ r: 8 }} />
              <Line type='monotone' dataKey='uv' stroke='#82ca9d' />
            </LineChart>
          </div>
        </div>
        <div className='lg:basis-1/3 border bg-white shadow-md cursor-pointer rounded-md'>
          <div className='bg-[#F8F9FC] flex items-center justify-between py-4 px-5 border-b border-[#EDEDED] mb-5'>
            <h2>Overall Management</h2>
            <FaEllipsisV color='gray' className='cursor-pointer' />
          </div>
          <div className='px-4'>
            <PieComponent data={pieData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
