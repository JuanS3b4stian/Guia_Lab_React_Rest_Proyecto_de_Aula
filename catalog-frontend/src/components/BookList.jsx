import { useEffect, useState } from 'react';
import BookService from '../services/BookService';

function BookList({ refreshKey, onEdit, onDeleted }) {
  const [books, setBooks] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;
    setLoading(true);

    const request = searchName.trim()
      ? BookService.searchByName(searchName.trim())
      : BookService.getAll();

    request
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
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [refreshKey, searchName]);

  const handleDelete = (id) => {
    if (!window.confirm('¿Deseas eliminar este libro?')) {
      return;
    }

    BookService.remove(id)
      .then(() => {
        setBooks((currentBooks) => currentBooks.filter((book) => book.id !== id));
        onDeleted();
      })
      .catch(() => setError('No fue posible eliminar el libro.'));
  };

  return (
    <section>
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
        <h2 className="h4 mb-0">Libros registrados</h2>
        <form className="d-flex gap-2" onSubmit={(event) => event.preventDefault()}>
          <label className="visually-hidden" htmlFor="searchName">Buscar por nombre</label>
          <input
            id="searchName"
            className="form-control"
            placeholder="Buscar por nombre"
            value={searchName}
            onChange={(event) => setSearchName(event.target.value)}
          />
          {searchName && (
            <button type="button" className="btn btn-outline-secondary" onClick={() => setSearchName('')}>
              Limpiar
            </button>
          )}
        </form>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      {loading && <div className="alert alert-info">Cargando libros...</div>}
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
                <td colSpan="7" className="text-center">
                  {searchName ? 'No se encontraron libros con ese nombre.' : 'No hay libros registrados.'}
                </td>
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
