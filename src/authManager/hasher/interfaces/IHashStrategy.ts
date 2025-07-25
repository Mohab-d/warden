interface IHashStrategy {
  hash(data: string): Promise<string>;
  verify(data: string, encrypted: string): Promise<boolean>;
}

export { IHashStrategy };
