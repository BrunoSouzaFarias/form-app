import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

// Helper function to validate CPF (basic validation)
const validateCPF = (cpf) => {
  return cpf.length === 11; // Placeholder for actual validation
};

// Helper function to validate Email
const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// Helper function to validate Date format
const validateDate = (date) => {
  const regex = /^\d{2}\/\d{2}\/\d{4}$/;
  return regex.test(date) && !isNaN(new Date(date.split('/').reverse().join('-')).getTime());
};

// Helper function to validate CEP (basic validation)
const validateCEP = async (cep) => {
  const regex = /^\d{5}-\d{3}$/;
  if (!regex.test(cep)) return false;
  // You might need to use an API to validate the CEP
  // Placeholder for API check
  return true;
};

function App() {
  const [formData, setFormData] = useState({
    unidade: '',
    nome: '',
    nomeMae: '',
    rg: '',
    cpf: '',
    numeroCartaoSUS: '',
    dataNascimento: '',
    localNascimento: '',
    sexo: '',
    nacionalidade: '',
    telefone: '',
    email: '',
    cep: '',
    endereco: '',
    funcao: '',
    numeroConselho: '',
    especialidade: '',
    dataInicialCurso: '',
    registroFuncional: '',
    dataFinalCurso: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let validationError = '';

    // Validate required fields
    if (!formData.unidade) validationError += 'Unidade é obrigatória. ';
    if (!formData.nome) validationError += 'Nome completo é obrigatório. ';
    if (!formData.cpf || !validateCPF(formData.cpf)) validationError += 'CPF inválido. ';
    if (formData.numeroCartaoSUS.length < 13) validationError += 'Número do Cartão SUS deve ter pelo menos 13 caracteres. ';
    if (!validateDate(formData.dataNascimento)) validationError += 'Data de nascimento inválida. ';
    if (!validateEmail(formData.email)) validationError += 'E-mail inválido. ';
    if (!await validateCEP(formData.cep)) validationError += 'CEP inválido. ';

    // Check if there are any errors
    if (validationError) {
      toast.error(validationError);
      return;
    }

    // Clear any previous error
    toast.dismiss();

    // Implement submission logic here
    try {
      const response = await fetch('https://form-app-cyan-three.vercel.app/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.text();
        toast.success(result);
      } else {
        toast.error('Erro ao enviar os dados. Tente novamente.');
      }
    } catch (error) {
      toast.error('Erro ao conectar com o servidor.');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formUnidade">
            <Form.Label>Qual unidade para cadastro:</Form.Label>
            <Form.Control as="select" name="unidade" value={formData.unidade} onChange={handleChange}>
              <option value="">Selecione</option>
              <option value="Unidade 1">Unidade 1</option>
              <option value="Unidade 2">Unidade 2</option>
              {/* Adicione mais opções conforme necessário */}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formNome">
            <Form.Label>Nome Completo:</Form.Label>
            <Form.Control type="text" name="nome" value={formData.nome} onChange={handleChange} />
          </Form.Group>

          {/* Add other form fields here */}

          <Button variant="primary" type="submit">
            Enviar
          </Button>
        </Form>

        {/* Toast Container */}
        <ToastContainer />
      </header>
    </div>
  );
}

export default App;
