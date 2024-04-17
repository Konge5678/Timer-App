import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'

function createWindow() {
  // Lager et nytt vindu
  const mainWindow = new BrowserWindow({
    width: 300,
    height: 180,
    show: false,
    frame: false,
    transparent: true,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  // Setter tabben på toppen av alle andre vinduer
  mainWindow.setAlwaysOnTop(true, 'screen')

  // Viser appen når den er klar
  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  // Håndterer når en ny nettleservindu er forespurt for å åpne
  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // Laster inn innholdet i vinduet
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// Kjører funksjonen når appen er klar
app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // Lytter til 'close-window' meldingen fra renderer
  ipcMain.on('close-window', () => {
    // Henter det fokuserte vinduet
    const currentWindow = BrowserWindow.getFocusedWindow()
    // Lukker det fokuserte vinduet hvis det eksisterer
    if (currentWindow) {
      currentWindow.close()
    }
  })

  // Lytter til 'minimize-window' meldingen fra renderer
  ipcMain.on('minimize-window', () => {
    // Henter det fokuserte vinduet
    const currentWindow = BrowserWindow.getFocusedWindow()
    // Minimerer det fokuserte vinduet hvis det eksisterer
    if (currentWindow) {
      currentWindow.minimize()
    }
  })

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
