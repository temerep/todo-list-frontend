import axios from 'axios';

const TODO_API_BASE_URL = "https://todo-list-kn-203.herokuapp.com/api";

class TodoItemService {

    getTodos(){
        return axios.get(TODO_API_BASE_URL);
    }

    getTodosByUserId(id){
        return axios.get(TODO_API_BASE_URL + '/user_id/' + id);
    }

    getTodosByUserIdForAdmin(id){
        return axios.get(TODO_API_BASE_URL + '/user_id/for_admin/' + id);
    }

    getTodosByUserIdForToday(id){
        return axios.get(TODO_API_BASE_URL + '/user_id/today/' + id);
    }

    createTodo(todo){
        return axios.post(TODO_API_BASE_URL, todo);
    }

    editTodo(todo){
        return axios.post(TODO_API_BASE_URL + '/edit', todo);
    }

    deleteTodo(todoId){
        return axios.get(TODO_API_BASE_URL + '/delete/' + todoId);
    }

    getTodoById(todoId){
        return axios.get(TODO_API_BASE_URL + '/' + todoId);
    }

    toggleTodo(todoId){
        return axios.get(TODO_API_BASE_URL + '/toggle/' + todoId);
    }

}

export default new TodoItemService()