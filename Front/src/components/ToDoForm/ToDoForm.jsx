import { useState } from "react"
import { CirclePlus } from "lucide-react"
import './ToDoForm.css'

export const ToDoForm = ({ onAddTask }) => {
  const [text, setText] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch("http://localhost:3001/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: text, is_completed: false }),
      });
      
      let respuesta = await response.json()
      console.log(respuesta);

      setText("");
    } catch (error) {
      console.error("Error al agregar tarea:", error);
      alert("Hubo un problema al agregar la tarea.");
    }
  }

  return (
    <form onSubmit={(e) => {handleSubmit(e)}} className="todoForm">
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