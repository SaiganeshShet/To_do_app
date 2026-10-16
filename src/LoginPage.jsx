import { useState } from 'react'

const DEMO_EMAIL = 'student@example.com'
const DEMO_PASSWORD = 'password123'

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()

    if (email.trim().toLowerCase() !== DEMO_EMAIL || password !== DEMO_PASSWORD) {
      setError('That email and password do not match the demo account.')
      return
    }

    setError('')
    onLogin()
  }

  return (
    <main className="login-layout">
      <section className="login-card" aria-labelledby="login-title">
        <div className="brand-mark" aria-hidden="true">
          ✓
        </div>
        <p className="eyebrow">A little more focus</p>
        <h1 id="login-title">Welcome back</h1>
        <p className="muted">Sign in to make room for what matters.</p>

        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="email">Email address</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="username"
            placeholder="you@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="Enter your password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />

          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}

          <button className="button button-primary login-submit" type="submit">
            Sign in <span aria-hidden="true">→</span>
          </button>
        </form>

        <p className="demo-hint">
          Demo: <strong>student@example.com</strong> / <strong>password123</strong>
        </p>
      </section>
      <p className="login-footer">Your next step starts here.</p>
    </main>
  )
}

export default LoginPage
