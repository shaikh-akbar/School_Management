
import React, { useState } from 'react';

const TableComponent = ({ columns, data, onEdit, onDelete }) => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState({});
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const filteredData = data
    .filter(item => {
      return Object.keys(filter).every(key => {
        return filter[key] === '' || item[key] === filter[key];
      });
    })
    .filter(item => {
      return Object.values(item).some(value => 
        (value !== null && value !== undefined && value.toString().toLowerCase().includes(search.toLowerCase()))
      );
    });

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortField) return 0;
    const aValue = a[sortField];
    const bValue = b[sortField];
    const aStr = (aValue !== null && aValue !== undefined) ? aValue.toString() : '';
    const bStr = (bValue !== null && bValue !== undefined) ? bValue.toString() : '';
    if (aStr < bStr) return sortOrder === 'asc' ? -1 : 1;
    if (aStr > bStr) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  const paginatedData = sortedData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);
  const totalPages = Math.ceil(sortedData.length / rowsPerPage);

  return (
    <div>
      <div className='px-[15px]'>
      <input
        type='text'
        placeholder='Search...'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className='mb-4 p-2 border border-gray-300 px-[15px]'
      />
      </div>
      
      
      <table className='min-w-full divide-y divide-gray-200'>
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.field}
                className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                onClick={() => {
                  if (sortField === col.field) {
                    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                  } else {
                    setSortField(col.field);
                    setSortOrder('asc');
                  }
                }}
              >
                {col.header}
                {sortField === col.field && (
                  <span>{sortOrder === 'asc' ? ' 🔼' : ' 🔽'}</span>
                )}
              </th>
            ))}
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Actions</th>
          </tr>
        </thead>
        <tbody className='bg-white divide-y divide-gray-200'>
          {paginatedData.map((item) => (
            <tr key={item._id}>
              {columns.map((col) => (
                <td key={col.field} className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                  {col.field.split('.').reduce((acc, part) => acc && acc[part], item) || 'N/A'}
                </td>
              ))}
              <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                <button 
                  onClick={() => onEdit(item._id)} 
                  className='text-blue-600 hover:text-blue-900 mr-2'
                >
                  Edit
                </button>
                <button 
                  onClick={() => onDelete(item._id)} 
                  className='text-red-600 hover:text-red-900'
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {/* Pagination Controls */}
      <div className='mt-4 flex justify-between items-center px-[15px] py-[15px]'>
        <button 
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className='px-4 py-2 bg-blue-500 text-white rounded'
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button 
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className='px-4 py-2 bg-blue-500 text-white rounded'
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TableComponent;
