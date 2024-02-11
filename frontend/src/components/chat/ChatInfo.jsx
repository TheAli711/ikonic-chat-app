import { Box, Text } from "@chakra-ui/react";
import React from "react";

const ChatInfo = ({ activeChat }) => {
  return (
    <>
      <Box color="black" p={2} textAlign="center" borderRadius="lg" mb={5}>
        {activeChat.id ? "Chat" : "Room"} Info
      </Box>
      {activeChat.users.map((user) => (
        <Text key={user.username}>{user.username}</Text>
      ))}
    </>
  );
};

export default ChatInfo;
