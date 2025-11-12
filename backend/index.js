const express = require('express');
const  Mongoose  = require('mongoose');

const app = express();

const cors = require('cors');
app.use(cors());
app.use(express.json());  
const userrouter = require('./router/userrouter');


app.use('/api/users', userrouter);

Mongoose.connect('mongodb://localhost:27017/kickstepss', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');    
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB', err);
  });

  const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});