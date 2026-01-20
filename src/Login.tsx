import { useState } from 'react'
import './Login.css'

interface LoginProps {
  onLogin: (name: string) => void
}

function Login({ onLogin }: LoginProps) {
  const [name, setName] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim()) {
      onLogin(name.trim())
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <p className="eyebrow">Capybara Companion</p>
          <h1>Welcome!</h1>
          <p className="lede">Enter your name to get started</p>
        </div>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
            className="login-input"
          />
          <button type="submit" className="primary login-button" disabled={!name.trim()}>
            Continue
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
