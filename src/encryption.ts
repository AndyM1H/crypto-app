import {
  CIPHER_METHOD,
  SUPPORTED_CIPHERS,
  SUPPORTED_SYMBOLS,
} from "./constants";

export interface EncryptionParams {
  text: string;
  key: string;
}

interface Encryption {
  encrypt(params: EncryptionParams): string;
  decrypt(params: EncryptionParams): string;
}

class CaesarCipher implements Encryption {
  public encrypt({ text, key }: EncryptionParams): string {
    return this.caesarCipher(text, parseInt(key));
  }

  public decrypt({ text, key }: EncryptionParams): string {
    return this.caesarCipher(text, parseInt(key), true);
  }

  private caesarCipher(text: string, shift: number, decrypt = false): string {
    const symbolsLength = SUPPORTED_SYMBOLS.length;

    let result = "";

    for (const symbol of text) {
      const index = SUPPORTED_SYMBOLS.indexOf(symbol);
      if (index === -1) {
        result += symbol;
      } else {
        const shiftedIndex = decrypt
          ? (index - shift + symbolsLength) % symbolsLength
          : (index + shift) % symbolsLength;

        result += SUPPORTED_SYMBOLS.charAt(shiftedIndex);
      }
    }

    return result;
  }
}

class VigenereCipher implements Encryption {
  public encrypt({ text, key }: EncryptionParams): string {
    return this.vigenereCipher(text, key);
  }

  public decrypt({ text, key }: EncryptionParams): string {
    return this.vigenereCipher(text, key, true);
  }

  private vigenereCipher(input: string, key: string, decrypt = false): string {
    const symbolsLength = SUPPORTED_SYMBOLS.length;

    let result = "";
    let keywordIndex = 0;

    for (const symbol of input) {
      const inputIndex = SUPPORTED_SYMBOLS.indexOf(symbol);
      const keyIndex = SUPPORTED_SYMBOLS.indexOf(key.charAt(keywordIndex));

      if (inputIndex !== -1 && keyIndex !== -1) {
        const c = decrypt
          ? (inputIndex + symbolsLength - keyIndex) % symbolsLength
          : (inputIndex + keyIndex) % symbolsLength;

        result += SUPPORTED_SYMBOLS.charAt(c);

        keywordIndex++;

        if (keywordIndex === key.length) {
          keywordIndex = 0;
        }
      } else {
        result += symbol;
      }
    }

    return result;
  }
}

export class EncryptionFactory {
  public static createEncryptionMethod(method: CIPHER_METHOD): Encryption {
    switch (method) {
      case SUPPORTED_CIPHERS.CAESAR:
        return new CaesarCipher();
      case SUPPORTED_CIPHERS.VIGENERE:
        return new VigenereCipher();
      default:
        throw new Error("Unsupported encryption method");
    }
  }
}
