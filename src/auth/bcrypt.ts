import * as bcrypt from 'bcrypt';

function truncateHash(hash: string, length: number): string {
  return hash.substring(0, length);
}

export async function encodePassword(rawPassword: string) {
  const SALT_ROUNDS = 10;
  const fullHash = bcrypt.hashSync(rawPassword, SALT_ROUNDS);
  const truncatedHash = truncateHash(fullHash, 30);
  return truncatedHash;
}

export async function comparePasswords(rawPassword: string, hash: string) {
  const match = await bcrypt.compare(rawPassword, hash);
  console.log('Password Match:', match);
  return match;
}
