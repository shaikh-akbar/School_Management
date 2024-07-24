const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClassSchema = new Schema({
  className: {
    type: String,
    required: [true, 'Class name is required'],
    trim: true,
    minlength: [2, 'Class name must be at least 2 characters long']
  },
  year: {
    type: Number,
    required: [true, 'Year is required'],
    min: [1900, 'Year must be greater than or equal to 1900'],
    max: [2100, 'Year must be less than or equal to 2100']
  },
  teacher: {
    type: Schema.Types.ObjectId,
    ref: 'Teacher',
    required: [true, 'Teacher is required']
  },
  studentFees: {
    type: Number,
    required: [true, 'Student fees are required'],
    min: [0, 'Student fees must be a non-negative number']
  },
  maxStudents: {
    type: Number,
    required: [true, 'Maximum number of students is required'],
    min: [1, 'There must be at least one student allowed'],
    validate: {
      validator: function(value) {
        // Ensure maxStudents is greater than or equal to the number of enrolled students
        return !this.students || value >= this.students.length;
      },
      message: 'Max students cannot be less than the number of enrolled students'
    }
  },
  students: [{
    type: Schema.Types.ObjectId,
    ref: 'Student'
  }]
});

module.exports = mongoose.model('Class', ClassSchema);
