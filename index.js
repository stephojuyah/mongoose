const express =require(`express`);
const app = express();
const cors =require(`cors`);
const bodyParser =require(`body-parser`);
const PORT = process.env.PORT || 300;
require('dotenv').config();
const connectDB = require('./db');
connectDB();

app.use(cors());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({  extended: true }));

// app.use()

app.get('/', (req, res) => {
  res.send('Welcome to our API');
});

app.use(express.json());
app.use("/student", require('./routes/student'));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});



