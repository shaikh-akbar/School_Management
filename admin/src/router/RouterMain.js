import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from '../App';
import Main from '../components/Main';
import ClassAnalytics from '../components/ClassAnalytics';
import ExpenseIncomeAnalytics from '../components/ExpensiveIncome';
import TeacherPage from '../page/TeacherPage';
import StudentPage from '../page/StudentPage';
import ClassPage from '../page/StudentClassPage';

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
            <Route path="/class-analytics" element={ClassAnalytics} />
            <Route path="/expense-income-analytics" component={ExpenseIncomeAnalytics} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default RouterMain;
