import express from "express";
const app = express();
const PORT = process.env.PORT || 3000;
import dotenv from "dotenv";
dotenv.config();
//routes
import login from "./routes/login.ts";
import packages from "./routes/packages.ts";
import userRoutes from "./routes/user.ts";
import sendEmail from "./controllers/email.ts";

app.use("/login", login);
app.use("/packages", packages);
app.use("/user", userRoutes);

app.get("/", (req, res) => res.send("Hello World"));
sendEmail("testing", "<p>it works!</p>");
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
