export type QuizAnswer = 'pria' | 'wanita'

export type QuizQuestion = {
  id: number
  text: string
  correct: QuizAnswer
  hint: string
}

export const QUIZ_ROUND_SIZE = 5

export const BRIDE_LABEL = 'Pengantin Wanita'
export const GROOM_LABEL = 'Pengantin Pria'
export const BRIDE_NAME = 'Nur Kotimah'
export const GROOM_NAME = 'Yudha Wahyu Pratama'

export const quizQuestionPool: QuizQuestion[] = [
  {
    id: 1,
    text: 'Siapa yang lebih dulu mengajak ngobrol?',
    correct: 'pria',
    hint: 'Awalnya iseng chat dulu, eh malah jadi langganan tiap hari.',
  },
  {
    id: 2,
    text: 'Siapa yang lebih sering terlambat?',
    correct: 'wanita',
    hint: 'Jam sudah di-set, tapi proses berangkatnya masih butuh waktu ekstra.',
  },
  {
    id: 3,
    text: 'Siapa yang lebih suka foto-foto?',
    correct: 'wanita',
    hint: 'Angle, pencahayaan, dan retake — standarnya tinggi banget.',
  },
  {
    id: 4,
    text: 'Siapa yang paling lama memilih tempat makan?',
    correct: 'wanita',
    hint: 'Scroll menu online dulu, baru deh mutusin mau makan apa.',
  },
  {
    id: 5,
    text: 'Siapa yang paling sering mengucapkan "terserah"?',
    correct: 'pria',
    hint: 'Biar cepat, sering keluar kalimat andalan ini.',
  },
  {
    id: 6,
    text: 'Siapa yang lebih dulu bilang "aku kangen"?',
    correct: 'wanita',
    hint: 'Malu-malu awalnya, tapi perasaan paling cepat keluar.',
  },
  {
    id: 7,
    text: 'Siapa yang lebih sering minta maaf duluan?',
    correct: 'pria',
    hint: 'Kalau ada salah paham, yang ini suka datang duluan biar damai lagi.',
  },
  {
    id: 8,
    text: 'Siapa yang lebih sering bilang "udah terserah kamu aja"?',
    correct: 'pria',
    hint: 'Kata magic biar rencana cepat jalan.',
  },
  {
    id: 9,
    text: 'Siapa yang lebih lama siap-siap kalau mau pergi?',
    correct: 'wanita',
    hint: 'Outfit, riasan, dan cek tas — ritual wajib sebelum berangkat.',
  },
  {
    id: 10,
    text: 'Siapa yang lebih sering lupa naruh barang?',
    correct: 'pria',
    hint: 'Kunci, dompet, atau charger? Pernah deh kejadian.',
  },
  {
    id: 11,
    text: 'Siapa yang lebih sering lapar tengah malam?',
    correct: 'pria',
    hint: 'Jam sudah larut, tapi tiba-tiba ingin camilan atau makanan pedas.',
  },
  {
    id: 12,
    text: 'Siapa yang lebih duluan ngantuk dan pengen tidur?',
    correct: 'pria',
    hint: 'Begadang? Bisa, tapi jam tertentu otomatis mode ngantuk nyala.',
  },
  {
    id: 13,
    text: 'Siapa yang lebih sering chat "lagi di mana?"',
    correct: 'wanita',
    hint: 'Update lokasi jadi hal wajib biar tenang.',
  },
  {
    id: 14,
    text: 'Siapa yang lebih jago masak?',
    correct: 'wanita',
    hint: 'Racikan dapur andalan pasangan ini sering jadi favorit.',
  },
  {
    id: 15,
    text: 'Siapa yang lebih sering binge-watch?',
    correct: 'wanita',
    hint: '"Satu episode aja" sering berubah jadi maraton.',
  },
  {
    id: 16,
    text: 'Siapa yang lebih cepat tersenyum kalau difoto?',
    correct: 'wanita',
    hint: 'Pose natural langsung on point begitu kamera nyala.',
  },
  {
    id: 17,
    text: 'Siapa yang lebih sering belanja online?',
    correct: 'wanita',
    hint: 'Notifikasi ekspedisi jadi soundtrack harian.',
  },
  {
    id: 18,
    text: 'Siapa yang lebih sering nyalain AC super dingin?',
    correct: 'pria',
    hint: 'Suhu ruangan favoritnya beda jauh dari pasangannya.',
  },
  {
    id: 19,
    text: 'Siapa yang lebih sering nyanyi di mobil?',
    correct: 'wanita',
    hint: 'Playlist road trip wajib ikut ikutan vokal.',
  },
  {
    id: 20,
    text: 'Siapa yang lebih pelupa tanggal kecil-kecilan?',
    correct: 'pria',
    hint: 'Tanggal penting diingat, yang kecil-kecil kadang perlu reminder.',
  },
  {
    id: 21,
    text: 'Siapa yang lebih sering rencanain liburan detail?',
    correct: 'wanita',
    hint: 'Itinerary, spot foto, dan tempat makan sudah ter-mapping.',
  },
  {
    id: 22,
    text: 'Siapa yang lebih sering ngajak jalan-jalan spontan?',
    correct: 'pria',
    hint: 'Ide dadakan muncul: "Yuk keluar, sekarang!"',
  },
  {
    id: 23,
    text: 'Siapa yang lebih sering boros kata "sayang"?',
    correct: 'wanita',
    hint: 'Panggilan manis jadi refleks sehari-hari.',
  },
  {
    id: 24,
    text: 'Siapa yang lebih sering bawa payung atau tas berisi banyak barang?',
    correct: 'wanita',
    hint: 'Siap-siap ala survival kit mini.',
  },
  {
    id: 25,
    text: 'Siapa yang lebih sering menang debat ringan?',
    correct: 'wanita',
    hint: 'Argumentasi halus tapi mantap — susah dibantah.',
  },
]

export function shuffleArray<T>(items: T[]): T[] {
  const copy = [...items]
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

export function pickRandomQuestions(count = QUIZ_ROUND_SIZE): QuizQuestion[] {
  return shuffleArray(quizQuestionPool).slice(0, Math.min(count, quizQuestionPool.length))
}

export function getResultMessage(score: number, total = QUIZ_ROUND_SIZE) {
  if (score >= total) return 'Wah, kamu benar-benar mengenal pengantin! ❤️'
  if (score >= 3) return 'Lumayan kenal pengantin ya 😊'
  return 'Wah, sepertinya kita baru kenalan nih 😆'
}

export function answerLabel(answer: QuizAnswer) {
  return answer === 'pria' ? GROOM_LABEL : BRIDE_LABEL
}
