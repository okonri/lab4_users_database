const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    minlength:[4, "username must have 4 or more characters"]
  },
  email: {
    type: String,
    required: true,
    validate: function(value) {
      var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
      return emailRegex.test(value);
    }
  },
  address: {
    street: {
      type: String,
      required: true
    },
    suite: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true,
      validate: {
        validator: function(value) {
          var cityRegex = /^[a-zA-Z ]*$/;
          return cityRegex.test(value);
        },
        message: 'Only letters and spaces allowed'
      }
    },
    zipcode: {
      type: Number,
      required: true,
      validate: {
        validator: function(v) {
          return /\d{5}-\d{4}/.test(v);
        },
        message: 'Incorrect format'
      }
    },
    geo: {
      lat: {
        type: Number,
        required: true
      },
      lng: {
        type: Number,
        required: true
      }
    }
  },
  phone: {
    type: Number,
    required: true,
    validate: {
      validator: function(v) {
        return /\d{1}-\d{3}-\d{3}-\d{3}/.test(v);
      },
      message: 'Incorrect format'
    }
  },
  website: {
    type: String,
    required: true,
    validate: { 
      validator: value => validator.isURL(value, { protocols: ['http','https'], require_tld: true, require_protocol: true }),
      message: 'Must be a Valid URL' 
    }
  },
  company: {
    name: {
      type: String,
      required: true
    },
    catchPhrase: {
      type: String,
      required: true
    },
    bs: {
      type: String,
      required: true
    } 
  }
})


UserSchema.post('init', (doc) => {
  console.log('%s has been initialized from the db', doc._id);
});

UserSchema.post('validate', (doc) => {
  console.log('%s has been validated (but not saved yet)', doc._id);
});

UserSchema.post('save', (doc) => {
  console.log('%s has been saved', doc._id);
});

UserSchema.post('remove', (doc) => {
  console.log('%s has been removed', doc._id);
});

const User = mongoose.model("User", UserSchema);
module.exports = User;