const crypto = require('crypto');

const config = {
  privateKey: 'PRIVATE_KEY' // Enter private key
}

class AesEncryption {
  #privateKey;

  constructor(privateKey) {
    this.#privateKey = privateKey;
  }

  encrypt(strToEncrypt) {
    try {
      const iv = Buffer.alloc(16, 0);
      const key = crypto.pbkdf2Sync(this.#privateKey, iv, 65536, 32, 'sha256');

      const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
      let encrypted = cipher.update(strToEncrypt, 'utf8', 'base64');
      encrypted += cipher.final('base64');

      return encrypted;
    } catch (e) {
      console.log('Error while encrypting:', e.toString());
    }
    return null;
  }

  decrypt(strToDecrypt) {
    try {
      const iv = Buffer.alloc(16, 0);
      const key = crypto.pbkdf2Sync(this.#privateKey, iv, 65536, 32, 'sha256');

      const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
      let decrypted = decipher.update(strToDecrypt, 'base64', 'utf8');
      decrypted += decipher.final('utf8');

      return decrypted;
    } catch (e) {
      console.log('Error while decrypting:', e.toString());
    }
    return null;
  }
}

// Test
const encryption = new AesEncryption(config.privateKey);
const encrypted = encryption.encrypt('hello world!');
const decrypted = encryption.decrypt(encrypted);

console.log('%encrypted', encrypted);
console.log('%decrypted', decrypted);
