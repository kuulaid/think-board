import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import path from "path";

import notesRoutes from "./routes/notesRoutes.js"
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000
const __dirname = path.resolve()


//Middlewares

if(process.env.NODE_ENV !== "production"){

    app.use(cors({
        origin: "http://localhost:5173"
    }));
}
app.use(express.json()); //parses JSON bodies req.body
app.use(rateLimiter);


app.use((req, res, next) => {
    console.log(`Req method is ${req.method} and req url is ${req.url}`)
    next();
})

//Routes
app.use("/api/notes", notesRoutes);

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")))

    app.get("*", (req, res) =>{
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
})
}

connectDB().then(() => {
    app.listen(PORT, () => {
    console.log("Server is on PORT:", PORT)
})
});



