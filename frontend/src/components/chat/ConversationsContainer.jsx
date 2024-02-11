import { Box, Text, Button, Stack } from "@chakra-ui/react";
import { AppContext } from "../../AppContext";
import React, { useEffect } from "react";

const ConversationsContainer = ({
  conversations,
  activeChat,
  setActiveChat,
  rooms,
}) => {
  const { user } = React.useContext(AppContext);
  console.log(activeChat);
  return (
    <Box>
      <Box color="black" p={2} textAlign="center" borderRadius="lg" mb={5}>
        Chats
      </Box>
      <Box overflow="auto">
        {conversations ? (
          <Stack>
            {conversations.map((chat) => {
              const otherUser = chat.users.find((u) => u.id !== user.id);
              console.log(otherUser);
              return (
                <Box
                  onClick={() => setActiveChat(chat)}
                  cursor="pointer"
                  bg={activeChat === chat ? "#38B2AC" : "#E8E8E8"}
                  color={activeChat === chat ? "white" : "black"}
                  px={3}
                  py={2}
                  mx={2}
                  borderRadius="md"
                  key={chat.id}
                >
                  <Text>User: {otherUser.username}</Text>
                  {chat.latestMessage && (
                    <Text fontSize="xs">Message: {chat.latestMessage}</Text>
                  )}
                </Box>
              );
            })}
          </Stack>
        ) : (
          <Text>Loading...</Text>
        )}
      </Box>
      <Box color="black" p={2} textAlign="center" borderRadius="lg" mb={5}>
        Rooms
      </Box>
      <Box overflow="auto">
        {rooms ? (
          <Stack>
            {rooms.map((room) => {
              return (
                <Box
                  onClick={() => setActiveChat(room)}
                  cursor="pointer"
                  bg={activeChat === room ? "#38B2AC" : "#E8E8E8"}
                  color={activeChat === room ? "white" : "black"}
                  px={3}
                  py={2}
                  mx={2}
                  borderRadius="md"
                  key={room.name}
                >
                  <Text>{room.name}</Text>
                </Box>
              );
            })}
          </Stack>
        ) : (
          <Text>Loading...</Text>
        )}
      </Box>
    </Box>
  );
};

export default ConversationsContainer;
