import React, {useEffect, useState} from "react";
import PropTypes from 'prop-types'
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

function useInputValue(defaultValue = '') {
    const [value, setValue] = useState(defaultValue)

    return {
        bind: {
            value,
            onChange: event => setValue(event.target.value)
        },
        clear: () => setValue(''),
        value: () => value
    }
}

function AddTodo({ onCreate, userId }){
    const [val, setVal] = useState(0);
    const [options, setOptions] = useState([]);
    const [day, setDay] = useState('');
    const input = useInputValue('');
    const id = JSON.parse(localStorage.getItem('user')).id;

    useEffect(() => {
        if(userId === 0){
            CategoryService.getCategoryByUserId(id).then(res => {
                setOptions(res.data)
            })
        } else {        
            CategoryService.getCategoryByUserIdForAdmin(userId).then(res => {
                setOptions(res.data)
            })
        }
    }, [userId]);

    function submitHandler(event) {
        event.preventDefault()

        if (input.value().trim() && regExp.test(input.value()) && !checkDate(day)) {
            onCreate(input.value(), val, day)
            input.clear()
            setDay('')
        }
    }

    return (
        <Form onSubmit={submitHandler}>
            <div className="form-group">
                <Input className="form-control"
                name="name"
                placeholder="Name of todo"
                validations={[validName]}
                {...input.bind} />      
            </div>
            <div className="mob-d-flex">
                <Input value={day} onChange={(e) => setDay(e.target.value)} type="date" id="time" name="time" className="mar-right time-input" validations={[validTime]}/>
                <ReactBootstrap.Form.Select className="mar-right" value={val} onChange={(e) => setVal(e.target.value)}>
                    <option key={0} value={0}>WithoutCategory</option>
                    {options.map((o) => {
                        const { name, id } = o;
                        return <option key={id} value={id}>{name}</option>;
                    })}
                </ReactBootstrap.Form.Select>
                <button className="btn btn-dark btn-block" type="submit">Add</button>
            </div>
        </Form>
    )
}

AddTodo.propTypes = {
    onCreate: PropTypes.func.isRequired
}

export default AddTodo