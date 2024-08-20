const SYMBOLS = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя";

export function caesarCipher(
  text: string,
  shift: number,
  decrypt = false
): string {
  const symbolsLength = SYMBOLS.length;

  let result = "";

  for (const symbol of text) {
    const index = SYMBOLS.indexOf(symbol);
    if (index === -1) {
      result += symbol;
    } else {
      const shiftedIndex = decrypt
        ? (index - shift + symbolsLength) % symbolsLength
        : (index + shift) % symbolsLength;

      result += SYMBOLS.charAt(shiftedIndex);
    }
  }

  return result;
}

export function vigenereCipher(
  input: string,
  keyword: string,
  decrypt = false
): string {
  const symbolsLength = SYMBOLS.length;

  let result = "";
  let keywordIndex = 0;

  for (const symbol of input) {
    const inputIndex = SYMBOLS.indexOf(symbol);
    const keyIndex = SYMBOLS.indexOf(keyword.charAt(keywordIndex));

    if (inputIndex !== -1 && keyIndex !== -1) {
      const c = decrypt
        ? (inputIndex + symbolsLength - keyIndex) % symbolsLength
        : (inputIndex + keyIndex) % symbolsLength;

      result += SYMBOLS.charAt(c);

      keywordIndex++;

      if (keywordIndex === keyword.length) {
        keywordIndex = 0;
      }
    } else {
      result += symbol;
    }
  }

  return result;
}
