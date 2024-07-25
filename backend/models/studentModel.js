const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters long']
  },
  gender: {
    type: String,
    required: [true, 'Gender is required'],
    enum: {
      values: ['Male', 'Female', 'Other'],
      message: 'Gender must be either Male, Female, or Other'
    }
  },
  dob: {
    type: Date,
    required: [true, 'Date of Birth is required'],
    validate: {
      validator: function(value) {
        return value instanceof Date && !isNaN(value);
      },
      message: 'Invalid Date of Birth'
    }
  },
  contactDetails: {
    type: String,
    required: [true, 'Contact Details are required'],
    validate: {
      validator: function(value) {
        
        return /^[0-9]{10}$/.test(value);
      },
      message: 'Contact Details must be a 10-digit number'
    }
  },
  feesPaid: {
    type: Number,
    required: [true, 'Fees Paid is required'],
    min: [0, 'Fees Paid must be a non-negative number']
  },
  className: { 
    type: String,
    required: [true, 'Class is required'],
  }
});

module.exports = mongoose.model('Student', StudentSchema);
