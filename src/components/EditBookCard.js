import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateBook } from '../features/bookSlice'; 

const EditBookCard = ({ setIsFlipped, handleFlip, book }) => {
  const [editedBook, setEditedBook] = useState(book);
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedBook((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditedBook((prevState) => ({
        ...prevState,
        cover: file, 
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !editedBook.title ||
      !editedBook.author ||
      !editedBook.genre ||
      !editedBook.publication_date ||
      !editedBook.cover
    ) {
      alert("Please fill all the required fields.");
      return;
    }
    const formData = new FormData();
    formData.append('title', editedBook.title);
    formData.append('author', editedBook.author);
    formData.append('genre', editedBook.genre);
    formData.append('cover', editedBook.cover);
    formData.append('book_id', editedBook.book_id);

    const resultAction = await dispatch(updateBook(formData));

    if (updateBook.fulfilled.match(resultAction)) {
      setEditedBook(book);
      setIsFlipped(false);
    } else {
      alert("Error updating the book. Please try again.");
    }
  };

  const handleCancel = () => {
    setEditedBook(book); 
    setIsFlipped(false);
  };

  return (
    <div>
      <div className="w-72 h-96 bg-white rounded-lg shadow-lg p-4 flex flex-col justify-center items-center">
        <h3 className="text-xl font-semibold mb-1">Edit Book</h3>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-2">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={editedBook.title}
              onChange={handleInputChange}
              className="w-full px-3 mt-1 border rounded-md"
              required
            />
          </div>

          <div className="mb-2">
            <label htmlFor="author" className="block text-sm font-medium text-gray-700">Author</label>
            <input
              type="text"
              id="author"
              name="author"
              value={editedBook.author}
              onChange={handleInputChange}
              className="w-full px-3  mt-1 border rounded-md"
              required
            />
          </div>

          <div className="mb-2">
            <label htmlFor="genre" className="block text-sm font-medium text-gray-700">Genre</label>
            <input
              type="text"
              id="genre"
              name="genre"
              value={editedBook.genre}
              onChange={handleInputChange}
              className="w-full px-3  mt-1 border rounded-md"
              required
            />
          </div>

          <div className="mb-2">
            <label htmlFor="publication_date" className="block text-sm font-medium text-gray-700">Publication Date</label>
            <input
              type="date"
              id="publication_date"
              name="publication_date"
              value={editedBook.publication_date.slice(0, 10)}
              onChange={handleInputChange}
              className="w-full px-3  mt-1 border rounded-md"
              required
            />
          </div>

          <div className="mb-2">
            <label htmlFor="cover" className="block text-sm font-medium text-gray-700">Cover Image</label>
            <input
              type="file"
              id="cover"
              name="cover"
              accept="image/*"
              onChange={handleCoverChange}
              className="w-full px-3  mt-1 border rounded-md"
              required
            />
          </div>

          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="px-4 p-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 p-1 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBookCard;
