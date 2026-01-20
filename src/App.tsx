import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import Login from './Login'

type Phase = 'focus' | 'break'

type Task = {
  id: string
  title: string
  category: string
  priority: 'low' | 'medium' | 'high'
  done: boolean
}

const quoteBank = [
  'Progress, not perfection.',
  'One Pomodoro at a time.',
  'Small steps, big wins.',
  'Rest is part of the process.',
  'You are allowed to go slow.',
  'Consistency beats intensity.',
  'Breathe. Then take the next tiny step.',
]

const contacts = [
  { name: 'Sam (study buddy)', channel: 'DM @sam-study' },
  { name: 'Taylor (friend)', channel: 'Text • +1-555-0142' },
  { name: 'Alex (support)', channel: 'Call • +1-555-0100' },
]

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60)
  const remainder = seconds % 60
  return `${String(minutes).padStart(2, '0')}:${String(remainder).padStart(
    2,
    '0',
  )}`
}

const randomQuote = (previous: string) => {
  const filtered = quoteBank.filter((quote) => quote !== previous)
  if (filtered.length === 0) return previous
  const index = Math.floor(Math.random() * filtered.length)
  return filtered[index]
}

function App() {
  const [userName, setUserName] = useState<string | null>(null)
  const [phase, setPhase] = useState<Phase>('focus')
  const [focusMinutes, setFocusMinutes] = useState(25)
  const [breakMinutes, setBreakMinutes] = useState(5)
  const [secondsLeft, setSecondsLeft] = useState(focusMinutes * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [completedSessions, setCompletedSessions] = useState(0)

  const [tapCount, setTapCount] = useState(0)
  const [unlockedQuote, setUnlockedQuote] = useState(quoteBank[0])
  const [isSwinging, setIsSwinging] = useState(false)

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 't1',
      title: 'Outline next Pomodoro goals',
      category: 'Focus',
      priority: 'medium',
      done: false,
    },
    {
      id: 't2',
      title: 'Water + stretch break',
      category: 'Wellness',
      priority: 'low',
      done: false,
    },
    {
      id: 't3',
      title: 'Inbox sweep (10 min)',
      category: 'Admin',
      priority: 'medium',
      done: true,
    },
  ])
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [newTaskCategory, setNewTaskCategory] = useState('Focus')
  const [contactIndex, setContactIndex] = useState(0)

  const focusDuration = useMemo(() => focusMinutes * 60, [focusMinutes])
  const breakDuration = useMemo(() => breakMinutes * 60, [breakMinutes])

  const isInitialMount = useRef(true)
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
      return
    }
    queueMicrotask(() => {
      setSecondsLeft(phase === 'focus' ? focusDuration : breakDuration)
    })
  }, [phase, focusDuration, breakDuration])

  useEffect(() => {
    if (!isRunning) return
    const id = window.setInterval(() => {
      setSecondsLeft((prev) => Math.max(0, prev - 1))
    }, 1000)
    return () => window.clearInterval(id)
  }, [isRunning])

  useEffect(() => {
    if (!isRunning || secondsLeft > 0) return

    // Timer completed - switch phase asynchronously to avoid cascading renders
    queueMicrotask(() => {
      const nextPhase: Phase = phase === 'focus' ? 'break' : 'focus'
      if (phase === 'focus') {
        setCompletedSessions((count) => count + 1)
      }
      setPhase(nextPhase)
      setSecondsLeft(nextPhase === 'focus' ? focusDuration : breakDuration)
    })
  }, [secondsLeft, isRunning, phase, focusDuration, breakDuration])

  const handleStartPause = () => {
    setIsRunning((running) => !running)
  }

  const handleReset = (nextPhase?: Phase) => {
    const targetPhase = nextPhase ?? phase
    setIsRunning(false)
    setPhase(targetPhase)
    setSecondsLeft(targetPhase === 'focus' ? focusDuration : breakDuration)
  }

  const handleTapBag = () => {
    setIsSwinging(true)
    window.setTimeout(() => setIsSwinging(false), 600)
    const nextTap = tapCount + 1
    if (nextTap >= 10) {
      const nextQuote = randomQuote(unlockedQuote)
      setUnlockedQuote(nextQuote)
      setTapCount(0)
      return
    }
    setTapCount(nextTap)
  }

  const toggleTask = (id: string) => {
    setTasks((existing) =>
      existing.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task,
      ),
    )
  }

  const addTask = () => {
    if (!newTaskTitle.trim()) return
    setTasks((existing) => [
      {
        id: crypto.randomUUID(),
        title: newTaskTitle.trim(),
        category: newTaskCategory,
        priority: 'low',
        done: false,
      },
      ...existing,
    ])
    setNewTaskTitle('')
  }

  const rotateContact = () => {
    setContactIndex((index) => (index + 1) % contacts.length)
  }

  const currentContact = contacts[contactIndex]
  const progress = Math.min(10, tapCount)

  const handleLogin = (name: string) => {
    setUserName(name)
  }

  if (!userName) {
    return <Login onLogin={handleLogin} />
  }

  return (
    <div className="app-shell">
      <header className="hero">
        <div>
          <p className="eyebrow">Capybara Companion</p>
          <h1>Hello {userName}! Stay calm, focused, and kind to yourself.</h1>
          <p className="lede">
            Pomodoro timer + playful boxing bag quotes + task organizer. Non-clinical,
            friendly, and here to keep you steady and focused.
          </p>
        </div>
        <div className="hero-stats">
          <div className="pill">Sessions completed: {completedSessions}</div>
          <div className="pill">Mode: {phase === 'focus' ? 'Focus' : 'Break'}</div>
        </div>
      </header>

      <main className="grid">
        <section className="panel timer">
          <div className="panel-header">
            <h2>Pomodoro</h2>
            <div className="chip-row">
              <button
                className={`chip ${phase === 'focus' ? 'chip-active' : ''}`}
                onClick={() => handleReset('focus')}
                aria-label="Switch to focus"
              >
                Focus
              </button>
              <button
                className={`chip ${phase === 'break' ? 'chip-active' : ''}`}
                onClick={() => handleReset('break')}
                aria-label="Switch to break"
              >
                Break
              </button>
            </div>
          </div>

          <div className="timer-face">
            <div className="time">{formatTime(secondsLeft)}</div>
            <p className="hint">{phase === 'focus' ? 'Focus cycle' : 'Recover + breathe'}</p>
          </div>

          <div className="controls">
            <button className="primary" onClick={handleStartPause}>
              {isRunning ? 'Pause' : 'Start'}
            </button>
            <button className="ghost" onClick={() => handleReset()}>
              Reset
            </button>
          </div>

          <div className="durations">
            <label>
              Focus (min)
              <input
                type="number"
                min={5}
                max={90}
                value={focusMinutes}
                onChange={(event) => setFocusMinutes(Number(event.target.value))}
              />
            </label>
            <label>
              Break (min)
              <input
                type="number"
                min={3}
                max={30}
                value={breakMinutes}
                onChange={(event) => setBreakMinutes(Number(event.target.value))}
              />
            </label>
          </div>
        </section>

        <section className="panel tasks">
          <div className="panel-header">
            <h2>Task organizer</h2>
            <p className="hint">Lightweight prioritization to reduce overwhelm.</p>
          </div>
          <div className="task-form">
            <input
              type="text"
              placeholder="Add a quick task"
              value={newTaskTitle}
              onChange={(event) => setNewTaskTitle(event.target.value)}
            />
            <select
              value={newTaskCategory}
              onChange={(event) => setNewTaskCategory(event.target.value)}
            >
              <option>Focus</option>
              <option>Wellness</option>
              <option>Admin</option>
              <option>Planning</option>
            </select>
            <button className="primary" onClick={addTask}>
              Add
            </button>
          </div>
          <ul className="task-list">
            {tasks.map((task) => (
              <li key={task.id} className={task.done ? 'task done' : 'task'}>
                <label>
                  <input
                    type="checkbox"
                    checked={task.done}
                    onChange={() => toggleTask(task.id)}
                  />
                  <span>{task.title}</span>
                </label>
                <div className="task-meta">
                  <span className="pill subtle">{task.category}</span>
                  <span className={`pill priority ${task.priority}`}>
                    {task.priority}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="panel boxing">
          <div className="panel-header">
            <h2>Boxing bag</h2>
            <p className="hint">Tap 10x to unlock a random motivational quote.</p>
          </div>
          <div className="boxing-body">
            <div
              className={`tap-target ${isSwinging ? 'swinging' : ''}`}
              role="button"
              onClick={handleTapBag}
              aria-label="Tap to swing the boxing bag"
            >
              <div className="bag-rope" aria-hidden />
              <div className="bag-shell" aria-hidden>
                <div className="bag-top" />
                <div className="bag-body" />
              </div>
              <p>Tap the bag</p>
            </div>
            <div className="progress">
              <div
                className="progress-fill"
                style={{ width: `${(progress / 10) * 100}%` }}
              />
            </div>
            <p className="hint">{10 - progress} taps to unlock</p>
            <div className="quote">
              <p className="label">Unlocked quote</p>
              <p className="quote-text">“{unlockedQuote}”</p>
            </div>
          </div>
        </section>

        <section className="panel contacts">
          <div className="panel-header">
            <h2>Emergency contact rotation</h2>
            <p className="hint">Keeps a warm connection available if you need it.</p>
          </div>
          <div className="contact-card">
            <p className="label">Next reachable person</p>
            <h3>{currentContact.name}</h3>
            <p className="muted">{currentContact.channel}</p>
            <button className="ghost" onClick={rotateContact}>
              Rotate contact
            </button>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
