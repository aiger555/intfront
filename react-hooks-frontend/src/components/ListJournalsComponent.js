// ListJournalsComponent.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ListJournalsComponent = () => {
  const [journals, setJournals] = useState([]);

  useEffect(() => {
    axios.get('/api/journals') // Adjust API endpoint if needed
      .then(response => setJournals(response.data))
      .catch(error => console.error('Error fetching journals:', error));
  }, []);

  const deleteJournal = (id) => {
    axios.delete(`/api/journals/${id}`)
      .then(() => setJournals(journals.filter(journal => journal.id !== id)))
      .catch(error => console.error('Error deleting journal:', error));
  };

  return (
    <div>
      <h2 className="text-center">Journals List</h2>
      <Link to="/add-journal" className="btn btn-primary">Add Journal</Link>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {journals.map(journal => (
            <tr key={journal.id}>
              <td>{journal.title}</td>
              <td>{journal.description}</td>
              <td>
                <Link to={`/edit-journal/${journal.id}`} className="btn btn-info">Edit</Link>
                <button onClick={() => deleteJournal(journal.id)} className="btn btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListJournalsComponent;
