const { app, BrowserWindow, ipcMain, dialog, shell } = require('electron');
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'

import { captureGoogleSearch } from '.././renderer/src/utils/path-to-playwright-script';
const activeWindow = require('active-win');
const fs = require('fs').promises;
const path = require('path')


const createWindow = async() => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 350,
    height: 410,
    show: false,
    // resizable: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? {icon} : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return {action: 'deny'}
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  // 오늘 날짜 확인
  const date = new Date();
  const dateStr = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  // 데이터 불러오기
  const record = {};
  // process.env['ELECTRON_RENDERER_URL']+`/${dateStr}.txt`

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    try {
      const loadedData = await fs.readFile(join(__dirname, '../renderer/2023-11-24.txt'))
      console.log(loadedData.toString())
      record[dateStr] = JSON.parse(loadedData.toString());
    } catch {
      console.log(__dirname, `${dateStr}.txt2`)
      console.log(join(__dirname, '../renderer/2023-11-24.txt'));
      // mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
      console.log('no file!!')
    }

  } else {
    try {
      const loadedData = await fs.readFile(path.join(__dirname, `${dateStr}.txt`));
      console.log(loadedData.toString())
      record[dateStr] = JSON.parse(loadedData.toString());
    } catch {
      console.log(__dirname, `${dateStr}.txt3`)
      // mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
      console.log('no file!!')
    }
  }




  //1초마다 실행
  setInterval(async () => {
    // 12시 넘어서 날짜 바뀔 수 있으므로 setInterval 안에서 다시 날짜 로딩
    const date = new Date();
    const dateStr = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
    //액티브 윈도우 조회
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const data = await activeWindow({})
    if(!record[dateStr]){
      record[dateStr] = {};
    }

    // 없으면 1초로 시작, 있으면 1초 더하기
    if(record[dateStr][data?.owner?.name]){
      record[dateStr][data?.owner?.name] += 1;
    } else{
      record[dateStr][data?.owner?.name] = 1
    }
    // html로 데이터 보내기
    // mac: screenRecordingPermission
    mainWindow.webContents.send('updateNumber', record[dateStr]);
    // 데이터 저장
    await fs.writeFile(path.join(__dirname, `${dateStr}.txt`));
  }, 1000)

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ipcMain.on('test-alarm', (event) => {
    dialog.showMessageBox({
      type: 'info',
      title: '알람 테스트',
      message: '이것은 알람 테스트입니다.',
      buttons: ['확인']
    });
  });


  ipcMain.handle('capture-request', async (event, searchQuery) => {
    try {
      const result = await captureGoogleSearch(searchQuery);
      return `Capture completed: ${result}`;
    } catch (error) {
      console.error('Capture error:', error);
      return `Error: ${error.message}`;
    }
  });
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
