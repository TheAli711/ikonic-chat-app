import React, { useEffect } from "react";
import { AppContext } from "../../AppContext";
import { Input, Button, Flex, Box, Text } from "@chakra-ui/react";
import { sendMessage } from "../../services/chat";
import JumpingDots from "../jumpingDots/JumpingDots";

const Chat = ({
  activeChat,
  conversation,
  setConversation,
  socket,
  typing,
  setTyping,
}) => {
  const { user } = React.useContext(AppContext);
  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const message = formData.get("message");
    if (activeChat.id) {
      sendMessage(activeChat.id, message).then((data) => {
        setConversation((prev) => {
          return {
            ...prev,
            messages: [...prev.messages, { ...data.newMessage, user: user }],
          };
        });
        e.target.reset();
      });
    } else if (activeChat.name) {
      console.log("Sending Message");
      socket.emit("send-message-room", {
        room: activeChat.name,
        message: { text: message, user },
      });
      e.target.reset();
    }
  };

  useEffect(() => {
    if (conversation) {
      const chat = document.getElementById("chat");
      if (chat) {
        chat.scrollTop = chat.scrollHeight;
      }
    }
  }, [conversation]);

  useEffect(() => {
    // scroll to bottom of chat
    let timeout;
    // on change message, emit typing event
    const typingHandler = (e) => {
      console.log("Typing");
      if (activeChat.id) {
        socket.emit("typing-conv", { room: activeChat.id, user });
      } else if (activeChat.name) {
        console.log("Typing");
        socket.emit("typing-room", { room: activeChat.name, user });
      }
    };

    socket?.on("typing", (data) => {
      console.log(typing);
      if (user.id !== data.id) {
        setTyping(true);
        const chat = document.getElementById("chat");
        if (chat) {
          chat.scrollTop = chat.scrollHeight;
        }
        timeout = setTimeout(() => {
          setTyping(false);
        }, 3000);
      }
    });
    const input = document.getElementById("message");
    input?.addEventListener("input", typingHandler);
    return () => {
      input?.removeEventListener("input", typingHandler);
      socket?.off("typing");
      clearTimeout(timeout);
    };
  }, [activeChat]);

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        border: "none",
      }}
    >
      {activeChat && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            width: "100%",
          }}
        >
          <Box
            sx={{
              flex: "1",
              overflowY: "auto",
              width: "100%",
              maxHeight: "100%",
            }}
            id="chat"
            scrollBehavior={"smooth"}
          >
            {conversation?.messages?.map((message) => {
              return (
                <Box
                  key={message.id}
                  sx={{
                    display: "flex",
                    alignItems: "center",

                    p: 3,
                    ml: user.id === message.user.id ? "auto" : 0,
                    justifyContent:
                      user.id === message.user.id ? "flex-end" : "flex-start",
                  }}
                >
                  {user.id !== message.user.id && (
                    <Box
                      sx={{
                        height: "30px",
                        width: "30px",
                        borderRadius: "50%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor:
                          message.user.id === user.id ? "brand.200" : "#f5f5f5",
                        marginRight: user.id === message.user.id ? "0" : "10px",
                        marginLeft: user.id === message.user.id ? "10px" : "0",
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
                      </svg>
                    </Box>
                  )}
                  <Text
                    sx={{
                      p: 3,
                      borderRadius: "50px",
                      backgroundColor:
                        user.id === message.user.id ? "brand.200" : "#f5f5f5",
                      display: "flex",
                      width: "fit-content",
                      color: user.id === message.user.id ? "white" : "black",
                    }}
                  >
                    {message.text}
                  </Text>
                  {user.id === message.user.id && (
                    <Box
                      sx={{
                        height: "30px",
                        color: "white",
                        width: "30px",
                        borderRadius: "50%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor:
                          message.user.id === user.id ? "brand.200" : "#f5f5f5",
                        marginRight: user.id === message.user.id ? "0" : "10px",
                        marginLeft: user.id === message.user.id ? "10px" : "0",
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
                      </svg>
                    </Box>
                  )}
                </Box>
              );
            })}
            {typing && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  p: 3,
                  ml: 0,
                  justifyContent: "flex-start",
                }}
              >
                <Text
                  sx={{
                    p: 3,
                    borderRadius: "50px",
                    // backgroundColor: "brand.200",
                    display: "flex",
                    width: "fit-content",
                    color: "white",
                  }}
                >
                  <JumpingDots />
                </Text>
              </Box>
            )}
          </Box>
          <Box
            sx={{
              width: "100%",
              p: 3,
            }}
          >
            <form onSubmit={submitHandler}>
              <Flex
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  p: 3,
                  border: "2px solid #f5f5f5",
                  borderRadius: "50px",
                }}
              >
                <Input
                  className=""
                  type="text"
                  placeholder="Enter your message here"
                  variant={"unstyled"}
                  name="message"
                  id="message"
                />
                <Button type="submit">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="gray"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-send"
                    cursor={"pointer"}
                  >
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                </Button>
              </Flex>
            </form>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Chat;
