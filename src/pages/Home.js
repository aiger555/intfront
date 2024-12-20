import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import {jwtDecode} from "jwt-decode"; // Corrected import

export default function Home() {
  const [journals, setJournals] = useState([]);
  const navigate = useNavigate();

  // Function to load journals for the authenticated user
  const loadJournals = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const decodedToken = jwtDecode(token);
      const userEmail = decodedToken.sub;
      if (!userEmail) {
        navigate("/login");
        return;
      }

      const result = await axios.get(`http://localhost:8090/journals?userEmail=${userEmail}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setJournals(result.data); // Set the fetched journals
    } catch (error) {
      console.error("Error loading journals:", error);
      alert("Failed to load journals. Please try again.");
    }
  };

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Function to delete a journal
  const deleteJournal = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      await axios.delete(`http://localhost:8090/journals/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      loadJournals();
    } catch (error) {
      console.error("Error deleting journal:", error);
      alert("Failed to delete the journal. Please try again.");
    }
  };

  // Redirect to the Add Journal page
  const handleAddJournal = () => {
    navigate("/addjournal");
  };

  // Use effect to redirect if token exists or is expired
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      loadJournals();
    }
  }, [navigate]);

  return (
    <div className="container">
      <div className="py-4">
        <button className="btn btn-danger mb-4" onClick={handleLogout}>
          Logout
        </button>
        <button className="btn btn-success mb-4" onClick={handleAddJournal}>
          Add New Journal
        </button>
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">S.N</th>
              <th scope="col">Title</th>
              <th scope="col">Content</th>
              <th scope="col">Status</th>
              <th scope="col">Favorite</th>
              <th scope="col">Image</th> {/* Column for displaying images */}
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {journals.map((journal, index) => (
              <tr key={journal.id}>
                <th scope="row">{index + 1}</th>
                <td>{journal.title}</td>
                <td>{journal.content}</td>
                <td>{journal.status}</td>
                <td>{journal.favorite ? "Yes" : "No"}</td>
                <td>
                  {journal.imageUrl ? (
                    <img
                      src={journal.imageUrl}
                      alt={journal.title}
                      className="img-thumbnail"
                      style={{ width: "100px", height: "100px" }}
                    />
                  ) : (
                    "No Image"
                  )}
                </td>
                <td>
                  <Link className="btn btn-primary mx-2" to={`/viewjournal/${journal.id}`}>
                    View
                  </Link>
                  <Link className="btn btn-outline-primary mx-2" to={`/editjournal/${journal.id}`}>
                    Edit
                  </Link>
                  <button className="btn btn-danger mx-2" onClick={() => deleteJournal(journal.id)}>
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
