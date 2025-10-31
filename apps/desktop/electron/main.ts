import { app, BrowserWindow, ipcMain, shell } from "electron";
import path from "node:path";

const isDev = process.env.NODE_ENV !== "production";
const devServerUrl = process.env.NEXT_DEV_SERVER_URL ?? "http://localhost:3010";

let mainWindow: BrowserWindow | null = null;

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    backgroundColor: "#09090b",
    show: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  mainWindow.on("ready-to-show", () => {
    mainWindow?.show();
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
  });

  if (isDev) {
    void mainWindow.loadURL(devServerUrl);
    mainWindow.webContents.openDevTools({ mode: "detach" });
  } else {
    void mainWindow.loadURL(devServerUrl);
  }
}

app.whenReady().then(() => {
  createMainWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

ipcMain.handle("desktop:get-platform-info", async () => ({
  platform: process.platform,
  version: app.getVersion(),
}));

ipcMain.handle("desktop:open-external", async (_event, url: string) => {
  await shell.openExternal(url);
});
