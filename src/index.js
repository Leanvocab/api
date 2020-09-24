import 'dotenv/config';
import cors from 'cors';
import app from './app';

const DEFAULT_PORT = 80;
const port = process.env.PORT || DEFAULT_PORT;

app.use(cors());
 
app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`),
);