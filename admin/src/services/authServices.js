import axios from "axios"
import { BASE_URL } from "../utils/utils"

function authServices() {

    // login user
    this.loginUser = async (body) => await axios.post(BASE_URL + '/auth/', body);

    // register user
    this.registerApi = async (body) => await axios.post(BASE_URL + '/auth/register', body)
}

export default new authServices();