import { useState, useEffect } from 'react'

import { ToDoContent } from './components/ToDoContent/ToDoContent';
import { ToDoCounter } from './components/ToDoCounter/ToDoCounter';
import { ToDoList } from './components/ToDoList/ToDoList';
import { ToDoForm } from './components/ToDoForm/ToDoForm';

import './App.css'

export const App = () => {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const fetchData = async () => {

      try {
        const response = await fetch("http://localhost:3001/", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
      
        if (!response.ok) throw new Error("Error al obtener las tareas");
      
        const tasks = await response.json(); 
        setTasks(tasks)
        
      } catch (error) {
        console.error("Error al obtener tareas:", error);

      }
    }
    fetchData()
  }, [tasks])

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  const addTask = (text) => {
    if (text.trim()) {
      const newTask = {
        id: Date.now(),
        text,
        is_completed: false,
      }
      setTasks([...tasks, newTask])
    }
  }

  const toggleTask = async (id, currentStatus) => {
    try {
      const response = await fetch(`http://localhost:3001/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_completed: !currentStatus }), 
      });
  
      if (!response.ok) throw new Error("Error al actualizar la tarea");
  
      
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, is_completed: !currentStatus } : task
        )
      );
    } catch (error) {
      console.error("Error al actualizar tarea:", error);
      alert("Hubo un problema al actualizar la tarea.");
    }
  };

  const deleteTask = (id) => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/${id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        });
    
        if (!response.ok) throw new Error("Error al eliminar la tarea");

      } catch (error) {
        console.error("Error al eliminar tarea:", error);
        alert("Hubo un problema al eliminar la tarea.");
      }
    }
    fetchData()
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const editTask = async (id, newText) => {
    try {
      const response = await fetch(`http://localhost:3001/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: newText }),
      });
  
      if (!response.ok) throw new Error("Error al actualizar la tarea");
  
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, description: newText } : task
        )
      );
    } catch (error) {
      console.error("Error al actualizar la tarea:", error);
      alert("Hubo un problema al actualizar la tarea.");
    }
  };

  const pendingTasks = tasks.filter((task) => !task.is_completed)

  const completedTasks = tasks.filter((task) => task.is_completed)

  return (
    <main className='AppContainer'>
      <ToDoContent>
        <h1>Hello</h1>

        <ToDoForm onAddTask={addTask} />
        <ToDoCounter count={pendingTasks.length} />

        <div className='taskSelection'>
          <h2 className="sectionTitle">Pending Tasks</h2>
          <ToDoList tasks={pendingTasks} onToggle={toggleTask} onDelete={deleteTask} onEdit={editTask} />
        </div>

        {completedTasks.length > 0 && (
          <div className="taskSection">
            <h2 className="sectionTitle">Completed Tasks</h2>
            <ToDoList tasks={completedTasks} onToggle={toggleTask} onDelete={deleteTask} onEdit={editTask} />
          </div>
        )}
      </ToDoContent>
    </main>
  )
}
