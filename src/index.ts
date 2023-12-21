import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import blogRoutes from './routes/blog.routes';

dotenv.config(); 
const app: Application = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.json({ limit: '50mb' })); 

const port = process.env.PORT || 8000;

// Connect to MongoDB
const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
  console.error('MongoDB connection URL is not defined in the environment variables.');
  process.exit(1);
}

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as mongoose.ConnectOptions)


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server');
});

app.use('/auth', authRoutes);
app.use('/images', express.static('public/images'));
app.use('/blogs', blogRoutes);