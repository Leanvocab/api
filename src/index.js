import 'dotenv/config';
import { connectDb } from './db';

import cors from 'cors';
import app from './app';

const DEFAULT_PORT = 80;
const port = process.env.PORT || DEFAULT_PORT;

app.use(cors());

connectDb()
  .then(() => {
    app.listen(port, () =>
      console.log(`Example app listening on port ${port}!`),
    );
  })
  .catch(error => console.error('db cannot connect', error));