import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose'
import productRoutes from './routes/product';
import categoryRouter from './routes/category';
import authRouter from './routes/auth';
import cors from 'cors'

const app = express();
dotenv.config();
app.use(express.json())
app.use(cors({ credentials: 'same-origin' }));



app.use('/api', productRoutes);
app.use('/api',categoryRouter);
app.use('/api',authRouter);

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser : true,
    useCreateIndex : true,
    useUnifiedTopology: true
  }).then(()=>{
    console.log('DB connected');
  })

  // mongoose.connection.on('error', err => {
  //   console.log(`DB connection error: ${err.message}`)
  // });

const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log(`Server is runing on port : ${port}`);
})