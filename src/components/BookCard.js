import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteBook } from '../features/bookSlice';
const BookCard = ({ book, onEdit }) => {
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const slideUpStyle = isHovered
    ? { transform: 'translateY(-50px)' }
    : { transform: 'translateY(0)' };

  return (
    <div
      className="m-2 min-w-64 max-w-32 group relative rounded overflow-hidden shadow-xl bg-white transition-all duration-300 ease-in-out"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={slideUpStyle}
    >
      <img
        className="w-full h-60 object-cover p-2"
        src={book.cover_image_url}
        alt={`${book.title} cover`}
      />

      <div className='flex absolute bottom-2.5 z-20 w-full'>

      <button
        onClick={() => onEdit(book.book_id)}
        className={`w-1/2 px-3 py-2 bg-blue-600 text-white text-sm rounded-bl-lg shadow-md transition-all duration-300 ease-in-out ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ transform: 'translateY(10px)' }}
      >
        Edit
      </button>
      <button
        onClick={() =>{
            console.log(book)
            dispatch(deleteBook(book.book_id))}}
        className={`w-1/2 px-3 py-2 bg-red-600 text-white text-sm rounded-br-lg shadow-md transition-all duration-300 ease-in-out ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ transform: 'translateY(10px)' }}
      >
        Delete
      </button>
      </div>

      <div className={`p-4 transition-all duration-300 ease-in-out ${isHovered ? "mb-8": ""}`}>
        <h2 className="text-xl font-semibold mb-2">{book.title}</h2>
        <p className="text-gray-700">Author: {book.author}</p>
        <p className="text-gray-600 text-sm">Genre: {book.genre}</p>
        <p className="text-gray-600 text-sm">
          Published: {new Date(book.publication_date).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default BookCard;