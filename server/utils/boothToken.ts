import { createHmac } from 'crypto'

const BOOTH_TOKEN_SECRET = process.env.BOOTH_TOKEN_SECRET || 'default-secret-change-in-production'
const BOOTH_TOKEN_EXPIRY_HOURS = 24

export type BoothTokenPayload = {
  id: string | null
  name: string | null
  attending: boolean | null
  iat: number
  exp: number
}

export function generateBoothToken(data: {
  guestId: string | null
  name: string | null
  attending: boolean | null
}): string {
  const now = Date.now()
  const expiryTime = now + (BOOTH_TOKEN_EXPIRY_HOURS * 60 * 60 * 1000)

  const payload: BoothTokenPayload = {
    id: data.guestId,
    name: data.name,
    attending: data.attending,
    iat: now,
    exp: expiryTime
  }

  const payloadStr = JSON.stringify(payload)
  const payloadB64 = Buffer.from(payloadStr).toString('base64url')

  const signature = createHmac('sha256', BOOTH_TOKEN_SECRET)
    .update(payloadB64)
    .digest('base64url')

  return `${payloadB64}.${signature}`
}

export function verifyBoothToken(token: string): BoothTokenPayload | null {
  try {
    const [payloadB64, signature] = token.split('.')

    if (!payloadB64 || !signature) {
      return null
    }

    const expectedSignature = createHmac('sha256', BOOTH_TOKEN_SECRET)
      .update(payloadB64)
      .digest('base64url')

    if (signature !== expectedSignature) {
      return null
    }

    const payloadStr = Buffer.from(payloadB64, 'base64url').toString('utf-8')
    const payload: BoothTokenPayload = JSON.parse(payloadStr)

    // Check expiry
    if (payload.exp < Date.now()) {
      return null
    }

    return payload
  } catch {
    return null
  }
}
