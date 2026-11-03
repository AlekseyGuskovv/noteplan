import Sidebar from './components/Sidebar'
import Calendar from './components/Calendar'
import NoteEditor from './components/NoteEditor'
import './styles/App.css'

function App() {
  return (
    <div className="app">
      <Sidebar />

      <main className="main-content">
        <div className="workspace">
          <Calendar />
          <NoteEditor />
        </div>
      </main>
    </div>
  )
}

export default App