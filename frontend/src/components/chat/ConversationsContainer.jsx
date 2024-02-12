import {
  Box,
  Text,
  Button,
  Stack,
  Tab,
  TabPanel,
  TabPanels,
  TabList,
  Tabs,
} from "@chakra-ui/react";
import { AppContext } from "../../AppContext";
import React, { useEffect } from "react";

const ConversationsContainer = ({
  conversations,
  activeChat,
  setActiveChat,
  rooms,
  socket,
}) => {
  const { user } = React.useContext(AppContext);
  const handleJoinRoom = () => {
    const roomName = window.prompt("Enter room name");
    if (roomName) {
      socket.emit("join-room", { room: roomName, user });
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flex: "1",
        flexBasis: "0",
        gap: "2",
      }}
    >
      <Box p={2} borderTopLeftRadius={"lg"} background={"brand.100"}>
        <Text
          fontSize="xl"
          color="brand.500"
          fontWeight={"bold"}
          textAlign={"center"}
        >
          Chats & Rooms
        </Text>
      </Box>
      <Tabs isFitted flexGrow={1} variant="line" mt={4} transition={"all 0.3s"}>
        <TabList mb="1em">
          <Tab
            color={"brand.500"}
            fontWeight={600}
            _selected={{
              color: "white",
              bg: "transparent",
              borderBottom: "2px solid #2B66B3",
              fontcolor: "brand.500",
            }}
          >
            Chats
          </Tab>
          <Tab
            color={"brand.500"}
            fontWeight={600}
            _selected={{
              color: "white",
              bg: "transparent",
              borderBottom: "2px solid #2B66B3",
              fontcolor: "brand.500",
            }}
          >
            Rooms
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel
            sx={{
              padding: 0,
            }}
          >
            <Box overflow="auto" minH={"100px"}>
              {conversations ? (
                <Stack width={"100%"}>
                  {conversations?.map((chat) => {
                    const otherUser = chat.users.find((u) => u.id !== user.id);

                    return (
                      <Box
                        onClick={() => setActiveChat(chat)}
                        cursor="pointer"
                        bg={activeChat === chat ? "brand.100" : "#transparent"}
                        color={activeChat === chat ? "white" : "white"}
                        px={3}
                        py={2}
                        width={"100%"}
                        display={"flex"}
                        gap={2}
                        alignItems={"center"}
                        key={chat.id}
                        transition={"all 0.3s"}
                        _hover={{
                          bg: "brand.100",
                          color: "white",
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="feather feather-user"
                        >
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                          <circle cx="12" cy="7" r="4"></circle>
                        </svg>{" "}
                        <Box>
                          <Text
                            display={"flex"}
                            alignItems={"center"}
                            fontWeight={600}
                            gap={2}
                          >
                            {otherUser.username}
                          </Text>
                          {chat.latestMessage && (
                            <Text
                              fontSize="xs"
                              display={"flex"}
                              alignItems={"center"}
                              fontWeight={500}
                              gap={2}
                            >
                              {chat.latestMessage}
                            </Text>
                          )}
                        </Box>
                      </Box>
                    );
                  })}
                </Stack>
              ) : (
                <Text>Loading...</Text>
              )}
            </Box>
          </TabPanel>
          <TabPanel
            sx={{
              padding: 0,
            }}
          >
            <Box overflow="auto" minH={"100px"}>
              {rooms ? (
                <Stack width={"100%"}>
                  {rooms.map((room) => {
                    console.log(room);
                    return (
                      <Box
                        onClick={() => setActiveChat(room)}
                        cursor="pointer"
                        bg={activeChat === room ? "brand.100" : "#transparent"}
                        color={activeChat === room ? "white" : "white"}
                        px={3}
                        py={2}
                        width={"100%"}
                        key={room.name}
                        transition={"all 0.3s"}
                        _hover={{
                          bg: "brand.100",
                          color: "white",
                        }}
                      >
                        <Text fontWeight={500}>{room.name}</Text>
                      </Box>
                    );
                  })}
                </Stack>
              ) : (
                <Text>Loading...</Text>
              )}
            </Box>
            <Box display="flex" justifyContent="center">
              <Button onClick={handleJoinRoom}>
                <Text fontWeight={500}>Join Room</Text>
              </Button>
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default ConversationsContainer;
