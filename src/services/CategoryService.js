import axios from 'axios';

const TODO_API_BASE_URL = "https://todo-list-kn-203.herokuapp.com/api/category";

class CategoryService {

    getCategoryByUserId(id){
        return axios.get(TODO_API_BASE_URL + '/user_id/' + id);
    }

    getCategoryByUserIdForAdmin(id){
        return axios.get(TODO_API_BASE_URL + '/user_id/for_admin/' + id);
    }

    createCategory(name, id){
        return axios.post(TODO_API_BASE_URL + '/' + id, name);
    }

    deleteCategory(categoryId){
        return axios.get(TODO_API_BASE_URL + '/delete/' + categoryId);
    }

    toogleId(categoryId){
        return axios.get(TODO_API_BASE_URL + '/toggle/' + categoryId);
    }
}

export default new CategoryService()