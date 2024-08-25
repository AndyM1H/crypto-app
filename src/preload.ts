import { contextBridge, ipcRenderer } from "electron";
import { CIPHER_METHOD } from "./constants";
import { EncryptionFactory, EncryptionParams } from "./encryption";

const cryptoAPI = {
  encrypt: (method: CIPHER_METHOD, { text, key }: EncryptionParams): string => {
    const encryption = EncryptionFactory.createEncryptionMethod(method);
    return encryption.encrypt({ text, key });
  },
  decrypt: (method: CIPHER_METHOD, { text, key }: EncryptionParams): string => {
    const encryption = EncryptionFactory.createEncryptionMethod(method);
    return encryption.decrypt({ text, key });
  },
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
