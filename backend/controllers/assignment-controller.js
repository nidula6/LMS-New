
const Assignment = require('../models/AssignmentSchema');
const multer = require('multer');

// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'upload/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// Upload assignment
exports.uploadAssignment = async (req, res) => {
    try {
        const { title, description, teacherId } = req.body;
        const fileUrl = `/upload/${req.file.filename}`;

        const newAssignment = new Assignment({ title, description, fileUrl, teacherId });
        await newAssignment.save();

        res.status(201).json({ message: 'Assignment uploaded successfully', assignment: newAssignment });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Fetch assignments
exports.getAssignments = async (req, res) => {
    try {
        const assignments = await Assignment.find().populate('teacherId', 'name');
        res.status(200).json(assignments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports.upload = upload;

