import axios from 'axios';
import Cookies from 'js-cookie';
const token = Cookies.get('token');
console.log(token,'token api');


const api =  axios.create({
  baseURL:'http://localhost:3333',
  headers: {
    authorization: token,
  },
})

console.log(api.defaults.headers,' api');
 export default api;