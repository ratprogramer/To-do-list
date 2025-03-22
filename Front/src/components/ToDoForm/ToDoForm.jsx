import { useState } from "react"
import { CirclePlus } from "lucide-react"
import './ToDoForm.css'

export const ToDoForm = ({ onAddTask }) => {
  const [text, setText] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    onAddTask(text)
    setText("")
  }

  return (
    <form onSubmit={handleSubmit} className="todoForm">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new task..."
        className="todoInput"
      />
      <button type="submit" className="addButton">
        <CirclePlus />
      </button>
    </form>
  )
}