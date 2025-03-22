import './ToDoCounter.css'

export const ToDoCounter = ({ count }) => {
  return (
    <div className="todoCounter">
      {count === 0 ? (
        <p>All tasks completed! 🎉</p>
      ) : (
        <p>
          You have {count} pending task{count !== 1 ? "s" : ""}
        </p>
      )}
    </div>
  )
}