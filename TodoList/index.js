import {Component} from 'react'

import {v4 as uuidV4} from 'uuid'

import TaskList from '../TaskList'

import './index.css'

const initialUserList = [
  {
    id: uuidV4(),
    userInput: 'Select User',
    isActive: false,
  },
]

class TodoList extends Component {
  state = {
    userInput: '',
    userList: [],
    activeUser: initialUserList[0].userInput,
  }

  onChangeUserInput = event => {
    this.setState({userInput: event.target.value})
  }

  onChangeUser = event => {
    this.setState({activeUser: event.target.value})
  }

  onClickUser = () => {
    const {activeUser} = this.state
    this.setState(prevState => ({
      userList: prevState.userList.map(each => {
        if (each.userInput === activeUser) {
          return {...each, isActive: !each.isActive}
        }
        return each
      }),
    }))
  }

  onClickAddUser = event => {
    event.preventDefault()
    const {userInput} = this.state

    const newUser = {
      id: uuidV4(),
      userInput,
      isActive: false,
    }

    this.setState(prevState => ({
      userList: [...prevState.userList, newUser],
      userInput: '',
    }))
  }

  filteredUserList = activeUser => {
    const {userList} = this.state
    const filteredList = userList.filter(each => each.userInput === activeUser)
    return filteredList
  }

  render() {
    const {userInput, userList, activeUser} = this.state
    const filteredList = this.filteredUserList(activeUser)
    return (
      <div className="todo-container">
        <div className="todo-heading-container">
          <h1 className="todo-heading">Todo Application</h1>
        </div>
        <div className="user-container">
          <div className="user-input-container">
            <input
              type="text"
              onChange={this.onChangeUserInput}
              className="user-input"
              value={userInput}
              placeholder="Enter User Name"
            />
            <button
              className="add-user-button"
              type="button"
              onClick={this.onClickAddUser}
            >
              Add User
            </button>
          </div>
          <select
            className="user-input"
            onChange={this.onChangeUser}
            onClick={this.onClickUser}
            value={activeUser}
          >
            {userList.map(each => (
              <option key={each.id}>{each.userInput}</option>
            ))}
          </select>
        </div>
        <div>
          <ul className="list-container">
            {userList.map(
              each =>
                each.isActive &&
                filteredList.map(eachTask => (
                  <div>
                    <div className="todo-heading-container">
                      <h1>{eachTask.userInput}</h1>
                    </div>
                    <TaskList
                      taskDetails={eachTask}
                      key={eachTask.uniqueNo}
                      deleteTask={this.deleteTask}
                      completedTask={this.completedTask}
                    />
                  </div>
                )),
            )}
          </ul>
        </div>
      </div>
    )
  }
}
export default TodoList
