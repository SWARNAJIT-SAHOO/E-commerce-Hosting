import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProtectedPage = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:5000/protected', {
      headers: {
        'Authorization': token
      }
    }).then((response) => {
      setMessage(response.data.message);
    }).catch((error) => {
      console.error('There was an error fetching the protected data!', error);
      setMessage('Failed to fetch protected data.');
    });
  }, []);

  return (
    <div>
      <h2>Protected Page</h2>
      <p>{message}</p>
    </div>
  );
};

export default ProtectedPage;
