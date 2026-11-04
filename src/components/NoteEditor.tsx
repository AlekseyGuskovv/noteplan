
import { useState } from 'react'
import type { FormEvent } from 'react'
import type { Note } from '../types/note'

type NoteEditorProps = {
  selectedDate: Date
  notes: Note[]
  onAddNote: (note: Note) => void
  onUpdateNote: (note: Note) => void
  onDeleteNote: (id: string) => void
}

export default function NoteEditor({
  selectedDate,
  notes,
  onAddNote,
  onUpdateNote,
  onDeleteNote,
}: NoteEditorProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState<Note['category']>('personal')
  const [editingId, setEditingId] = useState<string | null>(null)

  const formattedDate = selectedDate.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  const dateKey = [
    selectedDate.getFullYear(),
    String(selectedDate.getMonth() + 1).padStart(2, '0'),
    String(selectedDate.getDate()).padStart(2, '0'),
  ].join('-')

  const dayNotes = notes.filter((note) => note.date === dateKey)

  function resetForm() {
    setTitle('')
    setDescription('')
    setCategory('personal')
    setEditingId(null)
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!title.trim()) return

    const note: Note = {
      id: editingId ?? crypto.randomUUID(),
      date: dateKey,
      title: title.trim(),
      description: description.trim(),
      category,
    }

    if (editingId) {
      onUpdateNote(note)
    } else {
      onAddNote(note)
    }

    resetForm()
  }

  function startEditing(note: Note) {
    setTitle(note.title)
    setDescription(note.description)
    setCategory(note.category)
    setEditingId(note.id)
  }

  function handleDelete(id: string) {
    onDeleteNote(id)

    if (editingId === id) {
      resetForm()
    }
  }

  return (
    <section className="note-editor">
      <div className="editor-header">
        <p className="editor-subtitle">Заметки на день</p>
        <h2>{formattedDate}</h2>
      </div>

      <form className="editor-content" onSubmit={handleSubmit}>
        <label htmlFor="note-title">Название заметки</label>
        <input
          id="note-title"
          type="text"
          placeholder="Например, планы на сегодня"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
        />

        <label htmlFor="note-description">Описание</label>
        <textarea
          id="note-description"
          placeholder="Напишите свои планы, идеи или задачи..."
          rows={6}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />

        <label htmlFor="note-category">Категория</label>
        <select
          id="note-category"
          value={category}
          onChange={(event) =>
            setCategory(event.target.value as Note['category'])
          }
        >
          <option value="personal">Личное</option>
          <option value="work">Работа</option>
          <option value="study">Учёба</option>
        </select>

        <button className="editor-save" type="submit">
          {editingId ? 'Сохранить изменения' : 'Добавить заметку'}
        </button>

        {editingId && (
          <button
            className="editor-cancel"
            type="button"
            onClick={resetForm}
          >
            Отмена
          </button>
        )}
      </form>

      <div className="notes-list">
        <h3>Мои заметки ({dayNotes.length})</h3>

        {dayNotes.length === 0 ? (
          <p className="notes-empty">На этот день заметок пока нет.</p>
        ) : (
          dayNotes.map((note) => (
            <article className="note-card" key={note.id}>
              <span className={`note-category ${note.category}`}>
                {note.category === 'personal'
                  ? 'Личное'
                  : note.category === 'work'
                    ? 'Работа'
                    : 'Учёба'}
              </span>

              <h4>{note.title}</h4>
              <p>{note.description}</p>

              <div className="note-actions">
                <button
                  type="button"
                  onClick={() => startEditing(note)}
                >
                  Редактировать
                </button>

                <button
                  type="button"
                  className="delete-button"
                  onClick={() => handleDelete(note.id)}
                >
                  Удалить
                </button>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  )
}
