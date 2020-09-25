import express from 'express';

import word from './word';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/word', word.router);

export default app;
