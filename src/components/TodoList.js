import React, { Component } from 'react'
import TodoItem from './TodoItem'
import AddTodo from './AddTodo'
import TodoItemService from '../services/TodoItemService';

const styles = {
    ul: {
        listStyle: 'none',
        margin: 0,
        padding: 0
    }
}

class TodoList extends Component{

    constructor(props) {
        super(props)
        this.state = {
            isMyDay: false,
            todos: [],
            message: null
        }
        this.toggleTodo = this.toggleTodo.bind(this);
        this.addTodo = this.addTodo.bind(this);
    }

    componentDidMount() {
        this.getTodosByUserIdForToday();
        console.log(this.state.todos)
    }


    getTodosByUserIdForToday(){
        const id = JSON.parse(localStorage.getItem('user')).id;
        TodoItemService.getTodosByUserIdForToday(id).then(res => {
            this.setState({ todos: res.data })
        })
    }

    toggleTodo(id) {
        TodoItemService.toggleTodo(id).then(() =>{
            this.getTodosByUserIdForToday();
        }); 
    }

    addTodo(title, categoryId, todoDay) {
        const userId = JSON.parse(localStorage.getItem('user')).id;
        TodoItemService.createTodo({ title, completed: false, user_id: userId, category_id: categoryId, day: todoDay}).then(() =>{
            this.getTodosByUserIdForToday();
        }); 
    }

    render () {
        return ( 
        <>
            <AddTodo onCreate= { this.addTodo } userId={0}></AddTodo>
            <ul style={styles.ul}>
                { this.state.todos.map((todo, index) => {
                    return <TodoItem todo={todo} key={todo.id} i={index} onChange={this.toggleTodo}/>
                }) }
            </ul>
        </>
        )
    }
}

export default TodoList