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
    const response = await api.get("/", {
      headers: {
        Authorization: `Bearer ${token}`, // Add the token to the Authorization header
      },
    });
    return response.data; // Return the list of journals
  } catch (error) {
    console.error("Error fetching journals:", error);
    throw error;
  }
};

// Get a single journal by ID
export const getJournalById = async (id) => {
  const token = localStorage.getItem("authToken");
  if (!token) {
    throw new Error("User not authenticated. Please log in.");
  }

  try {
    const response = await api.get(`/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Return the journal by ID
  } catch (error) {
    console.error("Error fetching journal by ID", error);
    throw error;
  }
};

// Create a new journal
export const createJournal = async (journal) => {
  const token = localStorage.getItem("authToken");
  if (!token) {
    throw new Error("User not authenticated. Please log in.");
  }

  try {
    const response = await api.post('/create', journal, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data; // Return the created journal
  } catch (error) {
    console.error('Error creating journal', error);
    throw error;
  }
};

// Update an existing journal
export const updateJournal = async (id, journal) => {
  const token = localStorage.getItem("authToken");
  if (!token) {
    throw new Error("User not authenticated. Please log in.");
  }

  try {
    const response = await api.put(`/update/${id}`, journal, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data; // Return the updated journal
  } catch (error) {
    console.error('Error updating journal', error);
    throw error;
  }
};

// Delete a journal
export const deleteJournal = async (id) => {
  const token = localStorage.getItem("authToken");
  if (!token) {
    throw new Error("User not authenticated. Please log in.");
  }

  try {
    await api.delete(`/delete/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.error('Error deleting journal', error);
    throw error;
  }
};

// Get favorite journals
export const getFavoriteJournals = async () => {
  const token = localStorage.getItem("authToken");
  if (!token) {
    throw new Error("User not authenticated. Please log in.");
  }

  try {
    const response = await api.get('/favorites', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data; // Return favorite journals
  } catch (error) {
    console.error('Error fetching favorite journals', error);
    throw error;
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
  
  