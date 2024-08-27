// import { contextBridge, ipcRenderer } from 'electron'
// import { electronAPI } from '@electron-toolkit/preload'

// // Custom APIs for renderer
// const api = {}

// // Expose ipcRenderer methods to the renderer process
// const ipcAPI = {
//   send: (channel: string, data: any) => ipcRenderer.send(channel, data),
//   invoke: (channel: string, data: any) => ipcRenderer.invoke(channel, data),
//   on: (channel: string, func: (...args: any[]) => void) => ipcRenderer.on(channel, func),
// }

// // Use `contextBridge` APIs to expose Electron APIs to
// // renderer only if context isolation is enabled, otherwise
// // just add to the DOM global.
// if (process.contextIsolated) {
//   try {
//     contextBridge.exposeInMainWorld('electron', electronAPI)
//     contextBridge.exposeInMainWorld('api', api)
//     contextBridge.exposeInMainWorld('ipcRenderer', ipcAPI) // Expose ipcRenderer API
//   } catch (error) {
//     console.error(error)
//   }
// } else {
//   // @ts-ignore (define in dts)
//   window.electron = electronAPI
//   // @ts-ignore (define in dts)
//   window.api = api
//   // @ts-ignore (define in dts)
//   window.ipcRenderer = ipcAPI // Expose ipcRenderer API
// }

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
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI);
    contextBridge.exposeInMainWorld('api', api);
    contextBridge.exposeInMainWorld('ipcRenderer', ipcAPI); // Expose ipcRenderer API
  } catch (error) {
    console.error(error);
  }
} else {
  window.electron = electronAPI;
  window.api = api;
  window.ipcRenderer = ipcAPI; // Expose ipcRenderer API
}
