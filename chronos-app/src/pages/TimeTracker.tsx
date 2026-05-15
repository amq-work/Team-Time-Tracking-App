import React, { useState } from 'react'
import { Play, Square, Pause, Coffee, Sun, Moon, Flag, Folder, DollarSign } from 'lucide-react'
import { Card } from '../components/ui/Card'
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'
import { useDayTimer } from '../hooks/useDayTimer'

interface TimeEntry {
  id: number
  task: string
  project: string
  duration: string
  startTime: string
  endTime: string
  billable: boolean
}

export const TimeTracker = () => {
  const {
    mode,
    isRunning,
    dayStarted,
    dayEnded,
    formatWorkTime,
    formatBreakTime,
    formatTotalTime,
    startDay,
    endDay,
    startBreak,
    endBreak,
    pause,
    resume,
    resetDay
  } = useDayTimer()

  const [taskName, setTaskName] = useState('')
  const [selectedProject, setSelectedProject] = useState('Chronos App')
  const [isBillable, setIsBillable] = useState(true)
  const [currentTaskStarted, setCurrentTaskStarted] = useState<Date | null>(null)
  const [entries, setEntries] = useState<TimeEntry[]>([])

  const handleStartTask = () => {
    if (!taskName) {
      alert('Please enter a task name')
      return
    }
    setCurrentTaskStarted(new Date())
    if (!dayStarted) {
      startDay()
    } else {
      resume()
    }
  }

  const handleStopTask = () => {
    if (currentTaskStarted) {
      const endTime = new Date()
      const durationMs = endTime.getTime() - currentTaskStarted.getTime()
      const durationSeconds = Math.floor(durationMs / 1000)
      const hours = Math.floor(durationSeconds / 3600)
      const minutes = Math.floor((durationSeconds % 3600) / 60)
      const secs = durationSeconds % 60
      const duration = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`

      const newEntry: TimeEntry = {
        id: Date.now(),
        task: taskName,
        project: selectedProject,
        duration,
        startTime: currentTaskStarted.toLocaleTimeString(),
        endTime: endTime.toLocaleTimeString(),
        billable: isBillable
      }
      setEntries([newEntry, ...entries])
      setTaskName('')
      setCurrentTaskStarted(null)
      pause()
    }
  }

  const handleStartBreak = () => {
    if (currentTaskStarted) {
      handleStopTask()
    }
    startBreak()
  }

  const handleEndBreak = () => {
    endBreak()
  }

  const handleEndDay = () => {
    if (currentTaskStarted) {
      handleStopTask()
    }
    endDay()
  }

  // If day hasn't started or day has ended, show start/end screen
  if (!dayStarted || dayEnded) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-8">
        <Card className="p-12 text-center max-w-md">
          <Sun className="w-16 h-16 text-accent mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-text-primary mb-4">
            {!dayStarted ? 'Start Your Work Day' : 'Day Completed!'}
          </h2>
          <p className="text-text-secondary mb-8">
            {!dayStarted 
              ? 'Track your time, take breaks, and maximize productivity'
              : `Total time today: ${formatTotalTime()}`}
          </p>
          {!dayStarted ? (
            <Button size="lg" onClick={startDay} leftIcon={<Sun className="w-5 h-5" />}>
              Start Day
            </Button>
          ) : (
            <Button size="lg" onClick={resetDay} leftIcon={<Flag className="w-5 h-5" />}>
              New Day
            </Button>
          )}
        </Card>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto">
      {/* Timer Display */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 text-center">
          <p className="text-text-secondary text-sm mb-2">Work Time</p>
          <p className="font-pixel text-3xl text-accent">{formatWorkTime()}</p>
          {mode === 'work' && isRunning && <p className="text-xs text-green-500 mt-2 animate-pulse">● Working</p>}
        </Card>
        <Card className="p-6 text-center">
          <p className="text-text-secondary text-sm mb-2">Break Time</p>
          <p className="font-pixel text-3xl text-blue-500">{formatBreakTime()}</p>
          {mode === 'break' && isRunning && <p className="text-xs text-blue-500 mt-2 animate-pulse">● On Break</p>}
        </Card>
        <Card className="p-6 text-center">
          <p className="text-text-secondary text-sm mb-2">Total Today</p>
          <p className="font-pixel text-3xl text-text-primary">{formatTotalTime()}</p>
        </Card>
      </div>

      {/* Current Task Input */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="What are you working on?"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              className="text-lg py-3"
              disabled={!!currentTaskStarted}
            />
          </div>
          <div className="flex items-center gap-3">
            <select
              className="bg-surface-light border border-border rounded-lg px-4 py-2 text-sm text-text-primary focus:outline-none focus:border-accent"
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              disabled={!!currentTaskStarted}
            >
              <option>Chronos App</option>
              <option>Website Redesign</option>
              <option>Mobile App</option>
              <option>Internal</option>
            </select>
            <button
              onClick={() => setIsBillable(!isBillable)}
              className={`flex items-center justify-center w-10 h-10 rounded-lg transition-colors ${isBillable ? 'text-accent bg-accent/10' : 'text-text-muted hover:bg-surface-light'}`}
              title="Toggle Billable"
            >
              <DollarSign className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mt-6">
          {!currentTaskStarted ? (
            <Button onClick={handleStartTask} leftIcon={<Play className="w-4 h-4" />}>
              Start Task
            </Button>
          ) : (
            <Button variant="danger" onClick={handleStopTask} leftIcon={<Square className="w-4 h-4" />}>
              Stop Task
            </Button>
          )}

          {mode === 'work' && !currentTaskStarted && dayStarted && !dayEnded && (
            <Button variant="secondary" onClick={handleStartBreak} leftIcon={<Coffee className="w-4 h-4" />}>
              Take Break
            </Button>
          )}

          {mode === 'break' && (
            <Button variant="primary" onClick={handleEndBreak} leftIcon={<Play className="w-4 h-4" />}>
              End Break
            </Button>
          )}

          <Button variant="ghost" onClick={pause} disabled={!isRunning}>
            Pause
          </Button>

          <Button variant="ghost" onClick={resume} disabled={isRunning}>
            Resume
          </Button>

          <Button variant="secondary" onClick={handleEndDay} leftIcon={<Moon className="w-4 h-4" />}>
            End Day
          </Button>
        </div>
      </Card>

      {/* Today's Entries */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-text-primary">Today's Tasks</h3>
          <span className="text-sm text-text-secondary">
            Total: <span className="font-pixel text-xs ml-2 text-accent">{formatTotalTime()}</span>
          </span>
        </div>
        <div className="flex flex-col gap-2 max-h-96 overflow-y-auto">
          {entries.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-text-secondary">No tasks yet. Start your first task!</p>
            </Card>
          ) : (
            entries.map((entry) => (
              <Card key={entry.id} className="p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:border-accent/50 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-base font-medium text-text-primary">{entry.task}</span>
                    {entry.billable && <span className="text-xs text-accent px-2 py-0.5 rounded bg-accent/10">Billable</span>}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-text-muted">
                    <span className="flex items-center gap-1"><Folder className="w-3 h-3" />{entry.project}</span>
                    <span>{entry.startTime} - {entry.endTime}</span>
                  </div>
                </div>
                <div className="font-pixel text-sm text-text-primary">{entry.duration}</div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}