import axios from 'axios'
const http=axios.create({
//      baseURL:'http://49.235.105.91:8081/'
       baseURL:'http://192.168.3.6:8082'
})
http.interceptors.request.use(function(config){
       config.headers.Authorization='Bearer '+ sessionStorage.getItem('token');
       return config
},function(err){
       return Promise.reject(err);
})
export default http