import axios from 'axios';

const API_URL = 'https://localhost:44371/api/userprofiles';

export const getUserProfiles = () => {
    return axios.get(API_URL);
}

export const createUserProfile = (userProfile) => {
    return axios.post(API_URL, userProfile);
}

export const updateUserProfile = (userProfile) => {
    return axios.put(`${API_URL}/${userProfile.Id}`, userProfile);
}

export const getUser = (id) => {
    return axios.get(`${API_URL}/${id}`);
}

export const deleteUserProfile = (id) => {
    return axios.delete(`${API_URL}/${id}`);
}