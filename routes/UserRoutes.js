const express = require('express');
const userModel = require('../models/User');
const app = express();

//Read ALL
//http://localhost:3000/users
app.get('/users', async (req, res) => {
  const users = await userModel.find({});
  
  //Sorting
  //use "asc", "desc", "ascending", "descending", 1, or -1
  //const users = await userModel.find({}).sort({'firstname': -1});
  
  //Select Specific Column
  //const users = await userModel.find({}).select("firstname lastname salary").sort({'salary' : 'desc'});  
  
  try {
    console.log(users[0].surname)
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send(err);
  }
});


//http://localhost:3000/user
app.post('/user', async (req, res) => {
  
    console.log(req.body)
    const user = new userModel(req.body);

    try {
      await user.save((err) => {
        if(err){
          console.log(err.errors['username'].message)
          res.send(err)
        }else{
          res.send(user);
        }
      });
    } catch (err) {
      res.status(500).send(err);
    }
  });


module.exports = app

/*
userModel.create(
  {
  "name": "Clementina DuBuque",
  "username": "Moriah.Stanton",
  "email": "Rey.Padberg@karina.biz",
  "address": {
    "street": "Kattie Turnpike",
    "suite": "Suite 198",
    "city": "Lebsackbury",
    "zipcode": "31428-2261",
    "geo": {
      "lat": "-38.2386",
      "lng": "57.2232"
    }
  },
  "phone": "1-924-648-3804",
  "website": "http://ambrose.net",
  "company": {
    "name": "Hoeger LLC",
    "catchPhrase": "Centralized empowering task-force",
    "bs": "target end-to-end models"
  }
})
*/