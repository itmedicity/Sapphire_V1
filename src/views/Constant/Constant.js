// import { axioslogin } from "../Axios/Axios";

export const API_URL = 'http://192.168.10.132:3000/api';
// export const API_URL = 'http://localhost:5000/api';

export const userslno = () => {
    const userinfo = sessionStorage.getItem('userDetl');
    const UserSlno = userinfo ? JSON.parse(sessionStorage.getItem('userDetl')).user_slno : 0;
    return UserSlno;
};

// export const getUserslo = async () => {
//     const result = await axioslogin.get('/commonCode/getuser')
//     const { success } = result.data;
//     const [serial_current] = result.data.data
//     if (success === 1) {
//         return serial_current.serial_current
//     }
// }

// export const getSerialnumberempnumber = async () => {
//     const result = await axioslogin.get('/common/getSerialnoempno')
//     const { success } = result.data;
//     const [serial_current] = result.data.data
//     if (success === 1) {
//         return serial_current.serial_current
//     }

// }
