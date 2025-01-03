
// Import necessary modules
import express,{request} from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookmodels.js";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

const app = express();
// Middleware for parsing request body
app.use(express.json());

//Middleware for handling CORS POlicy
//option 1: allow all origins with default cors(*)
//app.use(cors());
//option 2: allow custom origins
app.use(
    cors({
        origin: 'http://localhost:5173',//allow request from your frontend
        methods: ['GET','POST','PUT','DELETE'],
        allowedHeaders: ['Content-Type'],
    })
);

app.get('/',(request, response) =>{
    console.log(request);
    return response.status(234).send('Welcome to Earth');

});

app.use('/books', booksRoute);

mongoose 
 .connect(mongoDBURL)
 .then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
        console.log(`App is listening to port: ${PORT}`);
    });    
 })
 .catch((error) =>{
    console.log(error);
 });