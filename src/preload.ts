import { contextBridge, ipcRenderer } from "electron";
import { caesarCipher, vigenereCipher } from "./crypto-methods";

const cryptoAPI = {
  caesarCipher: (text: string, shift: number, decrypt?: boolean): string =>
    caesarCipher(text, shift, decrypt),
  vigenereCipher: (text: string, key: string, decrypt?: boolean): string =>
    vigenereCipher(text, key, decrypt),
};

const fileHandler = {
  openFile: () => ipcRenderer.invoke("dialog:openFile"),
  saveFile: (content: string) => ipcRenderer.invoke("dialog:saveFile", content),
};
contextBridge.exposeInMainWorld("cryptoAPI", cryptoAPI);
contextBridge.exposeInMainWorld("fileHandler", fileHandler);

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
