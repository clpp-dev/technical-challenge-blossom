import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/characters', { replace: true });
  }, [navigate]);

  return null;
};

export default Home;
