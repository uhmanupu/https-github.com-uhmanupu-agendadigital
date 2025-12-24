
export interface ParishEvent {
  id: string;
  title: string;
  description: string;
  date: Date;
  time: string;
  location: string;
  category: 'Missa' | 'Atendimento' | 'Adoração' | 'Confissões' | 'Outros';
}

export interface DailyReflection {
  verse: string;
  reflection: string;
  saintOfDay: string;
  liturgicalColor: 'Verde' | 'Vermelho' | 'Branco' | 'Roxo' | 'Rosa' | 'Preto' | 'Amarelo';
  liturgicalSeason: string;
}
