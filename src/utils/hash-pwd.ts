import * as crypto from 'crypto';

export const hashPwd = (p: string): string => {
  const hmac = crypto.createHmac(
    'sha512',
    'lkfdsafa7834312nvcx&*(dbh23jd78sd&*D^bsadajsddascjkds',
  );
  hmac.update(p);
  return hmac.digest('hex');
};
