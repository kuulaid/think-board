import express from "express";
import notesRoutes from "./routes/notesRoutes.js"
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000



//Middlewares
app.use(express.json()); //parses JSON bodies req.body
app.use(rateLimiter);

app.use((req, res, next) => {
    console.log(`Req method is ${req.method} and req url is ${req.url}`)
    next();
})

//Routes
app.use("/api/notes", notesRoutes);

connectDB().then(() => {
    app.listen(PORT, () => {
    console.log("Server is on PORT:", PORT)
})
});



