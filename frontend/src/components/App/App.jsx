import React, { Component } from 'react';
import './App.css';
import List from '../List/List';
import IndvTasks from '../Tasks/IndvTasks'
import axios from 'axios'

class App extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      tasks: []
    };
  }

  componentWillMount() {
    axios.get ("http://localhost:8080/")
      .then((response) =>{
            this.setState({
      tasks: response.data
    })
      })
  }

  componentDidUpdate() {
    localStorage.setItem("TaskList", JSON.stringify(this.state.tasks))

  }


  addTask = (event) => {
    event.preventDefault()
    if (event.target.todoInput.value.trim() !== "") {
    axios.post("http://localhost:8080/tasks", {
      title: event.target.todoInput.value,
      done: false,
    })
    
   
      .then((response) => {
        this.setState({
          tasks: this.state.tasks.concat(response.data) //updating state to add retrieved data onto the array of tasks. replacing previous code, where new task was delcared and then pushed onto array.
        })
      })
      .catch((error) => {
        console.log(error)
      })
    event.target.todoInput.value = ""
    }
  }


  toggleTask = (taskIndex) => {

    let newTaskArr = [...this.state.tasks];
    const task = newTaskArr[taskIndex];

    axios.post("http://localhost:8080/update", {
      id: task.id,
      done: !task.done,
    })
      .then((response) => {
        this.setState({
          tasks: response.data
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }


  clearDone = (event) => {
    event.preventDefault()
    let newTaskArr = this.state.tasks.filter((task) => {
      return !task.done
    });
    axios.get("http://localhost:8080/clear")
      .then((response) => {
        this.setState({
          tasks: newTaskArr
        });
      })





  }


  render() {
    return (
      <div className="App">
        <h1>Your To-Do List</h1>
        <List
          clearDoneTasks={this.clearDone}
          tasks={this.state.tasks}
          addTask={this.addTask}
        />
        <IndvTasks
          tasks={this.state.tasks}
          toggleHandler={this.toggleTask} />
      </div>
    );
  }
}

export default App;
