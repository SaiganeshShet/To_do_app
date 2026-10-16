import { useEffect, useState } from 'react'
import LoginPage from './LoginPage.jsx'
import TodoPage from './TodoPage.jsx'

const STORAGE_KEY = 'simple-todo-app.todos'

function loadTodos() {
  try {
    const savedTodos = localStorage.getItem(STORAGE_KEY)
    if (!savedTodos) return []

    const parsedTodos = JSON.parse(savedTodos)
    if (!Array.isArray(parsedTodos)) {
      throw new TypeError('Saved todos must be an array.')
    }

    return parsedTodos.filter(
      (todo) =>
        todo &&
        typeof todo.id === 'string' &&
        typeof todo.text === 'string' &&
        typeof todo.completed === 'boolean',
    )
  } catch (error) {
    console.error('Could not load saved todos from localStorage.', error)
    return []
  }
}

function App() {
  const [page, setPage] = useState(
    window.location.pathname === '/todos' ? 'todos' : 'login',
  )
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [todos, setTodos] = useState(loadTodos)

  useEffect(() => {
    function handlePopState() {
      setPage(window.location.pathname === '/todos' ? 'todos' : 'login')
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  useEffect(() => {
    if (page === 'todos' && !isAuthenticated) {
      window.history.replaceState({}, '', '/login')
    }
  }, [isAuthenticated, page])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
    } catch (error) {
      console.error('Could not save todos to localStorage.', error)
    }
  }, [todos])

  function navigateTo(nextPage) {
    const path = nextPage === 'todos' ? '/todos' : '/login'
    window.history.pushState({}, '', path)
    setPage(nextPage)
  }

  function handleLogin() {
    setIsAuthenticated(true)
    navigateTo('todos')
  }

  function handleLogout() {
    setIsAuthenticated(false)
    navigateTo('login')
  }

  function addTodo(text) {
    setTodos((currentTodos) => [
      ...currentTodos,
      { id: crypto.randomUUID(), text, completed: false },
    ])
  }

  function toggleTodo(todoId) {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === todoId
          ? {
              ...todo,
              completed: !todo.completed,
              isFocus: todo.completed ? todo.isFocus : false,
            }
          : todo,
      ),
    )
  }

  function focusTodo(todoId) {
    setTodos((currentTodos) =>
      currentTodos.map((todo) => ({
        ...todo,
        isFocus: todo.id === todoId && !todo.completed,
      })),
    )
  }

  function deleteTodo(todoId) {
    setTodos((currentTodos) =>
      currentTodos.filter((todo) => todo.id !== todoId),
    )
  }

  if (page === 'todos' && isAuthenticated) {
    return (
      <TodoPage
        todos={todos}
        onAddTodo={addTodo}
        onToggleTodo={toggleTodo}
        onFocusTodo={focusTodo}
        onDeleteTodo={deleteTodo}
        onLogout={handleLogout}
      />
    )
  }

  return <LoginPage onLogin={handleLogin} />
}

export default App
