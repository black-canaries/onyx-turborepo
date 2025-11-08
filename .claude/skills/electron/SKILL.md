---
name: electron
description: Electron desktop application development skill covering Next.js renderer process setup, TypeScript main/preload processes, concurrent development workflow, IPC communication, environment variable passing, native APIs, build configuration, and packaging. Use when working with the desktop app, implementing native features, or configuring Electron.
---

# Electron Desktop Development

This project uses **Electron 31.7.7** with a **Next.js 16** renderer process.

## Desktop App

**Location:** /Users/jonathansmith/Projects/onyx-turborepo/apps/desktop

### Architecture

The Electron app follows a standard architecture:

- **Main Process:** Node.js environment (TypeScript compiled to `dist-electron/`)
- **Renderer Process:** Next.js 16 app (runs on port 3010)
- **Preload Scripts:** Secure bridge between main and renderer

### Key Features

- **Electron:** 31.7.7
- **Next.js:** 16.0.1 (renderer)
- **React:** 19.2.0
- **Development Port:** 3010
- **Workspace Packages:** Uses `@repo/ui`, `@repo/convex`, `@repo/supabase`
- **TypeScript:** Full TypeScript for main, preload, and renderer

### Configuration Files

- **electron/main.ts:1** - Main process entry
- **electron/preload.ts:1** - Preload script
- **next.config.ts:1** - Next.js renderer config
- **tsconfig.json:1** - Main TypeScript config
- **electron/tsconfig.json:1** - Electron-specific TypeScript config
- **package.json:1** - Scripts and configuration

## Project Structure

```
apps/desktop/
├── electron/
│   ├── main.ts           # Main process
│   ├── preload.ts        # Preload script
│   └── tsconfig.json     # Electron TypeScript config
├── app/                  # Next.js app (renderer)
│   ├── layout.tsx
│   └── page.tsx
├── dist-electron/        # Compiled Electron code (gitignored)
├── next.config.ts        # Next.js configuration
├── tsconfig.json         # Root TypeScript config
└── package.json          # Scripts and dependencies
```

## Main Process

The main process is the Node.js backend of your Electron app.

### electron/main.ts

```typescript
import { app, BrowserWindow } from 'electron';
import path from 'path';

let mainWindow: BrowserWindow | null = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,  // Security best practice
      contextIsolation: true,   // Security best practice
    },
  });

  // Load Next.js dev server in development
  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:3010');
    mainWindow.webContents.openDevTools();
  } else {
    // Load built Next.js app in production
    mainWindow.loadFile(path.join(__dirname, '../out/index.html'));
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
```

### Key Main Process APIs

```typescript
import {
  app,           // Application lifecycle
  BrowserWindow, // Window management
  ipcMain,       // IPC communication
  dialog,        // Native dialogs
  Menu,          // Application menu
  Tray,          // System tray
  shell,         // Shell operations
} from 'electron';

// Application events
app.on('ready', () => {});
app.on('window-all-closed', () => {});
app.on('activate', () => {});
app.on('before-quit', () => {});

// Window management
const win = new BrowserWindow({ width: 800, height: 600 });
win.loadURL('http://localhost:3010');
win.maximize();
win.minimize();
win.close();

// Dialogs
const result = await dialog.showOpenDialog({
  properties: ['openFile', 'multiSelections']
});

// Menu
const menu = Menu.buildFromTemplate([
  { label: 'File', submenu: [{ role: 'quit' }] }
]);
Menu.setApplicationMenu(menu);
```

## Preload Script

The preload script runs in a context with access to both Node.js APIs and the renderer DOM.

### electron/preload.ts

```typescript
import { contextBridge, ipcRenderer } from 'electron';

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electron', {
  // Send message to main process
  send: (channel: string, data: any) => {
    const validChannels = ['save-file', 'open-file'];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },

  // Receive message from main process
  receive: (channel: string, func: (...args: any[]) => void) => {
    const validChannels = ['file-saved', 'file-opened'];
    if (validChannels.includes(channel)) {
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
  },

  // Invoke (request-response pattern)
  invoke: (channel: string, data?: any) => {
    const validChannels = ['get-user-data', 'save-settings'];
    if (validChannels.includes(channel)) {
      return ipcRenderer.invoke(channel, data);
    }
  },
});

// Type declarations for renderer
declare global {
  interface Window {
    electron: {
      send: (channel: string, data: any) => void;
      receive: (channel: string, func: (...args: any[]) => void) => void;
      invoke: (channel: string, data?: any) => Promise<any>;
    };
  }
}
```

**Security Note:** Always validate channels to prevent security vulnerabilities.

## IPC Communication

Inter-Process Communication between main and renderer.

### Main Process (Receiving)

```typescript
import { ipcMain } from 'electron';

// One-way message
ipcMain.on('save-file', (event, data) => {
  console.log('Received:', data);
  // Do something
  event.sender.send('file-saved', { success: true });
});

// Request-response pattern (recommended)
ipcMain.handle('get-user-data', async (event, userId) => {
  const userData = await fetchUserData(userId);
  return userData;
});
```

### Renderer Process (Sending)

```tsx
// app/page.tsx (Next.js component)
'use client';

import { useEffect, useState } from 'react';

export default function Page() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Listen for messages from main
    if (typeof window !== 'undefined' && window.electron) {
      window.electron.receive('file-saved', (data) => {
        console.log('File saved:', data);
      });
    }
  }, []);

  const handleClick = async () => {
    // Send message to main
    window.electron.send('save-file', { content: 'Hello' });

    // Or use invoke for request-response
    const data = await window.electron.invoke('get-user-data', 123);
    setUserData(data);
  };

  return (
    <button onClick={handleClick}>
      Save File
    </button>
  );
};
```

## Next.js Renderer Configuration

### next.config.ts

```typescript
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export', // For production builds
  distDir: 'out',   // Output directory for static export
  images: {
    unoptimized: true, // Required for static export
  },
  transpilePackages: [
    '@repo/ui',
    '@repo/convex',
    '@repo/supabase',
  ],
};

export default nextConfig;
```

**Key settings for Electron:**
- `output: 'export'` - Static HTML export for production
- `images.unoptimized: true` - Required for static export
- `transpilePackages` - Transpile workspace packages

## Development Workflow

### package.json Scripts

```json
{
  "scripts": {
    "dev": "concurrently \"npm run dev:next\" \"npm run dev:electron\"",
    "dev:next": "next dev -p 3010",
    "dev:electron": "wait-on http://localhost:3010 && electron .",
    "build": "next build && tsc -p electron/tsconfig.json",
    "start": "electron .",
    "package": "electron-builder"
  }
}
```

### Concurrent Development

The dev script runs both Next.js and Electron concurrently:

1. **Next.js dev server** starts on port 3010
2. **wait-on** waits for Next.js to be ready
3. **Electron** starts and loads `http://localhost:3010`

This enables hot reload during development.

### Running Development

```bash
# Start dev environment
pnpm dev --filter=desktop

# This runs:
# 1. Next.js dev server on port 3010
# 2. TypeScript compilation for Electron
# 3. Electron app loading Next.js dev server
```

## TypeScript Configuration

### Main tsconfig.json

```json
{
  "extends": "@repo/typescript-config/next",
  "compilerOptions": {
    "outDir": "dist"
  },
  "include": ["app/**/*", "next.config.ts"],
  "exclude": ["node_modules", "dist-electron"]
}
```

### electron/tsconfig.json

```json
{
  "extends": "@repo/typescript-config/electron",
  "compilerOptions": {
    "outDir": "../dist-electron",
    "module": "commonjs",
    "target": "ES2020"
  },
  "include": ["*.ts"],
  "exclude": ["node_modules"]
}
```

## Environment Variables

### Passing to Renderer

In Next.js, use standard environment variables:

```bash
# .env.local (in apps/desktop directory)
NEXT_PUBLIC_API_URL=https://api.example.com
```

```tsx
// Accessible in renderer
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
```

### Passing to Main Process

```typescript
// electron/main.ts
const apiUrl = process.env.API_URL || 'https://api.example.com';
```

### Passing from Main to Renderer

```typescript
// electron/main.ts
function createWindow() {
  const win = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      additionalArguments: [
        `--app-version=${app.getVersion()}`
      ],
    },
  });
}
```

```typescript
// electron/preload.ts
const appVersion = process.argv.find(arg =>
  arg.startsWith('--app-version=')
)?.split('=')[1];

contextBridge.exposeInMainWorld('electron', {
  appVersion,
});
```

## Native Features

### File System Operations

```typescript
import { ipcMain, dialog } from 'electron';
import fs from 'fs/promises';

ipcMain.handle('open-file', async () => {
  const result = await dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [{ name: 'Text Files', extensions: ['txt'] }],
  });

  if (result.canceled) return null;

  const filePath = result.filePaths[0];
  const content = await fs.readFile(filePath, 'utf-8');

  return { filePath, content };
});

ipcMain.handle('save-file', async (event, { content }) => {
  const result = await dialog.showSaveDialog({
    filters: [{ name: 'Text Files', extensions: ['txt'] }],
  });

  if (result.canceled) return false;

  await fs.writeFile(result.filePath, content, 'utf-8');
  return true;
});
```

### System Notifications

```typescript
import { Notification } from 'electron';

ipcMain.on('show-notification', (event, { title, body }) => {
  new Notification({ title, body }).show();
});
```

### Application Menu

```typescript
import { Menu, app } from 'electron';

const template = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Open',
        accelerator: 'CmdOrCtrl+O',
        click: () => {
          // Handle open
        },
      },
      { type: 'separator' },
      { role: 'quit' },
    ],
  },
  {
    label: 'Edit',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
    ],
  },
];

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);
```

### System Tray

```typescript
import { Tray, Menu, nativeImage } from 'electron';
import path from 'path';

let tray: Tray | null = null;

function createTray() {
  const icon = nativeImage.createFromPath(
    path.join(__dirname, '../assets/icon.png')
  );

  tray = new Tray(icon);

  const contextMenu = Menu.buildFromTemplate([
    { label: 'Show', click: () => mainWindow?.show() },
    { label: 'Quit', click: () => app.quit() },
  ]);

  tray.setContextMenu(contextMenu);
  tray.setToolTip('My App');
}
```

## Building for Production

### Build Process

```bash
# Build Next.js and Electron
pnpm build --filter=desktop

# This runs:
# 1. next build (creates static export in 'out/')
# 2. tsc -p electron/tsconfig.json (compiles main/preload to 'dist-electron/')
```

### Electron Builder Configuration

```json
// package.json
{
  "build": {
    "appId": "com.yourcompany.desktop",
    "productName": "Desktop App",
    "directories": {
      "output": "dist"
    },
    "files": [
      "dist-electron/**/*",
      "out/**/*",
      "package.json"
    ],
    "mac": {
      "category": "public.app-category.productivity",
      "target": ["dmg", "zip"]
    },
    "win": {
      "target": ["nsis", "portable"]
    },
    "linux": {
      "target": ["AppImage", "deb"]
    }
  }
}
```

### Packaging

```bash
# Install electron-builder
pnpm add -D electron-builder --filter=desktop

# Package for current platform
pnpm package --filter=desktop

# Package for specific platform
electron-builder --mac
electron-builder --win
electron-builder --linux
```

## Security Best Practices

### 1. Disable nodeIntegration

```typescript
new BrowserWindow({
  webPreferences: {
    nodeIntegration: false, // CRITICAL for security
    contextIsolation: true,  // CRITICAL for security
  },
});
```

### 2. Use Preload Script

Always use a preload script to expose only specific APIs:

```typescript
// ✅ Good - expose specific methods
contextBridge.exposeInMainWorld('electron', {
  saveFile: (content: string) => ipcRenderer.invoke('save-file', content),
});

// ❌ Bad - exposes entire ipcRenderer
contextBridge.exposeInMainWorld('electron', {
  ipcRenderer,
});
```

### 3. Validate IPC Channels

```typescript
// ✅ Good - whitelist channels
const validChannels = ['save-file', 'open-file'];
if (validChannels.includes(channel)) {
  ipcRenderer.send(channel, data);
}

// ❌ Bad - any channel allowed
ipcRenderer.send(channel, data);
```

### 4. Content Security Policy

```typescript
mainWindow.webContents.session.webRequest.onHeadersReceived((details, callback) => {
  callback({
    responseHeaders: {
      ...details.responseHeaders,
      'Content-Security-Policy': ["default-src 'self'"],
    },
  });
});
```

## Common Patterns

### Window State Management

```typescript
import Store from 'electron-store';

interface WindowState {
  width: number;
  height: number;
  x?: number;
  y?: number;
}

const store = new Store<WindowState>();

function createWindow() {
  const state = store.get('windowState', {
    width: 1200,
    height: 800,
  });

  const win = new BrowserWindow({
    ...state,
    webPreferences: { /* ... */ },
  });

  win.on('close', () => {
    store.set('windowState', win.getBounds());
  });
}
```

### Auto Updates

```typescript
import { autoUpdater } from 'electron-updater';

autoUpdater.checkForUpdatesAndNotify();

autoUpdater.on('update-available', () => {
  // Notify user
});

autoUpdater.on('update-downloaded', () => {
  // Prompt to restart
});
```

### Deep Linking

```typescript
// Register protocol
app.setAsDefaultProtocolClient('myapp');

// Handle protocol URLs
app.on('open-url', (event, url) => {
  event.preventDefault();
  // Parse url and navigate
  console.log('Protocol URL:', url);
});
```

## Debugging

### Renderer Process

```typescript
// electron/main.ts
if (process.env.NODE_ENV === 'development') {
  mainWindow.webContents.openDevTools();
}
```

Use Chrome DevTools in the Electron window.

### Main Process

```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug Main Process",
      "type": "node",
      "request": "launch",
      "cwd": "${workspaceFolder}",
      "runtimeExecutable": "electron",
      "args": ["."],
      "outputCapture": "std"
    }
  ]
}
```

## Troubleshooting

### White screen on startup

- Check if Next.js dev server is running on port 3010
- Verify `wait-on` is waiting for the correct URL
- Check console in DevTools for errors

### Preload script not working

- Verify preload path is correct: `path.join(__dirname, 'preload.js')`
- Check `contextIsolation: true` is set
- Ensure preload script is compiled (check `dist-electron/`)

### IPC not working

- Verify channel names match between main and preload
- Check preload script is loaded (add console.log)
- Ensure contextBridge is properly exposing methods

### Build errors

- Check Next.js builds successfully: `next build`
- Verify TypeScript compiles: `tsc -p electron/tsconfig.json`
- Check paths in main process are correct for production

## Best Practices

1. **Security first** - Always disable nodeIntegration, enable contextIsolation
2. **Use preload scripts** - Bridge main and renderer securely
3. **Validate IPC** - Whitelist channels in preload
4. **Handle errors** - Wrap IPC handlers in try-catch
5. **Type safety** - Use TypeScript for main, preload, and renderer
6. **Environment per app** - Don't rely on root .env files
7. **Window state** - Save and restore window position/size
8. **Auto updates** - Implement for production apps
9. **Native feel** - Use native menus and dialogs
10. **Test packaging** - Regularly test production builds

## Reference

- Electron docs: https://www.electronjs.org/docs
- Next.js with Electron: https://www.electronjs.org/docs/latest/tutorial/tutorial-first-app
- Security: https://www.electronjs.org/docs/latest/tutorial/security
- IPC: https://www.electronjs.org/docs/latest/tutorial/ipc
- App location: /Users/jonathansmith/Projects/onyx-turborepo/apps/desktop
- Main process: /Users/jonathansmith/Projects/onyx-turborepo/apps/desktop/electron/main.ts
