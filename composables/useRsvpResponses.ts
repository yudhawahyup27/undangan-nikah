export const RSVP_ATTENDING_MESSAGES = [
  'Mantap! Satu kursi berhasil menemukan pemiliknya.',
  'Kabar diterima. Pengantin tersenyum, panitia mengangguk puas.',
  'Terima kasih! Tingkat kemeriahan acara naik sedikit berkat Anda.',
  'Baiklah, kami tunggu kehadiran Anda dan versi terbaik outfit Anda.',
  'Selamat! Nama Anda resmi masuk daftar tamu pilihan semesta.',
  'Kehadiran dikonfirmasi. Jangan lupa bawa senyum, yang lain menyusul.',
  'Terima kasih! Peluang Anda diajak foto mendadak kini meningkat drastis.',
  'Sip! Acara ini akan sedikit lebih seru karena Anda datang.',
  'Kabar baik! Pengantin kini punya satu orang lagi untuk diajak berfoto.',
  'Terima kasih. Google Maps semoga mendukung keputusan ini.',
  'Mantap! Kami sudah mencadangkan ruang untuk kenangan bersama Anda.',
  'RSVP berhasil. Tantangan berikutnya: jangan salah tanggal.',
  'Selamat! Anda berhasil melewati level pertama acara ini.',
  'Kehadiran Anda berhasil dicatat dan disambut dengan penuh sukacita.',
  'Baiklah, sampai jumpa di lokasi. Semoga parkir berpihak kepada Anda.',
  'Terima kasih! Acara ini kini terasa sedikit lebih lengkap.',
  'Kabar baik diterima. Pengantin resmi punya alasan tambahan untuk tersenyum.',
  'Kehadiran Anda membuat statistik kebahagiaan kami meningkat hari ini.',
  'Mantap! Satu tamu hebat lagi akan meramaikan acara.',
  'Kami tunggu kedatangannya. Jangan biarkan kursinya kesepian.',
]

export const RSVP_NOT_ATTENDING_MESSAGES = [
  'Tidak apa-apa, kami mengerti. Doa Anda tetap sampai tujuan.',
  'Terima kasih sudah memberi kabar. Itu sangat berarti bagi kami.',
  'Yah, sayang sekali. Tapi kami senang Anda sempat merespons.',
  'Kehadiran fisik dibatalkan, dukungan moral tetap diterima.',
  'Kami akan merindukan kehadiran Anda, meski hanya sebentar.',
  'Terima kasih. Kursi Anda akan kami titipkan pada takdir.',
  'Tidak masalah. Yang penting silaturahmi tetap berjalan.',
  'Kami mengerti. Semoga lain waktu kita bisa bertemu dan bercerita.',
  'Terima kasih atas doa dan restunya. Kami sangat menghargainya.',
  'Status Anda berubah menjadi tamu kehormatan jarak jauh.',
  'Tenang saja, kebahagiaan kami tetap akan kami bagikan lewat foto-foto nanti.',
  'Terima kasih sudah jujur. Itu lebih baik daripada membuat kami menebak-nebak.',
  'Kami paham. Kadang jadwal memang punya rencana sendiri.',
  'Tidak hadir bukan berarti tidak peduli. Terima kasih atas perhatiannya.',
  'Kami tetap mengirimkan salam hangat untuk Anda.',
  'Sayang sekali, tapi kami sepenuhnya mengerti.',
  'Terima kasih. Kehadiran mungkin tertunda, doa tetap sampai.',
  'Baiklah, kami simpan kursinya di kenangan saja.',
  'Kami akan memastikan ada cukup foto untuk membuat Anda penasaran.',
  'Terima kasih telah meluangkan waktu untuk memberi kabar.',
]

export const getRandomRsvpResponse = (attending: boolean) => {
  const pool = attending ? RSVP_ATTENDING_MESSAGES : RSVP_NOT_ATTENDING_MESSAGES
  return pool[Math.floor(Math.random() * pool.length)]
}
