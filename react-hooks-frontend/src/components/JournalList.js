import React, { useEffect, useState } from 'react';
import { getAllJournals, createJournal, updateJournal, deleteJournal } from '../services/api';
import { Redirect } from 'react-router-dom';

const JournalList = () => {
  const [journals, setJournals] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [newJournalTitle, setNewJournalTitle] = useState('');
  const [newJournalContent, setNewJournalContent] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
      const fetchJournals = async () => {
        try {
          const data = await getAllJournals();
          setJournals(data);
        } catch (error) {
          console.error('Error fetching journals:', error);
        }
      };

      fetchJournals();
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  if (isAuthenticated === false) {
    return <Redirect to="/login" />;
  }

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  // Handle create journal
  const handleCreateJournal = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('authToken');
    if (!newJournalTitle || !newJournalContent) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const newJournal = { title: newJournalTitle, content: newJournalContent };
      const createdJournal = await createJournal(newJournal, token);
      setJournals((prevJournals) => [...prevJournals, createdJournal]);
      setNewJournalTitle('');
      setNewJournalContent('');
    } catch (error) {
      console.error('Error creating journal:', error);
    }
  };

  // Handle update journal
  const handleUpdateJournal = async (id, updatedTitle, updatedContent) => {
    const token = localStorage.getItem('authToken');
    try {
      const updatedJournal = await updateJournal(id, { title: updatedTitle, content: updatedContent }, token);
      setJournals((prevJournals) =>
        prevJournals.map((journal) =>
          journal.id === id ? { ...journal, title: updatedTitle, content: updatedContent } : journal
        )
      );
    } catch (error) {
      console.error('Error updating journal:', error);
    }
  };

  // Handle delete journal
  const handleDeleteJournal = async (id) => {
    const token = localStorage.getItem('authToken');
    try {
      await deleteJournal(id, token);
      setJournals((prevJournals) => prevJournals.filter((journal) => journal.id !== id));
    } catch (error) {
      console.error('Error deleting journal:', error);
    }
  };

  return (
    <div>
      <h2>All Journals</h2>

      {/* Create Journal Form */}
      <form onSubmit={handleCreateJournal}>
        <h3>Create New Journal</h3>
        <input
          type="text"
          value={newJournalTitle}
          onChange={(e) => setNewJournalTitle(e.target.value)}
          placeholder="Enter journal title"
        />
        <textarea
          value={newJournalContent}
          onChange={(e) => setNewJournalContent(e.target.value)}
          placeholder="Enter journal content"
        />
        <button type="submit">Create Journal</button>
      </form>

      {/* Display Journals */}
      {journals.length === 0 ? (
        <p>No journals available</p>
      ) : (
        <ul>
          {journals.map((journal) => (
            <li key={journal.id}>
              <h3>{journal.title}</h3>
              <p>{journal.content}</p>

              {/* Update Journal */}
              <button
                onClick={() => {
                  const updatedTitle = prompt('Enter new title', journal.title);
                  const updatedContent = prompt('Enter new content', journal.content);
                  if (updatedTitle && updatedContent) {
                    handleUpdateJournal(journal.id, updatedTitle, updatedContent);
                  }
                }}
              >
                Update
              </button>

              {/* Delete Journal */}
              <button onClick={() => handleDeleteJournal(journal.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default JournalList;
