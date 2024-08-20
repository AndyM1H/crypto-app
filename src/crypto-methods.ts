const SYMBOLS =
  "абвгдеёжзийклмнопрстуфхцчшщъыьэюя!@#$%^&*()-_=+[]{};:'\",.<>?/|\\~`";

export function caesarCipher(
  text: string,
  shift: number,
  decrypt = false
): string {
  const symbolsLength = SYMBOLS.length;
  return text
    .split("")
    .map((char) => {
      const index = SYMBOLS.indexOf(char);
      if (index === -1) return char;
      const shiftedIndex = decrypt
        ? (index - shift + symbolsLength) % symbolsLength
        : (index + shift) % symbolsLength;
      return SYMBOLS[shiftedIndex];
    })
    .join("");
}

export function vigenereCipher(
  text: string,
  key: string,
  decrypt = false
): string {
  const symbolsLength = SYMBOLS.length;
  const keyLength = key.length;
  return text
    .split("")
    .map((char, i) => {
      const textIndex = SYMBOLS.indexOf(char);
      const keyIndex = SYMBOLS.indexOf(key[i % keyLength]);
      if (textIndex === -1 || keyIndex === -1) return char;
      const newIndex = decrypt
        ? (textIndex - keyIndex + symbolsLength) % symbolsLength
        : (textIndex + keyIndex) % symbolsLength;
      return SYMBOLS[newIndex];
    })
    .join("");
}
