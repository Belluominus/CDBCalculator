interface IHashProvider {
  encryptData(dataToEncrypt: string): Promise<string>;

  compareData(dataToCompare: string, encryptedData: string): Promise<boolean>;
}

export { IHashProvider };
