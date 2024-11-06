import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBook } from '../features/bookSlice';
import { useNavigate } from 'react-router-dom';
import { verifyToken } from '../features/authSlice';

const CreateBookPage = () => {
  const { loginSuccess, isAuthenticated } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    genre: '',
    cover: null,
  });
  const [coverPreview, setCoverPreview] = useState(null);

  useEffect(() => {
    dispatch(verifyToken());
    if (!loginSuccess || !isAuthenticated) {
      navigate('/login');
    }
  }, [loginSuccess,isAuthenticated, navigate, dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBook((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverPreview(URL.createObjectURL(file));
      setNewBook((prevState) => ({
        ...prevState,
        cover: file,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', newBook.title);
    formData.append('author', newBook.author);
    formData.append('genre', newBook.genre);
    formData.append('cover', newBook.cover);
    
    try {
      await dispatch(createBook(formData));
      navigate('/book');
    } catch (error) {
      console.error("Failed to create book:", error);
    }
  };

  const handleCancel = () => {
    setNewBook({
      title: '',
      author: '',
      genre: '',
      cover: null,
    });
    setCoverPreview(null);
  };

  return (
    <div className="w-72 h-156 bg-white rounded-lg shadow-lg p-4 flex flex-col justify-center items-center">
      <h3 className="text-xl font-semibold mb-1">Create New Book</h3>
      <form onSubmit={handleSubmit} className="w-full">
        <div className="mb-2">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={newBook.title}
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
            value={newBook.author}
            onChange={handleInputChange}
            className="w-full px-3 mt-1 border rounded-md"
            required
          />
        </div>

        <div className="mb-2">
          <label htmlFor="genre" className="block text-sm font-medium text-gray-700">Genre</label>
          <input
            type="text"
            id="genre"
            name="genre"
            value={newBook.genre}
            onChange={handleInputChange}
            className="w-full px-3 mt-1 border rounded-md"
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
            className="w-full px-3 mt-1 border rounded-md"
            required
          />
        </div>

        {coverPreview && (
          <div className="mb-2">
            <img src={coverPreview} alt="Cover Preview" className="w-24 h-32 object-cover rounded-md" />
          </div>
        )}

        <div className="flex justify-between items-center">
          <button
            type="submit"
            className="px-4 p-1 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Create
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
  );
};

export default CreateBookPage;
