import { useMemo, useState } from 'react'
import { getAdvice } from './advice/engine'

type MoodLog = {
  timestamp: number
  phase: 'pre' | 'post'
  mood: string
}

type Task = {
  id: string
  title: string
  category: string
  priority: 'low' | 'medium' | 'high'
  done: boolean
}

export function AdviceChat({
  phase,
  focusMinutes,
  breakMinutes,
  moodLog,
  tasks,
}: {
  phase: 'focus' | 'break'
  focusMinutes: number
  breakMinutes: number
  moodLog: MoodLog[]
  tasks: Task[]
}) {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; text: string }[]>([])
  const [input, setInput] = useState('')

  const stats = useMemo(() => {
    const done = tasks.filter((t) => t.done).length
    const total = tasks.length
    return { done, total }
  }, [tasks])

  const send = () => {
    const text = input.trim()
    if (!text) return
    setMessages((m) => [...m, { role: 'user', text }])
    const { advice } = getAdvice(text, {
      phase,
      focusMinutes,
      breakMinutes,
      moodLog,
      tasks,
    })
    setMessages((m) => [...m, { role: 'assistant', text: advice }])
    setInput('')
  }

  return (
    <section className="panel chat">
      <div className="panel-header">
        <h2>🤖 Advice Chat</h2>
        <p className="hint">Non-clinical, gentle guidance tailored to you.</p>
      </div>
      <div className="chat-body">
        {messages.length === 0 && (
          <div className="chat-empty">
            <p className="muted">
              Ask for help with focus, overwhelm, planning, or breaks.
            </p>
            <p className="muted">
              Example: “I feel overwhelmed by this task” or “Help me plan”.
            </p>
            <p className="pill subtle">Tasks done: {stats.done}/{stats.total}</p>
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={m.role === 'user' ? 'msg user' : 'msg bot'}>
            <div className="msg-bubble">
              <p>{m.text}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Ask for advice…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') send()
          }}
        />
        <button className="primary" onClick={send}>Send</button>
      </div>
    </section>
  )
}
