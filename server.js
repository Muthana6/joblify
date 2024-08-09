import 'express-async-errors'
import express from 'express';
import morgan from "morgan";
import * as dotenv from 'dotenv';
import jobRouter from "./routes/jobRouter.js";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";
import mongoose from "mongoose";
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import {validateTest} from "./middleware/validationMiddleware.js";
import {authenticateUser} from "./middleware/authMiddleware.js";
import cookieParser from "cookie-parser";

const app = express();

dotenv.config();
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(cookieParser());
app.use(express.json());
app.use('/api/v1/jobs',authenticateUser ,jobRouter)
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users',authenticateUser ,userRouter)

// app.use(cookieParser());
// app.use(express.json());
// app.use('/api/v1/jobs' ,jobRouter)
// app.use('/api/v1/auth', authRouter)
// app.use('/api/v1/users',userRouter)



app.get('/api/v1/test', (req, res) => {
    res.json({msg: 'Test route'});
})

app.post('/api/v1/test',
    validateTest,
    (req, res) => {
    const {name} = req.body
    return res.json({message: `Hello ${name}`});
})


// Error page
app.use('*', (req, res)=> {
    res.status(404).json({msg:'not found'})
})

// Server Errors
app.use(errorHandlerMiddleware)

// connect to mongoose
try {
    await mongoose.connect(process.env.MONGO_URL)

    const port = process.env.PORT || 5100;
    app.listen(port, () => {
        console.log(`Server running on port ${port}...`);
    })
} catch (error){
    console.log(error)
    process.exit(1)
}





