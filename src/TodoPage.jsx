import { useState } from 'react'

const FILTERS = ['All', 'Active', 'Completed']

function TodoPage({
  todos,
  onAddTodo,
  onToggleTodo,
  onFocusTodo,
  onDeleteTodo,
  onLogout,
}) {
  const [newTodo, setNewTodo] = useState('')
  const [filter, setFilter] = useState('All')

  const remainingCount = todos.filter((todo) => !todo.completed).length
  const focusedTodo = todos.find((todo) => todo.isFocus && !todo.completed)
  const visibleTodos = todos.filter((todo) => {
    if (filter === 'Active') return !todo.completed
    if (filter === 'Completed') return todo.completed
    return true
  })

  function handleSubmit(event) {
    event.preventDefault()
    const text = newTodo.trim()
    if (!text) return

    onAddTodo(text)
    setNewTodo('')
  }

  return (
    <main className="todo-layout">
      <header className="topbar">
        <div className="wordmark" aria-label="Daymark">
          <span className="brand-mark small" aria-hidden="true">
            ✓
          </span>
          daymark
        </div>
        <button className="button button-quiet" type="button" onClick={onLogout}>
          Log out <span aria-hidden="true">↗</span>
        </button>
      </header>

      <section className="todo-content" aria-labelledby="todo-title">
        <p className="eyebrow">Your personal space</p>
        <h1 id="todo-title">Make today count.</h1>
        <p className="muted todo-intro">
          One step at a time. You’ve got this.
        </p>

        {focusedTodo && (
          <section className="focus-card" aria-label="Today's spotlight" aria-live="polite">
            <span className="focus-card-icon" aria-hidden="true">
              ✦
            </span>
            <div className="focus-card-copy">
              <p className="focus-card-label">Today's spotlight</p>
              <p className="focus-card-task">{focusedTodo.text}</p>
              <p className="focus-card-hint">One thing at a time. You’ve got this.</p>
            </div>
            <button
              className="focus-clear-button"
              type="button"
              aria-label="Clear today's spotlight"
              onClick={() => onFocusTodo(null)}
            >
              ×
            </button>
          </section>
        )}

        <form className="todo-form" onSubmit={handleSubmit}>
          <label className="visually-hidden" htmlFor="new-todo">
            Add a task
          </label>
          <input
            id="new-todo"
            type="text"
            placeholder="What needs to get done?"
            value={newTodo}
            onChange={(event) => setNewTodo(event.target.value)}
            maxLength={200}
            required
          />
          <button className="button button-primary" type="submit">
            Add task <span aria-hidden="true">+</span>
          </button>
        </form>

        <div className="list-toolbar">
          <div className="filter-list" aria-label="Filter tasks">
            {FILTERS.map((filterOption) => (
              <button
                className={`filter-button${filter === filterOption ? ' selected' : ''}`}
                type="button"
                key={filterOption}
                aria-pressed={filter === filterOption}
                onClick={() => setFilter(filterOption)}
              >
                {filterOption}
              </button>
            ))}
          </div>
          <p className="remaining-count">
            <strong>{remainingCount}</strong>{' '}
            {remainingCount === 1 ? 'task' : 'tasks'} left
          </p>
        </div>

        {visibleTodos.length > 0 ? (
          <ul className="todo-list">
            {visibleTodos.map((todo) => (
              <li className="todo-item" key={todo.id}>
                <label className="todo-label">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => onToggleTodo(todo.id)}
                  />
                  <span className="custom-checkbox" aria-hidden="true">
                    ✓
                  </span>
                  <span
                    className={`todo-text${todo.completed ? ' completed' : ''}`}
                  >
                    {todo.text}
                  </span>
                </label>
                <div className="todo-actions">
                  {!todo.completed && (
                    <button
                      className={`focus-button${todo.isFocus ? ' selected' : ''}`}
                      type="button"
                      aria-label={
                        todo.isFocus
                          ? `Remove ${todo.text} from focus`
                          : `Focus on ${todo.text}`
                      }
                      aria-pressed={Boolean(todo.isFocus)}
                      onClick={() => onFocusTodo(todo.isFocus ? null : todo.id)}
                    >
                      <span aria-hidden="true">{todo.isFocus ? '✦' : '☆'}</span>
                      {todo.isFocus ? 'In focus' : 'Focus'}
                    </button>
                  )}
                  <button
                    className="delete-button"
                    type="button"
                    aria-label={`Delete ${todo.text}`}
                    onClick={() => onDeleteTodo(todo.id)}
                  >
                    ×
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="empty-state">
            <span className="empty-icon" aria-hidden="true">
              ✳
            </span>
            <h2>
              {todos.length === 0
                ? 'A fresh start.'
                : filter === 'Active'
                  ? 'All caught up.'
                  : 'Nothing completed yet.'}
            </h2>
            <p>
              {todos.length === 0
                ? 'Add your first task above and take it from there.'
                : 'Try another filter to see your tasks.'}
            </p>
          </div>
        )}
      </section>
      <footer className="todo-footer">Small steps add up.</footer>
    </main>
  )
}

export default TodoPage
