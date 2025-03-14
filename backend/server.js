import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

//Passport Configuration
import './config/passport.js';

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.listen(5000, () => {
    console.log('Server running on http://localhost:5000')
})