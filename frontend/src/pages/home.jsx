import {
  Box,
  Container,
  Text,
  Tab,
  TabPanel,
  TabPanels,
  TabList,
  Tabs,
} from '@chakra-ui/react';
import Login from '../components/auth/Login';
import Signup from '../components/auth/Signup';

const Home = () => {
  return (
    <Container
      maxW="xl"
      centerContent
      height={'100vh'}
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Box
        display="flex"
        justifyContent="center"
        flexDirection={'column'}
        maxW={'400px'}
        boxShadow={'lg'}
        // p={3}
        // bgColor={'mintcream'}
        bgColor={'brand.500'}
        w={'100%'}
        // m="40px 0 15px 0"
        borderRadius={'lg'}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            // mb: 5,
            p: 3,
            bgColor: 'brand.200',
            borderTopRadius: 'lg',
          }}
        >
          <Text
            fontSize="2xl"
            color={'brand.500'}
            fontWeight={'bold'}
            textAlign={'center'}
          >
            IKONIC CHAT APP
          </Text>
        </Box>

        <Box p={3}>
          <Tabs
            isFitted
            flexGrow={1}
            color={'brand.200'}
            ringColor={'brand.200'}
            ringWidth={2}
            ringOffset={0}
            ringOpacity={0.5}
            variant="enclosed"
            mt={4}
            transition={'all 0.3s'}
          >
            <TabList mb="1em">
              <Tab>Login</Tab>
              <Tab>Sign Up</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Login />
              </TabPanel>
              <TabPanel>
                <Signup />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Box>
    </Container>
  );
};

export default Home;
