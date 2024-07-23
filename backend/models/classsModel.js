const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClassSchema = new Schema({
    className: { type: String, required: true },
    year: { type: Number, required: true },
    teacher: { type: Schema.Types.ObjectId, ref: 'Teacher' },
    studentFees: { type: Number, required: true },
    maxStudents: { type: Number, required: true },
    students: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
});

module.exports = mongoose.model('Class', ClassSchema);