
import React, { useState } from 'react';
import DaySelector from './components/DaySelector';
import { ParishEvent } from './types';
import { MOCK_EVENTS, LITURGICAL_DATA } from './constants';
import { format, isSameDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const App: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date(2025, 11, 24));
  const [events] = useState<ParishEvent[]>(MOCK_EVENTS);

  const dayEvents = events.filter(event => isSameDay(event.date, selectedDate));

  // Get liturgical data from the local constants based on current selected date
  const dateKey = format(selectedDate, 'yyyy-MM-dd');
  const liturgicalInfo = LITURGICAL_DATA[dateKey] || {
    saintOfDay: 'Paróquia N. Sra. da Conceição',
    liturgicalColor: 'Verde',
    liturgicalSeason: 'Tempo Litúrgico'
  };

  // Helper to parse sector and neighborhood from description and handle redundancy
  const getDisplayInfo = (event: ParishEvent) => {
    const desc = event.description;
    const sectorMatch = desc.match(/Setor\s*(\d+)/i);
    const bairroMatch = desc.match(/Bairro\s*([^–-]+)/i);

    const sector = sectorMatch ? sectorMatch[1] : null;
    const bairro = bairroMatch ? bairroMatch[1].trim() : null;

    // Logic for neighborhood masses as requested
    if (sector) {
      return {
        title: `Santa Missa no setor ${sector}`,
        subtitle: bairro ? `bairro: ${bairro}` : null,
        hideLocation: true, // Redundant when it's a sector mass
        isSectorEvent: true
      };
    }

    // Default logic for other events (Matriz, Atendimento, etc.)
    const cleanedDesc = desc.replace(/Santa Missa/gi, '').replace(/^[-–—]\s*/, '').trim();

    return {
      title: event.title,
      subtitle: cleanedDesc || null,
      hideLocation: false,
      isSectorEvent: false
    };
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col selection:bg-white/20 pb-20">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-blue-900/5 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-indigo-900/5 blur-[120px] rounded-full"></div>
      </div>

      {/* 3-Line Header - Using Local Data */}
      <header className="bg-slate-950/40 backdrop-blur-3xl border-b border-white/5 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center flex flex-col items-center">
            {/* Line 1: Date */}
            <span className="text-[10px] sm:text-xs text-white/40 uppercase tracking-[0.35em] font-black mb-2">
              {format(selectedDate, "EEEE, d 'de' MMMM 'de' yyyy", { locale: ptBR })}
            </span>
            
            {/* Line 2: Saint or Feast (Local Data) */}
            <h1 className="text-3xl sm:text-5xl font-bold text-white serif tracking-tight leading-tight mb-3">
              {liturgicalInfo.saintOfDay}
            </h1>
            
            {/* Line 3: Liturgical Season / Week (Local Data) */}
            <div className="flex items-center gap-4 opacity-60">
               <div className="h-[1px] w-6 bg-white/20"></div>
               <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.25em] font-black text-white/50">
                 {liturgicalInfo.liturgicalSeason}
               </p>
               <div className="h-[1px] w-6 bg-white/20"></div>
            </div>
            
            {/* Liturgical Color Accent Bar - Amarelo is now explicitly used as requested */}
            <div className={`mt-4 h-0.5 w-12 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.2)]
              ${liturgicalInfo.liturgicalColor === 'Amarelo' ? 'bg-yellow-400' : 
                liturgicalInfo.liturgicalColor === 'Roxo' ? 'bg-purple-600' : 
                liturgicalInfo.liturgicalColor === 'Verde' ? 'bg-emerald-500' : 
                liturgicalInfo.liturgicalColor === 'Vermelho' ? 'bg-red-500' : 
                liturgicalInfo.liturgicalColor === 'Rosa' ? 'bg-pink-400' : 'bg-white'}
            `}></div>
          </div>
        </div>
      </header>

      <DaySelector selectedDate={selectedDate} onDateSelect={setSelectedDate} />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-10 space-y-12 relative z-10">
        
        {/* Agenda Section */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <h2 className="text-xl font-bold text-white serif flex items-center gap-2">
              <span className="w-1 h-6 bg-white/10 rounded-full"></span>
              Programação do Dia
            </h2>
          </div>

          {dayEvents.length > 0 ? (
            <div className="grid gap-3">
              {dayEvents.sort((a, b) => a.time.localeCompare(b.time)).map(event => {
                const display = getDisplayInfo(event);
                return (
                  <div key={event.id} className="group relative bg-white/[0.04] backdrop-blur-3xl p-5 sm:p-6 rounded-[24px] border border-white/5 flex gap-5 items-center hover:bg-white/[0.08] hover:border-white/20 transition-all duration-500 shadow-xl">
                    
                    {/* Left: Time */}
                    <div className="flex flex-col items-center justify-center flex-shrink-0 w-16 sm:w-20 border-r border-white/5 pr-5">
                      <span className="text-white font-black text-2xl tracking-tighter">{event.time}</span>
                    </div>

                    {/* Middle: Event Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col mb-1.5">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-white text-lg truncate group-hover:text-yellow-200/90 transition-colors">
                            {display.title}
                          </h4>
                          {!display.isSectorEvent && (
                            <span className={`text-[7px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border border-white/10
                              ${event.category === 'Missa' ? 'text-amber-500 border-amber-500/20' : 
                                event.category === 'Atendimento' ? 'text-blue-400 border-blue-400/20' : 'text-white/40'}
                            `}>
                              {event.category}
                            </span>
                          )}
                        </div>
                        {display.subtitle && (
                          <p className={`text-[11px] tracking-tight uppercase font-bold
                            ${display.isSectorEvent ? 'text-amber-500/60' : 'text-white/40'}
                          `}>
                            {display.subtitle}
                          </p>
                        )}
                      </div>
                      
                      {!display.hideLocation && (
                        <div className="flex items-center gap-1.5 mt-1">
                          <svg className="w-3 h-3 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                          <span className="text-[10px] font-medium text-white/30 truncate uppercase tracking-wider">
                            {event.location}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Right Indicator */}
                    {display.isSectorEvent && (
                      <div className="hidden sm:block">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]"></div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white/[0.02] backdrop-blur-3xl py-24 rounded-[40px] border border-white/5 flex flex-col items-center justify-center text-center px-12">
              <svg className="w-12 h-12 text-white/5 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              <h3 className="font-bold text-white/30 text-xl serif">Sem horários públicos</h3>
              <p className="text-[11px] text-white/10 max-w-sm mt-2 italic">Aproveite para rezar em silêncio.</p>
            </div>
          )}
        </section>

        {/* Dízimo Glass Card */}
        <section className="relative group overflow-hidden rounded-[40px]">
          <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/5 to-yellow-500/5 blur-xl opacity-50 group-hover:opacity-100 transition duration-1000"></div>
          <div className="relative bg-white/5 backdrop-blur-3xl rounded-[40px] p-8 border border-white/10 flex flex-col md:flex-row items-center gap-8 shadow-2xl">
            <div className="w-16 h-16 rounded-[22px] bg-amber-500/5 flex items-center justify-center text-amber-500 border border-amber-500/20">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
            </div>
            <div className="text-center md:text-left flex-1 space-y-1">
              <h3 className="text-xl font-bold text-white serif">Dízimo: Gesto de Amor</h3>
              <p className="text-xs text-white/30 font-light">Colabore com a manutenção da nossa amada Paróquia em Virgínia.</p>
            </div>
            <button className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-black text-[9px] tracking-[0.2em] border border-white/10 transition-all uppercase">
              Contribua
            </button>
          </div>
        </section>

        {/* Action Grid */}
        <div className="grid grid-cols-2 gap-4">
          <button className="flex flex-col items-center justify-center gap-4 p-6 bg-white/[0.02] backdrop-blur-3xl rounded-[32px] border border-white/5 hover:bg-white/[0.06] transition-all group shadow-xl">
             <div className="w-12 h-12 rounded-2xl bg-white/[0.03] flex items-center justify-center text-white/20 border border-white/5 group-hover:text-blue-400 transition-all">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
             </div>
             <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white/30 group-hover:text-white transition-colors">Secretaria</span>
          </button>
          <button className="flex flex-col items-center justify-center gap-4 p-6 bg-white/[0.02] backdrop-blur-3xl rounded-[32px] border border-white/5 hover:bg-white/[0.06] transition-all group shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-white/[0.03] flex items-center justify-center text-white/20 border border-white/5 group-hover:text-pink-400 transition-all">
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
            </div>
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white/30 group-hover:text-white transition-colors">Galeria</span>
          </button>
        </div>
      </main>

      <footer className="py-20 bg-slate-950/80 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center space-y-4 px-6">
          <p className="text-white font-bold text-xl serif opacity-80">Paróquia Nossa Senhora da Conceição</p>
          <p className="text-[9px] uppercase tracking-[0.5em] text-white/20 font-black">Virgínia • Minas Gerais • Brasil</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
