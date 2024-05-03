import * as crypto from 'crypto';

const generateSecretKey = () => {
  return crypto.randomBytes(32).toString('hex');
};

export const jwtConstants = {
  secret: generateSecretKey(),
};
