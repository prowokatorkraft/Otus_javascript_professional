import dotenv from 'dotenv';
import express from 'express';
import tasksRouter from './routes/tasks';
import usersRouter from './routes/users';
import {handleError, handleNotFound} from "./middleware/errorHandlers";

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.use('/api/tasks', tasksRouter);
app.use('/api/users', usersRouter);
app.use(handleNotFound);
app.use(handleError);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});