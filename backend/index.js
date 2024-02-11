import express from "express";
import cors from "cors";
import helmet from "helmet";
import routes from "./routes";
import { sequelize } from "./models/index";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

const PORT = process.env.PORT || 5000;

app.use("/api/v1", routes);

app.get("/api/v1/", (req, res) => {
  res.json({
    message: "Welcome to the chat app",
  });
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to the database");
    sequelize.sync().then(() => {
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
    });
  })
  .catch((error) => {
    console.log(error);
  });
