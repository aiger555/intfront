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
      const token = localStorage.getItem("token"); // Get token from localStorage
      if (!token) {
        navigate("/login"); // Redirect to login if no token
        return;
      }

      // Decode the token to extract the user's email
      const decodedToken = jwtDecode(token);
      console.log("Decoded Token:", decodedToken); // Debugging - check the token contents

      const userEmail = decodedToken.sub; // Use the email (sub field) from the token
      if (!userEmail) {
        console.error("User email is missing in the token");
        navigate("/login");
        return;
      }

      // Fetch journals using the userEmail
      const result = await axios.get(`http://localhost:8090/journals?userEmail=${userEmail}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the request header
        },
      });

      setJournals(result.data); // Set the journals for the signed-in user
    } catch (error) {
      console.error("Error loading journals:", error);
      alert("Failed to load journals. Please try again.");
    }
  };

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the token from localStorage
    navigate("/login"); // Redirect to login page
  };

  // Function to delete a journal
  const deleteJournal = async (id) => {
    try {
      const token = localStorage.getItem("token"); // Get token from localStorage
      if (!token) {
        navigate("/login"); // Redirect to login if no token
        return;
      }

      await axios.delete(`http://localhost:8090/journals/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in request header
        },
      });

      loadJournals(); // Reload journals after deletion
    } catch (error) {
      console.error("Error deleting journal:", error);
      alert("Failed to delete the journal. Please try again.");
    }
  };

  // Function to redirect to the Add Journal page
  const handleAddJournal = () => {
    navigate("/addjournal");
  };

  // Use effect to redirect if token exists or is expired
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login"); // Redirect to login if not authenticated
    } else {
      loadJournals(); // Load journals if authenticated
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
