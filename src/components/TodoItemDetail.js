import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom"; 
import TodoItemService from "../services/TodoItemService";
import CategoryService from "../services/CategoryService";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import * as ReactBootstrap from "react-bootstrap";

const regExp = RegExp(
    /^[a-zA-Z0-9 ]*$/
)

const validName = value => {
    if (value.trim() && !regExp.test(value)) {
      return (
        <div className="alert alert-danger" role="alert">
          This is not a valid name.
        </div>
      );
    }
  };

  
function checkDate(day){
    const today = new Date();
    today.setDate(today.getDate() - 1)
    return new Date(day).getTime() < today.getTime();
}

const validTime = day =>{
    if(checkDate(day)) {
        return (
            <div className="alert alert-danger" role="alert">
              This is not a valid day.
            </div>
          );
    }
}

function TodoItemDetail() {
    const [todo, setTodo] = useState({});
    const [time, setTime] = useState('');
    const todoId = useParams().id;
    const [val, setVal] = useState('');
    const [text, setText] = useState('');
    const [options, setOptions] = useState([]);

    useEffect(() => {
        TodoItemService.getTodoById(todoId).then(res => {
            setTodo(res.data);
            setText(res.data.title);
            res.data.day ? setTime(res.data.day) : setTime('');
            res.data.category ? setVal(res.data.category.id) : setVal(0);
            getCategories(res.data.user.id)
        });
    }, []);

    function getCategories(userId){
        const id = JSON.parse(localStorage.getItem('user')).id;
        if(JSON.parse(localStorage.getItem('user')).roles === "[ROLE_ADMIN]"){
            CategoryService.getCategoryByUserIdForAdmin(userId).then(res => {
                setOptions(res.data)
                console.log("work", userId)
            })
        } else {
            CategoryService.getCategoryByUserId(id).then(res => {
                setOptions(res.data)
            })   
        }   
    }

    function deleteTodo(){
        TodoItemService.deleteTodo(todoId).then(() => {
            window.location.href = "/category"
        })
    }

    function editTodo(event){
        event.preventDefault()
        const userId = JSON.parse(localStorage.getItem('user')).id;
        if(text && regExp.test(text) && !checkDate(time)){
            TodoItemService.editTodo({ id: todoId, title: text, completed: false, user_id: userId, category_id: val, day: time}).then(() => {
                window.location.href = "/category"
            })
        }
    }

    return(
        <Form className="container"><p className="title">Todo Item Detail</p>
        <Input className="form-control" value={text} type="text" id="text" name="text" onChange={(e) => setText(e.target.value)} validations={[validName]}/>
        <div className="mob-d-flex">
            <Input value={time} type="date" id="time" name="time" onChange={(e) => setTime(e.target.value)} className="mar-right time-input" validations={[validTime]}/>
            <ReactBootstrap.Form.Select className="mar-right" value={val} onChange={(e) => setVal(e.target.value)}>
                <option key={0} value={0}>WithoutCategory</option>
                {options.map((o) => {
                    const { name, id } = o;
                    return <option key={id} value={id}>{name}</option>;
                })}
            </ReactBootstrap.Form.Select>
            <button className="btn btn-dark btn-block mar-right" onClick={editTodo}>Edit</button>
            <button className="btn btn-dark btn-block" onClick={deleteTodo}>Delete</button>
        </div>
        </Form>
    )
}

export default TodoItemDetail