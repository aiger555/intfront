import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditJournal() {
  let navigate = useNavigate();
  const { id } = useParams();

  // State to store journal data
  const [journal, setJournal] = useState({
    title: "",
    content: "",
    status: "",
    favorite: false,
  });

  // State to handle image
  const [imageFile, setImageFile] = useState(null);

  const { title, content, status, favorite } = journal;

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setJournal((prevState) => ({
      ...prevState,
      [name]: name === "favorite" ? e.target.checked : value, // Handle boolean for 'favorite'
    }));
  };

  // Fetch journal details when component mounts
  useEffect(() => {
    loadJournal();
  }, []);

  const loadJournal = async () => {
    try {
      const result = await axios.get(`http://localhost:8090/journals/${id}`);
      setJournal(result.data); // Set the journal data to state
    } catch (error) {
      console.error("Error loading journal:", error);
      alert("Failed to load journal data.");
    }
  };

  // Handle image file change
  const onImageChange = (e) => {
    setImageFile(e.target.files[0]); // Update the state with the selected image file
  };

  // Submit the updated journal data
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token"); // Get token from localStorage
      if (!token) {
        navigate("/login"); // Redirect to login if no token
        return;
      }

      // First, upload the image if it exists
      if (imageFile) {
        const formData = new FormData();
        formData.append("file", imageFile);

        const uploadResponse = await axios.post(
          `http://localhost:8090/journals/${id}/upload`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        

        // Update journal object with the uploaded image URL
        if (uploadResponse.data.imageUrl) {
          journal.imageUrl = uploadResponse.data.imageUrl;
        }
      }

      // Update journal details
      await axios.put(`http://localhost:8090/journals/update/${id}`, journal, {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in request header
        },
      });

      navigate("/"); // Redirect after successful update
    } catch (error) {
      console.error("Error updating journal:", error);
      alert("Failed to update the journal. Please try again.");
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Edit Journal</h2>

          <form onSubmit={onSubmit}>
            {/* Title Field */}
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter journal title"
                name="title"
                value={title}
                onChange={onInputChange}
              />
            </div>

            {/* Content Field */}
            <div className="mb-3">
              <label htmlFor="content" className="form-label">
                Content
              </label>
              <textarea
                className="form-control"
                placeholder="Enter journal content"
                name="content"
                value={content}
                onChange={onInputChange}
              />
            </div>

            {/* Status Field */}
            <div className="mb-3">
              <label htmlFor="status" className="form-label">
                Status
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter journal status"
                name="status"
                value={status}
                onChange={onInputChange}
              />
            </div>

            {/* Favorite Field */}
            <div className="mb-3">
              <label htmlFor="favorite" className="form-label">
                Favorite
              </label>
              <input
                type="checkbox"
                className="form-check-input"
                name="favorite"
                checked={favorite}
                onChange={onInputChange}
              />
            </div>

            {/* Image Upload Field */}
            <div className="mb-3">
              <label htmlFor="image" className="form-label">
                Upload Image
              </label>
              <input
                type="file"
                className="form-control"
                name="image"
                onChange={onImageChange}
              />
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
