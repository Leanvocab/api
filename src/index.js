import cors from 'cors';
import app from './app';

app.use(cors());
 
app.listen(3000, () =>
  console.log('Example app listening on port 3000!'),
);