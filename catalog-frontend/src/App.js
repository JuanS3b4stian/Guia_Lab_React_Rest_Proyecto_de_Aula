import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import BookForm from './components/BookForm';
import BookList from './components/BookList';

function App() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [bookToEdit, setBookToEdit] = useState(null);

  const handleSaved = () => {
    setBookToEdit(null);
    setRefreshKey((key) => key + 1);
  };

  return (
    <main className="container py-4">
      <header className="mb-4">
        <h1 className="display-6 mb-1">Catálogo de libros</h1>
        <p className="text-muted mb-0">Administra, consulta y busca tus libros.</p>
      </header>
      <BookForm bookToEdit={bookToEdit} onSaved={handleSaved} />
      <BookList refreshKey={refreshKey} onEdit={setBookToEdit} onDeleted={() => setRefreshKey((key) => key + 1)} />
    </main>
  );
}

export default App;
