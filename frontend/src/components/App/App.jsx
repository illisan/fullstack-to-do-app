import React, { Component } from 'react';
import './App.css';
import List from '../List/List';
import IndvTasks from '../Tasks/IndvTasks'

class App extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      tasks: [] //adding an empty array as state object, this is what the setState needs to update
    };
  }

  //mounting only happens once so this will only take place at the beginning.
  componentWillMount () {
  let tasks = JSON.parse(localStorage.getItem('TaskList'))

   if (!tasks) tasks = this.props.tasks

   this.setState ({
     tasks,
   })
}

  componentDidUpdate () {
    localStorage.setItem("TaskList", JSON.stringify(this.state.tasks))
    
  }

  addTask = (event) => {
    event.preventDefault()
    console.log(event.target.todoInput.value)
    let addedTask = event.target.todoInput
    
    let newTaskArr = [...this.state.tasks]; // using array spread syntax to make copy of tasks array where all added tasks will be added

    if (addedTask.value.trim() !== "") { // conditional to check whether input field has string; use trim to remove whitespace at beginning and end of input.
      const newTask = {
        title: addedTask.value,
        key: Date.now(),
        done: false
      };

      newTaskArr.unshift(newTask); // adding a new task (an object made up of three keys) to the end of the tasks array

      this.setState({
        tasks: newTaskArr
      });

      addedTask.value = ""; // clears the add task input from input field for better user experience.
      console.log(`added ${newTask.title} to list`);
    }
  }

  toggleTask = (taskIndex) => {
    console.log("old task array:");
    console.log(this.state.tasks);
    let newTaskArr = [...this.state.tasks]; //using spread syntax to create a copy of the original tasks array.

    const task = newTaskArr[taskIndex];// declaring new task variable representing the tasks that will be added to the new array.
    const updatedTask = {
      title: task.title,
      key: Date.now(),
      done: !task.done
    }

    newTaskArr.splice(taskIndex, 1, updatedTask) // at the taskIndex position in the array, delete the 1 item currently there, and add updatedTask in its place
    console.log("new task array");
    console.log(newTaskArr);

    this.setState({
      tasks: newTaskArr
    })
  }


  clearDone = (event) => {
    console.log('clear function being called')

    let newTaskArr = this.state.tasks.filter((task) => {
      return !task.done
    });

    this.setState({
      tasks: newTaskArr
    });
    event.preventDefault()
    console.log('this is the new array')
    console.log(newTaskArr)
    console.log('running prevent default function')
  }


  render() {
    return (
      <div className="App">
        <h1>Your To-Do List</h1>
        {/* passing List & IndvTask components */}
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
