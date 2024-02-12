import React, { useEffect } from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import { getChats, getMessages } from "../services/chat";
import ConversationsContainer from "../components/chat/ConversationsContainer.jsx";
import ChatInfo from "../components/chat/ChatInfo.jsx";
import Chat from "../components/chat/Chat.jsx";
import { io } from "socket.io-client";

const Chats = () => {
  const [conversations, setConversations] = React.useState([]);
  const [activeChat, setActiveChat] = React.useState(null);
  const [conversation, setConversation] = React.useState({});
  const [rooms, setRooms] = React.useState([]);
  const [socket, setSocket] = React.useState();
  const [typing, setTyping] = React.useState(false);

  useEffect(() => {
    getChats().then((data) => {
      setConversations(data.conversations);
    });
    console.log(import.meta.env.VITE_SOCKET_URL, "Socket URL");
    setSocket(io(import.meta.env.VITE_SOCKET_URL));
    return () => {
      socket?.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        console.log("Socket connected");
      });
      socket.on("room-users", (data) => {
        setRooms((prev) => {
          const index = prev.findIndex((room) => room.name === data.name);
          if (index === -1) {
            setActiveChat(data);
            return [...prev, data];
          } else {
            prev[index] = { ...prev[index], users: data.users };
            setActiveChat(prev[index]);
            return [...prev];
          }
        });
      });
      socket.on("message-room", (data) => {
        console.log("Message Received");
        setTyping(false);
        setRooms((prev) => {
          const index = prev.findIndex((room) => room.name === data.room);
          console.log(prev[index], data.message, "Message");
          if (index !== -1) {
            prev[index] = {
              ...prev[index],
              messages: [...prev[index].messages, data.message],
            };
            console.log(prev[index], "Updated Room");
            setActiveChat(prev[index]);
            return [...prev];
          }
        });
      });
    }
    return () => {
      socket?.disconnect();
      socket?.off("connect");
      socket?.off("room-users");
      socket?.off("message-room");
    };
  }, [socket]);

  useEffect(() => {
    if (activeChat?.id) {
      getMessages(activeChat.id).then((data) => {
        setConversation(data.conversation);
      });
    } else if (activeChat?.name) {
      setConversation(rooms.find((room) => room.name === activeChat.name));
    }
  }, [activeChat]);

  return (
    <Grid
      templateColumns="repeat(5, 1fr)"
      bg="brand.500"
      boxShadow={"lg"}
      width="90%"
      height="90vh"
      margin="auto"
      borderRadius={"lg"}
      overflow={"hidden"}
    >
      <GridItem w="100%" bg="brand.200" borderLeftRadius={"lg"}>
        <ConversationsContainer
          conversations={conversations}
          activeChat={activeChat}
          setActiveChat={setActiveChat}
          rooms={rooms}
          socket={socket}
        />
      </GridItem>
      <GridItem
        boxShadow="base"
        colSpan={3}
        bg="f5f5f5"
        height={"100%"}
        border={"none"}
        overflow={"hidden"}
      >
        <Chat
          activeChat={activeChat}
          conversation={conversation}
          setConversation={setConversation}
          socket={socket}
          typing={typing}
          setTyping={setTyping}
        />
      </GridItem>
      {activeChat && (
        <GridItem
          w="100%"
          bg="white"
          borderRightRadius={"lg"}
          boxShadow={"md"}
          overflow={"hidden"}
        >
          <ChatInfo
            activeChat={activeChat}
            setConversations={setConversations}
          />
        </GridItem>
      )}
    </Grid>
  );
};

export default Chats;
