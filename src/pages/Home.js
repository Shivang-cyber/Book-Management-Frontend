import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Home = () => {
  const { loginSuccess } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (!loginSuccess) {
      navigate('/login');
    }
  }, [loginSuccess, navigate]);


  return (
    <div className="w-full max-w-lg bg-white p-8 rounded shadow-md text-center">
      <p className="text-gray-600">Welcome</p>
      <p className="text-gray-600">To The Library</p>
    </div>
  );
};

export default Home;
