
type CalendarProps = {
  selectedDate: Date
  currentMonth: Date
  onSelectDate: (date: Date) => void
  onMonthChange: (date: Date) => void
}

const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']

export default function Calendar({
  selectedDate,
  currentMonth,
  onSelectDate,
  onMonthChange,
}: CalendarProps) {
  const year = currentMonth.getFullYear()
  const month = currentMonth.getMonth()
  const today = new Date()

  // Определяем количество дней в текущем месяце
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  // Преобразуем дни недели в порядок от понедельника до воскресенья
  const firstDay = (new Date(year, month, 1).getDay() + 6) % 7

  const days = Array.from(
    { length: daysInMonth },
    (_, i) => i + 1
  )

  // Переключение месяцев
  function changeMonth(offset: number) {
    onMonthChange(new Date(year, month + offset, 1))
  }

  // Проверка выбранного дня
  function isSelected(day: number) {
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === month &&
      selectedDate.getFullYear() === year
    )
  }

  // Проверка сегодняшнего дня
  function isToday(day: number) {
    return (
      today.getDate() === day &&
      today.getMonth() === month &&
      today.getFullYear() === year
    )
  }

  // Возврат к сегодняшней дате
  function goToToday() {
    const date = new Date()

    onSelectDate(date)
    onMonthChange(new Date(date.getFullYear(), date.getMonth(), 1))
  }

  // Название текущего месяца
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

        {/* Пустые ячейки перед первым днём месяца */}
        {Array.from({ length: firstDay }, (_, i) => (
          <div
            className="calendar-empty"
            key={`empty-${i}`}
          />
        ))}

        {days.map((day) => (
          <button
            type="button"
            key={day}
            className={`calendar-day ${isSelected(day) ? 'selected' : ''} ${isToday(day) ? 'today' : ''}`}
            onClick={() => onSelectDate(new Date(year, month, day))}
            aria-pressed={isSelected(day)}
            aria-label={`${day} ${monthTitle}`}
          >
            <span>{day}</span>
          </button>
        ))}
      </div>
    </section>
  )
}
