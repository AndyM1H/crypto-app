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

async function openFile() {
  const fileContent = await window.fileHandler.openFile();
  if (fileContent) {
    (document.getElementById("text-input") as HTMLInputElement).value =
      fileContent;
  }
}

async function saveFile() {
  const result =
    (document.getElementById("result") as HTMLElement).textContent || "";
  await window.fileHandler.saveFile(result);
}

function encryptCaesar() {
  const text = (document.getElementById("text-input") as HTMLInputElement)
    .value;
  const shift = parseInt(
    (document.getElementById("key-input") as HTMLInputElement).value
  );
  const result = window.cryptoAPI.caesarCipher(text, shift);
  (document.getElementById("result") as HTMLElement).textContent = result;
}

function decryptCaesar() {
  const text = (document.getElementById("text-input") as HTMLInputElement)
    .value;
  const shift = parseInt(
    (document.getElementById("key-input") as HTMLInputElement).value
  );
  const result = window.cryptoAPI.caesarCipher(text, shift, true);
  (document.getElementById("result") as HTMLElement).textContent = result;
}

function encryptVigenere() {
  const text = (document.getElementById("text-input") as HTMLInputElement)
    .value;
  const key = (document.getElementById("key-input") as HTMLInputElement).value;
  const result = window.cryptoAPI.vigenereCipher(text, key);
  (document.getElementById("result") as HTMLElement).textContent = result;
}

function decryptVigenere() {
  const text = (document.getElementById("text-input") as HTMLInputElement)
    .value;
  const key = (document.getElementById("key-input") as HTMLInputElement).value;
  const result = window.cryptoAPI.vigenereCipher(text, key, true);
  (document.getElementById("result") as HTMLElement).textContent = result;
}

// Экспорт функций для использования в HTML
window.encryptCaesar = encryptCaesar;
window.decryptCaesar = decryptCaesar;
window.encryptVigenere = encryptVigenere;
window.decryptVigenere = decryptVigenere;
window.openFile = openFile;
window.saveFile = saveFile;
