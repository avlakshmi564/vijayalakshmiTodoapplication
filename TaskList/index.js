import {Component} from 'react'
import {v4 as uuidV4} from 'uuid'
import TaskItem from '../TaskItem'
import './index.css'

class TaskList extends Component {
  state = {
    taskList: [],
    taskInput: '',
    activeTask: false,
  }

  onChangeTaskInput = event => {
    this.setState({taskInput: event.target.value})
  }

  AddTask = () => {
    const {taskInput} = this.state

    const newTask = {
      uniqueNo: uuidV4(),
      taskInput,
      Active: false,
    }

    this.setState(prevState => ({
      taskList: [...prevState.taskList, newTask],
      taskInput: '',
    }))
  }

  onFilter = () => {
    const {activeTask} = this.state

    this.setState({activeTask: !activeTask})
  }

  deleteTask = uniqueNo => {
    const {taskList} = this.state

    const filteredTaskList = taskList.filter(each => each.uniqueNo !== uniqueNo)
    this.setState({taskList: filteredTaskList})
  }

  completedTask = uniqueNo => {
    this.setState(prevState => ({
      taskList: prevState.taskList.map(each => {
        if (uniqueNo === each.uniqueNo) {
          return {...each, Active: !each.Active}
        }
        return each
      }),
    }))
  }

  getFilteredList = () => {
    const {taskList, activeTask} = this.state

    if (activeTask) {
      return taskList.filter(eachTask => eachTask.Active === true)
    }
    return taskList
  }

  render() {
    const {taskInput, activeTask} = this.state
    const filteredTaskList = this.getFilteredList()
    const buttonText = activeTask ? 'Completed Task' : 'All Tasks'
    const paragraphText = activeTask
      ? 'click button to show all tasks'
      : 'click button to show completed tasks'
    return (
      <li>
        <div className="input-container">
          <div className="task-container">
            <div className="exist-container">
              <input
                type="text"
                className="user-input"
                placeholder="Enter Task Here"
                onChange={this.onChangeTaskInput}
                value={taskInput}
              />
            </div>
            <div>
              <button
                className="add-user-button"
                type="button"
                onClick={this.AddTask}
              >
                Add Task
              </button>
            </div>
          </div>
          <div className="task-list-container">
            <div>
              <div className="text-container">
                <button
                  className="completed-button"
                  type="button"
                  onClick={this.onFilter}
                >
                  {buttonText}
                </button>
                <p>{paragraphText}</p>
              </div>
              <ul className="list-container">
                {filteredTaskList.length === 0 ? (
                  <div className="error-container">
                    <h1 className="heading">There is no tasks to show</h1>
                  </div>
                ) : (
                  filteredTaskList.map(each => (
                    <TaskItem
                      taskDetails={each}
                      deleteTask={this.deleteTask}
                      completedTask={this.completedTask}
                      key={each.uniqueNo}
                      existTask={each.taskInput === taskInput}
                    />
                  ))
                )}
              </ul>
            </div>
          </div>
        </div>
      </li>
    )
  }
}
export default TaskList
