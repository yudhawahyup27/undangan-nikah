const OPENING_AUDIO = '/audio/ucapan pembukaan.ogg'
const BGM_SRC = '/audio/lagu.mp3'

let bgmAudio: HTMLAudioElement | null = null
let openingAudio: HTMLAudioElement | null = null
let openingPlayed = false
let bgmStoppedByUser = false

const isPlaying = useState<boolean>('wedding-music-playing', () => false)

const restartBgm = () => {
  if (!bgmAudio || bgmStoppedByUser) return
  bgmAudio.currentTime = 0
  bgmAudio.play().then(() => {
    isPlaying.value = true
  }).catch(() => {
    isPlaying.value = false
  })
}

const getBgmAudio = () => {
  if (!import.meta.client) return null

  if (!bgmAudio) {
    bgmAudio = new Audio(BGM_SRC)
    bgmAudio.loop = true
    bgmAudio.preload = 'auto'
    bgmAudio.volume = 0.4

    bgmAudio.addEventListener('ended', () => {
      // Fallback loop jika browser tidak mengulang otomatis.
      restartBgm()
    })

    bgmAudio.addEventListener('pause', () => {
      if (bgmAudio?.paused) isPlaying.value = false
    })

    bgmAudio.addEventListener('play', () => {
      isPlaying.value = true
    })
  }

  return bgmAudio
}

const getOpeningAudio = () => {
  if (!import.meta.client) return null

  if (!openingAudio) {
    openingAudio = new Audio(encodeURI(OPENING_AUDIO))
    openingAudio.preload = 'auto'
    openingAudio.volume = 1
    openingAudio.addEventListener('ended', () => {
      playBgm()
    })
  }

  return openingAudio
}

const playBgm = async () => {
  const el = getBgmAudio()
  if (!el) return false

  if (isPlaying.value && !el.paused) return true

  bgmStoppedByUser = false
  el.loop = true
  el.volume = 0.4

  try {
    await el.play()
    isPlaying.value = true
    return true
  } catch {
    isPlaying.value = false
    return false
  }
}

export function useWeddingMusic() {
  const preloadMusic = () => {
    getOpeningAudio()?.load()
    getBgmAudio()?.load()
  }

  /** Ucapan pembukaan — hanya dipanggil saat klik "Buka Undangan". */
  const playOpening = async () => {
    if (openingPlayed) {
      await playBgm()
      return
    }

    const el = getOpeningAudio()
    if (!el) {
      await playBgm()
      return
    }

    openingPlayed = true

    try {
      el.currentTime = 0
      await el.play()
    } catch {
      await playBgm()
    }
  }

  const startMusic = async () => {
    await playBgm()
  }

  const toggleMusic = async () => {
    const el = getBgmAudio()
    if (!el) return

    if (isPlaying.value) {
      bgmStoppedByUser = true
      el.pause()
      isPlaying.value = false
      return
    }

    bgmStoppedByUser = false
    await playBgm()
  }

  const pauseMusic = () => {
    bgmAudio?.pause()
    openingAudio?.pause()
    isPlaying.value = false
  }

  return {
    isPlaying,
    preloadMusic,
    playOpening,
    startMusic,
    toggleMusic,
    pauseMusic,
  }
}
