import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth"; // Custom hook for checking authentication

export default function Home() {
  const [journals, setJournals] = useState([]);
  const navigate = useNavigate();
  const isAuthenticated = useAuth(); // Using the custom authentication hook

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login"); // Redirect to login page if not authenticated
    } else {
      loadJournals();
    }
  }, [isAuthenticated]);

  const loadJournals = async () => {
    try {
      const result = await axios.get("http://localhost:8090/journals", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Get token from localStorage
        },
      });
      setJournals(result.data);
    } catch (error) {
      console.error("Error loading journals:", error);
      alert("Failed to load journals. Please try again.");
    }
  };

  const deleteJournal = async (id) => {
    try {
      const token = localStorage.getItem("token"); // Get token if required
      await axios.delete(`http://localhost:8090/journals/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in request header
        },
      });
      loadJournals();
    } catch (error) {
      console.error("Error deleting journal:", error);
      alert("Failed to delete the journal. Please try again.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the token from localStorage
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="container">
      <div className="py-4">
        <button className="btn btn-danger mb-4" onClick={handleLogout}>
          Logout
        </button>
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">S.N</th>
              <th scope="col">Title</th>
              <th scope="col">Author</th>
              <th scope="col">Description</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {journals.map((journal, index) => (
              <tr key={journal.id}>
                <th scope="row">{index + 1}</th>
                <td>{journal.title}</td>
                <td>{journal.author}</td>
                <td>{journal.description}</td>
                <td>
                  <Link
                    className="btn btn-primary mx-2"
                    to={`/viewjournal/${journal.id}`}
                  >
                    View
                  </Link>
                  <Link
                    className="btn btn-outline-primary mx-2"
                    to={`/editjournal/${journal.id}`}
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => deleteJournal(journal.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
