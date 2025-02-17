const mongoose = require('mongoose');
const multer = require('multer');

const Payment = require('../models/paymentSchema');

// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploadPayment/'); // Ensure this folder exists
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const spayment = multer({ storage: storage });

// ✅ Upload assignment
exports.uploadPayment = async (req, res) => {
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

        const fileUrl = `/uploadPayment/${req.file.filename}`;

        const newPayment = new Payment({
            title,
            description,
            fileUrl,
            studentId: new mongoose.Types.ObjectId(studentId)
        });

        await newPayment.save();

        res.status(201).json({ message: 'Payment Slip uploaded successfully', payment: newPayment });
    } catch (error) {
        console.error('Error uploading assignment:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// ✅ Fetch assignments

exports.getPayment = async (req, res) => {
    try {
        // Fetch all payments and populate studentId with the student's name
        const payments = await Payment.find()
            .populate('studentId', 'name'); // Fetch student's name

        res.status(200).json(payments); // Send payments back as a JSON response
    } catch (error) {
        console.error('Error fetching payments:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


exports.getPayments = async (req, res) => {
    try {
        // Fetch all payments and populate studentId with the student's name
        const payments = await Payment.find()
            .populate('studentId', 'name'); // Fetch student's name

        res.status(200).json(payments); // Send payments back as a JSON response
    } catch (error) {
        console.error('Error fetching payments:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// exports.getPayment = async (req, res) => {
//     try {
//         let payments = await Payment.find({ studentId: req.params.id });

//         if (payments.length > 0) {
//             payments = payments.map((payment) => {
//                 return { ...payment._doc, password: undefined }; // Ensure correct reference
//             });

//             return res.json({ length: payments.length, data: payments });
//         } else {
//             return res.json({ message: "No payments found", length: 0 });
//         }
//     } catch (err) {
//         console.error("Error fetching payments:", err);
//         return res.status(500).json({ error: err.message });
//     }
// };

module.exports.spayment = spayment;
 