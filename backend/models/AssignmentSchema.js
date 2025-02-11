const mongoose= require('mongoose');
const AssignmentSchema= new mongoose.Schema({
    title:{type:String, required: true},
    description:{type:String},
    fileUrl:{type:String, required: true},
    createdAt: { type: Date, default: Date.now },
    teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'teacher', required: true },
});

module.exports=mongoose.model('Assignment',AssignmentSchema);