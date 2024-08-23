import { LiteralType } from "./utils/type.util";

export const SUPPORTED_SYMBOLS = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя";

export enum SUPPORTED_CIPHERS {
  CAESAR = "caesar",
  VIGENERE = "vigenere",
}

export type CIPHER_METHOD = LiteralType<SUPPORTED_CIPHERS>;
