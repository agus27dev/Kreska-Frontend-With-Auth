//import axios
import axios from 'axios'

const Api = axios.create({
    //set default endpoint API
    baseURL: 'https://kreska-backend.ceketer.com/api'
})

export default Api