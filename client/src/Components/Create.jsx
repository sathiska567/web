import React, { useState } from 'react';
import axios from 'axios';

export default function Create() {
  const [title, setTitle] = useState('');
  const [records, setRecords] = useState([]);

  // Add title to database
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:8080/api/v1/blogs/create-blog', { title });

      if (res.data.success) {
        alert('Blog created');
      } else {
        alert('Something went wrong');
      }
    } catch (error) {
      console.log(error);
      alert('Something went wrong');
    }
  };

  // Fetch all blog records from the database
  const getRecords = () => {
    axios
      .get('http://localhost:8080/api/v1/blogs/all-blog')
      .then((res) => {
        console.log(res.data.blogs);
        setRecords(res.data.blogs);
      })
      .catch((error) => {
        console.log(error);
        alert('Something went wrong');
      });
  };

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add your Title here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">
          Add Blog
        </button>
      </form>

      <button type="button" className="btn btn-primary" onClick={getRecords}>
          Get Blogs
        </button>

      <div>
       
        {records.map((blog) => (
          <p key={blog.id}>{blog.title}</p>
        ))}
        
      </div>
    </div>
  );
}
