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

  componentWillMount () {
  let tasks = JSON.parse(localStorage.getItem('TaskList'))

   if (!tasks) tasks = this.state.tasks

   this.setState ({
     tasks,
   })
}

  componentDidUpdate () {
    localStorage.setItem("TaskList", JSON.stringify(this.state.tasks))
    
  }
 

  addTask = (event) => {
    event.preventDefault()
    axios.post("http://localhost:8080/tasks", {
      title: event.target.todoInput.value, 
      done: false,
    })
    .then((response) => {

      this.setState({
        tasks: this.state.tasks.concat(response.data)
      })
    })
    .catch((error) => {
 
    })

  }

  toggleTask = (taskIndex) => {

    let newTaskArr = [...this.state.tasks]; 

    const task = newTaskArr[taskIndex];

    axios.post("http://localhost:8080/update",{
      id:task.id,
      done:!task.done,
    })
    .then((response)=>{
     this.setState({tasks:response.data})
    })
    .catch ((error)=>{
      console.log(error)
    })

  }


  clearDone = (event) => {
    axios.get("http://localhost:8080/clear")
    .then((response)=>{
      console.log(response.data)
    })

    let newTaskArr = this.state.tasks.filter((task) => {
      return !task.done
    });

    this.setState({
      tasks: newTaskArr
    });
    event.preventDefault()
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
