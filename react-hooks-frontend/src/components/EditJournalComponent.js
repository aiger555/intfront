import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import JournalService from '../services/JournalService';

const EditJournalComponent = () => {
    const { id } = useParams(); // Get journal ID from route params
    const history = useHistory();
    const [journal, setJournal] = useState({
        title: '',
        content: '',
        date: '',
        author: ''
    });

    useEffect(() => {
        JournalService.getJournalById(id).then((response) => {
            setJournal(response.data);
        }).catch(error => {
            console.error('Error fetching journal:', error);
        });
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setJournal({ ...journal, [name]: value });
    };

    const updateJournal = (e) => {
        e.preventDefault();
        JournalService.updateJournal(id, journal).then(() => {
            history.push('/journals');
        }).catch(error => {
            console.error('Error updating journal:', error);
        });
    };

    return (
        <div className="container">
            <h2>Edit Journal</h2>
            <form onSubmit={updateJournal}>
                <div className="form-group">
                    <label>Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={journal.title}
                        onChange={handleInputChange}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Content:</label>
                    <textarea
                        name="content"
                        value={journal.content}
                        onChange={handleInputChange}
                        className="form-control"
                    ></textarea>
                </div>
                <div className="form-group">
                    <label>Date:</label>
                    <input
                        type="date"
                        name="date"
                        value={journal.date}
                        onChange={handleInputChange}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Author:</label>
                    <input
                        type="text"
                        name="author"
                        value={journal.author}
                        onChange={handleInputChange}
                        className="form-control"
                    />
                </div>
                <button type="submit" className="btn btn-primary">Update</button>
            </form>
        </div>
    );
};

export default EditJournalComponent;
