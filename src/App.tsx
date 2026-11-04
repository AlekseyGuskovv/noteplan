
import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Calendar from './components/Calendar'
import NoteEditor from './components/NoteEditor'
import type { Note } from './types/note'
import './styles/App.css'

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const [notes, setNotes] = useState<Note[]>(() => {
    try {
      const saved = localStorage.getItem('noteplan-notes')
      return saved ? JSON.parse(saved) as Note[] : []
    } catch {
      return []
    }
  })

  // Обновляет заметки и сохраняет их в браузере
  function saveNotes(updatedNotes: Note[]) {
    setNotes(updatedNotes)
    localStorage.setItem('noteplan-notes', JSON.stringify(updatedNotes))
  }

  function addNote(note: Note) {
    saveNotes([...notes, note])
  }

  function updateNote(updatedNote: Note) {
    saveNotes(
      notes.map((note) =>
        note.id === updatedNote.id ? updatedNote : note
      )
    )
  }

  function deleteNote(id: string) {
    saveNotes(notes.filter((note) => note.id !== id))
  }

  return (
    <div className="app">
      <Sidebar />

      <main className="main-content">
        <div className="workspace">
          <Calendar
            selectedDate={selectedDate}
            currentMonth={currentMonth}
            notes={notes}
            onSelectDate={setSelectedDate}
            onMonthChange={setCurrentMonth}
          />

          <NoteEditor
            selectedDate={selectedDate}
            notes={notes}
            onAddNote={addNote}
            onUpdateNote={updateNote}
            onDeleteNote={deleteNote}
          />
        </div>
      </main>
    </div>
  )
}

export default App
