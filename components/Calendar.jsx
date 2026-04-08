'use client'

import { useState, useEffect } from 'react'
import DateGrid from './DateGrid'
import Notes from './Notes'
import { MONTH_THEMES } from './themes'; 
const MONTH_NAMES = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December'
]

const MONTH_IMAGES = [
  '/images/jan.jpg',
  '/images/feb.jpg',
  '/images/mar.jpg',
  '/images/apr.jpg',
  '/images/may.jpg',
  '/images/jun.jpg',
  '/images/jul.jpg',
  '/images/aug.jpg',
  '/images/sep.jpg',
  '/images/oct.jpg',
  '/images/nov.jpg',
  '/images/dec.jpg',
]
export default function Calendar() {
  const today = new Date()
  const [currentMonth, setCurrentMonth] = useState(today.getMonth())
  const [currentYear, setCurrentYear] = useState(today.getFullYear())
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [animating, setAnimating] = useState(false)
  const [direction, setDirection] = useState('next')
  const theme = MONTH_THEMES[currentMonth];

  const changeMonth = (dir) => {
    setDirection(dir)
    setAnimating(true)
    setTimeout(() => {
      if (dir === 'next') {
        if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(y => y + 1) }
        else setCurrentMonth(m => m + 1)
      } else {
        if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(y => y - 1) }
        else setCurrentMonth(m => m - 1)
      }
      setStartDate(null)
      setEndDate(null)
      setAnimating(false)
    }, 300)
  }

  return (
    <div
         className="min-h-screen flex items-center justify-center p-4"
         style={{
            backgroundColor: theme.bg,
            color: theme.text,
            transition: 'background-color 0.4s ease, color 0.4s ease',
           }}
        >
      <div className="w-full max-w-5xl rounded-2xl shadow-2xl overflow-hidden border border-stone-300"
         style={{
            borderColor: theme.primary,
            fontFamily: 'var(--font-lato), sans-serif',
            transition: 'border-color 0.4s ease',
            }}
        >
        {/* Calendar binding holes */}
        <div className="bg-stone-800 h-8 flex items-center justify-around px-8">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="w-4 h-4 rounded-full bg-stone-500 border-2 border-stone-400" />
          ))}
        </div>

        <div className="flex flex-col md:flex-row">

          {/* Left Panel - Hero Image */}
          <div className="md:w-2/5 relative min-h-64">
            <img
              src={MONTH_IMAGES[currentMonth]}
              alt={MONTH_NAMES[currentMonth]}
              className="w-full h-72 md:h-full object-cover transition-opacity duration-500"
              style={{ opacity: animating ? 0 : 1 }}
            />
            {/* Overlay with month name */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
            <p className="text-5xl font-bold text-white drop-shadow" style={{fontFamily: 'Georgia, serif', letterSpacing: '2px'}}>{MONTH_NAMES[currentMonth]}</p>
            <p className="text-2xl text-white/80">{currentYear}</p>
            </div>
          </div>

          {/* Right Panel */}
          <div className="md:w-3/5 bg-amber-50 p-6 flex flex-col gap-4">

            {/* Month Navigation */}
            <div className="flex items-center justify-between border-b border-amber-200 pb-3">
              <button
                onClick={() => changeMonth('prev')}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-amber-100 hover:bg-amber-300 text-amber-800 font-bold text-lg transition"
              >
                ‹
              </button>
              <div className="text-center">
                <h2 className="text-xl font-bold text-stone-700">{MONTH_NAMES[currentMonth]} {currentYear}</h2>
                <p className="text-xs text-stone-400">Today is {today.toDateString()}</p>
              </div>
              <button
                onClick={() => changeMonth('next')}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-amber-100 hover:bg-amber-300 text-amber-800 font-bold text-lg transition"
              >
                ›
              </button>
            </div>

            {/* Date Grid */}
            <div style={{ opacity: animating ? 0 : 1, transition: 'opacity 0.3s' }}>
              <DateGrid
                month={currentMonth}
                year={currentYear}
                startDate={startDate}
                endDate={endDate}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
                today={today}
                theme={theme}
              />
            </div>

            {/* Selected Range Display */}
            {startDate && (
              <div className="bg-amber-100 border border-amber-300 rounded-lg px-4 py-2 text-sm text-amber-800">
                📅 <strong>Selected:</strong> {startDate.toDateString()}
                {endDate && <> → {endDate.toDateString()}</>}
              </div>
            )}

            {/* Notes */}
            <Notes 
                startDate={startDate} 
                endDate={endDate} 
                theme={theme}
              />

          </div>
        </div>
      </div>
    </div>
  )
}