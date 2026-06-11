import { writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const imaGuests = [
  ['Pak Galih (BPR)', 'TI'], ['Pak Sudirman (BPR)', 'TI'], ['Bu Ilma (BPR)', 'TI'], ['Tiara (BPR)', 'TI'],
  ['Mba Kiki (BPR)', 'TI'], ['Mba Dini (BPR)', 'TI'], ['Bu Dian (BPR)', 'TI'], ['Bu Harnik (BPR)', 'TI'],
  ['Bu Nia (BPR)', 'TI'], ['Bu Reni (BPR)', 'TI'], ['Tazkia (BPR)', 'TI'], ['Bu Nita (BPR)', 'TI'],
  ['Pak Adik (BPR)', 'TI'], ['Pak Podi (BPR)', 'TI'], ['Pak Yusuf (BPR)', 'TI'], ['Pak Fajar Pusat (BPR)', 'TI'],
  ['Mas Angga (BPR)', 'TI'], ['Pak Chandra (BPR)', 'TI'], ['Pak Iswanto (BPR)', 'TI'], ['Pak Rosi (BPR)', 'TI'],
  ['Pak Imam (BPR)', 'TI'], ['Pak Bagus (BPR)', 'TI'], ['Pak Bagus Kolek baru (BPR)', 'TI'], ['Pak Prih (BPR)', 'TI'],
  ['Pak Taslim (BPR)', 'TI'], ['Pak Excy (BPR)', 'TI'], ['Bu Endah (BPR)', 'TI'], ['Bu Inu (BPR)', 'TI'],
  ['Bu Yuli (BPR)', 'TI'], ['Bu Yuni (BPR)', 'TI'], ['Mba Desy (BPR)', 'TI'], ['Mba Rara (BPR)', 'TI'],
  ['Bu Ari (BPR)', 'TI'], ['Mba Natasha (BPR)', 'TI'], ['Pak Linggih (BPR)', 'TI'], ['Pak Yudha (BPR)', 'TI'],
  ['Pak Rohmat (BPR)', 'TI'], ['Pak Zainul (BPR)', 'TI'], ['Pak Fajar Cabang (BPR)', 'TI'], ['Pak Bro (BPR)', 'TI'],
  ['Mba Lili (BPR)', 'TI'], ['Maulana (BPR)', 'TI'], ['Bu Tiwi (SSS)', 'TI'], ['Mba Diana (SSS)', 'TI'],
  ['Silfiana (SSS)', 'TI'], ['Irza (SSS)', 'TI'], ['Zahro (SSS)', 'TI'], ['Mba Widya (SSS)', 'TI'],
  ['Fahri (SSS)', 'TI'], ['Aryan (SSS)', 'TI'], ['Mba Santi', 'TI'], ['Agil', 'TI'],
  ['Aini (SMP)', 'TI'], ['Amala (SD)', 'TI'], ['Fitri (SD)', 'TI'], ['Nanik (SD)', 'TI'],
  ['Novi (SD)', 'TI'], ['Fitha (SMP)', 'TI'], ['Yesra (SMP)', 'TI'], ['Awa teman Kpop', 'TI'],
  ['Ayu (SD)', 'TI'], ['Juned (FBII)', 'TI'], ['Adinda Billa (SMA)', 'TI'], ['Yunita (SMA)', 'TI'],
  ['Sofia (UNP)', 'TI'], ['Cony (SMP)', 'TI'], ['Laela (SMP)', 'TI'], ['Dana (UNP)', 'TI'],
  ['Mba Aniq (PMII)', 'TI'], ['Mbak Dina (UNP)', 'TI'], ['Dita (CV Rak)', 'TI'], ['Aca (CV Rak)', 'TI'],
  ['Eva (PMII)', 'TI'], ['Mba Bella (PMII)', 'TI'], ['Mba Monika (PMII)', 'TI'], ['Salsa (PMII)', 'TI'],
  ['Mas Riski (PMII)', 'TI'], ['Mba Nabila (PMII)', 'TI'], ['Rizqa (PMII)', 'TI'], ['Rizal Cirebon (PMII)', 'TI'],
  ['Rizal Palembang (PMII)', 'TI'], ['Mba Tya (SSS)', ''], ['Fitri (PMII)', 'TI'], ['Icha (SMA)', 'TI'],
  ['Kholifah (UNP)', 'TI'], ['Obet (UNP)', 'TI'], ['Kom Dhayu (PMII)', 'TI'], ['Magda (FBII)', 'TI'],
  ['Mba Ima (FBII)', 'TI'], ['Mba Omi (FBII)', 'TI'], ['Mba Onik (FBII)', 'TI'], ['Zalfa (FBII)', 'TI'],
  ['Suci (FBII)', 'TI'], ['Mba Intan (PNM)', 'TI'], ['Mas Galang', 'TI'], ['Mba Asnal', 'TI'],
  ['Mba Dian MTK (UNP)', 'TI'], ['Mba Laila', 'TI'], ['Mba Nikma (PMII)', 'TI'], ['Norinta (SMP)', 'TI'],
  ['Mba Ocha (FBII)', 'TI'], ['Mba Faida (PMII)', 'TI'], ['Mba Refi', 'TI'], ['Mba Putri (PMII)', 'TI'],
  ['Mba Tari (PNM)', 'TI'], ['Mba Tera (PMII)', 'TI'], ['Mba Tika (PMII)', 'TI'], ['Mba Yuli (PMII)', 'TI'],
  ['Mba Zyan (FBII)', 'TI'], ['Vina Oktaviana (SMP)', 'TI'], ['Mei Teman Kpop', 'TI'], ['Mimin (UNP)', 'TI'],
  ['Nisa (UNP)', 'TI'], ['Ragil (SMA)', 'TI'], ['Rismalia (SMA)', 'TI'], ['Sasa (FBII)', 'TI'],
  ['Tiara (SMA)', 'TI'], ['Vina (UNP)', 'TI'], ['Yessinta (SMA)', 'TI'], ['Nopan (SMA)', 'TI'],
  ['Wahyu (SSS)', 'TI'], ['Dian (SSS)', 'TI'], ['Neina (SSS)', 'TI'], ['Mba Evi (PNM)', 'TI'],
  ['Mba Tita (PNM)', 'TI'], ['Aprerica Sagita (SMA)', 'TI'], ['Mba Siska (SSS)', 'TI'], ['Aris (SSS)', 'TI'],
  ['Wicke (SD)', 'TI'], ['Nike Wulandari (UNP)', 'TI'], ['Dita Damayanti (UNP)', 'TI'], ['Mba Saffa (FBII)', 'TI'],
  ['Ir Jawahirul Kpop', 'TI'], ['Andi Manajemen D (UNP)', ''], ['Andi Manajemen H (UNP)', ''],
  ['Pak Paidi (Pace)', ''], ['Mbah Nem (Pace)', ''], ['Lek Yon dan Istri (Pace)', ''], ['Mbak Nur dan Suami (Pace)', ''],
  ['Mas Arif dan Istri', ''], ['Mustaqim', ''], ['Mbah Pandi dan Istri (Pace)', ''], ['Bibi Feni dan Lek Yanto', ''],
  ['Mbak Sri dan Suami', ''], ['Lek Yaskur dan Suami', ''], ['Mbak Lika dan Suami', ''], ['Lek Su dan Lek Mubin', ''],
  ['Mbak Ulfia', ''], ['Mas Munir dan Suami', ''], ['Mbak Sikah', ''], ['Mas Budi dan Istri', ''],
  ['Mbak Umayah dan Mas Pri', ''],
]

const yudhaGuests = [
  ['Pak rudi', 'TY'], ['Pak Indra (Kantor)', 'TY'], ['Pak Budi (Kantor)', 'TY'], ['Mas Fathur (Kantor)', 'TY'],
  ['Mas Adhe (Kantor)', 'TY'], ['Mas Kito (Kantor)', 'TY'], ['Mas Ridho (Kantor)', 'TY'], ['Kak vania (Kantor)', 'TY'],
  ['Marco (Kantor)', 'TY'], ['Pak Surya (Kantor)', 'TY'], ['Ica (Kantor)', 'TY'], ['Alma (Kantor)', 'TY'],
  ['Risa (Kantor)', 'TY'], ['Febri (Kantor)', 'TY'], ['Prasss (Kantor)', 'TY'], ['Malisa (Kantor)', 'TY'],
  ['Mas Yongki (Pramuka)', 'TY'], ['Mas Agus & Devi (Pramuka)', 'TY'], ['Mas Mario (Pramuka)', 'TY'], ['Mas Bayu (Pramuka)', 'TY'],
  ['Mas Bayu Ajidin (Pramuka)', 'TY'], ['Mas Sandro (Pramuka)', 'TY'], ['Mbak Indah (Pramuka)', 'TY'], ['Mbak Ima (Pramuka)', 'TY'],
  ['Mas Firman (Pramuka)', 'TY'], ['Mas Novan (Pramuka)', 'TY'], ['Mbak Jihan (Pramuka)', 'TY'], ['Georgeos (Pramuka)', 'TY'],
  ['Mas Syahrul (Pramuka) & Mbak Fadila (Pramuka)', 'TY'], ['Mbak Digna (Pramuka)', 'TY'], ['Mbak Syafira (Pramuka)', 'TY'],
  ['Mbak Endah (Pramuka)', 'TY'], ['Mbak Aulia (Pramuka)', 'TY'], ['Mas Latul (Pramuka)', 'TY'], ['Clara (Pramuka)', 'TY'],
  ['Flafiska (Pramuka)', 'TY'], ['Fajar (Pramuka)', 'TY'], ['Mantous (Pramuka)', 'TY'], ['Irena (Pramuka)', 'TY'],
  ['Lux Luim (Pramuka)', 'TY'], ['Bang Najib (Kalibata)', ''], ['Bang Wahyu (Kalibata)', ''], ['Bang Yudha', ''],
  ['Deny Kurniawan', ''], ['Mas Drajat', ''], ['Mas Rayhan', ''], ['Mas Billiy', ''], ['Mas Adam', ''],
  ['Mas Angga x Mbak Fatma', ''], ['Andini (SMA)', ''], ['Redita (SMA)', ''], ['Cahyo (SMA)', ''], ['Alfina (SMA)', ''],
  ['Lisa (SMA)', ''], ['Muklis (SMA)', ''], ['Mas Fajar (Kantor)', ''], ['Rindi (SMA)', ''], ['Candra (SMA)', ''],
  ['Cha Cha (SMA)', ''], ['Diaz (SMA)', ''], ['Dewi Retno (SMA)', ''], ['Mas Erwin', ''], ['Ilham (SMA)', ''],
  ['Larisa (SMA)', ''], ['Saddam (SMA)', ''], ['Mareta (SMA)', ''], ['Sefri (SMA)', ''], ['Natria (SMA)', ''],
  ['Niken (SMA)', ''], ['Putri Puji (SMA)', ''], ['Raviko (SMA)', ''], ['Tegar (SMA)', ''], ['Titen (SMA)', ''],
  ['Yusuf (SMA)', ''], ['Kharis (SMA)', ''], ['Rijal (SMA)', ''], ['Mas Gading (SAN)', ''], ['Mbak Devi (SAN)', ''],
  ['Mas Eko (SAN)', ''], ['FIFI (SAN)', ''], ['Mas Hilmi (Livin)', ''], ['Mas Affani (Pramuka)', ''], ['Mbak Dhina (SAN)', ''],
  ['Indras (SMA)', ''], ['Alifta (SMA)', ''], ['Nunung (SMA)', ''], ['Aca (Pramuka)', ''], ['Istiqomah (SMA)', ''],
  ['Mas Galuh', ''], ['Risky (Pramuka)', ''], ['Cici (Pramuka)', ''], ['Adela (Pramuka)', ''], ['Surya (Pramuka)', ''],
  ['Desi (Pramuka)', ''], ['Nafa (Pramuka)', ''], ['Verly (Pramuka)', ''], ['Nanda G (Pramuka)', ''], ['Laila (PMR)', ''],
  ['Femi (Pramuka)', ''], ['Putri Ayu (SMA)', ''], ['Wahyu (Polinema)', ''], ['Rico (Polinema)', ''], ['Apip (Polinema)', ''],
  ['Pandu (Polinema)', ''], ['Adista (Polinema)', ''], ['Alftis (Polinema)', ''], ['Lintang (Polinema)', ''], ['Andika dafa (Polinema)', ''],
  ['mbak Faca (Kantor)', ''], ['Mas Rendy Livin', ''], ['brahmanditia (Smp)', ''], ['Richo (SmP)', ''], ['Alvin (SMP)', ''],
  ['Vigar (Polinema)', ''], ['Bima Akbar (Polinema)', ''], ['Firmas (SD)', ''], ['Rama sakti (Polinema)', ''], ['Devi SAN', ''],
  ['Mas Akbar (SMA)', ''], ['Mas Rendi', ''], ['Dhima (SAN)', ''], ['Dimas Barnas', ''], ['Mas Yusuf (Idn Blogger)', ''],
  ['Mas Ilham Wahyudi (Polinema)', ''], ['Dinda valentine (Polinema)', ''], ['Faradela (Polinema)', ''], ['Irma (Polinema)', ''],
  ['Iva (Polinema)', ''], ['Juan (Polinema)', ''], ['Nabila (Polinema)', ''], ['Putri Eka (Polinema)', ''], ['Yusuf (Polinema)', ''],
  ['Kiki (SMP)', ''], ['Lavio (SMP)', ''], ['Brian (SMP)', ''], ['Devi (SMP)', ''], ['Saddam (SMP)', ''],
  ['Rachel (SMP)', ''], ['Hilwa (Polinema)', ''], ['Dimas Tri (Polinema)', ''], ['Anam (Polinema)', ''], ['Delta Yuna (Polinema)', ''],
]

const slugify = (name) =>
  name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

const buildGuests = (entries, side, prefix) =>
  entries.map(([name, relation], index) => {
    const num = String(index + 1).padStart(3, '0')
    return {
      code: `${prefix}${num}`,
      name,
      slug: slugify(name),
      side,
      relation: relation || null,
      status: 'pending',
    }
  })

const guests = [
  ...buildGuests(imaGuests, 'ima', 'IMA'),
  ...buildGuests(yudhaGuests, 'yudha', 'YUD'),
]

const outPath = join(__dirname, '../server/data/guests.json')
writeFileSync(outPath, JSON.stringify(guests, null, 2), 'utf-8')
console.log(`Wrote ${guests.length} guests to ${outPath}`)
