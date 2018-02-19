import React, { Component } from "react";
import IndvTasks from "../Tasks/IndvTasks";
import './List.css';



class List extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            tasks: [] //adding an empty array as state object, this is what the setState needs to update
        };
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

    addTask = (formSubmitEvent) => {
        formSubmitEvent.preventDefault(); // blocking form's default behaviour of refreshing the page upon submiting the form
        let newTaskArr = [...this.state.tasks]; // using array spread syntax to make copy of tasks array where all added tasks will be added

        if (this.userInput.value.trim() !== "") { // conditional to check whether input field has string; use trim to remove whitespace at beginning and end of input.
            const newTask = {
                title: this.userInput.value,
                key: Date.now(),
                done: false
            };

            newTaskArr.unshift(newTask); // adding a new task (an object made up of three keys) to the end of the tasks array

            this.setState({
                tasks: newTaskArr
            });

            this.userInput.value = ""; // clears the add task input from input field for better user experience.
            console.log(`added ${newTask.title} to list`);
        }
    }

    clearDone = (event) => {
        console.log('clear function being called')

        let newTaskArr = this.state.tasks.filter((task) => { //creating a new array with filtered tasks, where all tasks marked true will be filtered into.
            if (!task.done) {
                return task;
            }
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
            <div className="mainList">
                <div className="header">
                    <h3>"The most effective way to do it, is to do it."<br />
                    <p className="spanText">-Amelia Earhart</p> </h3>
                    <form onSubmit={this.addTask}>
                        <input className="textBox" ref={(a) => this.userInput = a} placeholder="enter task" />
                        <div className="buttons">
                        <button className=" btn addBtn" type="submit"> Add Task </button>
                        <button className="btn clearBtn" onClick={this.clearDone} >Clear Task</button>
                        </div>
                    </form>
                    
                </div>
                <IndvTasks
                    tasks={this.state.tasks}
                    toggleHandler={this.toggleTask}/>
            </div>
        );
    }
}

export default List;