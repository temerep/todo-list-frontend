import React from "react";
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const styles = {
    li: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '.5rem 1rem',
        border: '1px solid #ccc',
        borderRadius: '4px',
        marginBottom: '.5rem'
    },
    input: {
        marginRight: '1rem'
    }
}

function TodoItem({ todo, i, onChange }) {
    let classes = 'd-flex align-items-center w-100 '

    if (todo.completed) {
        classes += 'done';
    }

    return(
        <li className="todo-item">
            <span className={classes}>
                <input type="checkbox" checked={todo.completed} style={styles.input} onChange={() => onChange(todo.id)}/>
                <Link to={"/todoitem/" + todo.id} className="d-flex align-items-center w-100 text-dark">
                    <div className="position-relative">
                        <p className="mb-0 w-space-nowrap">{ todo.title }</p> 
                        <p className="category-subtext">{todo.category ? todo.category.name : ''}</p>
                    </div>
                   <i>{todo.day ? todo.day : ''}</i>
                </Link>
            </span>
        </li>
    )
}

TodoItem.propTypes = {
    todo: PropTypes.object.isRequired,
    i: PropTypes.number,
    onChange: PropTypes.func.isRequired
}

export default TodoItem