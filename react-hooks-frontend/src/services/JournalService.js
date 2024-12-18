import axios from 'axios';

const JOURNAL_API_BASE_URL = "http://localhost:8090/journals";

class JournalService {
    getJournals() {
        return axios.get(JOURNAL_API_BASE_URL);
    }

    getJournalById(id) {
        return axios.get(`${JOURNAL_API_BASE_URL}/${id}`);
    }

    updateJournal(id, journal) {
        return axios.put(`${JOURNAL_API_BASE_URL}/${id}`, journal);
    }

    deleteJournal(id) {
        return axios.delete(`${JOURNAL_API_BASE_URL}/${id}`);
    }
}

export default new JournalService();
