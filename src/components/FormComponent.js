import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

function FormComponent() {
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
  const [error, setError] = useState('');

  // Helper function to validate CPF (basic validation)
  const validateCPF = (cpf) => {
    // Implement CPF validation logic or use a library
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
      setError(validationError);
      return;
    }

    // Clear any previous error
    setError('');

    // Implement submission logic here (e.g., sending data to the server)
    console.log('Form data:', formData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formUnidade">
        <Form.Label>Qual unidade para cadastro:</Form.Label>
        <Form.Control as="select" name="unidade" value={formData.unidade} onChange={handleChange}>
          <option value="">Selecione</option>
          <option value="Unidade 1">Unidade 1</option>
          <option value="Unidade 2">Unidade 2</option>
          {/* Add more options as needed */}
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="formNome">
        <Form.Label>Nome Completo:</Form.Label>
        <Form.Control type="text" name="nome" value={formData.nome} onChange={handleChange} />
      </Form.Group>

      <Form.Group controlId="formCpf">
        <Form.Label>CPF:</Form.Label>
        <Form.Control type="text" name="cpf" value={formData.cpf} onChange={handleChange} />
      </Form.Group>

      <Form.Group controlId="formNumeroCartaoSUS">
        <Form.Label>Número do Cartão SUS:</Form.Label>
        <Form.Control type="text" name="numeroCartaoSUS" value={formData.numeroCartaoSUS} onChange={handleChange} />
      </Form.Group>

      <Form.Group controlId="formDataNascimento">
        <Form.Label>Data de Nascimento:</Form.Label>
        <Form.Control type="text" name="dataNascimento" placeholder="DD/MM/AAAA" value={formData.dataNascimento} onChange={handleChange} />
      </Form.Group>

      <Form.Group controlId="formEmail">
        <Form.Label>E-mail:</Form.Label>
        <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} />
      </Form.Group>

      <Form.Group controlId="formCep">
        <Form.Label>CEP:</Form.Label>
        <Form.Control type="text" name="cep" value={formData.cep} onChange={handleChange} />
      </Form.Group>

      {/* Add other fields similarly */}

      <Button variant="primary" type="submit">
        Enviar
      </Button>

      {error && <Alert variant="danger">{error}</Alert>}
    </Form>
  );
}

export default FormComponent;
