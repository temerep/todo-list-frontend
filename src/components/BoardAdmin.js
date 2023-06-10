import React, { Component } from "react";
import { Form } from "react-bootstrap";
import UserService from "../services/UserService";
import EventBus from "../common/EventBus";
import TodoItemService from "../services/TodoItemService"
import AddTodo from "./AddTodo";
import TodoItem from "./TodoItem";

const styles = {
  ul: {
      listStyle: 'none',
      margin: '20px 0 0 0',
      padding: 0
  }
}

let globalId = 0;
export default class BoardAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      users: [],
      selectVal: 0,
      todos: [],
      currentId: 0
    };

    this.choosenUser = this.choosenUser.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.getTodosByUserIdForAdmin = this.getTodosByUserIdForAdmin.bind(this);
    this.toggleTodo = this.toggleTodo.bind(this);
  }

  componentDidMount() {
    UserService.getAdminBoard().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
    UserService.getAllUsers().then(res => {
      this.setState({ users: res.data })
    })
  }

  getTodosByUserIdForAdmin(){
    TodoItemService.getTodosByUserIdForAdmin(globalId).then(res => {
      this.setState({ todos: res.data }, () => {
      })
    })
  }

  choosenUser(val) {
    if(val !== 'No one'){
      globalId = this.state.users.find(it => it.username === val).id;
      this.getTodosByUserIdForAdmin()
    } else {
      this.setState({todos: []})
      globalId = 0;
    }
    
    this.setState({selectVal: val})
  }

  toggleTodo(id) {
    TodoItemService.toggleTodo(id).then(() =>{
      console.log('work', globalId)
      this.getTodosByUserIdForAdmin()
    }); 
}

addTodo(title, categoryId, todoDay) {
    TodoItemService.createTodo({ title, completed: false, user_id: globalId, category_id: categoryId, day: todoDay}).then(() =>{
      this.getTodosByUserIdForAdmin()
    }); 
}

  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>{this.state.content}</h3>
          <Form.Select className="mb-4 m-0" value={this.state.selectVal} onChange={(e) => this.choosenUser(e.target.value)}>
                <option key={0} value={'No one'}>No one</option>;
                {this.state.users.map((o) => {
                    const { username, id } = o;
                    return <option key={id} value={username}>{username}</option>;
                })}
          </Form.Select>
          <AddTodo onCreate= { this.addTodo } userId={globalId}></AddTodo>
            <ul style={styles.ul}>
                { this.state.todos.map((todo, index) => {
                    return <TodoItem todo={todo} key={todo.id} i={index} onChange={this.toggleTodo}/>
                }) }
            </ul>
        </header>
      </div>
    );
  }
}