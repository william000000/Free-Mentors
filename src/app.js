import express from 'express';
import bodyParser from 'body-parser';
import userRoute from './routes/user.route';
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/v1/auth/', userRoute);

const port = process.env.PORT || 9000;
app.listen(port, () => {
  console.log(`Connected on ${port}`);
});

export default app;

