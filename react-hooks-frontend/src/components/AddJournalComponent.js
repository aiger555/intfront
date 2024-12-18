// AddJournalComponent.js
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const AddJournalComponent = () => {
  const [journal, setJournal] = useState({ title: '', description: '' });
  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJournal({ ...journal, [name]: value });
  };

  const saveJournal = (e) => {
    e.preventDefault();
    axios.post('/api/journals', journal)
      .then(() => history.push('/journals'))
      .catch(error => console.error('Error saving journal:', error));
  };

  return (
    <div>
      <h2 className="text-center">Add Journal</h2>
      <form>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            className="form-control"
            value={journal.title}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            className="form-control"
            value={journal.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <button className="btn btn-success" onClick={saveJournal}>Save</button>
      </form>
    </div>
  );
};

export default AddJournalComponent;
