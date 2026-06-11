import { readFile, writeFile } from 'fs/promises'
import { join } from 'path'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  
  if (!body.name || body.attending === undefined) {
    throw createError({ statusCode: 400, message: 'Name and attending status are required' })
  }

  const filePath = join(process.cwd(), 'server/data/rsvp.json')
  
  let existing: any[] = []
  try {
    const raw = await readFile(filePath, 'utf-8')
    existing = JSON.parse(raw)
  } catch {}

  const entry = {
    id: `rsvp_${Date.now()}`,
    name: body.name,
    attending: body.attending,
    message: body.message || '',
    timestamp: new Date().toISOString()
  }

  existing.push(entry)
  await writeFile(filePath, JSON.stringify(existing, null, 2))

  // Also save message if provided
  if (body.message) {
    const msgPath = join(process.cwd(), 'server/data/messages.json')
    let msgs: any[] = []
    try {
      const raw = await readFile(msgPath, 'utf-8')
      msgs = JSON.parse(raw)
    } catch {}
    msgs.push({
      id: `msg_${Date.now()}`,
      name: body.name,
      message: body.message,
      timestamp: new Date().toISOString()
    })
    await writeFile(msgPath, JSON.stringify(msgs, null, 2))
  }

  return { success: true, data: entry }
})
