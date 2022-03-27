import * as path from 'path';
import * as dotenv from 'dotenv';

const nodeEnv = process.env.NODE_ENV ?? 'local';
const envPath = path.join(__dirname, '../..', `environments/.env.${nodeEnv}`);

dotenv.config({ path: envPath });

export default {
  PORT: Number(process.env.PORT || 3000),
  NODE_ENV: nodeEnv
};
