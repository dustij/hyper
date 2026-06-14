import { betterAuth } from 'better-auth';
import { nextCookies } from 'better-auth/next-js';
import { createAuthDatabase } from '../database/auth-database';

export const auth = betterAuth({
  database: createAuthDatabase(),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [nextCookies()], // make sure this is the last plugin in the array
});
