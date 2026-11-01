import { useEffect, useState } from 'react';
import BookService from '../services/BookService';

function BookList({ refreshKey, onEdit }) {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    BookService.getAll()
      .then((response) => {
        if (active) {
          setBooks(response.data);
          setError('');
        }
      })
      .catch(() => {
        if (active) {
          setError('No fue posible cargar los libros.');
        }
      });

    return () => {
      active = false;
    };
  }, [refreshKey]);

  const handleDelete = (id) => {
    if (!window.confirm('¿Deseas eliminar este libro?')) {
      return;
    }

    BookService.remove(id)
      .then(() => setBooks((currentBooks) => currentBooks.filter((book) => book.id !== id)))
      .catch(() => setError('No fue posible eliminar el libro.'));
  };

  return (
    <section>
      <h2 className="h4 mb-3">Libros registrados</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="table-responsive">
        <table className="table table-striped table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>Nombre</th>
              <th>ISBN</th>
              <th>Autor</th>
              <th>Fecha</th>
              <th>Precio</th>
              <th>Tipo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {books.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center">No hay libros registrados.</td>
              </tr>
            ) : (
              books.map((book) => (
                <tr key={book.id}>
                  <td>{book.name}</td>
                  <td>{book.isbnNumber}</td>
                  <td>{book.author}</td>
                  <td>{book.publishDate}</td>
                  <td>{book.price}</td>
                  <td>{book.type}</td>
                  <td>
                    <button className="btn btn-sm btn-outline-primary me-2" onClick={() => onEdit(book)}>
                      Editar
                    </button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(book.id)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default BookList;
