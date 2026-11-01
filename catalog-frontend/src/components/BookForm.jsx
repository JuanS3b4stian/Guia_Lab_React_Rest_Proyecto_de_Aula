import { useEffect, useState } from 'react';
import BookService from '../services/BookService';

const emptyBook = {
  name: '',
  isbnNumber: '',
  author: '',
  publishDate: '',
  price: '',
  type: 'EBOOK',
};

function BookForm({ bookToEdit, onSaved }) {
  const [book, setBook] = useState(emptyBook);
  const [error, setError] = useState('');

  useEffect(() => {
    setBook(bookToEdit ? { ...bookToEdit, price: bookToEdit.price ?? '' } : emptyBook);
    setError('');
  }, [bookToEdit]);

  const handleChange = ({ target }) => {
    setBook((currentBook) => ({ ...currentBook, [target.name]: target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const request = bookToEdit
      ? BookService.update(bookToEdit.id, book)
      : BookService.create({ ...book, price: Number(book.price) });

    request
      .then(() => {
        setBook(emptyBook);
        setError('');
        onSaved();
      })
      .catch(() => setError('No fue posible guardar el libro.'));
  };

  return (
    <section className="card shadow-sm mb-4">
      <div className="card-body">
        <h2 className="h4">{bookToEdit ? 'Editar libro' : 'Registrar libro'}</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-md-6">
            <label className="form-label" htmlFor="name">Nombre</label>
            <input id="name" name="name" className="form-control" value={book.name} onChange={handleChange} required />
          </div>
          <div className="col-md-6">
            <label className="form-label" htmlFor="isbnNumber">ISBN</label>
            <input id="isbnNumber" name="isbnNumber" className="form-control" value={book.isbnNumber} onChange={handleChange} required />
          </div>
          <div className="col-md-6">
            <label className="form-label" htmlFor="author">Autor</label>
            <input id="author" name="author" className="form-control" value={book.author} onChange={handleChange} required />
          </div>
          <div className="col-md-6">
            <label className="form-label" htmlFor="publishDate">Fecha de publicación</label>
            <input id="publishDate" name="publishDate" type="date" className="form-control" value={book.publishDate} onChange={handleChange} required />
          </div>
          <div className="col-md-6">
            <label className="form-label" htmlFor="price">Precio</label>
            <input id="price" name="price" type="number" min="0" step="0.01" className="form-control" value={book.price} onChange={handleChange} required />
          </div>
          <div className="col-md-6">
            <label className="form-label" htmlFor="type">Tipo</label>
            <select id="type" name="type" className="form-select" value={book.type} onChange={handleChange}>
              <option value="EBOOK">EBOOK</option>
              <option value="SOFTCOPY">SOFTCOPY</option>
              <option value="HARDCOVER">HARDCOVER</option>
            </select>
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary me-2">
              {bookToEdit ? 'Actualizar' : 'Guardar'}
            </button>
            {bookToEdit && <button type="button" className="btn btn-secondary" onClick={() => onSaved()}>Cancelar</button>}
          </div>
        </form>
      </div>
    </section>
  );
}

export default BookForm;
