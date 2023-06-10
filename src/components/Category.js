import React, { Component } from "react";
import UserService from "../services/UserService";
import EventBus from "../common/EventBus";
import ToggleSwitch from "./ToggleSwitch";
import CategoryService from "../services/CategoryService"
import TodoItem from './TodoItem'
import AddTodo from './AddTodo'
import TodoItemService from '../services/TodoItemService';
import { Button, Modal } from 'react-bootstrap';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";

const styles = {
    ul: {
        listStyle: 'none',
        margin: 0,
        padding: 0
    }
}

export default class BoardUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      options: [],
      todos: [],
      inputValue: '',
      show: false,
      showError: false,
      choosenId: 0,
      mainText: 'All categories',
      categoryId: 0,
      generalTodos: []
    };

    this.onChange = this.onChange.bind(this);
    this.getTodosByUserId = this.getTodosByUserId.bind(this)
    this.toggleTodo = this.toggleTodo.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.getInputValue = this.getInputValue.bind(this);
    this.onToogle = this.onToogle.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  regExp = RegExp(
    /^[a-zA-Z0-9 ]*$/
  )

  validName = value => {
    if (value.trim() && !this.regExp.test(value)) {
      return (
        <div className="alert alert-danger" role="alert">
          This is not a valid name.
        </div>
      );
    }
  };

  componentDidMount() {
    UserService.getUserBoard().then(
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
    this.getCategoryByUserId();
    this.getTodosByUserId()
  }

  toggleTodo(id) {
    TodoItemService.toggleTodo(id).then(() =>{
      if(this.state.mainText === 'All categories'){
        this.getTodosByUserId()
      } else {
        this.getNewTodosByUserId()
      }
    });
  }

  addTodo(title, categoryId, todoDay) {
    const userId = JSON.parse(localStorage.getItem('user')).id;
    TodoItemService.createTodo({ title, completed: false, user_id: userId, category_id: categoryId, day: todoDay}).then(() =>{
      if(this.state.mainText === 'All categories'){
        this.getTodosByUserId()
      } else {
        this.getNewTodosByUserId()
      }
    }); 
  }

  getNewTodosByUserId() {
    const id = JSON.parse(localStorage.getItem('user')).id;
      TodoItemService.getTodosByUserId(id).then(res => {
        if(this.state.mainText !== 'WithoutCategory'){
          this.setState({
            todos: res.data.filter(it => it.category && it.category.name === this.state.mainText)})
        } else if(this.state.mainText === 'WithoutCategory'){
          this.setState({
            todos: res.data.filter(it => it.category === null)})
        }
    })
  }

  getTodosByUserId() {
    const id = JSON.parse(localStorage.getItem('user')).id;
      TodoItemService.getTodosByUserId(id).then(res => {
        this.setState({ todos: res.data })
        this.setState({ generalTodos: res.data })
    })
  }

  onChange(i){
    if(i){
        this.setState({
            todos: this.state.generalTodos.filter(it => it.category && it.category.name === i)})
        this.setState({mainText: i})
    } else {
      this.setState({
        todos: this.state.generalTodos.filter(it => it.category === null)})
      this.setState({mainText: 'WithoutCategory'})
    }
  }

  onDelete(id){
    CategoryService.deleteCategory(id).then(() =>{
        this.getCategoryByUserId()
        this.getTodosByUserId()
        window.location.reload();
    }); 
    this.setState({todos: this.state.generalTodos})
    this.setState({showError: false})
  }

  getCategoryByUserId(){
    const id = JSON.parse(localStorage.getItem('user')).id;
    CategoryService.getCategoryByUserId(id).then(res => {
        this.setState({ options: res.data })
    });
  }

  submitHandler() {
    const id = JSON.parse(localStorage.getItem('user')).id;
    if (this.state.inputValue && this.regExp.test(this.state.inputValue)) {
        CategoryService.createCategory({name: this.state.inputValue}, id).then(() =>{
            this.getCategoryByUserId()
        }); 
        this.setState({ inputValue: ''})
        window.location.reload();
        this.hideModal()
    }
  }

  getInputValue = (event)=>{
    if(event){
        const userValue = event.target.value;
        this.setState({ inputValue: userValue})
    }
    };

  onToogle(categoryId){
    CategoryService.toogleId(categoryId).then(() =>{
      this.getCategoryByUserId()
    }); 
  }

  hideModal(){
    this.setState({ inputValue: ''})
    this.setState({show: false});
  }

  messageError(objId){
    this.setState({showError: true});
    this.setState({choosenId: objId})
  }

  onChangeAllCategories(){
    this.getTodosByUserId()
    this.setState({todos: this.state.generalTodos})
    this.setState({mainText: 'All categories'})
  }

  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          <h3 className="title">Categories</h3>
        </header>
        <div className="mob-d-flex">
            <div>
              <button className="btn btn-dark btn-block btn-category" onClick={() => this.setState({show: true})}>Add Category</button>
              <div>
                <button 
                  className={
                    (this.state.mainText === 'All categories')
                        ? "category-button choosen-category"
                        : "category-button"
                  }
                  onClick={() => this.onChangeAllCategories()}>All categories</button>
                <button className={
                    (this.state.mainText === 'WithoutCategory')
                        ? "category-button choosen-category"
                        : "category-button"
                  } onClick={() => this.onChange(null)}>WithoutCategory</button>
                { this.state.options.map((obj) => {
                    return (
                    <div 
                      key={obj.id} 
                      className={
                        (this.state.mainText === obj.name)
                            ? "d-flex category-button align-items-center justify-content-between choosen-category"
                            : "d-flex category-button align-items-center justify-content-between"
                      }
                      onClick={() => this.onChange(obj.name)}>
                      <div>{obj.name}</div>
                      <div className="d-flex align-items-center justify-content-around position-relative">
                        <button onClick={() => this.messageError(obj.id)} className="cross-button">&#x2715;</button>
                        <ToggleSwitch label={obj.name} categoryId={obj.id} open={obj.open} onChange={() => this.onToogle(obj.id)}/><br />
                      </div>
                    </div>)
                }) }
              </div>
            </div>
            <div className="w-65">
                <h6>{ this.state.mainText }</h6>
                <AddTodo onCreate= { this.addTodo } userId={0}></AddTodo>
                <ul style={styles.ul}>
                    { this.state.todos.map((todo, index) => {
                        return <TodoItem todo={todo} key={todo.id} i={index} onChange={this.toggleTodo}/>
                    }) }
                </ul>
            </div>
        </div>
        <Modal show={this.state.show} onHide={this.hideModal}>
          <Modal.Header closeButton>
            <Modal.Title>Add category</Modal.Title>
          </Modal.Header>
          <Form>
            <Modal.Body>
              <Input className="form-control" onChange={(e) => this.getInputValue(e)} value= {this.state.inputValue} placeholder="Name of category" validations={[this.validName]}/>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary w-auto" onClick={this.hideModal}>
                Close
              </Button>
              <Button variant="dark w-auto" onClick={this.submitHandler}>
                Add
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
        <Modal show={this.state.showError} onHide={() => this.setState({showError: false})}>
          <div className="p-4">Are you sure to delete the category? If you delete the category, all connected todos will be deleted also.</div>
          <Modal.Footer>
              <Button variant="secondary w-auto" onClick={() => this.setState({showError: false})}>
                Close
              </Button>
              <Button variant="danger w-auto" onClick={() => this.onDelete(this.state.choosenId)}>
                Delete
              </Button>
            </Modal.Footer>
        </Modal>
      </div>
    );
  }
}