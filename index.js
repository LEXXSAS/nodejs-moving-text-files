import fs from 'fs';
import { readdirSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const folderTargetName = 'testfolder'
const folderDestinationName = 'filescorrected'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetDir = path.join(__dirname, folderTargetName);

const files = readdirSync(targetDir, { withFileTypes: true });

function getFileExtension(filePath) {
  const parts = filePath.split('.').filter(Boolean);
  return parts.length > 1 ? parts.splice(1).join('.') : 'Расширение отстуствует';
}

function move(oldPath, newPath) {
  let fileNameFromPath = path.basename(oldPath);
  fs.rename(oldPath, newPath, (err) => {
    if (err) {
      console.log(`Ошибка перемещения файла ${fileNameFromPath}: `, err);
    } else {
      console.log(`Файл ${fileNameFromPath} успешно перемещен!`);
    }
  });
}

files.forEach(file => {
  const fileName = file.name;
  let oldPathForTest = path.join(__dirname, folderTargetName, fileName);
  let fileNameFromPath = path.basename(oldPathForTest);
  if ((getFileExtension(oldPathForTest) !== 'txt')) {
    console.log(`Формат файла ${fileNameFromPath} не соответстует txt`);
  }
  else {
    const data = fs.readFileSync(path.join(__dirname, folderTargetName, fileName)).toString();
    const fileLinesLength = data.split('\n').length;
    if (fileLinesLength === 3 || fileLinesLength === 4) {
      let oldPath = path.join(__dirname, folderTargetName, fileName);
      let newPath = path.join(__dirname, folderDestinationName, fileName);
      move(oldPath, newPath);
    } else {
      return;
    }
  }
});
