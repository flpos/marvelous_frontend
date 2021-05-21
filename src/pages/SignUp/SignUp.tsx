import React from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import LoginService from '../../services/login';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 100vh;
`;
const TextInput = styled.input``;
const SubmitButton = styled.button``;

const SignUp = () => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const history = useHistory();

  const handleSubmit: React.FormEventHandler = async (event) => {
    event.preventDefault();
    try {
      await LoginService.signUp(username, password);
      history.push('/login');
    } catch (e) {}
  };
  return (
    <Form role='login-form' onSubmit={handleSubmit}>
      <SubmitButton type='button' onClick={() => history.go(-1)}>
        Voltar
      </SubmitButton>

      <TextInput
        type='text'
        placeholder='Usuário'
        onChange={({ target }) => setUsername(target.value)}
        required
      />
      <TextInput
        type='password'
        placeholder='Senha'
        onChange={({ target }) => setPassword(target.value)}
        required
      />
      <SubmitButton type='submit'>Criar</SubmitButton>
    </Form>
  );
};

export default SignUp;
