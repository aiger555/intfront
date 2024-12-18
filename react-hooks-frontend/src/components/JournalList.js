import React, { useEffect, useState } from 'react';
import { getAllJournals } from '../services/api';
import { Redirect } from 'react-router-dom';

const JournalList = () => {
  const [journals, setJournals] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setIsAuthenticated(false);
    } else {
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
    }
  }, []);

  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <h2>All Journals</h2>
      <ul>
        {journals.map((journal) => (
          <li key={journal.id}>
            <h3>{journal.title}</h3>
            <p>{journal.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JournalList;
