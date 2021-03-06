import axios from 'axios';
import Cookies from 'js-cookie';
const token = Cookies.get('token');

const baseURL = `${process.env.NEXT_PUBLIC_BASE_URL}`;

const api =  axios.create({
  baseURL,
  headers: {
    authorization: token,
  },
})


export default api;