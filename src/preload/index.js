

const { contextBridge, ipcRenderer } = require('electron');
const { electronAPI } = require('@electron-toolkit/preload');

// Custom APIs for renderer
const api = {};

// Expose ipcRenderer methods to the renderer process
const ipcAPI = {
  send: (channel, data) => ipcRenderer.send(channel, data),
  invoke: (channel, data) => ipcRenderer.invoke(channel, data),
  on: (channel, func) => ipcRenderer.on(channel, func),
};

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled

  try {
    contextBridge.exposeInMainWorld('electron', electronAPI);
    contextBridge.exposeInMainWorld('api', api);
    contextBridge.exposeInMainWorld('ipcRenderer', ipcAPI); // Expose ipcRenderer API
  } catch (error) {
    console.error(error);
  }

