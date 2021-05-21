import React from 'react';
import { useDispatch } from 'react-redux';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import LoginService from '../../services/login';
import { loginAction } from '../../store/auth/actions';
import { Background, Container, Form, Link } from './styles';

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
    <>
      <Background />
      <Container>
        <Form role='login-form' onSubmit={handleSubmit}>
          <h1 style={{ textAlign: 'center' }}>MARVELOUS</h1>
          <p>Encontre e guarde seus heróis favoritos!</p>
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
          <Button type='submit'>Entrar</Button>
          <div>
            Não tem uma conta? <Link to='/signUp'>Clique aqui.</Link>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default Login;
