import { readFile } from 'fs/promises'
import { join } from 'path'

export default defineEventHandler(async () => {
  try {
    const filePath = join(process.cwd(), 'server/data/messages.json')
    const data = await readFile(filePath, 'utf-8')
    const messages = JSON.parse(data)
    return messages.slice().reverse()
  } catch {
    return []
  }
})
