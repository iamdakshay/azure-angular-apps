'use strict';
require("electron-reload")(__dirname);

const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let window;

let createWindow = () => {
  window = new BrowserWindow({ width: 400, height: 700 });
  window.loadURL(`file://${__dirname}/index.html`)
  window.webContents.openDevTools();

  window.on('closed', () => {
    window = null
  });
};

app.on('ready', createWindow);

app.on('activate', () => {
  if (window === null) {
    createWindow();
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});