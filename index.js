const express = require('express');
const connectToDB = require('./config/db');
require ('dotenv').config();
const bcrypt = require('bcrypt');
const userRouter = require('./routes/user.routes');
const postRouter = require('./routes/post.routes');
const commentRouter = require('./routes/comment.routes');



const app = express();

connectToDB();

app.use(express.json());
app.use("/user", userRouter);
app.use("post", postRouter);
app.use("/comment",commentRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
