import axios from "axios";
import BaseUrl from "../services/BaseUrl";

export default axios.create({
  baseURL: BaseUrl.baseUrl
});