import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  FormHelperText,
  useToast,
} from '@chakra-ui/react';
import React from 'react';
import { signup } from '../../services/auth';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../AppContext';

const Signup = () => {
  const { setUser } = React.useContext(AppContext);
  const [errorMsgs, setErrorMsgs] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const toast = useToast();

  const signUp = (e) => {
    console.log(loading);
    e.preventDefault();
    const eMsgs = {};
    console.log('Sign Up');
    const formData = new FormData(e.target);
    if (formData.get('password') !== formData.get('confirm-password')) {
      console.log('Passwords do not match');
      eMsgs.confirmPassword = 'Passwords do not match';
      setErrorMsgs(eMsgs);
      return;
    }
    setErrorMsgs(eMsgs);
    setLoading(true);
    const data = {
      username: formData.get('username'),
      password: formData.get('password'),
      confirmPassword: formData.get('confirm-password'),
    };
    signup(data.username, data.password)
      .then((res) => {
        console.log(res);
        setUser({ ...res.data });
        localStorage.setItem('user', JSON.stringify(res.data));
        localStorage.setItem('token', res.token);
        setLoading(false);
        toast({
          title: 'Account created.',
          description: "We've created an account for you.",
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
          title: 'Account creation failed.',
          description: err?.message || 'An error occurred',
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
      });
  };
  return (
    <form
      onSubmit={signUp}
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
        <FormControl isRequired id="confirm-password">
          <FormLabel>Confirm Password</FormLabel>
          <Input
            name="confirm-password"
            type="password"
            placeholder="Retype your password"
            variant={'filled'}
            p={6}
          />
          {errorMsgs.confirmPassword && (
            <FormHelperText color="red.500">
              {errorMsgs.confirmPassword}
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
          Sign Up
        </Button>
      </VStack>
    </form>
  );
};

export default Signup;
