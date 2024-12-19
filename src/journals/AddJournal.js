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

  const { title, content, status, favorite } = journal;

  const onInputChange = (e) => {
    const value = e.target.name === "favorite" ? e.target.checked : e.target.value;
    setJournal({ ...journal, [e.target.name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const authHeader = "Bearer " + localStorage.getItem("token"); // Assuming JWT is stored in localStorage
      await axios.post(
        "http://localhost:8090/journals/create",
        journal,
        { headers: { Authorization: authHeader } }
      );
      navigate("/");
    } catch (error) {
      console.error("Error creating journal:", error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Add New Journal</h2>

          <form onSubmit={(e) => onSubmit(e)}>
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
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
