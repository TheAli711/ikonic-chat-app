import React from 'react';
import { login } from '../../services/auth';
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Button,
  useToast,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../AppContext';

const Login = () => {
  const { setUser } = React.useContext(AppContext);
  const [errorMsgs, setErrorMsgs] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const loginIn = (e) => {
    console.log(loading);
    e.preventDefault();
    const eMsgs = {};
    const formData = new FormData(e.target);
    setErrorMsgs(eMsgs);
    setLoading(true);
    const data = {
      username: formData.get('username'),
      password: formData.get('password'),
      confirmPassword: formData.get('confirm-password'),
    };
    login(data.username, data.password)
      .then((res) => {
        console.log(res);
        setUser({ ...res.data });
        localStorage.setItem('user', JSON.stringify(res.data));
        localStorage.setItem('token', res.token);
        setLoading(false);
        toast({
          title: 'Login Successful',
          description: 'You have been logged in',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
        navigate('/chats');
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        toast({
          title: 'Login Failed',
          description: err?.message || 'An error occurred',
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
      });
  };
  return (
    <form
      onSubmit={loginIn}
      style={{
        width: '100%',
      }}
    >
      <VStack spacing="1.5rem">
        <FormControl isRequired id="username">
          <FormLabel>Username</FormLabel>
          <Input
            name="username"
            placeholder="Enter your username"
            variant={'filled'}
            p={6}
          />
          {errorMsgs.username && (
            <FormHelperText color="red.500">
              {errorMsgs.username}
            </FormHelperText>
          )}
        </FormControl>
        <FormControl isRequired id="password">
          <FormLabel>Password</FormLabel>
          <Input
            name="password"
            type="password"
            placeholder="Enter your password"
            variant={'filled'}
            p={6}
          />
          {errorMsgs.password && (
            <FormHelperText color="red.500">
              {errorMsgs.password}
            </FormHelperText>
          )}
        </FormControl>
        <Button
          width="100%"
          colorScheme="mintcream"
          marginTop="1rem"
          type="submit"
          variant={'brandPrimary'}
          isLoading={loading}
        >
          Login
        </Button>
      </VStack>
    </form>
  );
};

export default Login;
