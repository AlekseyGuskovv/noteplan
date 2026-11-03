const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']

const days = Array.from({ length: 30 }, (_, i) => i + 1)

export default function Calendar() {
  return (
    <section className="calendar">
      <div className="calendar-header">
        <div>
          <p className="calendar-subtitle">Мой планировщик</p>
          <h2>Ноябрь 2026</h2>
        </div>

        <div className="calendar-controls">
          <button aria-label="Предыдущий месяц">‹</button>
          <button aria-label="Следующий месяц">›</button>
        </div>
      </div>

      <div className="calendar-grid">
        {weekDays.map((day) => (
          <div className="weekday" key={day}>
            {day}
          </div>
        ))}

        {/* Ноябрь 2026 начинается в воскресенье */}
        {Array.from({ length: 6 }, (_, i) => (
          <div className="calendar-empty" key={`empty-${i}`} />
        ))}

        {days.map((day) => (
          <div
            className={`calendar-day ${day === 11 ? 'selected' : ''}`}
            key={day}
          >
            <span>{day}</span>
          </div>
        ))}
      </div>
    </section>
  )
}