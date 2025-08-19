import React, { useState, useEffect } from 'react';
import bookService from '../../services/bookService';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalBooks: 0,
    recentBooks: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const books = await bookService.getAllBooks();
      setStats({
        totalBooks: books.length,
        recentBooks: books.slice(0, 5)
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Books</h3>
          <p className="text-3xl font-bold text-indigo-600">{stats.totalBooks}</p>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Recent Books</h2>
        </div>
        <div className="p-6">
          {stats.recentBooks.length === 0 ? (
            <p className="text-gray-500">No books found. Add your first book!</p>
          ) : (
            <div className="space-y-4">
              {stats.recentBooks.map((book) => (
                <div key={book._id} className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium text-gray-900">{book.title}</h4>
                    <p className="text-sm text-gray-500">by {book.author}</p>
                  </div>
                  <span className="text-sm text-gray-500">{book.isbn}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
