// AddUserComponent.js
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const AddUserComponent = () => {
  const [user, setUser] = useState({ name: '', email: '' });
  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const saveUser = (e) => {
    e.preventDefault();
    axios.post('/api/users', user)
      .then(() => history.push('/users'))
      .catch(error => console.error('Error saving user:', error));
  };

  return (
    <div>
      <h2 className="text-center">Add User</h2>
      <form>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={user.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={user.email}
            onChange={handleChange}
          />
        </div>
        <button className="btn btn-success" onClick={saveUser}>Save</button>
      </form>
    </div>
  );
};

export default AddUserComponent;
