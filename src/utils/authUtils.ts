import {jwtDecode} from "jwt-decode";

export const isAuthenticated = (): boolean => {
    const authState = localStorage.getItem('authState');
    return !!authState && JSON.parse(authState).isAuthenticated;
};

export const isAdmin = (): boolean => {
    const authState = localStorage.getItem('authState');
    return !!authState && JSON.parse(authState).isAuthenticated && JSON.parse(authState).user?.role === 'admin';
};