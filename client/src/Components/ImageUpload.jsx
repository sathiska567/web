import React, { useState } from 'react';
import axios from 'axios';

export default function ImageUpload() {
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [records, setRecords] = useState([]);

  function convertToBase64(e) {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.onerror = error => {
        console.log('Error: ', error);
      };
    }
  }

  // Add image to database
  const handleSubmit = async e => {
    e.preventDefault();

    if (!image) {
      alert('Please select an image');
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post('http://localhost:8080/api/v1/images/create-images', { image });

      if (res.data.success) {
        alert('Image created');
      } else {
        alert('Something went wrong');
      }
    } catch (error) {
      console.log(error);
      alert('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  // Fetch all image records from the database
  const getRecords = () => {
    axios
      .get('http://localhost:8080/api/v1/images/all-images')
      .then(res => {
        if (res.data.success) {
          setRecords(res.data.images);
        } else {
          alert('No images found');
        }
      })
      .catch(error => {
        console.log(error);
        alert('Something went wrong');
      });
  };

  // Convert base64 to image URL
  const convertBase64ToImage = base64String => {
    return base64String;
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <p>Lets upload an image</p>
        <br />
        <input type="file" accept="image/*" onChange={convertToBase64} />

        {image && <img src={image} alt="" width={100} height={100} />}

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Adding Image...' : 'Add Image'}
        </button>
      </form>

      <button type="button" className="btn btn-primary" onClick={getRecords}>
        Get Images
      </button>

      <div>
        {records.length > 0 ? (
          records.map(image => (
            <img key={image._id} src={convertBase64ToImage(image.image)} alt="" width={100} height={100} />
          ))
        ) : (
          <p>No images available</p>
        )}
      </div>
    </div>
  );
}
