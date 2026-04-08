'use client'
import { useState, useEffect } from 'react'

export default function Notes({ startDate, endDate, theme }) {
  const [noteText, setNoteText] = useState('')
  const [saved, setSaved] = useState(false)
  const [allNotes, setAllNotes] = useState({})

  const noteKey = startDate
    ? `note-${startDate.toDateString()}${endDate ? '-to-' + endDate.toDateString() : ''}`
    : null

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('calendar-all-notes') || '{}')
    setAllNotes(stored)
  }, [])

  useEffect(() => {
    if (noteKey) {
      setNoteText(allNotes[noteKey] || '')
    } else {
      setNoteText('')
    }
  }, [noteKey])

  const handleSave = () => {
    if (!noteKey) return
    const updated = { ...allNotes, [noteKey]: noteText }
    setAllNotes(updated)
    localStorage.setItem('calendar-all-notes', JSON.stringify(updated))
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleClear = () => {
    setNoteText('')
    if (noteKey) {
      const updated = { ...allNotes }
      delete updated[noteKey]
      setAllNotes(updated)
      localStorage.setItem('calendar-all-notes', JSON.stringify(updated))
    }
  }

  return (
    <div className="border-t pt-4" style={{ borderColor: theme.primary }} >
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-bold text-stone-600">📝 Notes</h3>
        {startDate && (
         <span className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: theme.range, color: theme.text }}>
            {startDate.toLocaleDateString()} {endDate && ('-> ' + endDate.toLocaleDateString())}
         </span>
        )}
      </div>
      <textarea
        value={noteText}
        onChange={e => setNoteText(e.target.value)}
        placeholder={startDate ? "Jot down notes for this date/range..." : "Select a date first to add notes..."}
        disabled={!startDate}
        className="w-full h-24 p-3 border border-amber-200 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white text-stone-700 disabled:bg-stone-50 disabled:text-stone-400"
      />
      <div className="flex gap-2 mt-2">
        <button
          onClick={handleSave}
          disabled={!startDate}
          className="px-4 py-2 text-white text-sm rounded-lg transition font-medium disabled:opacity-40"
          style={{ backgroundColor: theme.primary }}
        >
          {saved ? '✅ Saved!' : 'Save Note'}
        </button>
        <button
          onClick={handleClear}
          disabled={!startDate}
          className="px-4 py-2 bg-stone-200 text-stone-600 text-sm rounded-lg hover:bg-stone-300 transition disabled:opacity-40"
        >
          Clear
        </button>
      </div>

      {/* Show all saved notes for this month */}
      {Object.keys(allNotes).length > 0 && (
        <div className="mt-3 border-t border-amber-100 pt-2">
          <p className="text-xs font-bold text-stone-400 mb-1">📌 Saved Notes</p>
          {Object.entries(allNotes).map(([key, val]) => (
            <div key={key} className="text-xs text-stone-500 bg-amber-50 rounded px-2 py-1 mb-1">
              <span className="font-medium text-amber-700">{key.replace('note-', '')}</span>: {val}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}