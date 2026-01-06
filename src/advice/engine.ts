export type Intent = 'focus' | 'overwhelm' | 'planning' | 'break'

export type MoodLog = {
  timestamp: number
  phase: 'pre' | 'post'
  mood: string
}

export type Task = {
  id: string
  title: string
  category: string
  priority: 'low' | 'medium' | 'high'
  done: boolean
}

export type AdviceContext = {
  phase: 'focus' | 'break'
  focusMinutes: number
  breakMinutes: number
  moodLog?: MoodLog[]
  tasks: Task[]
}

const keywordMap: Record<Intent, string[]> = {
  focus: ['focus', 'study', 'work', 'concentrate', 'distracted'],
  overwhelm: ['overwhelmed', 'stressed', 'anxious', 'pressure', 'panic'],
  planning: ['plan', 'schedule', 'organize', 'prioritize', 'next steps'],
  break: ['break', 'rest', 'tired', 'fatigued', 'pause'],
}

export function detectIntent(text: string, fallback: Intent): Intent {
  const lower = text.toLowerCase()
  for (const intent of Object.keys(keywordMap) as Intent[]) {
    if (keywordMap[intent].some((k) => lower.includes(k))) return intent
  }
  return fallback
}

function moodSummary(moodLog: MoodLog[]) {
  const recent = moodLog.slice(0, 10)
  const count = (m: string) => recent.filter((e) => e.mood === m).length
  return {
    stressed: count('stressed'),
    overwhelmed: count('overwhelmed'),
    calm: count('calm'),
    focused: count('focused'),
  }
}

function pickTopTask(tasks: Task[]) {
  const next = tasks.find((t) => !t.done) || tasks[0]
  return next ? next.title : 'one small task you care about'
}

export function getAdvice(
  userText: string,
  context: AdviceContext,
): { intent: Intent; advice: string } {
  const fallback: Intent = context.phase === 'focus' ? 'focus' : 'break'
  const intent = detectIntent(userText, fallback)
  const moods = moodSummary(context.moodLog || [])
  const topTask = pickTopTask(context.tasks)
  const fm = context.focusMinutes
  const bm = context.breakMinutes

  const safetyTail =
    'This is non-clinical guidance. If you feel unsafe, consider reaching out to a trusted person.'

  const stressedHint =
    moods.overwhelmed + moods.stressed > 2
      ? `You seem under pressure. Try 90 seconds of slow breathing, hydrate, then take the next tiny step.`
      : `Start gently. A clear next step keeps things light.`

  let advice = ''
  if (intent === 'focus') {
    advice = `Try a ${fm}-minute focus. Pick one task: “${topTask}”. Silence notifications, put your phone away, and set a small win to reach at ${Math.min(fm, 25)} minutes. ${stressedHint}`
  } else if (intent === 'overwhelm') {
    advice = `Pause and breathe (90s). Write the very next action for “${topTask}”. If helpful, do a ${bm}-minute reset break (stretch, water). Then resume with a ${fm}-minute Pomodoro.`
  } else if (intent === 'planning') {
    advice = `Make a tiny plan: choose 3 small tasks, timebox one ${fm}-minute Pomodoro for “${topTask}”, and defer admin to later. Keep it simple—progress, not perfection.`
  } else {
    advice = `Take a ${bm}-minute break: step away, hydrate, stretch shoulders, 4-4-4 breathing. On return, jot one sentence about progress and the next step.`
  }

  return { intent, advice: `${advice}\n\n${safetyTail}` }
}
