import {
  Box,
  Container,
  Text,
  Tab,
  TabPanel,
  TabPanels,
  TabList,
  Tabs,
} from "@chakra-ui/react";
import Login from "../components/auth/Login";
import Signup from "../components/auth/Signup";

const Home = () => {
  return (
    <Container maxW="xl" centerContent>
      <Box
        display="flex"
        justifyContent="center"
        p={3}
        bgColor={"mintcream"}
        w={"100%"}
        m="40px 0 15px 0"
        borderRadius="lg"
        boxShadow="md"
      >
        <Text fontSize="2xl">IKONIC CHAT APP</Text>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        p={3}
        bgColor={"mintcream"}
        w={"100%"}
        m="40px 0 15px 0"
      >
        <Tabs
          isFitted
          variant="soft-rounded"
          flexGrow={1}
          colorScheme="mintcream"
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
    </Container>
  );
};

export default Home;
