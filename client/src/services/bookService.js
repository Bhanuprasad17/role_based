import api from './api';

const bookService = {
  async getAllBooks() {
    try {
      const response = await api.get('/books/getAllBooks');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch books' };
    }
  },

  async getBook(id) {
    try {
      const response = await api.get(`/books/getBook/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch book' };
    }
  },

  async createBook(bookData) {
    try {
      const response = await api.post('/books/createBook', bookData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to create book' };
    }
  },

  async updateBook(id, bookData) {
    try {
      const response = await api.put(`/books/updateBook/${id}`, bookData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update book' };
    }
  },

  async deleteBook(id) {
    try {
      const response = await api.delete(`/books/delete/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete book' };
    }
  }
};

export default bookService;
