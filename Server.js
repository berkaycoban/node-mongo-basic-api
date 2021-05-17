import express from 'express';

const router = express.Router();
const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// db
import connectDB from './config/db.js';
connectDB();

// swagger
import swaggerUI from 'swagger-ui-express';
import swaggerDocument from './swagger.js';

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

router.get('/', (req, res) => {
  res.json({ error: false, message: 'Hello World!' });
});

// User router
import userRouter from './routes/User.js';

app.use('/users', userRouter);

app.listen(3000);
console.log('Listening to port 3000');
