import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function ViewJournal() {
  const [journal, setJournal] = useState({
    title: "",
    author: "",
    description: "",
    imageUrl: "", // Added imageUrl to hold the image URL
  });

  const { id } = useParams();

  useEffect(() => {
    loadJournal();
  }, []);

  const loadJournal = async () => {
    try {
      const result = await axios.get(`http://localhost:8090/journals/${id}`);
      setJournal(result.data); // Assuming the response contains the image URL
    } catch (error) {
      console.error("Error loading journal:", error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Journal Details</h2>

          <div className="card">
            <div className="card-header">
              Details of Journal ID: {journal.id}
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <b>Title:</b> {journal.title}
                </li>
                <li className="list-group-item">
                  <b>Content:</b> {journal.content}
                </li>
                <li className="list-group-item">
                  <b>Status:</b> {journal.status}
                </li>
                <li className="list-group-item">
                  <b>Favorite:</b> {journal.favorite ? "Yes" : "No"}
                </li>
                {/* Display image if it exists */}
                {journal.imageUrl && (
                  <li className="list-group-item">
                    <b>Image:</b>
                    <img
                      src={journal.imageUrl}
                      alt="Journal"
                      style={{ maxWidth: "100%", height: "auto" }}
                    />
                  </li>
                )}
              </ul>
            </div>
          </div>
          <Link className="btn btn-primary my-2" to="/">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
