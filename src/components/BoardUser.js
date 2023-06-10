import React, { Component } from "react";

import TodoList from "./TodoList";

export default class BoardUser extends Component {
  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          <h3 className="title">My day</h3>
        </header>
        <TodoList></TodoList>
      </div>
    );
  }
}