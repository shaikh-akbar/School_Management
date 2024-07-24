import React, { useState } from 'react';

const ExpenseIncomeAnalytics = () => {
  const [view, setView] = useState('monthly');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  return (
    <div>
        {/* <h1 className='pt-[25px]'>Expense Income Analytics</h1> */}
      <div>
        <button onClick={() => setView('monthly')}>Monthly</button>
        <button onClick={() => setView('yearly')}>Yearly</button>
      </div>
      {view === 'monthly' && (
        <div>
          <select value={month} onChange={(e) => setMonth(e.target.value)}>
            <option value="">Select Month</option>
            {/* Add month options */}
          </select>
          <select value={year} onChange={(e) => setYear(e.target.value)}>
            <option value="">Select Year</option>
            {/* Add year options */}
          </select>
        </div>
      )}
      {view === 'yearly' && (
        <div>
          <select value={year} onChange={(e) => setYear(e.target.value)}>
            <option value="">Select Year</option>
            {/* Add year options */}
          </select>
        </div>
      )}
      {/* Add logic to display expenses and income data based on selected view */}
    </div>
  );
};

export default ExpenseIncomeAnalytics;
