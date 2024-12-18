import axios from 'axios';

const USER_API_BASE_URL = "http://localhost:8090/api/users";

class UserService {
    getUsers() {
        return axios.get(USER_API_BASE_URL);
    }

    getUserById(id) {
        return axios.get(`${USER_API_BASE_URL}/${id}`);
    }

    updateUser(id, user) {
        return axios.put(`${USER_API_BASE_URL}/${id}`, user);
    }

    deleteUser(id) {
        return axios.delete(`${USER_API_BASE_URL}/${id}`);
    }
}

export default new UserService();
