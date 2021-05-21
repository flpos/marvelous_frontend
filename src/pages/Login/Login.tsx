import React from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import LoginService from '../../services/login';
import { loginAction } from '../../store/auth/actions';
import { toastError } from '../../utils/toastError';
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
    } catch (e) {
      if (e.message === 'NETWORK ERROR') toast.error('Erro de conexão');
      else {
        toastError(e);
      }
    }
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
