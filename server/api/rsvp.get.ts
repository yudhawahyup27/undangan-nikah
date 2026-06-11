import { readFile } from 'fs/promises'
import { join } from 'path'

export type RsvpEntry = {
  id: string
  name: string
  attending: boolean
  message: string
  timestamp: string
}

export default defineEventHandler(async () => {
  try {
    const filePath = join(process.cwd(), 'server/data/rsvp.json')
    const data = await readFile(filePath, 'utf-8')
    const entries: RsvpEntry[] = JSON.parse(data)
    return entries.slice().reverse()
  } catch {
    return []
  }
})
