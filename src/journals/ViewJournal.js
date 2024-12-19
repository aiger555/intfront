import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function ViewJournal() {
  const [journal, setJournal] = useState({
    title: "",
    author: "",
    description: "",
  });

  const { id } = useParams();

  useEffect(() => {
    loadJournal();
  }, []);

  const loadJournal = async () => {
    const result = await axios.get(`http://localhost:8090/journals/${id}`);
    setJournal(result.data);
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
                  <b>Author:</b> {journal.author}
                </li>
                <li className="list-group-item">
                  <b>Description:</b> {journal.description}
                </li>
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
