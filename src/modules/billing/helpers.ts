import crypto from 'node:crypto';

export function normalizeAmount(amount: number) {
  return amount.toFixed(2);
}

export function normalizeSignature(signature: string) {
  return signature.trim().toLowerCase();
}

export function buildRobokassaSignature(parts: Array<string | number>, password: string) {
  return crypto
    .createHash('md5')
    .update(`${parts.join(':')}:${password}`)
    .digest('hex');
}
