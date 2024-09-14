// controllers/formController.js
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const { uploadFile } = require('./googleDriveUpload');

const processFormData = async (req, res) => {
  const data = req.body;

  try {
    // Crie o CSV
    const csvWriter = createCsvWriter({
      path: 'data.csv',
      header: [
        { id: 'unidade', title: 'Unidade' },
        // Adicione outros campos conforme necessário
      ]
    });

    await csvWriter.writeRecords([data]);

    // Faça o upload para o Google Drive
    const fileId = await uploadFile('data.csv');
    res.status(200).send(`Dados recebidos e CSV gerado. ID do arquivo no Google Drive: ${fileId}`);
  } catch (error) {
    res.status(500).send('Erro ao processar os dados ou enviar o arquivo para o Google Drive.');
  }
};

module.exports = { processFormData };
