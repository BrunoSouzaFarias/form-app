const express = require('express');
const bodyParser = require('body-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const cors = require('cors');
const { uploadFile } = require('./controllers/googleDriveUpload');

const app = express();
const PORT = process.env.PORT || 5001;

// Configure o CORS para permitir solicitações do frontend hospedado no Vercel
app.use(cors({
  origin: 'https://form-app-cyan-three.vercel.app'
}));

// Use body-parser para lidar com JSON
app.use(bodyParser.json());

app.post('/api/submit', async (req, res) => {
  const data = req.body;
  
  // Verifique se os dados contêm todos os campos necessários
  if (!data.unidade || !data.nome || !data.email) {
    return res.status(400).send('Dados inválidos: todos os campos são necessários.');
  }

  // Crie o CSV
  const csvWriter = createCsvWriter({
    path: 'data.csv',
    header: [
      { id: 'unidade', title: 'Unidade' },
      { id: 'nome', title: 'Nome Completo' },
      { id: 'email', title: 'E-mail' },
      { id: 'cpf', title: 'CPF' },
      { id: 'numeroCartaoSUS', title: 'Número do Cartão SUS' },
      { id: 'dataNascimento', title: 'Data de Nascimento' },
      { id: 'cep', title: 'CEP' },
      { id: 'telefone', title: 'Telefone' },
      { id: 'endereco', title: 'Endereço' },
      { id: 'cidade', title: 'Cidade' },
      { id: 'estado', title: 'Estado' },
      { id: 'funcao', title: 'Função' },
      { id: 'numeroConselho', title: 'Número do Conselho' },
      { id: 'especialidade', title: 'Especialidade' },
      { id: 'dataInicialCurso', title: 'Data Inicial do Curso' },
      { id: 'registroFuncional', title: 'Registro Funcional' },
      { id: 'dataFinalCurso', title: 'Data Final do Curso' }
    ]
  });

  try {
    // Escreva o CSV
    await csvWriter.writeRecords([data]);

    // Faça o upload para o Google Drive
    const fileId = await uploadFile('data.csv');
    res.status(200).send(`Dados recebidos e CSV gerado. ID do arquivo no Google Drive: ${fileId}`);
  } catch (error) {
    console.error('Erro ao processar dados:', error);
    res.status(500).send('Erro ao enviar o arquivo para o Google Drive.');
  }
});

// Inicie o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
