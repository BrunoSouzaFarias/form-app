// googleDriveUpload.js
const fs = require('fs');
const { google } = require('googleapis');

async function uploadFile(filePath) {
  const auth = new google.auth.GoogleAuth({
    keyFile: 'config/credentials.json', // Atualize o caminho aqui
    scopes: 'https://www.googleapis.com/auth/drive.file',
  });

  const drive = google.drive({ version: 'v3', auth });
  const fileMetadata = {
    name: 'data.csv',
    parents: ['https://drive.google.com/drive/folders/1aacnUpI5hjsLOiSDemeqYjknfNuJQusD'] // Substitua com o ID da pasta no Google Drive
  };
  const media = {
    mimeType: 'text/csv',
    body: fs.createReadStream(filePath),
  };

  const response = await drive.files.create({
    resource: fileMetadata,
    media: media,
    fields: 'id',
  });

  return response.data.id;
}

module.exports = { uploadFile };
