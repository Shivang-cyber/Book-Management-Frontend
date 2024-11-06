import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks } from '../features/bookSlice';
import { useNavigate } from 'react-router-dom';
import BookEditCard from '../components/BookEditCard';
import { verifyToken } from '../features/authSlice';

const Books = () => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.books);
  const { loginSuccess, isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();

   useEffect(() => {
    dispatch(verifyToken());
    if (!loginSuccess || !isAuthenticated) {
      navigate('/login');
    }
  }, [loginSuccess,isAuthenticated, navigate, dispatch]);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchBooks());
    }
  }, [status, dispatch]);

  const handleEdit = (bookId) => {
    console.log('Edit book with ID:', bookId);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Books List</h1>
      
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>Error: {error}</p>}
      
      {status === 'succeeded' && (
        <div className="flex flex-wrap align-items justify-center">
          {items.map((book) => (
            <BookEditCard key={book.book_id} book={book} onEdit={handleEdit} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Books;
