import React, { useState } from 'react';
import { createJournal, updateJournal } from '../services/api';

const JournalForm = ({ journal, onSave, token }) => {
  const [formData, setFormData] = useState({
    title: journal ? journal.title : '',
    content: journal ? journal.content : '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (journal) {
      await updateJournal(journal.id, formData, token);
    } else {
      await createJournal(formData, token);
    }
    onSave();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
      </label>
      <label>
        Content:
        <textarea
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
        />
      </label>
      <button type="submit">Save</button>
    </form>
  );
};

export default JournalForm;
