import Cookies from "js-cookie";
import axios from "axios";

// const base_url = "https://service.edustar.com.vn"
const base_url = "http://localhost:8080";


const login_path = "/auth/login"


//Truoc khi call API
axios.interceptors.request.use((req) => {
    //Noi 2 url voi nhau
    const token = Cookies.get("token")
    const newUrl = base_url + req.url
    const Authorization =( login_path === req.url || req.url.startsWith("client")) ? undefined : `Bearer ${token}`
    return{
        ...req,
        url: newUrl,
        headers: {
            ...req.headers,
            Authorization,
            'ngrok-skip-browser-warning': '1'
        }
    }
})

//Sau khi co response tra ve
axios.interceptors.response.use((response) => {
    return response
}, (err) => {
    return Promise.reject(err)
})

export default axios
