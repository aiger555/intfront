import React, { useEffect, useState } from "react";
import { getAllJournals } from "../services/api"; // Ensure this path is correct

const JournalList = () => {
  const [journals, setJournals] = useState([]); // State to hold journal data
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [error, setError] = useState(null); // State to manage errors

  useEffect(() => {
    const fetchJournals = async () => {
      try {
        const data = await getAllJournals();
        console.log("Fetched journals:", data); // Log for debugging
        setJournals(data || []); // Default to empty array if data is null/undefined
      } catch (err) {
        console.error("Error fetching journals:", err);
        setError("Failed to fetch journals. Please try again later.");
      } finally {
        setLoading(false); // Ensure loading is disabled after fetching
      }
    };

    fetchJournals();
  }, []);

  if (loading) return <p>Loading journals...</p>;
  if (error) return <p>{error}</p>;
  if (!journals.length) return <p>No journals found</p>;

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
