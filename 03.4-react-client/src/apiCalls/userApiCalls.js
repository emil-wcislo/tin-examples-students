import axios from 'axios';

const usersBaseURL = 'http://localhost:3001/api/users';
const defaultRequestHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    mode: 'no-cors',
};

export const getUserListCall = () => {
    const promise = axios.get(usersBaseURL, {
        headers: defaultRequestHeaders
    });
    return promise;
}

export const getUserDetailsCall = (userId) => {
    const url = `${usersBaseURL}/${userId}`;
    const promise = axios.get(url, { headers: defaultRequestHeaders });
    return promise;
}

export const createUserCall = (user) => {
    const promise = axios.post(usersBaseURL, user, { headers: defaultRequestHeaders });
    return promise;
};

export const updateUserCall = (user) => {
    const promise = axios.put(`${usersBaseURL}/${user.id}`, user, { headers: defaultRequestHeaders });
    return promise;
}

export const deleteUserCall = (userId) => {
    const promise = axios.delete(`${usersBaseURL}/${userId}`, { headers: defaultRequestHeaders });
    return promise;
}
