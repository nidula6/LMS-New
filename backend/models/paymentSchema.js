const mongoose= require('mongoose');
const payment = new mongoose.Schema({
    title:{type:String, required: true},
    description:{type:String},
    fileUrl:{type:String, required: true},
    createdAt: { type: Date, default: Date.now },
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'student', required: true },
});

module.exports=mongoose.model('payment',payment); 