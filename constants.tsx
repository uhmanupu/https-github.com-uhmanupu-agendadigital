
import { ParishEvent, DailyReflection } from './types';

export const COLORS = {
  primary: '#1e40af',
  secondary: '#d4af37',
  accent: '#eff6ff',
};

export const LITURGICAL_DATA: Record<string, Omit<DailyReflection, 'verse' | 'reflection'>> = {
  '2025-12-23': { saintOfDay: 'São João de Kenty', liturgicalColor: 'Roxo', liturgicalSeason: 'Advento' },
  '2025-12-24': { saintOfDay: 'Véspera de Natal', liturgicalColor: 'Amarelo', liturgicalSeason: 'Advento (Véspera de Natal)' },
  '2025-12-25': { saintOfDay: 'Natal do Senhor (Solenidade)', liturgicalColor: 'Amarelo', liturgicalSeason: 'Natal' },
  '2025-12-26': { saintOfDay: 'Santo Estêvão (Primeiro Mártir)', liturgicalColor: 'Vermelho', liturgicalSeason: 'Oitava de Natal' },
  '2025-12-27': { saintOfDay: 'São João Evangelista (Apóstolo)', liturgicalColor: 'Amarelo', liturgicalSeason: 'Oitava de Natal' },
  '2025-12-28': { saintOfDay: 'Sagrada Família (Solenidade)', liturgicalColor: 'Amarelo', liturgicalSeason: 'Oitava de Natal' },
  '2025-12-29': { saintOfDay: 'São Tomás Becket', liturgicalColor: 'Amarelo', liturgicalSeason: 'Oitava de Natal' },
  '2025-12-30': { saintOfDay: '6º Dia da Oitava de Natal', liturgicalColor: 'Amarelo', liturgicalSeason: 'Oitava de Natal' },
  '2025-12-31': { saintOfDay: 'São Silvestre I (Papa)', liturgicalColor: 'Amarelo', liturgicalSeason: 'Oitava de Natal' },
  '2026-01-01': { saintOfDay: 'Santa Maria, Mãe de Deus (Solenidade)', liturgicalColor: 'Amarelo', liturgicalSeason: 'Natal' },
  '2026-01-02': { saintOfDay: 'Santos Basílio Magno e Gregório Nazianzeno', liturgicalColor: 'Amarelo', liturgicalSeason: 'Tempo do Natal' },
  '2026-01-03': { saintOfDay: 'Santíssimo Nome de Jesus', liturgicalColor: 'Amarelo', liturgicalSeason: 'Tempo do Natal' },
};

export const MOCK_EVENTS: ParishEvent[] = [
  // 23/12 - Terça-feira
  { id: 'e1', title: 'Atendimento', description: 'Atendimento com hora marcada', date: new Date(2025, 11, 23), time: '14:00', location: 'Secretaria Paroquial', category: 'Atendimento' },
  { id: 'e2', title: 'Santa Missa', description: 'Setor 5 – Bairro Marques', date: new Date(2025, 11, 23), time: '19:00', location: 'Bairro Marques', category: 'Missa' },
  
  // 24/12 - Quarta-feira
  { id: 'e3', title: 'Santa Missa', description: 'Missa da Vigília de Natal', date: new Date(2025, 11, 24), time: '17:00', location: 'Igreja Matriz', category: 'Missa' },
  { id: 'e4', title: 'Santa Missa', description: 'Setor 6 – Bairro São José da Mantiqueira', date: new Date(2025, 11, 24), time: '19:00', location: 'Bairro São José da Mantiqueira', category: 'Missa' },
  { id: 'e5', title: 'Santa Missa', description: 'Missa da Noite de Natal', date: new Date(2025, 11, 24), time: '20:00', location: 'Igreja Matriz', category: 'Missa' },
  { id: 'e6', title: 'Santa Missa', description: 'Setor 7 – Bairro Roseirinha', date: new Date(2025, 11, 24), time: '21:00', location: 'Bairro Roseirinha', category: 'Missa' },

  // 25/12 - Quinta-feira
  { id: 'e7', title: 'Santa Missa', description: 'Natal do Senhor', date: new Date(2025, 11, 25), time: '09:00', location: 'Igreja Matriz', category: 'Missa' },
  { id: 'e8', title: 'Santa Missa', description: 'Setor 7 – Bairro Rio Acima II', date: new Date(2025, 11, 25), time: '10:00', location: 'Bairro Rio Acima II', category: 'Missa' },
  { id: 'e9', title: 'Santa Missa', description: 'Setor 1 – Bairro Mendes', date: new Date(2025, 11, 25), time: '11:00', location: 'Bairro Mendes', category: 'Missa' },
  { id: 'e10', title: 'Santa Missa', description: 'Natal do Senhor', date: new Date(2025, 11, 25), time: '19:00', location: 'Igreja Matriz', category: 'Missa' },

  // 26/12 - Sexta-feira
  { id: 'e11', title: 'Atendimento', description: 'Com hora marcada', date: new Date(2025, 11, 26), time: '09:00', location: 'Secretaria', category: 'Atendimento' },
  { id: 'e12', title: 'Atendimento', description: 'Com hora marcada', date: new Date(2025, 11, 26), time: '14:00', location: 'Secretaria', category: 'Atendimento' },
  { id: 'e13', title: 'Santa Missa', description: 'Sagrado Coração de Jesus', date: new Date(2025, 11, 26), time: '19:00', location: 'Igreja Matriz / Sagrado Coração', category: 'Missa' },
  { id: 'e14', title: 'Santa Missa', description: 'Setor 5 – Bairro Roseira', date: new Date(2025, 11, 26), time: '19:00', location: 'Bairro Roseira', category: 'Missa' },

  // 27/12 - Sábado
  { id: 'e15', title: 'Santa Missa', description: 'São João Evangelista', date: new Date(2025, 11, 27), time: '16:00', location: 'Igreja Matriz', category: 'Missa' },
  { id: 'e16', title: 'Santa Missa', description: 'Missa no Hotel', date: new Date(2025, 11, 27), time: '18:00', location: 'Hotel', category: 'Missa' },
  { id: 'e17', title: 'Santa Missa', description: 'São João Evangelista', date: new Date(2025, 11, 27), time: '19:00', location: 'Igreja Matriz', category: 'Missa' },

  // 28/12 - Domingo
  { id: 'e18', title: 'Santa Missa', description: 'Sagrada Família', date: new Date(2025, 11, 28), time: '07:00', location: 'Igreja Matriz', category: 'Missa' },
  { id: 'e19', title: 'Santa Missa', description: 'Sagrada Família', date: new Date(2025, 11, 28), time: '09:00', location: 'Igreja Matriz', category: 'Missa' },
  { id: 'e20', title: 'Santa Missa', description: 'Setor 3 – Bairro Corrêas', date: new Date(2025, 11, 28), time: '09:00', location: 'Bairro Corrêas', category: 'Missa' },
  { id: 'e21', title: 'Santa Missa', description: 'Setor 2 – Bairro Porto', date: new Date(2025, 11, 28), time: '18:00', location: 'Bairro Porto', category: 'Missa' },
  { id: 'e22', title: 'Santa Missa', description: 'Sagrada Família', date: new Date(2025, 11, 28), time: '19:00', location: 'Igreja Matriz', category: 'Missa' },

  // 29/12 - Segunda-feira
  { id: 'e23', title: 'Visita às obras', description: 'Acompanhamento', date: new Date(2025, 11, 29), time: '09:00', location: 'Canteiros de Obras', category: 'Outros' },

  // 30/12 - Terça-feira
  { id: 'e24', title: 'Atendimento', description: 'Com hora marcada', date: new Date(2025, 11, 30), time: '14:00', location: 'Secretaria', category: 'Atendimento' },
  { id: 'e25', title: 'Santa Missa', description: 'Setor 7 – Bairro Palmeiras', date: new Date(2025, 11, 30), time: '19:00', location: 'Bairro Palmeiras', category: 'Missa' },

  // 31/12 - Quarta-feira
  { id: 'e26', title: 'Santa Missa', description: 'Missa de Fim de Ano', date: new Date(2025, 11, 31), time: '17:00', location: 'Igreja Matriz', category: 'Missa' },
  { id: 'e27', title: 'Adoração', description: 'Adoração ao Santíssimo', date: new Date(2025, 11, 31), time: '18:30', location: 'Igreja Matriz', category: 'Adoração' },
  { id: 'e28', title: 'Santa Missa', description: 'Missa da Véspera de Ano Novo', date: new Date(2025, 11, 31), time: '19:30', location: 'Igreja Matriz', category: 'Missa' },
  { id: 'e29', title: 'Santa Missa', description: 'Setor 7 – Bairro Vargem Alegre', date: new Date(2025, 11, 31), time: '19:30', location: 'Bairro Vargem Alegre', category: 'Missa' },

  // 01/01 - Quinta-feira
  { id: 'e30', title: 'Santa Missa', description: 'Setor 4 – Bairro Moreira', date: new Date(2026, 0, 1), time: '09:00', location: 'Bairro Moreira', category: 'Missa' },
  { id: 'e31', title: 'Santa Missa', description: 'Missa no Hotel', date: new Date(2026, 0, 1), time: '11:00', location: 'Hotel', category: 'Missa' },
  { id: 'e32', title: 'Santa Missa', description: 'Setor 1 – Bairro Retirinho', date: new Date(2026, 0, 1), time: '16:00', location: 'Bairro Retirinho', category: 'Missa' },
  { id: 'e33', title: 'Adoração', description: 'Adoração ao Santíssimo', date: new Date(2026, 0, 1), time: '18:00', location: 'Igreja Matriz', category: 'Adoração' },
  { id: 'e34', title: 'Santa Missa', description: 'Santa Maria, Mãe de Deus', date: new Date(2026, 0, 1), time: '19:00', location: 'Igreja Matriz', category: 'Missa' },

  // 02/01 - Sexta-feira
  { id: 'e35', title: 'Atendimento', description: 'Com hora marcada', date: new Date(2026, 0, 2), time: '09:00', location: 'Secretaria', category: 'Atendimento' },
  { id: 'e36', title: 'Atendimento', description: 'Com hora marcada', date: new Date(2026, 0, 2), time: '14:00', location: 'Secretaria', category: 'Atendimento' },
  { id: 'e37', title: 'Confissões', description: 'Igreja Matriz', date: new Date(2026, 0, 2), time: '17:00', location: 'Igreja Matriz', category: 'Confissões' },
  { id: 'e38', title: 'Adoração', description: 'Igreja Matriz', date: new Date(2026, 0, 2), time: '18:00', location: 'Igreja Matriz', category: 'Adoração' },
  { id: 'e39', title: 'Santa Missa', description: 'Missa Mensal', date: new Date(2026, 0, 2), time: '19:00', location: 'Igreja Matriz', category: 'Missa' },
  { id: 'e40', title: 'Santa Missa', description: 'Setor 5 – Bairro Morangal', date: new Date(2026, 0, 2), time: '19:00', location: 'Bairro Morangal', category: 'Missa' },
];
