import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getJournalById } from '../services/api';

const JournalPage = () => {
  const [journal, setJournal] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchJournal = async () => {
      const data = await getJournalById(id);
      setJournal(data);
    };
    fetchJournal();
  }, [id]);

  if (!journal) return <div>Loading...</div>;

  return (
    <div>
      <h2>{journal.title}</h2>
      <p>{journal.content}</p>
    </div>
  );
};

export default JournalPage;
