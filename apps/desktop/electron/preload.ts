import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("desktopBridge", {
  async getPlatformInfo() {
    return ipcRenderer.invoke("desktop:get-platform-info");
  },
  openExternal(url: string) {
    return ipcRenderer.invoke("desktop:open-external", url);
  },
});
