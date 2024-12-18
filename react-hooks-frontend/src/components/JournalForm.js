import React, { useState, useEffect } from 'react';
import { createJournal, updateJournal } from '../services/api';

const JournalForm = ({ journal, onSave, token }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });

  // Populate form with journal data if editing an existing journal
  useEffect(() => {
    if (journal) {
      setFormData({
        title: journal.title,
        content: journal.content,
      });
    }
  }, [journal]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form data before submitting
    if (!formData.title || !formData.content) {
      alert('Please fill in both title and content');
      return;
    }

    try {
      if (journal) {
        // Update existing journal
        await updateJournal(journal.id, formData, token);
      } else {
        // Create new journal
        await createJournal(formData, token);
      }
      onSave();  // Callback after save to refresh the journal list
    } catch (error) {
      console.error('Error saving journal:', error);
      alert('Failed to save journal. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="journal-form">
      <div>
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter journal title"
        />
      </div>

      <div>
        <label htmlFor="content">Content:</label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          placeholder="Enter journal content"
        />
      </div>

      <button type="submit">Save</button>
    </form>
  );
};

export default JournalForm;
