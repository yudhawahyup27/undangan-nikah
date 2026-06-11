type FirebaseCredentials = {
  projectId: string
  clientEmail: string
  privateKey: string
}

export const normalizePrivateKey = (key: string) => {
  let value = key.trim()

  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    value = value.slice(1, -1)
  }

  return value.replace(/\\n/g, '\n')
}

const parseServiceAccountJson = (raw: string): FirebaseCredentials | null => {
  try {
    const parsed = JSON.parse(raw) as {
      project_id?: string
      client_email?: string
      private_key?: string
    }

    if (!parsed.project_id || !parsed.client_email || !parsed.private_key) {
      return null
    }

    return {
      projectId: parsed.project_id,
      clientEmail: parsed.client_email,
      privateKey: normalizePrivateKey(parsed.private_key),
    }
  } catch {
    return null
  }
}

export const getFirebaseCredentials = (): FirebaseCredentials | null => {
  const serviceAccountJson =
    process.env.FIREBASE_SERVICE_ACCOUNT_JSON ||
    process.env.NUXT_FIREBASE_SERVICE_ACCOUNT_JSON

  if (serviceAccountJson) {
    const parsed = parseServiceAccountJson(serviceAccountJson)
    if (parsed) return parsed
  }

  const config = useRuntimeConfig()

  const projectId =
    process.env.FIREBASE_PROJECT_ID ||
    process.env.NUXT_FIREBASE_PROJECT_ID ||
    config.firebaseProjectId

  const clientEmail =
    process.env.FIREBASE_CLIENT_EMAIL ||
    process.env.NUXT_FIREBASE_CLIENT_EMAIL ||
    config.firebaseClientEmail

  const privateKeyRaw =
    process.env.FIREBASE_PRIVATE_KEY ||
    process.env.NUXT_FIREBASE_PRIVATE_KEY ||
    config.firebasePrivateKey

  if (!projectId || !clientEmail || !privateKeyRaw) {
    return null
  }

  return {
    projectId: String(projectId),
    clientEmail: String(clientEmail),
    privateKey: normalizePrivateKey(String(privateKeyRaw)),
  }
}

export const isFirebaseConfigured = () => Boolean(getFirebaseCredentials())

let firestoreDb: Awaited<ReturnType<typeof import('firebase-admin/firestore')['getFirestore']>> | null = null

export const getFirestoreDb = async () => {
  if (firestoreDb) return firestoreDb

  const credentials = getFirebaseCredentials()
  if (!credentials) {
    throw new Error('Firebase belum dikonfigurasi. Set FIREBASE_* di environment production.')
  }

  const { initializeApp, getApps, cert } = await import('firebase-admin/app')
  const { getFirestore } = await import('firebase-admin/firestore')

  if (!getApps().length) {
    initializeApp({
      credential: cert(credentials),
    })
  }

  firestoreDb = getFirestore()
  return firestoreDb
}

export const isServerlessProduction = () =>
  Boolean(process.env.VERCEL || process.env.NETLIFY || process.env.AWS_LAMBDA_FUNCTION_NAME)
