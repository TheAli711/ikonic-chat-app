import React, { useEffect } from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import { getChats, getMessages } from "../services/chat";
import ConversationsContainer from "../components/chat/ConversationsContainer.jsx";
import ChatInfo from "../components/chat/ChatInfo.jsx";
import Chat from "../components/chat/Chat.jsx";

const Chats = () => {
  const [conversations, setConversations] = React.useState([]);
  const [activeChat, setActiveChat] = React.useState(null);
  const [conversation, setConversation] = React.useState({});
  const [rooms, setRooms] = React.useState([
    {
      name: "Room 1",
      users: [{ username: "abcdef" }],
      messages: [
        {
          user: "ali",
          text: "Hi",
        },
        {
          user: "ali2",
          text: "HIii",
        },
        {
          user: "ali3",
          text: "abcd",
        },
      ],
    },
  ]);

  useEffect(() => {
    getChats().then((data) => {
      console.log(data);
      setConversations(data.conversations);
    });
  }, []);

  useEffect(() => {
    if (activeChat) {
      console.log(activeChat, "Active Chat: ");
      getMessages(activeChat.id).then((data) => {
        console.log(data);
        setConversation(data.conversation);
      });
    }
  }, [activeChat]);

  return (
    <Grid
      templateColumns="repeat(5, 1fr)"
      bg="aliceblue"
      width="90%"
      height="90vh"
      margin="auto"
      gap={6}
      p={10}
    >
      <GridItem boxShadow="base" w="100%" bg="white" borderLeft="black">
        <ConversationsContainer
          conversations={conversations}
          activeChat={activeChat}
          setActiveChat={setActiveChat}
          rooms={rooms}
        />
      </GridItem>
      <GridItem boxShadow="base" colSpan={3} bg="white">
        <Chat activeChat={activeChat} conversation={conversation} />
      </GridItem>
      {activeChat && (
        <GridItem boxShadow="base" w="100%" bg="white">
          <ChatInfo activeChat={activeChat} />
        </GridItem>
      )}
    </Grid>
  );
};

export default Chats;
