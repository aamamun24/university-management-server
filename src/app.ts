import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { StudentRoute } from './app/modules/student/student.route';
const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/v1/students', StudentRoute);

const getHelloController = (req: Request, res: Response) => {
  const hello = 'Hello World!';
  res.send(hello);
};

app.get('/', getHelloController);

export default app;
