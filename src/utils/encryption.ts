import CryptoJS from 'crypto-js';

const ENCRYPTION_KEY = 'gamelib-secure-key-2024';

export const encrypt = (text: string): string => {
  return CryptoJS.AES.encrypt(text, ENCRYPTION_KEY).toString();
};

export const decrypt = (encryptedText: string): string => {
  const bytes = CryptoJS.AES.decrypt(encryptedText, ENCRYPTION_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};

export const generateSecureId = (): string => {
  return CryptoJS.lib.WordArray.random(16).toString();
};

export const hashPassword = (password: string): string => {
  return CryptoJS.SHA256(password).toString();
};