import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { AppContext } from "../../AppContext";
import { createChat } from "../../services/chat";

const ChatInfo = ({ activeChat, setActiveChat, setConversations }) => {
  const { user: loggedInUser } = React.useContext(AppContext);
  console.log({
    activeChat,
    loggedInUser,
  });
  const onClickHandler = (user) => {
    if (user.id !== loggedInUser.id) {
      console.log("User Clicked");
      const message = prompt("Enter message to send to user: " + user.username);
      if (message) {
        createChat(user.id, message).then((data) => {
          console.log(data);
          setConversations((prev) => {
            return [...prev, data.conversation];
          });
        });
      }
    }
  };
  return (
    <>
      <Box p={2} borderTopRightRadius={"lg"} background={"brand.100"}>
        <Text
          fontSize="xl"
          color="brand.500"
          fontWeight={"bold"}
          textAlign={"center"}
        >
          My Info
        </Text>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flex: "1",
          flexBasis: "0",
          gap: "2",
        }}
        p={2}
        cursor={"pointer"}
        borderTopRightRadius={"lg"}
      >
        <Text>{loggedInUser.username}</Text>
      </Box>
      <Box p={2} borderTopRightRadius={"lg"} background={"brand.100"}>
        <Text
          fontSize="xl"
          color="brand.500"
          fontWeight={"bold"}
          textAlign={"center"}
        >
          {activeChat.id ? "Chat" : "Room"} Info
        </Text>
      </Box>
      {activeChat.users.map((user) => (
        <>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              flex: "1",
              flexBasis: "0",
              gap: "2",
            }}
            p={2}
            _hover={{
              background: user?.id !== loggedInUser?.id ? "brand.200" : "",
            }}
            cursor={"pointer"}
            borderTopRightRadius={"lg"}
            onClick={() => onClickHandler(user)}
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
            <Text key={user.username}>{user.username}</Text>
          </Box>
        </>
      ))}
    </>
  );
};

export default ChatInfo;
