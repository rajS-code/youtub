import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import connectDB from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import videoRouter from "./routes/video.routes.js";
import likeRouter from "./routes/like.routes.js";
import watchLaterRouter from "./routes/watchLater.routes.js";
import historyRouter from "./routes/history.routes.js";
import commentRouter from "./routes/comment.routes.js";

dotenv.config();

import path from "path"

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use("/uploads", express.static(path.join("uploads")))

app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.use(bodyParser.json());


app.use("/auth", authRouter);
app.use("/video", videoRouter);
app.use("/like", likeRouter)
app.use("/watchLater", watchLaterRouter)
app.use("/history", historyRouter)
app.use("/comment", commentRouter)

app.listen(PORT, async () => {
    await connectDB();
    console.log(`Server is running on port ${PORT}`);
});

