const mongoose = require('mongoose');
const Assignment = require('../models/SAssignmentSchema');
const multer = require('multer');

// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploadStudents/'); // Ensure this folder exists
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const supload = multer({ storage: storage });

// ✅ Upload assignment
exports.uploadAssignment = async (req, res) => {
    try {
        const { title, description, studentId } = req.body;

        // ✅ Validate studentId
        if (!mongoose.Types.ObjectId.isValid(studentId)) {
            return res.status(400).json({ error: 'Invalid student ID' });
        }

        // ✅ Ensure file exists
        if (!req.file) {
            return res.status(400).json({ error: 'File is required' });
        }

        const fileUrl = `/uploadStudents/${req.file.filename}`;

        const newAssignment = new Assignment({
            title,
            description,
            fileUrl,
            studentId: new mongoose.Types.ObjectId(studentId)
        });

        await newAssignment.save();

        res.status(201).json({ message: 'Assignment uploaded successfully', assignment: newAssignment });
    } catch (error) {
        console.error('Error uploading assignment:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// ✅ Fetch assignments
exports.getAssignments = async (req, res) => {
    try {
        const assignments = await Assignment.find()
            .populate('studentId', 'name'); // Fetch student's name

        res.status(200).json(assignments);
    } catch (error) {
        console.error('Error fetching assignments:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports.supload = supload;
 