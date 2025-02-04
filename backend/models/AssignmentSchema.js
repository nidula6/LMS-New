const mongoose= require('mongoose');

const AssignmentSchema= new mongoose.Schema({
    title:{type:String, required: true},
    description:{type:String},
    fileUrl:{type:String, required: true},
    teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true },
    createdAt: { type: Date, default: Date.now }

});

module.exports=mongoose.model('Assignment',AssignmentSchema);