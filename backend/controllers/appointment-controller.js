const Appointment = require("../models/AppointmentSchema");

// Submit an appointment request
exports.createAppointment = async (req, res) => {
    const { name, email, message } = req.body;

    try {
        const appointment = new Appointment({ name, email, message });
        await appointment.save();
        res.status(201).json({ message: "Appointment request submitted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get all appointments (Admin View)
exports.getAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find().sort({ createdAt: -1 });
        res.status(200).json(appointments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};    



exports.deleteAppointment = async (req, res) => {
    try {
        const result = await Appointment.findByIdAndDelete(req.params.id);

        if (!result) {
            return res.status(404).json({ message: "Appointment not found" });
        }

        res.status(200).json({ message: "Appointment deleted successfully", deletedAppointment: result });
    } catch (error) {
        console.error("Error deleting appointment:", error);
        res.status(500).json({ message: "Error deleting appointment", error });
    }
};