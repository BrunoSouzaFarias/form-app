const fs = require('fs');
const { google } = require('googleapis');

async function uploadFile(filePath) {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    },
    scopes: 'https://www.googleapis.com/auth/drive.file',
  });

  const drive = google.drive({ version: 'v3', auth });
  const fileMetadata = {
    name: 'data.csv',
    parents: ['1aacnUpI5hjsLOiSDemeqYjknfNuJQusD'] // Substitua com o ID da pasta correta
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
