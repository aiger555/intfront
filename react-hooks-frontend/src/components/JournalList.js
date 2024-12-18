import React, { useEffect, useState } from 'react';
import { getAllJournals } from '../services/api';

const JournalList = () => {
  const [journals, setJournals] = useState([]);

  useEffect(() => {
    const fetchJournals = async () => {
      const data = await getAllJournals();
      setJournals(data);
    };

    fetchJournals();
  }, []);

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
