import React from "react";
import { Input, Button, Flex, Box, Text } from "@chakra-ui/react";

const Chat = ({ activeChat, conversation }) => {
  return (
    <Box>
      {activeChat && (
        <>
          <Box>
            {conversation?.messages?.map((message) => {
              console.log(message);
              return <Text key={message.id}>{message.text}</Text>;
            })}
          </Box>
          <Box>
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            ></form>
            <Flex>
              <Input
                className=""
                type="text"
                placeholder="Enter your message here"
              />
              <Button type="submit">Send Message</Button>
            </Flex>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Chat;
