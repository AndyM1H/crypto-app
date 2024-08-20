import { contextBridge, ipcRenderer } from "electron";
import { caesarCipher, vigenereCipher } from "./crypto-methods";

export interface CryptoAPI {
  caesarCipher: (text: string, shift: number, decrypt?: boolean) => string;
  vigenereCipher: (text: string, key: string, decrypt?: boolean) => string;
  openFile: () => Promise<string>;
  saveFile: (content: string) => Promise<string>;
}

const cryptoAPI: CryptoAPI = {
  caesarCipher: (text, shift, decrypt) => caesarCipher(text, shift, decrypt),
  vigenereCipher: (text, key, decrypt = false) =>
    vigenereCipher(text, key, decrypt),
  openFile: () => ipcRenderer.invoke("open-file"),
  saveFile: (content: string) => ipcRenderer.invoke("save-file", content),
};

contextBridge.exposeInMainWorld("cryptoAPI", cryptoAPI);

// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
window.addEventListener("DOMContentLoaded", () => {
  const replaceText = (selector: string, text: string) => {
    const element = document.getElementById(selector);
    if (element) {
      element.innerText = text;
    }
  };

  for (const type of ["chrome", "node", "electron"]) {
    replaceText(
      `${type}-version`,
      process.versions[type as keyof NodeJS.ProcessVersions]
    );
  }
});
