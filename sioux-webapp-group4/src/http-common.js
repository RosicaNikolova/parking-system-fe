import axios from "axios";

export default axios.create({
  baseURL: BaseUrl.baseUrl+"/",
  headers: {
    "Content-type": "application/json"
  }
});