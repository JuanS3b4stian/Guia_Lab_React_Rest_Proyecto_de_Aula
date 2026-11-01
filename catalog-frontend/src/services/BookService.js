import axios from 'axios';

const API_URL = 'http://localhost:8080/api/books';

const BookService = {
  getAll: () => axios.get(API_URL),
  create: (book) => axios.post(API_URL, book),
  update: (id, book) => axios.put(`${API_URL}/${id}`, book),
  remove: (id) => axios.delete(`${API_URL}/${id}`),
};

export default BookService;
