/**
 * @author Vipin Kumar, Parveen Kumar
 * @summary  Check JWT is expired or not
 * @description A global JWT validator utility check weather expired or not.
 * @public
 */
import atob from './atob';

export default function isJwtTokenExpired(token: string, optionalKey?: string) {
  if (typeof token !== 'string' || !token) throw new Error('Invalid JWT token');
  let IsJwtTokenExpired = false;
  const decodedToken = decode(token);
  const currentTime = new Date().getTime() / 1000;

  if (optionalKey)
    if (currentTime > decodedToken.payload.exp) IsJwtTokenExpired = true;
    else if (decodedToken.payload.hasOwnProperty(optionalKey))
      if (currentTime > (decodedToken.payload as any).get(optionalKey)) IsJwtTokenExpired = true;
      else throw new Error('Invalid optionalKey');

  return IsJwtTokenExpired;
}

export function decode(token: string): any {
  let header = {};
  let payload = {};
  try {
    [header, payload] = token
      .split('.')
      .slice(0, 2)
      .map((encodedString) => JSON.parse(atob(encodedString)));
  } catch (err) {
    throw new Error('Invalid JWT token');
  }
  return { header, payload };
}
