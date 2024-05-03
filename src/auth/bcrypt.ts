import * as bcrypt from 'bcrypt';

export function encodePassword(rawPassword: string) {
  const SALT_ROUNDS = 10;
  const hashedPassword = bcrypt.hashSync(rawPassword, SALT_ROUNDS);
  const truncatedHash = hashedPassword.substring(0, 50);

  return truncatedHash;
}

export function comparePasswords(rawPassword: string, hash: string) {
  return bcrypt.compareSync(rawPassword, hash);
}
