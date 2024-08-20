// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Window {
  cryptoAPI: {
    caesarCipher: (text: string, shift: number, decrypt?: boolean) => string;
    vigenereCipher: (text: string, key: string, decrypt?: boolean) => string;
  };
  fileHandler: {
    openFile: () => Promise<string>;
    saveFile: (data: string) => Promise<void>;
  };
}

document
  .getElementById("caesar-open-file")
  ?.addEventListener("click", async () => {
    const fileContent = await window.fileHandler.openFile();
    if (fileContent) {
      (document.getElementById("caesar-input") as HTMLInputElement).value =
        fileContent;
    }
  });

document
  .getElementById("caesar-save-file")
  ?.addEventListener("click", async () => {
    const result =
      (document.getElementById("caesar-result") as HTMLElement).textContent ||
      "";
    await window.fileHandler.saveFile(result);
  });

document
  .getElementById("vigenere-open-file")
  ?.addEventListener("click", async () => {
    const fileContent = await window.fileHandler.openFile();
    if (fileContent) {
      (document.getElementById("vigenere-input") as HTMLInputElement).value =
        fileContent;
    }
  });

document
  .getElementById("vigenere-save-file")
  ?.addEventListener("click", async () => {
    const result =
      (document.getElementById("vigenere-result") as HTMLElement).textContent ||
      "";
    await window.fileHandler.saveFile(result);
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
