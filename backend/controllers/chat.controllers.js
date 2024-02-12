// createChat, getChats, sendMessage, getChat
import { Conversation, User, Message } from "../models/index";

const createChat = async (req, res) => {
  const { userId, message } = req.body;
  const id = req.user.id;
  // create a conversation and link it with both users
  const conversation = await Conversation.create({
    latestMessage: message,
  });
  await conversation.addUser([id, userId]);
  // create a new message and link it with the conversation
  const newMessage = await Message.create({
    conversationId: conversation.id,
    text: message,
    userId: id,
  });
  const updatedConvo = await Conversation.findByPk(conversation.id, {
    include: [
      {
        model: User,
        attributes: ["id", "username"],
      },
    ],
  });
  res.status(201).json({ conversation: updatedConvo, newMessage });
};

const getChats = async (req, res) => {
  const id = req.user.id;
  const userWithConversations = await User.findByPk(id, {
    include: [
      {
        model: Conversation,
        include: [
          {
            model: User,
            attributes: ["id", "username"],
          },
        ],
      },
    ],
  });
  const conversations = userWithConversations.conversations;
  res.status(200).json({ conversations });
};

const sendMessage = async (req, res) => {
  const { message } = req.body;
  const { id: conversationId } = req.params;
  const id = req.user.id;
  const newMessage = await Message.create({
    conversationId,
    text: message,
    userId: id,
  });
  await Conversation.update(
    { latestMessage: message },
    {
      where: {
        id: conversationId,
      },
    }
  );
  res.status(201).json({ newMessage });
};

const getChat = async (req, res) => {
  const { id } = req.params;
  const conversation = await Conversation.findByPk(id, {
    include: [
      {
        model: User,
        attributes: ["id", "username"],
      },
      {
        model: Message,
        include: [
          {
            model: User,
            attributes: ["id", "username"],
          },
        ],
      },
    ],
  });
  res.status(200).json({ conversation });
};

export { createChat, getChats, sendMessage, getChat };
