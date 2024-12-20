import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const JournalImageManager = () => {
  const { journalId } = useParams();
  const navigate = useNavigate();

  const [imageUrl, setImageUrl] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch image URL when the component mounts
  useEffect(() => {
    fetchImageUrl();
  }, []);

  const fetchImageUrl = async () => {
    try {
      const response = await axios.get(`http://localhost:8090/journals/download/image/${journalId}`);
      setImageUrl(response.data); // Set image URL in state
    } catch (error) {
      console.error('Error fetching image URL:', error);
      setError('Failed to load image.');
    }
  };

  const getAuthToken = () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      setError('You are not authorized. Please log in.');
      navigate('/login');
      return null;
    }
    return token;
  };

  const handleImageUpload = async () => {
    const token = getAuthToken();
    if (!token) return;

    if (!file) {
      setError('No file selected!');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      setLoading(true);
      const response = await axios.post(
        `http://localhost:8090/journals/${journalId}/upload`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setLoading(false);
      if (response.status === 200) {
        fetchImageUrl(); // Reload image URL
        alert('Image uploaded successfully!');
      } else {
        setError('Image upload failed.');
      }
    } catch (err) {
      setLoading(false);
      console.error('Error uploading image:', err);
      setError('Error uploading image.');
    }
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setError('');
  };

  const handleImageDelete = async () => {
    const token = getAuthToken();
    if (!token) return;

    try {
      setLoading(true);
      const response = await axios.delete(
        `http://localhost:8090/journals/${journalId}/image/delete`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setLoading(false);
      if (response.status === 200) {
        setImageUrl(''); // Clear image URL
        alert('Image deleted successfully!');
      } else {
        setError('Failed to delete image.');
      }
    } catch (err) {
      setLoading(false);
      console.error('Error deleting image:', err);
      setError('Error deleting image.');
    }
  };

  return (
    <div className="container">
      <h2>Manage Journal Image</h2>
      <div className="card">
        <div className="card-header">
          <h5>Journal ID: {journalId}</h5>
        </div>
        <div className="card-body">
          <div className="mb-3">
            {imageUrl ? (
              <>
                <p>Image URL: <a href={imageUrl} target="_blank" rel="noopener noreferrer">{imageUrl}</a></p>
                <img
                  src={imageUrl}
                  alt="Journal"
                  className="img-fluid"
                  style={{ maxWidth: '100%', maxHeight: '300px', objectFit: 'contain' }}
                />
                <button onClick={handleImageDelete} className="btn btn-danger mt-3">
                  Delete Image
                </button>
              </>
            ) : (
              <p>No image uploaded for this journal.</p>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="imageUpload" className="form-label">
              Upload New Image
            </label>
            <input
              type="file"
              id="imageUpload"
              className="form-control"
              onChange={handleFileChange}
            />
            {error && <div className="text-danger mt-2">{error}</div>}
          </div>

          <div className="d-flex justify-content-between">
            <button
              onClick={handleImageUpload}
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Uploading...' : 'Upload Image'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JournalImageManager;
