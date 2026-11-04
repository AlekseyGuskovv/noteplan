
import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Calendar from './components/Calendar'
import NoteEditor from './components/NoteEditor'
import './styles/App.css'

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [currentMonth, setCurrentMonth] = useState(new Date())

  return (
    <div className="app">
      <Sidebar />

      <main className="main-content">
        <div className="workspace">
          <Calendar
            selectedDate={selectedDate}
            currentMonth={currentMonth}
            onSelectDate={setSelectedDate}
            onMonthChange={setCurrentMonth}
          />

          <NoteEditor selectedDate={selectedDate} />
        </div>
      </main>
    </div>
  )
}

export default App
