import { sequelize, Sequelize } from "../database/index";
// Define User model
const User = sequelize.define("user", {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
    },
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

// Define Conversation model
const Conversation = sequelize.define("conversation", {
  // reference to Message model
  latestMessage: {
    type: Sequelize.TEXT,
  },
});

// Define Message model
const Message = sequelize.define("message", {
  text: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

// Define associations between models
User.belongsToMany(Conversation, { through: "userconversation" });
Conversation.belongsToMany(User, { through: "userconversation" });

Message.belongsTo(User);
Message.belongsTo(Conversation);

Conversation.hasMany(Message);

export { User, Conversation, Message, sequelize, Sequelize };
