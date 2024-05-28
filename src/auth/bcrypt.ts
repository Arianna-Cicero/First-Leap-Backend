import * as bcrypt from 'bcrypt';

export async function encodePassword(password: string): Promise<string> {
  const saltOrRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltOrRounds);
  return hashedPassword;
}

export async function comparePasswords(rawPassword: string, hash: string) {
  const match = await bcrypt.compare(rawPassword, hash);
  console.log('Password Match:', match);
  return match;
}
