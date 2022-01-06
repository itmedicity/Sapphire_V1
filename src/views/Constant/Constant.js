export const API_URL = 'http://192.168.10.132:3000/api';

export const userslno = () => {
    const userinfo = sessionStorage.getItem('userDetl');
    const UserSlno = userinfo ? JSON.parse(sessionStorage.getItem('userDetl')).user_slno : 0;
    return UserSlno;
};

export const COLOUR_ONE = '#ffebee'