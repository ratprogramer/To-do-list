import './ToDoList.css'
import { ToDoItem } from '../ToDoItem/ToDoItem'

export const ToDoList = ({ tasks, onToggle, onDelete, onEdit }) => {
  if (tasks.length === 0) {
    return <p className="emptyMessage">No tasks yet</p>
  }

  return (
    <ul className="todoList">
      {tasks.map((task) => (
        <ToDoItem key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} onEdit={onEdit} />
      ))}
    </ul>
  )
}