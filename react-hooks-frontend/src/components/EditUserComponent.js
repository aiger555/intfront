import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import UserService from '../services/UserService';

const EditUserComponent = () => {
    const { id } = useParams(); // Get user ID from route params
    const history = useHistory();
    const [user, setUser] = useState({
        username: '',
        email: '',
        role: ''
    });

    useEffect(() => {
        UserService.getUserById(id).then((response) => {
            setUser(response.data);
        }).catch(error => {
            console.error('Error fetching user:', error);
        });
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const updateUser = (e) => {
        e.preventDefault();
        UserService.updateUser(id, user).then(() => {
            history.push('/users');
        }).catch(error => {
            console.error('Error updating user:', error);
        });
    };

    return (
        <div className="container">
            <h2>Edit User</h2>
            <form onSubmit={updateUser}>
                <div className="form-group">
                    <label>Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={user.username}
                        onChange={handleInputChange}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleInputChange}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Role:</label>
                    <select
                        name="role"
                        value={user.role}
                        onChange={handleInputChange}
                        className="form-control"
                    >
                        <option value="USER">User</option>
                        <option value="ADMIN">Admin</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Update</button>
            </form>
        </div>
    );
};

export default EditUserComponent;
