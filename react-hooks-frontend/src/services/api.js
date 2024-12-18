import axios from 'axios';

const API_URL = 'http://localhost:8090/journals';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Get all journals
export const getAllJournals = async () => {
    const token = localStorage.getItem("authToken"); // Retrieve token from localStorage
    if (!token) {
      throw new Error("User not authenticated. Please log in.");
    }
  
    try {
      const response = await fetch("http://localhost:8090/journals", {
        headers: {
          Authorization: `Bearer ${token}`, // Add the token to the Authorization header
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      return await response.json(); // Assuming the API returns JSON
    } catch (error) {
      console.error("API error:", error);
      throw error; // Rethrow the error to handle it in the component
    }
  };
  

// Get a single journal by ID
export const getJournalById = async (id) => {
  try {
    const response = await api.get(`/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching journal by ID', error);
  }
};

// Create a new journal
export const createJournal = async (journal, token) => {
  try {
    const response = await api.post('/create', journal, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating journal', error);
  }
};

// Update an existing journal
export const updateJournal = async (id, journal, token) => {
  try {
    const response = await api.put(`/update/${id}`, journal, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating journal', error);
  }
};

// Delete a journal
export const deleteJournal = async (id, token) => {
  try {
    await api.delete(`/delete/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.error('Error deleting journal', error);
  }
};

// Get favorite journals
export const getFavoriteJournals = async (token) => {
  try {
    const response = await api.get('/favorites', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching favorite journals', error);
  }
};

export const registerUser = async (userData) => {
    try {
      const response = await fetch('http://localhost:8090/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to register');
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error during registration:', error);
      throw error;
    }
  };
  
  
  export const loginUser = async (email, password, history) => {
    try {
      const response = await fetch("http://localhost:8090/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        throw new Error("Login failed");
      }
  
      const data = await response.json();
      localStorage.setItem("authToken", data.token); // Store token in localStorage
      history.push("/journals"); // Redirect to journals page
  
      return data; // Assuming the API returns the user data and token
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  };
  
  