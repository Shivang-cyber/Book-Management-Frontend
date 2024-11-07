import React, { useEffect, useState } from 'react';
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

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');

  useEffect(() => {
    if (!loginSuccess || !isAuthenticated) {
      navigate('/login');
    }
    dispatch(verifyToken());
  }, [loginSuccess, isAuthenticated, navigate, dispatch]);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchBooks());
    }
  }, [status, dispatch]);

  // Filter the books based on search term and selected genre
  const filteredBooks = items.filter((book) => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = selectedGenre === 'All' || book.genre === selectedGenre;

    return matchesSearch && matchesGenre;
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Books List</h1>
    <div className="flex justify-end mb-4">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by title or author"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border rounded-md"
        />
      </div>

      <div className="mb-4">
        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          className="px-4 py-2 border rounded-md"
        >
          <option value="All">All Genres</option>
          <option value="Fiction">Fiction</option>
          <option value="Non-fiction">Non-fiction</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Science Fiction">Science Fiction</option>
          {/* Add more genres as needed */}
        </select>
      </div>
      </div>

      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>Error: {error}</p>}

      {status === 'succeeded' && (
        <div className="flex flex-wrap align-items justify-center">
          {filteredBooks.map((book) => (
            <BookEditCard key={book.book_id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Books;
