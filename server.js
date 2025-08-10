import 'dotenv/config';
import express from 'express';
import handlerCheck from './api/check-firebase.js';
import handlerAdd from './api/add-test-doc.js';

const app = express();
app.use(express.json());

app.get('/check-firebase', (req, res) => handlerCheck(req, res));
app.post('/add-test-doc', (req, res) => handlerAdd(req, res));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
