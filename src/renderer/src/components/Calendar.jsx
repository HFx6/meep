import React from 'react';


export function Calendar({ month, year, days, currentDay }) {
  return (
    <div className="fixed top-12 right-12 bg-[#1d1d1d] p-4 rounded-xl shadow-lg">
      <div className="text-sm mb-3 text-gray-300">{month} {year}</div>
      <div className="grid grid-cols-7 gap-1 text-center text-sm mb-1">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
          <div key={day} className="text-gray-500 text-xs">{day}</div>
        ))}
        {days.map(day => (
          <div
            key={day}
            className={`w-6 h-6 flex items-center justify-center rounded-full text-sm
              ${day === currentDay ? 'bg-[#6246ea] text-white' : 'text-gray-400'}`}
          >
            {day}
          </div>
        ))}
      </div>
      <div className="mt-4 text-sm">
        <div className="text-gray-300">6.8°C Overcast</div>
        <div className="text-gray-500 text-xs">↑ 7°C ↓ 2°C 📍 Fukuoka</div>
      </div>
    </div>
  );
}