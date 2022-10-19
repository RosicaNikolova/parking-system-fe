import http from "../http-common";

const get = id => {
  return http.get(`/recipes/${id}`);
};
const getAll = () => {
  return http.get(`/recipes/all`);
};


const RecipesService = {
    get,
    getAll,
  };
export default RecipesService;