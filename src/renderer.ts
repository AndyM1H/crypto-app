interface EncryptionParams {
  text: string;
  key: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Window {
  cryptoAPI: {
    encrypt: (method: string, { text, key }: EncryptionParams) => string;
    decrypt: (method: string, { text, key }: EncryptionParams) => string;
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

function encrypt() {
  const method = (document.getElementById("cipher-method") as HTMLInputElement)
    .value;
  const text = (document.getElementById("text-input") as HTMLInputElement)
    .value;
  const key = (document.getElementById("key-input") as HTMLInputElement).value;
  const encryptedText = window.cryptoAPI.encrypt(method, { text, key });

  (document.getElementById("result") as HTMLElement).textContent =
    encryptedText;
}

function decrypt() {
  const method = (document.getElementById("cipher-method") as HTMLInputElement)
    .value;
  const text = (document.getElementById("text-input") as HTMLInputElement)
    .value;
  const key = (document.getElementById("key-input") as HTMLInputElement).value;

  const decryptedText = window.cryptoAPI.decrypt(method, { text, key });

  (document.getElementById("result") as HTMLElement).textContent =
    decryptedText;
}

window.encrypt = encrypt;
window.decrypt = decrypt;
window.openFile = openFile;
window.saveFile = saveFile;
