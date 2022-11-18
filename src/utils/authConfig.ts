import 'dotenv/config';
import { hashSync } from 'bcryptjs';

function hashSecret(secret: string, salts: number = 10): string {
  return hashSync(secret, salts);
}

const secret = '8b716f7719f4c68ff62e11f820160e47';

const SECRET = process.env.JWT_SECRET || hashSecret(secret);

const authConfig = {
  secret: SECRET,
  expiresIn: '1d',
};

export default authConfig;
