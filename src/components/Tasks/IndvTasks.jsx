import React, { Component } from "react";
import './Tasks.css';

class IndvTasks extends Component {

    printTasks = (task, index) => { //targeting the index of the task that will be tracking the changes for.

        return (
            <div key={task.key}>
                <input type="checkbox" className="checkBox" checked={task.done} onChange={() => this.props.toggleHandler(index) } />
                {/* function above wrapped in brakets to prevent immedaiate invoking after page loads. */}
                <label className= "taskTitle"  key={ task.key } > { task.title }  </label>
            </div>
        )
    }

    render() {

        let tasksArr = this.props.tasks;
        console.log("tasksArr")

        let listItems = tasksArr.map(this.printTasks);

        return (
            <div>
                {listItems}
            </div>
        );
    }
};

export default IndvTasks;