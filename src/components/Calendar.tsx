
import type { Note } from '../types/note'

type CalendarProps = {
  selectedDate: Date
  currentMonth: Date
  notes: Note[]
  onSelectDate: (date: Date) => void
  onMonthChange: (date: Date) => void
}

const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']

export default function Calendar({
  selectedDate,
  currentMonth,
  notes,
  onSelectDate,
  onMonthChange,
}: CalendarProps) {
  const year = currentMonth.getFullYear()
  const month = currentMonth.getMonth()
  const today = new Date()

  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const firstDay = (new Date(year, month, 1).getDay() + 6) % 7

  const days = Array.from(
    { length: daysInMonth },
    (_, i) => i + 1
  )

  function changeMonth(offset: number) {
    onMonthChange(new Date(year, month + offset, 1))
  }

  function isSelected(day: number) {
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === month &&
      selectedDate.getFullYear() === year
    )
  }

  function isToday(day: number) {
    return (
      today.getDate() === day &&
      today.getMonth() === month &&
      today.getFullYear() === year
    )
  }

  function goToToday() {
    const date = new Date()
    onSelectDate(date)
    onMonthChange(new Date(date.getFullYear(), date.getMonth(), 1))
  }

  // Возвращает заметки для определённого дня
  function getDayNotes(day: number) {
    const dateKey = [
      year,
      String(month + 1).padStart(2, '0'),
      String(day).padStart(2, '0'),
    ].join('-')

    return notes.filter((note) => note.date === dateKey)
  }

  const monthTitle = currentMonth.toLocaleDateString('ru-RU', {
    month: 'long',
    year: 'numeric',
  })

  return (
    <section className="calendar">
      <div className="calendar-header">
        <div>
          <p className="calendar-subtitle">Мой планировщик</p>
          <h2>{monthTitle}</h2>
        </div>

        <div className="calendar-controls">
          <button
            type="button"
            className="today-button"
            onClick={goToToday}
          >
            Сегодня
          </button>

          <button
            type="button"
            onClick={() => changeMonth(-1)}
            aria-label="Предыдущий месяц"
          >
            ‹
          </button>

          <button
            type="button"
            onClick={() => changeMonth(1)}
            aria-label="Следующий месяц"
          >
            ›
          </button>
        </div>
      </div>

      <div className="calendar-grid">
        {weekDays.map((day) => (
          <div className="weekday" key={day}>
            {day}
          </div>
        ))}

        {Array.from({ length: firstDay }, (_, i) => (
          <div className="calendar-empty" key={`empty-${i}`} />
        ))}

        {days.map((day) => {
          const dayNotes = getDayNotes(day)
          const categories = [...new Set(dayNotes.map((note) => note.category))]

          return (
            <button
              type="button"
              key={day}
              className={`calendar-day ${isSelected(day) ? 'selected' : ''} ${isToday(day) ? 'today' : ''}`}
              onClick={() => onSelectDate(new Date(year, month, day))}
              aria-pressed={isSelected(day)}
              aria-label={`${day} ${monthTitle}, заметок: ${dayNotes.length}`}
            >
              <span>{day}</span>

              <div className="day-indicators">
                {categories.map((category) => (
                  <span
                    key={category}
                    className={`day-dot ${category}`}
                  />
                ))}
              </div>
            </button>
          )
        })}
      </div>
    </section>
  )
}
