import React, { Component } from "react";
import './List.css';


 
class List extends Component {

    render() {
        let doneCount = this.props.tasks.filter((task) => {
            return task.done
        })

        return (
            <div className="mainList">
                <div className="header">
                    <h3>"The most effective way to do it, is to do it."<br />
                        <p className="spanText">-Amelia Earhart</p> </h3>
                    <form onSubmit={(this.props.addTask)}>
                        <input className="textBox" 
                            name="todoInput" 
                            placeholder=" Enter a task"
                        />
                        <div className="buttons">
                            <button className=" btn addBtn" type="submit"> Add +</button>
                            {(doneCount.length > 0) && (
                                <button className="btn clearBtn" onClick={this.props.clearDoneTasks} >Clear</button>
                            )
                            }
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default List;