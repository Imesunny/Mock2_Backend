const express = require("express");
const app = express();
const { connection } = require("./config/db");
const { UserModel } = require("./models/User.Model");
const {employeeRouter}  = require('./routes/employee.routes')

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require('cors')

app.use(
  cors({
    origin: "*",
  })
);

app.use(express());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Hello from the Home Page!" });
});

app.post("/signup", async (req, res) => {
  // res.json({message: "Hello from the SignUp Page!"});

  const { email, password, confirmPassword } = req.body;
  if (password != confirmPassword) {
    return res.json({ message: "Passwords do not match" });
  }

  const is_User = await UserModel.findOne({ email: email });
  if (is_User) {
    return res.json({ message: "User already exists! Try Logging in again!" });
  }
  //hash
  bcrypt.hash(password, 8, async (err, hash) => {
    await UserModel.create({
      email: email,
      password: hash,
      confirmPassword: hash,
    });
    res.json({ message: "User SignUp Sucess" });
  });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const is_User = await UserModel.findOne({ email: email });
  if (is_User) {
    const hashed_password = is_User.password;
    bcrypt.compare(password, hashed_password, (err, result) => {
      if (result) {
        const token = jwt.sign({ UserID: is_User._id }, "helloDev");
        return res.json({ message: "Login Success", token: token });
      } else {
        return res.json({ message: "Invalid crediantials Try Again!" });
      }
    });
  } else {
    return res.json({ message: "User Not Found, Try Signning in again!" });
  }
});

app.use('/emp', employeeRouter);

app.listen(8080, async () => {
  try {
    await connection;
    console.log("connection established to DB");
  } catch (error) {
    console.log("Error connecting to DB", error);
  }
  console.log("Listening on port 8080");
});
