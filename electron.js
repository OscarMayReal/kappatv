import { app, BrowserWindow, globalShortcut } from 'electron';
import {fork} from 'child_process';

var appwindow;
var server = fork('server.js');

server.on('message', (message) => {
    var json = JSON.parse(message);
    if (json.type === 'launchapp') {
        console.log(json);
        launchApp(json);
    }
});

function launchApp(json) {
    appwindow = new BrowserWindow({
        fullscreen: true,
    });
    appwindow.webContents.setUserAgent(json.useragent);
    appwindow.loadURL(json.url);
}

function createWindow() {
    var mainWindow = new BrowserWindow({
        fullscreen: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        }
    });
    mainWindow.loadURL('http://localhost:5173/');
}

app.whenReady().then(() => {
    globalShortcut.register('CommandOrControl+esc', () => {
        appwindow.close();
    });
    setTimeout(() => {
        createWindow();
    }, 2000);
});

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