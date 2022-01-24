import React from "react";

export const UserContext = React.createContext({
    userId: null,
    setUserId: () => {},
});

export const generateRandomColor = () => `#${((1 << 24) * Math.random() | 0).toString(16)}`

export const containsObject = ({ offsetX, offsetY }, list) => {
    return list.some(({ offsetX: x, offsetY: y }) => offsetX === x && offsetY === y)
}

export const validateFields = (user) => {
    const { email } = user;
    const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    let errorMsg = '';
    if (Object.values(user).some((field) => !field)) {
        errorMsg = 'All Fields are required';
    } else if (!reg.test(email)) {
        errorMsg = 'Email is invalid';
    }
    return errorMsg;
}

export const getSessionValues = () => sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : {};

export const setSessionValues = (object) => sessionStorage.setItem('user', JSON.stringify(object));

export const clearSessionValues = () => sessionStorage.clear();

