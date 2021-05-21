import React from 'react';
import styled from 'styled-components';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import UserService from '../../services/user';
import { toastError } from '../../utils/toastError';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: calc(100vh - 42px);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;

  background-color: white;
  padding: 42px;
  min-width: 600px;
  @media (max-width: 600px) {
    min-width: unset;
  }

  > * {
    margin-bottom: 12px;
    &:last-child {
      margin-bottom: 0px;
    }
  }
`;
const Label = styled.label`
  margin-bottom: 6px;
`;
const Title = styled.h1`
  margin-top: 0px;
`;

const UserPanel = () => {
  const [userId, setUserId] = React.useState<number | null>(null);
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit: React.FormEventHandler = async (event) => {
    event.preventDefault();
    try {
      UserService.updateUser(userId ?? 0, password);
    } catch (e) {
      toastError(e);
    }
  };

  React.useEffect(() => {
    UserService.getUser()
      .then(({ data }) => {
        setUsername(data.username);
        setUserId(data.id);
      })
      .catch(toastError);
  }, []);

  return (
    <Wrapper>
      <Form role='login-form' onSubmit={handleSubmit}>
        <Title>Painel do Usuário</Title>
        <Label>Usuário:</Label>
        <TextInput
          type='text'
          placeholder='Usuário'
          value={username}
          onChange={({ target }) => setUsername(target.value)}
          required
          disabled
        />
        <Label>Senha:</Label>
        <TextInput
          type='password'
          placeholder='Senha'
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          required
        />
        <Button type='submit'>Atualizar</Button>
      </Form>
    </Wrapper>
  );
};

export default UserPanel;
