import { useState, useEffect } from 'react'

import { ToDoContent } from './components/ToDoContent/ToDoContent';
import { ToDoCounter } from './components/ToDoCounter/ToDoCounter';
import { ToDoList } from './components/ToDoList/ToDoList';
import { ToDoForm } from './components/ToDoForm/ToDoForm';

import './App.css'

export const App = () => {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks")
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  const addTask = (text) => {
    if (text.trim()) {
      const newTask = {
        id: Date.now(),
        text,
        completed: false,
      }
      setTasks([...tasks, newTask])
    }
  }

  const toggleTask = (id) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const editTask = (id, newText) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, text: newText } : task)))
  }

  const pendingTasks = tasks.filter((task) => !task.completed)

  const completedTasks = tasks.filter((task) => task.completed)

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
