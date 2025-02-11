const mongoose = require('mongoose');
const Assignment = require('../models/AssignmentSchema');
const multer = require('multer');

// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'upload/'); // Ensure this folder exists
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// ✅ Upload assignment
exports.uploadAssignment = async (req, res) => {
    try {
        const { title, description, teacherId } = req.body; // Ensure teacherId is included

        // ✅ Validate teacherId
        if (!mongoose.Types.ObjectId.isValid(teacherId)) {
            return res.status(400).json({ error: 'Invalid teacher ID' });
        }

        // ✅ Ensure file exists
        if (!req.file) {
            return res.status(400).json({ error: 'File is required' });
        }

        const fileUrl = `/upload/${req.file.filename}`;

        const newAssignment = new Assignment({
            title,
            description,
            fileUrl,
            teacherId: new mongoose.Types.ObjectId(teacherId) // Convert to ObjectId
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
            .populate('teacherId', 'name'); // Fetch teacher's name

        res.status(200).json(assignments);
    } catch (error) {
        console.error('Error fetching assignments:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports.upload = upload;
