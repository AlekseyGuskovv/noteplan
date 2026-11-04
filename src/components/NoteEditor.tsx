
type NoteEditorProps = {
  selectedDate: Date
}

export default function NoteEditor({ selectedDate }: NoteEditorProps) {
  const formattedDate = selectedDate.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <section className="note-editor">
      <div className="editor-header">
        <p className="editor-subtitle">Заметки на день</p>
        <h2>{formattedDate}</h2>
      </div>

      <div className="editor-content">
        <label htmlFor="note-title">Название заметки</label>
        <input
          id="note-title"
          type="text"
          placeholder="Например, планы на сегодня"
        />

        <label htmlFor="note-description">Описание</label>
        <textarea
          id="note-description"
          placeholder="Напишите свои планы, идеи или задачи..."
          rows={8}
        />

        <label htmlFor="note-category">Категория</label>
        <select id="note-category" defaultValue="personal">
          <option value="personal">Личное</option>
          <option value="work">Работа</option>
          <option value="study">Учёба</option>
        </select>

        <button className="editor-save">
          Сохранить заметку
        </button>
      </div>
    </section>
  )
}
