import React from 'react';
import { useHistory } from 'react-router';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import LoginService from '../../services/login';
import { Background, Container, Form } from '../Login/styles';

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
    <>
      <Background />
      <Container>
        <Form role='login-form' onSubmit={handleSubmit}>
          <h1 style={{ marginTop: 0 }}>Criação de usuário</h1>

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
          <Button type='button' onClick={() => history.go(-1)}>
            Voltar
          </Button>
          <Button type='submit'>Criar</Button>
        </Form>
      </Container>
    </>
  );
};

export default SignUp;
