import { NextRequest } from 'next/server'
import { createHash, timingSafeEqual } from 'crypto'

export type MobileServiceRole = 'reader' | 'payments' | string

export type MobileServiceKey = {
  key: string
  role: MobileServiceRole
}

export type MobileAuthResult = MobileServiceKey & { token: string }

export type MobileAuthOptions = {
  requiredRoles?: MobileServiceRole[]
}

export class MobileApiAuthError extends Error {
  status: number

  constructor(message: string, status = 401) {
    super(message)
    this.name = 'MobileApiAuthError'
    this.status = status
  }
}

const CONFIG_ENV = 'MOBILE_API_SERVICE_KEYS'

const parseConfiguredKeys = (): MobileServiceKey[] => {
  const raw = process.env[CONFIG_ENV]
  if (!raw) {
    throw new Error(
      `${CONFIG_ENV} environment variable is not configured. ` +
        'Set it to a comma-separated list like "reader:public-key,payments:secret-key".'
    )
  }

  const entries = raw
    .split(',')
    .map((segment) => segment.trim())
    .filter(Boolean)

  if (!entries.length) {
    throw new Error(`${CONFIG_ENV} environment variable does not contain any service keys`)
  }

  return entries.map((entry) => {
    const [role, key] = entry.split(':').map((segment) => segment.trim())
    if (!role || !key) {
      throw new Error(`Invalid service key entry "${entry}". Expected format "role:key"`)
    }
    return { role: role as MobileServiceRole, key }
  })
}

const configuredKeysCache: { keys?: MobileServiceKey[] } = {}

const getConfiguredKeys = (): MobileServiceKey[] => {
  if (!configuredKeysCache.keys) {
    configuredKeysCache.keys = parseConfiguredKeys()
  }
  return configuredKeysCache.keys
}

const normalizeToken = (headerValue: string | null): string | null => {
  if (!headerValue) return null
  const trimmed = headerValue.trim()
  if (!trimmed) return null
  if (trimmed.toLowerCase().startsWith('bearer ')) {
    return trimmed.slice(7).trim()
  }
  return trimmed
}

const secureCompare = (input: string, expected: string): boolean => {
  const inputHash = createHash('sha256').update(input).digest()
  const expectedHash = createHash('sha256').update(expected).digest()
  return timingSafeEqual(inputHash, expectedHash)
}

export const authenticateMobileRequest = (
  request: NextRequest,
  options: MobileAuthOptions = {}
): MobileAuthResult => {
  const token =
    normalizeToken(request.headers.get('authorization')) ??
    normalizeToken(request.headers.get('x-mobile-service-key'))

  if (!token) {
    throw new MobileApiAuthError('Missing mobile service key', 401)
  }

  const serviceKeys = getConfiguredKeys()
  const match = serviceKeys.find((serviceKey) => secureCompare(token, serviceKey.key))

  if (!match) {
    throw new MobileApiAuthError('Invalid mobile service key', 401)
  }

  if (options.requiredRoles?.length && !options.requiredRoles.includes(match.role)) {
    throw new MobileApiAuthError('Insufficient permissions for this operation', 403)
  }

  return { ...match, token }
}
