// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Window {
  cryptoAPI: {
    caesarCipher: (text: string, shift: number, decrypt?: boolean) => string;
    vigenereCipher: (text: string, key: string, decrypt?: boolean) => string;
    openFile: () => Promise<string>;
    saveFile: (content: string) => Promise<string>;
  };
}
document.getElementById("open-file")?.addEventListener("click", async () => {
  try {
    const fileContent = await window.cryptoAPI.openFile();
    if (fileContent) {
      (document.getElementById("caesar-input") as HTMLInputElement).value =
        fileContent;
      (document.getElementById("vigenere-input") as HTMLInputElement).value =
        fileContent;
    }
  } catch (error) {
    console.error("Failed to open file:", error);
  }
});

document.getElementById("save-file")?.addEventListener("click", async () => {
  try {
    const caesarResult =
      (document.getElementById("caesar-result") as HTMLElement).textContent ||
      "";
    const vigenereResult =
      (document.getElementById("vigenere-result") as HTMLElement).textContent ||
      "";

    const content = `Caesar Cipher Result:\n${caesarResult}\n\nVigenere Cipher Result:\n${vigenereResult}`;

    await window.cryptoAPI.saveFile(content);
  } catch (error) {
    console.error("Failed to save file:", error);
  }
});

function encryptCaesar() {
  const text = (document.getElementById("caesar-input") as HTMLInputElement)
    .value;
  const shift = parseInt(
    (document.getElementById("caesar-shift") as HTMLInputElement).value
  );
  const result = window.cryptoAPI.caesarCipher(text, shift);
  (document.getElementById("caesar-result") as HTMLElement).textContent =
    result;
}

function decryptCaesar() {
  const text = (document.getElementById("caesar-input") as HTMLInputElement)
    .value;
  const shift = parseInt(
    (document.getElementById("caesar-shift") as HTMLInputElement).value
  );
  const result = window.cryptoAPI.caesarCipher(text, shift, true);
  (document.getElementById("caesar-result") as HTMLElement).textContent =
    result;
}

function encryptVigenere() {
  const text = (document.getElementById("vigenere-input") as HTMLInputElement)
    .value;
  const key = (document.getElementById("vigenere-key") as HTMLInputElement)
    .value;
  const result = window.cryptoAPI.vigenereCipher(text, key);
  (document.getElementById("vigenere-result") as HTMLElement).textContent =
    result;
}

function decryptVigenere() {
  const text = (document.getElementById("vigenere-input") as HTMLInputElement)
    .value;
  const key = (document.getElementById("vigenere-key") as HTMLInputElement)
    .value;
  const result = window.cryptoAPI.vigenereCipher(text, key, true);
  (document.getElementById("vigenere-result") as HTMLElement).textContent =
    result;
}

// Экспорт функций для использования в HTML
window.encryptCaesar = encryptCaesar;
window.decryptCaesar = decryptCaesar;
window.encryptVigenere = encryptVigenere;
window.decryptVigenere = decryptVigenere;
