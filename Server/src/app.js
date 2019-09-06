import express from 'express';
import bodyParser from 'body-parser';
import userRoute from './routes/user.route';
import adminRoute from './routes/admin.routes';
import mentorRoute from './routes/mentors.routes';
import sessionRoute from './routes/mentorship.route';
import reviewRoute from './routes/review.routes';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/v2/auth/', userRoute);
app.use('/api/v2/user', adminRoute);
app.use('/api/v2/mentors', mentorRoute);
app.use('/api/v2/sessions', sessionRoute);
app.use('/api/v2/sessions', reviewRoute);

app.use('*', (req, res) => {
  res.status(200).json('Welcome to my Free Mentors app');
});

const port = process.env.PORT || 9000;
app.listen(port, () => {
  console.log(`Connected on ${port}`);
});

export default app;
