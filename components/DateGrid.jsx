'use client'

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const HOLIDAYS = {
  '1-1': '🎆 New Year',
  '1-26': '🇮🇳 Republic Day',
  '8-15': '🇮🇳 Independence Day',
  '10-2': '🕊️ Gandhi Jayanti',
  '12-25': '🎄 Christmas',
}

export default function DateGrid({ month, year, startDate, endDate, setStartDate, setEndDate, today, theme }) {
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const handleDayClick = (day) => {
    const clicked = new Date(year, month, day)
    if (!startDate || (startDate && endDate)) {
      setStartDate(clicked)
      setEndDate(null)
    } else {
      if (clicked < startDate) {
        setEndDate(startDate)
        setStartDate(clicked)
      } else if (clicked.toDateString() === startDate.toDateString()) {
        setStartDate(null)
      } else {
        setEndDate(clicked)
      }
    }
  }

  const getStyle = (day) => {
  const date = new Date(year, month, day)
  const isToday = today.getDate() === day && today.getMonth() === month && today.getFullYear() === year
  const isStart = startDate && date.toDateString() === startDate.toDateString()
  const isEnd = endDate && date.toDateString() === endDate.toDateString()
  const isInRange = startDate && endDate && date > startDate && date < endDate
  const isSunday = date.getDay() === 0

  if (isStart || isEnd) return { className: 'rounded-full font-bold scale-110 text-white', bg: theme.primary }
  if (isInRange) return { className: 'rounded', bg: theme.range }
  if (isToday) return { className: 'rounded-full font-bold border-2', bg: '', border: theme.primary }
  if (isSunday) return { className: 'text-red-400 hover:bg-red-50 rounded-full', bg: '' }
  return { className: 'hover:bg-amber-100 rounded-full text-stone-700', bg: '' }
}

  const holidayKey = (day) => `${month + 1}-${day}`

  return (
    <div>
      <div className="grid grid-cols-7 mb-2">
        {DAYS.map(d => (
          <div key={d} className={`text-center text-xs font-bold py-1 ${d === 'Sun' ? 'text-red-400' : 'text-stone-400'}`}>
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-1">
        {Array(firstDay).fill(null).map((_, i) => <div key={`b-${i}`} />)}
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => (
          <div
            key={day}
            onClick={() => handleDayClick(day)}
            className={`relative text-center text-sm py-1 cursor-pointer transition-all duration-150 ${getStyle(day).classname}`}
            style={{
               backgroundColor: getStyle(day).bg || undefined,
               borderColor: getStyle(day).border || undefined,
               transition: 'background-color 0.3s ease',
            }}
            title={HOLIDAYS[holidayKey(day)] || ''}
          >
            {day}
            {HOLIDAYS[holidayKey(day)] && (
              <span className="absolute -top-1 -right-1 text-xs">🔴</span>
            )}
          </div>
        ))}
      </div>

      {/* Holiday legend */}
      {Object.entries(HOLIDAYS).some(([k]) => k.startsWith(`${month + 1}-`)) && (
        <div className="mt-3 text-xs text-stone-400 border-t border-amber-100 pt-2">
          {Object.entries(HOLIDAYS)
            .filter(([k]) => k.startsWith(`${month + 1}-`))
            .map(([k, v]) => <div key={k}>🔴 {v}</div>)}
        </div>
      )}
    </div>
  )
}