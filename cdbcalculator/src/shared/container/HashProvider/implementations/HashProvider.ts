import { hash, compare } from 'bcrypt';

import { IHashProvider } from '../IHashProvider';

class HashProvider implements IHashProvider {
  async encryptData(dataToEncrypt: string): Promise<string> {
    const hashData = await hash(dataToEncrypt, 14);
    return hashData;
  }
  async compareData(dataToCompare: string, encryptedData: string): Promise<boolean> {
    const dataMatch = await compare(dataToCompare, encryptedData);

    return dataMatch;
  }
}

export { HashProvider };
