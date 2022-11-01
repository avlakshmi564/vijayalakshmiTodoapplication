import './index.css'

const TaskItem = props => {
  const {taskDetails, completedTask, existTask, deleteTask} = props
  const {taskInput, uniqueNo, Active} = taskDetails

  const onClickCheckBox = () => {
    completedTask(uniqueNo)
  }

  const onClickButton = () => {
    deleteTask(uniqueNo)
  }

  const taskInputValue = Active && 'Completed'

  const className = Active ? 'label-through' : 'task'

  return (
    <li>
      {existTask ? (
        <h1>Task already exist</h1>
      ) : (
        <div className="check-container">
          <div className="box-container">
            <input
              type="checkbox"
              className="check-box"
              id="check"
              onClick={onClickCheckBox}
            />
            <label htmlFor="check" className={className}>
              {taskInput}
            </label>
            <p className="task">{taskInputValue}</p>
          </div>
          <button
            className="add-user-button"
            onClick={onClickButton}
            type="button"
          >
            Delete
          </button>
        </div>
      )}
    </li>
  )
}
export default TaskItem
