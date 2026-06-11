export const RELATIONSHIP_START_DATE = '2020-12-23'

export type GroomStat = {
  id: string
  label: string
  value: number
  display: string
  tone: 'gold' | 'rose' | 'sage' | 'pulse'
}

export type FunFact = {
  id: number
  text: string
}

export type TodayTarget = {
  id: string
  label: string
  done: boolean
}

export const relationshipStatusQuote = {
  from: 'Lagi Apa?',
  to: 'Sudah Makan Belum?',
  caption: 'Selama bertahun-tahun.',
}

export const groomStats: GroomStat[] = [
  {
    id: 'happiness',
    label: 'Tingkat Kebahagiaan',
    value: 100,
    display: '100%',
    tone: 'gold',
  },
  {
    id: 'nervous',
    label: 'Tingkat Deg-degan',
    value: 127,
    display: '127%',
    tone: 'rose',
  },
  {
    id: 'ready',
    label: 'Tingkat Kesiapan Menikah',
    value: 78,
    display: 'Sedang Berproses',
    tone: 'sage',
  },
  {
    id: 'when-marry',
    label: 'Jumlah Pertanyaan "Kapan Nikah?"',
    value: 99,
    display: 'Tidak Terhitung',
    tone: 'pulse',
  },
]

export const funFacts: FunFact[] = [
  {
    id: 1,
    text: 'Setelah sekian lama pacaran, akhirnya kami memilih menikah daripada terus menjawab "Jadi kapan?"',
  },
  {
    id: 2,
    text: 'Foto prewedding kami memakan waktu lebih lama dari rapat keluarga besar — dan itu sudah dihitung normal.',
  },
  {
    id: 3,
    text: 'Daftar tamu undangan panjangnya rival daftar playlist Spotify kami. Spoiler: playlist menang tipis.',
  },
  {
    id: 4,
    text: 'Kami pernah berdebat soal warna dekorasi. Hasil akhir: emas. Selalu emas.',
  },
  {
    id: 5,
    text: 'Skor quiz tamu undangan saat ini belum mengalahkan skor overthinking pengantin sebelum hari H.',
  },
  {
    id: 6,
    text: 'Google Maps sudah kami buka berkali-kali. Venue tetap sama. Hati kami yang masih deg-degan.',
  },
  {
    id: 7,
    text: 'Tamu yang RSVP "Akan Hadir" otomatis masuk daftar orang yang kami sayang ekstra hari ini.',
  },
]

export const todayTargets: TodayTarget[] = [
  { id: 'akad', label: 'Akad berjalan lancar', done: true },
  { id: 'tamu', label: 'Semua tamu bahagia', done: true },
  { id: 'foto', label: 'Tidak lupa foto keluarga', done: true },
  { id: 'venue', label: 'Tidak ada yang salah masuk venue', done: true },
]

export const eventDisclaimer = {
  title: 'Peringatan:',
  items: [
    'Kebahagiaan',
    'Tawa',
    'Foto bersama',
    'Pertanyaan dari keluarga besar',
  ],
  footer: 'Harap dinikmati dengan bijak.',
}

export const marriageAchievement = {
  title: 'Achievement Unlocked',
  badge: 'Resmi Menikah',
  icon: '❤️',
  rewardLabel: 'Reward:',
  reward: 'Satu pasangan seumur hidup',
}

export const getDaysTogether = (fromDate = RELATIONSHIP_START_DATE) => {
  const start = new Date(`${fromDate}T00:00:00`)
  const now = new Date()
  const diff = now.getTime() - start.getTime()
  if (diff <= 0) return 0
  return Math.floor(diff / 86400000)
}

export const formatDaysTogether = (days: number) =>
  new Intl.NumberFormat('id-ID').format(days)

export const pickRandomFunFact = (currentId?: number) => {
  const pool = currentId
    ? funFacts.filter(fact => fact.id !== currentId)
    : funFacts

  return pool[Math.floor(Math.random() * pool.length)]
}
