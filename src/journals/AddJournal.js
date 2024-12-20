import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddJournal() {
  let navigate = useNavigate();

  const [journal, setJournal] = useState({
    title: "",
    content: "",
    status: "",
    favorite: false,
  });

  const [imageFile, setImageFile] = useState(null); // State for image file
  const [error, setError] = useState("");

  const { title, content, status, favorite } = journal;

  // Handle input changes for journal fields
  const onInputChange = (e) => {
    const value = e.target.name === "favorite" ? e.target.checked : e.target.value;
    setJournal({ ...journal, [e.target.name]: value });
  };

  // Handle file input change
  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
    setError("");
  };

  // Function to upload the image
  const uploadImage = async (journalId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const formData = new FormData();
    formData.append("file", imageFile);

    try {
      await axios.post(`http://localhost:8090/journals/${journalId}/upload`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image. Please try again.");
    }
  };

  // Handle form submission
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const authHeader = "Bearer " + localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8090/journals/create",
        journal,
        { headers: { Authorization: authHeader } }
      );

      const journalId = response.data.id; // Assuming the response contains the new journal ID

      // Upload the image if one is selected
      if (imageFile) {
        await uploadImage(journalId);
      }

      navigate("/"); // Navigate back to the home page
    } catch (error) {
      console.error("Error creating journal:", error);
      setError("Failed to create journal. Please try again.");
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Add New Journal</h2>

          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label htmlFor="Title" className="form-label">
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
            <div className="mb-3">
              <label htmlFor="Content" className="form-label">
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
            <div className="mb-3">
              <label htmlFor="Status" className="form-label">
                Status
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter status (e.g., Draft, Published)"
                name="status"
                value={status}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                name="favorite"
                checked={favorite}
                onChange={onInputChange}
              />
              <label className="form-check-label" htmlFor="Favorite">
                Mark as Favorite
              </label>
            </div>
            <div className="mb-3">
              <label htmlFor="Image" className="form-label">
                Upload Image
              </label>
              <input
                type="file"
                className="form-control"
                onChange={handleImageChange}
              />
              {error && <div className="text-danger mt-2">{error}</div>}
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
