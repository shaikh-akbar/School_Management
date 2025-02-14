import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from '../App';
import Main from '../components/Main';
import ClassAnalytics from '../components/ClassAnalytics';
import ExpenseIncomeAnalytics from '../components/ExpensiveIncome';
import TeacherPage from '../page/TeacherPage';
import StudentPage from '../page/StudentPage';
import ClassPage from '../page/StudentClassPage';
import ClassDetails from '../page/Classdetails';
import StudentDetails from '../page/StudentDetail';
import TeacherDetails from '../page/TeacherDetail';

function RouterMain() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Main />} />
            <Route path='/teacher' element={<TeacherPage />} />
            <Route path='/student' element={<StudentPage />} />
            <Route path='/class' element={<ClassPage />} />
            <Route path="/ClassAnalytics/:id" element={<ClassAnalytics/>} />
          
            <Route path="ClassAnalytics/:id" element={<ClassDetails />} />
            <Route path="/studentsDetail/:id" element={<StudentDetails />} />
            <Route path="/teachersDetail/:id" element={<TeacherDetails />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default RouterMain;
