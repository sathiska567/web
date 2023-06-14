import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:8080/api/v1/blogs/all-blog/'); // Replace with your actual API endpoint
        setData(res.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {data.map(item => (
        <div key={item._id}>{item.title}</div>
      ))}
    </div>
  );
};

export default MyComponent;
