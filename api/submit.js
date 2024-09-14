// api/submit.js

import { createObjectCsvWriter } from 'csv-writer';
import { uploadFile } from '../backend/controllers/googleDriveUpload'; // Ajuste o caminho conforme necessário

const submitHandler = async (req, res) => {
  if (req.method === 'POST') {
    const data = req.body;

    // Verifique se os dados contêm todos os campos necessários
    if (!data.unidade || !data.nome || !data.email) {
      return res.status(400).json({ error: 'Dados inválidos: todos os campos são necessários.' });
    }

    // Crie o CSV
    const csvWriter = createObjectCsvWriter({
      path: '/tmp/data.csv', // Usando /tmp para armazenamento temporário
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
      const fileId = await uploadFile('/tmp/data.csv'); // Ajuste o caminho conforme necessário
      res.status(200).json({ message: `Dados recebidos e CSV gerado. ID do arquivo no Google Drive: ${fileId}` });
    } catch (error) {
      console.error('Erro ao processar dados:', error);
      res.status(500).json({ error: 'Erro ao enviar o arquivo para o Google Drive.' });
    }
  } else {
    // Método não permitido
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Método ${req.method} não permitido`);
  }
};

export default submitHandler;
