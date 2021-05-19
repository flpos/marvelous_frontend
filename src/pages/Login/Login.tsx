import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import LoginService from '../../services/login';
import { loginAction } from '../../store/auth/actions';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 100vh;
`;
const TextInput = styled.input``;
const SubmitButton = styled.button``;

const Login: React.FC = () => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const dispatch = useDispatch();

  const handleSubmit: React.FormEventHandler = async (event) => {
    event.preventDefault();
    try {
      const result = await LoginService.login(username, password);
      dispatch(loginAction(result.data.access_token));
    } catch (e) {}
  };

  return (
    <Form role='login-form' onSubmit={handleSubmit}>
      <TextInput
        type='text'
        placeholder='Usuário'
        onChange={({ target }) => setUsername(target.value)}
      />
      <TextInput
        type='password'
        placeholder='Senha'
        onChange={({ target }) => setPassword(target.value)}
      />
      <SubmitButton type='submit'>Entrar</SubmitButton>
    </Form>
  );
};

export default Login;
