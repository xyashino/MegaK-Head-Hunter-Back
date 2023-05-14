import * as crypto from 'crypto';
export const hashPwd = (p: string): string => {
  const hmac = crypto.createHmac(
    process.env.HASH_ALGORITHM,
    process.env.H_MAC_KEY,
  );
  hmac.update(p);
  return hmac.digest('hex');
};
