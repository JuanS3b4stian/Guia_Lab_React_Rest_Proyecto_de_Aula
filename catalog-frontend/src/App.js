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
      <h1 className="display-6 mb-4">Catálogo de libros</h1>
      <BookForm bookToEdit={bookToEdit} onSaved={handleSaved} />
      <BookList refreshKey={refreshKey} onEdit={setBookToEdit} />
    </main>
  );
}

export default App;
