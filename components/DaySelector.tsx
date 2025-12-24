
import React, { useRef, useEffect } from 'react';
import { format, addDays, subDays, startOfToday, isSameDay, eachDayOfInterval } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface DaySelectorProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  accentColor?: string;
}

const DaySelector: React.FC<DaySelectorProps> = ({ selectedDate, onDateSelect }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const today = startOfToday();
  
  // Larger range for the horizontal scroll
  const days = eachDayOfInterval({
    start: subDays(today, 10),
    end: addDays(today, 30)
  });

  useEffect(() => {
    const activeElement = scrollRef.current?.querySelector('[data-active="true"]');
    if (activeElement) {
      activeElement.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }, [selectedDate]);

  return (
    <div className="w-full bg-slate-950/60 backdrop-blur-md border-b border-white/5 py-4">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center gap-4">
          {/* Quick Prev Button */}
          <button 
            onClick={() => onDateSelect(subDays(selectedDate, 1))}
            className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl text-white/60 transition-all border border-white/10 shadow-lg group"
          >
            <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" /></svg>
          </button>

          {/* Scrolling Day Row */}
          <div 
            ref={scrollRef}
            className="flex-1 flex gap-4 overflow-x-auto pb-4 no-scrollbar scroll-smooth"
          >
            {days.map((day) => {
              const isSelected = isSameDay(day, selectedDate);
              const isToday = isSameDay(day, today);
              
              return (
                <button
                  key={day.toISOString()}
                  data-active={isSelected}
                  onClick={() => onDateSelect(day)}
                  className={`flex-shrink-0 w-14 py-4 rounded-2xl flex flex-col items-center transition-all duration-500 border
                    ${isSelected 
                      ? 'bg-white/10 text-white border-white/30 shadow-[0_0_25px_rgba(255,255,255,0.05)] scale-110 z-10' 
                      : 'bg-white/[0.02] text-white/30 border-transparent hover:bg-white/5 hover:text-white/50'}
                    ${isToday && !isSelected ? 'ring-1 ring-white/10' : ''}
                  `}
                >
                  <span className="text-[9px] uppercase font-black mb-1 tracking-widest">
                    {format(day, 'EEE', { locale: ptBR })}
                  </span>
                  <span className="text-lg font-black tracking-tighter">
                    {format(day, 'd')}
                  </span>
                  {isToday && (
                    <div className={`w-1 h-1 rounded-full mt-1 ${isSelected ? 'bg-white' : 'bg-white/20'}`}></div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick Next Button */}
          <button 
            onClick={() => onDateSelect(addDays(selectedDate, 1))}
            className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl text-white/60 transition-all border border-white/10 shadow-lg group"
          >
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DaySelector;
