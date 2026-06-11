const TIMEZONE = 'Asia/Jakarta'

export const weddingEvent = {
  title: 'Pernikahan Nur Kotimah & Yudha Wahyu Pratama',
  location: 'Semampir GG Tembus RT 13 RW 02, Kediri, Jawa Timur',
  start: '2026-11-29T07:00:00',
  end: '2026-11-29T17:00:00',
  description: [
    'Undangan pernikahan Nur Kotimah & Yudha Wahyu Pratama',
    '',
    'Akad Nikah: 07.00 WIB',
    'Resepsi: 09.00 WIB – Selesai',
    '',
    'Lokasi: Semampir GG Tembus RT 13 RW 02, Kediri, Jawa Timur',
    'Maps: https://maps.app.goo.gl/JGYgN3Hu8AXVu32c7',
  ].join('\\n'),
}

const formatGoogleDates = (start: string, end: string) => {
  const toGoogle = (value: string) => value.replace(/[-:]/g, '').slice(0, 15)
  return `${toGoogle(start)}/${toGoogle(end)}`
}

const escapeIcsText = (value: string) =>
  value
    .replace(/\\/g, '\\\\')
    .replace(/\n/g, '\\n')
    .replace(/,/g, '\\,')
    .replace(/;/g, '\\;')

export function getGoogleCalendarUrl() {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: weddingEvent.title,
    dates: formatGoogleDates(weddingEvent.start, weddingEvent.end),
    details: weddingEvent.description.replace(/\\n/g, '\n'),
    location: weddingEvent.location,
    ctz: TIMEZONE,
  })

  return `https://calendar.google.com/calendar/render?${params.toString()}`
}

export function getOutlookCalendarUrl() {
  const params = new URLSearchParams({
    path: '/calendar/action/compose',
    rru: 'addevent',
    subject: weddingEvent.title,
    startdt: weddingEvent.start,
    enddt: weddingEvent.end,
    location: weddingEvent.location,
    body: weddingEvent.description.replace(/\\n/g, '\n'),
    allday: 'false',
  })

  return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`
}

export function buildIcsContent() {
  const now = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z')
  const start = weddingEvent.start.replace(/[-:]/g, '').slice(0, 15)
  const end = weddingEvent.end.replace(/[-:]/g, '').slice(0, 15)

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Wedding Invitation//ID',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VTIMEZONE',
    'TZID:Asia/Jakarta',
    'X-LIC-LOCATION:Asia/Jakarta',
    'BEGIN:STANDARD',
    'TZOFFSETFROM:+0700',
    'TZOFFSETTO:+0700',
    'TZNAME:WIB',
    'DTSTART:19700101T000000',
    'END:STANDARD',
    'END:VTIMEZONE',
    'BEGIN:VEVENT',
    `UID:wedding-nur-yudha-${start}@invitation`,
    `DTSTAMP:${now}`,
    `DTSTART;TZID=${TIMEZONE}:${start}`,
    `DTEND;TZID=${TIMEZONE}:${end}`,
    `SUMMARY:${escapeIcsText(weddingEvent.title)}`,
    `DESCRIPTION:${escapeIcsText(weddingEvent.description.replace(/\\n/g, '\n'))}`,
    `LOCATION:${escapeIcsText(weddingEvent.location)}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')
}

export function downloadAppleCalendar() {
  if (!import.meta.client) return

  const blob = new Blob([buildIcsContent()], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'pernikahan-nur-yudha.ics'
  link.click()
  URL.revokeObjectURL(url)
}

export function useWeddingCalendar() {
  return {
    googleCalendarUrl: getGoogleCalendarUrl(),
    outlookCalendarUrl: getOutlookCalendarUrl(),
    downloadAppleCalendar,
  }
}
