import axios from 'axios'
const http=axios.create({
     baseURL:'http://49.235.105.91:8081/'
      // baseURL:'http://192.168.2.118:8081'
})
export default http