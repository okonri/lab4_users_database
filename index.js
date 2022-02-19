const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/UserRoutes.js');

const app = express();
app.use(express.json()); // Make sure it comes back as json

mongoose.connect('mongodb+srv://ieo:vision2020@cluster0.wwc5r.mongodb.net/Users?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(success => {
  console.log('Success Mongodb connection')
}).catch(err => {
  console.log('Error Mongodb connection')
});

app.use(userRouter);

app.listen(3000, () => { console.log('Server is running...') });
